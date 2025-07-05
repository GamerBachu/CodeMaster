import type { IDBStoreSchema } from "./Interfaces";
import { dbName, version, schema } from "./Schema";

export default class LocalDb {
  private dbName: string;
  private dbVersion: number;
  private storeSchemas: IDBStoreSchema[];
  private db: IDBDatabase | null = null;

  constructor() {
    this.dbName = dbName;
    this.dbVersion = version;
    this.storeSchemas = schema;
  }

  /**
   * Initialize the database: backup, delete, recreate stores, and restore data if schema changed.
   */
  public async init(): Promise<void> {
    const currentStores = await this.getCurrentStore();
    const requestedStores = this.storeSchemas.map((schema) => schema.name);
    const schemaMatches =
      requestedStores.length === currentStores.length &&
      requestedStores.every((name) => currentStores.includes(name));

    let backupData: Record<string, unknown[]> = {};

    if (!schemaMatches) {
      if (currentStores.length > 0) {
        // Backup existing data
        const db = await this.openRaw();
        backupData = await this.backupAllDatabases(db, currentStores);
        db.close();
      }
      await this.deleteDB();
    }

    await new Promise<void>((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        // Create object stores if not exist
        this.storeSchemas.forEach((schema) => {
          if (!db.objectStoreNames.contains(schema.name)) {
            const store = db.createObjectStore(schema.name, schema.option);
            schema.option.indexes?.forEach((idx) =>
              store.createIndex(idx.name, idx.keyPath, idx.options)
            );
          }
        });
      };

      request.onsuccess = () => {
        const db = request.result;
        if (!schemaMatches && Object.keys(backupData).length > 0) {
          const tx = db.transaction(requestedStores, "readwrite");
          requestedStores.forEach((storeName) => {
            const store = tx.objectStore(storeName);
            (backupData[storeName] || []).forEach((item) => {
              try {
                store.add(item);
              } catch {
                // Intentionally ignore errors during restore (e.g., duplicate keys)
              }
            });
          });
          tx.oncomplete = () => {
            db.close();
            resolve();
          };
          tx.onerror = () => {
            db.close();
            this.handleDbError(request, reject);
          };
        } else {
          db.close();
          resolve();
        }
      };
      request.onerror = () => this.handleDbError(request, reject);
    });

  }

  /**
   * Add a new record to the store.
   */
  public async create<T>(storeName: string, value: T): Promise<IDBValidKey> {
    await this.open();
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName, "readwrite");
      const req = store.add(value);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => this.handleDbError(req, reject);
    });
  }

  /**
   * Add or update a record in the store.
   */
  public async put<T>(storeName: string, value: T): Promise<IDBValidKey> {
    await this.open();
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName, "readwrite");
      const req = store.put(value);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => this.handleDbError(req, reject);
    });
  }

  /**
   * Get a record by key.
   */
  public async get<T>(
    storeName: string,
    key: IDBValidKey
  ): Promise<T | undefined> {
    await this.open();
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName, "readonly");
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => this.handleDbError(req, reject);
    });
  }

  /**
   * Get all records from a store.
   */
  public async getAll<T>(storeName: string): Promise<T[]> {
    await this.open();
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName, "readonly");
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => this.handleDbError(req, reject);
    });
  }

  /**
   * Delete a record by key.
   */
  public async delete(storeName: string, key: IDBValidKey): Promise<void> {
    await this.open();
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName, "readwrite");
      const req = store.delete(key);
      req.onsuccess = () => resolve();
      req.onerror = () => this.handleDbError(req, reject);
    });
  }

  /**
   * Clear all records from a store.
   */
  public async clear(storeName: string): Promise<void> {
    await this.open();
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName, "readwrite");
      const req = store.clear();
      req.onsuccess = () => resolve();
      req.onerror = () => this.handleDbError(req, reject);
    });
  }

  /**
   * Get an object store from the opened database.
   */
  private getStore(
    storeName: string,
    mode: IDBTransactionMode
  ): IDBObjectStore {
    if (!this.db) throw new Error("Database is not open");
    if (!this.db.objectStoreNames.contains(storeName)) {
      throw new Error(`Object store "${storeName}" does not exist`);
    }
    const tx = this.db.transaction(storeName, mode);
    return tx.objectStore(storeName);
  }

  /**
   * Close the database connection.
   */
  public close(): void {
    this.db?.close();
    this.db = null;
  }

  /**
   * Open the database and cache the connection.
   */
  public async open(): Promise<IDBDatabase> {
    if (this.db) return this.db;
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };
      request.onerror = () => this.handleDbError(request, reject);
    });
  }

  /**
   * Open the database without caching the connection.
   */
  public async openRaw(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => this.handleDbError(request, reject);
    });
  }

  /**
   * Get the names of current object stores.
   */
  public async getCurrentStore(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(this.dbName);
      req.onsuccess = () => {
        const db = req.result;
        const storeNames = Array.from(db.objectStoreNames);
        db.close();
        resolve(storeNames);
      };
      req.onerror = () => reject([]);
    });
  }

  /**
   * Backup all data from the given stores.
   */
  public async backupAllDatabases(
    db: IDBDatabase,
    storeNames: string[]
  ): Promise<Record<string, unknown[]>> {
    return Promise.all(
      storeNames.map((storeName: string) => {
        return new Promise<unknown[]>((resolve) => {
          const tx = db.transaction(storeName, "readonly");
          const store = tx.objectStore(storeName);
          const req = store.getAll();
          req.onsuccess = () => {
            resolve(req.result);
          };
          req.onerror = () => {
            resolve([]);
          };
        });
      })
    )
      .then((backups) => {
        const backup: Record<string, unknown[]> = {};
        storeNames.forEach((storeName, i) => {
          backup[storeName] = backups[i];
        });

        return backup;
      })
      .catch(() => {
        return {};
      });
  }

  /**
   * Delete the database.
   */
  public async deleteDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.close();
      const req = indexedDB.deleteDatabase(this.dbName);
      req.onsuccess = () => resolve();
      req.onerror = () => this.handleDbError(req, reject);
      req.onblocked = () =>
        reject(new Error("Delete blocked: database is still open elsewhere."));
    });
  }

  /**
   * Handle IndexedDB errors.
   */
  private handleDbError(
    req: IDBRequest,
    reject: (error: unknown) => void
  ): void {
    console.log(req.error);
    reject(req.error ?? new Error("Unknown IndexedDB error"));
  }
}
