export interface IDBStoreSchema {
  name: string;
  option: {
    keyPath?: string;
    autoIncrement?: boolean;
    indexes?: {
      name: string;
      keyPath: string | string[];
      options?: IDBIndexParameters;
    }[];
  };
}