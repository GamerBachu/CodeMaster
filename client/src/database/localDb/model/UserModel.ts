import type { IDBStoreSchema } from "../Interfaces";

export interface UserModel {
  id?: number;
  name: string;

  email: string;
  createdDate: Date;
  updatedDate: Date;

  username: string;
  password: string;
  isActive: boolean;
}

export const User: IDBStoreSchema = {
  name: "users",
  option: { keyPath: "id", autoIncrement: true },
};

export default User;