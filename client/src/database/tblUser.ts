import { use } from "react";
import LocalDb from "./localDb/LocalDb";
import { type UserModel, User } from "./localDb/model/UserModel";
import { encryptPassword } from "./utils";

const findByUserName = async (user: Partial<UserModel>): Promise<string | number | null> => {
  if (!user?.username) return null;

  const db = new LocalDb();
  const data = await db.getAll<UserModel>(User.name);
  const result =
    data.find((u: UserModel) => u.username === user.username) ?? null;
  if (!result) return null;
  return result.id as number;
};

const getByLogin = async (
  user: Partial<UserModel>
): Promise<UserModel | null> => {
  if (!user?.username) return null;
  if (!user?.password) return null;

  const db = new LocalDb();
  const data = await db.getAll<UserModel>(User.name);
  const result =
    data.find(
      (u: UserModel) =>
        u.username === user.username &&
        u.password === encryptPassword(user.password ?? "")
    ) ?? null;

  return result;
};

const get = async (user: Partial<UserModel>): Promise<UserModel | null> => {
  if (!user?.id) return null;
  const db = new LocalDb();
  const data = await db.getAll<UserModel>(User.name);
  return data.find((u: UserModel) => u.id === user.id) ?? null;
};

const post = async (user: Partial<UserModel>): Promise<string | number | null> => {
  user.createdDate = new Date();
  user.createdBy = 0;
  user.updatedDate = new Date();
  user.updatedBy = 0;
  user.deletedDate = new Date();
  user.deletedBy = 0;
  user.isActive = true;
  user.password = encryptPassword(user.password ?? "");
  const db = new LocalDb();
  const data: IDBValidKey = await db.create(User.name, user);
  return data as number;
};

const put = async (user: Partial<UserModel>): Promise<string | number | null> => {
  if (!user?.id) return null;
  const db = new LocalDb();

  const old = await get(user);
  if (old === null) return null;

  old.name = user.name ?? old.name;
  old.email = user.email ?? old.email;

  user.updatedDate = new Date();

  const data = await db.put(User.name, old);
  return data as number;
};

const remove = async (user: UserModel): Promise<string | number | null> => {
  if (!user?.id) return null;
  const db = new LocalDb();
  await db.delete(User.name, user.id);
  return user.id;
};

const tblUser = {
  findByUserName,
  getByLogin,
  get,
  post,
  put,
  remove,
};
export default tblUser;
