import type { IDBStoreSchema } from "../Interfaces"; 
import type PrimaryModel from "./PrimaryModel";

export interface UserPlannerModel extends PrimaryModel {
  
  title: string;
  desc: string;
  startDate: Date;
  endDate: Date;
  status: { key: string; value: string; };
}

export const UserPlanner: IDBStoreSchema = {
  name: "userPlanner",
  option: { keyPath: "id", autoIncrement: true },
};

export default UserPlanner;
