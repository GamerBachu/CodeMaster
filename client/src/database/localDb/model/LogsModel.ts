import type { IDBStoreSchema } from "../Interfaces";
import type PrimaryModel from "./PrimaryModel";

export interface AppLogModel extends PrimaryModel {
    type: string;
    pageName: string;
    functionName: string;
    lineNumber: string;
    timestamp: string;
    message: string;
    stackTrace: string;
}

export const AppLogSchema: IDBStoreSchema = {
    name: "appLog",
    option: { keyPath: "id", autoIncrement: true },
};

export default AppLogSchema;

export type AppLogType = 'Error' | 'Warning' | 'Info' | 'Debug';
export const AppLogTypes: AppLogType[] = ['Error', 'Warning', 'Info', 'Debug'];