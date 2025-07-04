import type { IDBStoreSchema } from "../Interfaces";

export interface UserModel {
  id: string;
  name: string;

  email: string;
  createdAt: Date;
  updatedAt: Date;

  username: string;
  password: string;
  isActive: boolean;
}

export const User: IDBStoreSchema = {
  name: "users",
  option: { keyPath: "id", autoIncrement: true },
};

export default User;