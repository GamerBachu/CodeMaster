import type { IDBStoreSchema } from "../Interfaces";

export interface ActionStatusModel {
  id?: number;
  name: string;
  isActive: boolean;
  createdDate: string;
}

export const ActionStatus: IDBStoreSchema = {
  name: "actionStatus",
  option: { keyPath: "id", autoIncrement: true },
};

export default ActionStatus;
