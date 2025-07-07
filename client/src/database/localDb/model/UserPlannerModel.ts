import type { IDBStoreSchema } from "../Interfaces"; 

export interface UserPlannerModel {
  id?: number;
  title: string;
  desc: string;
  startDate: Date;
  endDate: Date;
  status: { key: string; value: string; };
  createdDate: Date;
  isActive: boolean;
}

export const UserPlanner: IDBStoreSchema = {
  name: "userPlanner",
  option: { keyPath: "id", autoIncrement: true },
};

export default UserPlanner;
