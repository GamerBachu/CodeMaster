import type { IDBStoreSchema } from "../Interfaces";
import type { ActionStatusModel } from "./ActionStatusModel";

export interface UserPlannerModel {
  id?: number;
  title: string;
  desc: string;
  startDate: Date;
  endDate: Date;
  status: { key: string; value: string; } | ActionStatusModel;
  createdDate: Date;
  isActive: boolean;
}

export const UserPlanner: IDBStoreSchema = {
  name: "userPlanner",
  option: { keyPath: "id", autoIncrement: true },
};

export default UserPlanner;
