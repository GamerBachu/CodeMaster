import type { IDBStoreSchema } from "../Interfaces";
import type PrimaryModel from "./PrimaryModel";

export interface PlannerModel extends Partial<PrimaryModel> {
  title: string;
  desc: string;
  startDate: string;
  endDate: string;
  status: { key: string; value: string; };
}

export const UserPlanner: IDBStoreSchema = {
  name: "userPlanner",
  option: { keyPath: "id", autoIncrement: true },
};

export default UserPlanner;
