import type { IDBStoreSchema } from "../Interfaces";
import type PrimaryModel from "./PrimaryModel";

export interface UserModel extends PrimaryModel {
  name: string;
  email: string;
  username: string;
  password: string;
  isActive: boolean;
}

export const User: IDBStoreSchema = {
  name: "users",
  option: { keyPath: "id", autoIncrement: true },
};

export default User;