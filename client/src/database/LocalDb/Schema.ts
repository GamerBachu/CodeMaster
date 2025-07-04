import type { IDBStoreSchema } from "./Interfaces";
import User from "./Model/UserModel";

export const schema: IDBStoreSchema[] = [User];
export const version = 1;
export const dbName = "CodeMasterDB";
