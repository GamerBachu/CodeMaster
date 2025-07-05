import type { IDBStoreSchema } from "../Interfaces";

export interface ActionStatusModel {
  id?: number;
  name: string;
  isActive: boolean;
  createdDate: Date;
}

export const ActionStatus: IDBStoreSchema = {
  name: "actionStatus",
  option: { keyPath: "id", autoIncrement: true },
};

export default ActionStatus;
