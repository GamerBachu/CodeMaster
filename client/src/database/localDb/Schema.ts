import type { IDBStoreSchema } from "./Interfaces";
import User from "./model/UserModel";
import ActionStatus from "./model/ActionStatusModel";
import UserPlanner from "./model/UserPlannerModel";

export const schema: IDBStoreSchema[] = [User, ActionStatus, UserPlanner];
export const version = 1;
export const dbName = "CodeMasterDB";
