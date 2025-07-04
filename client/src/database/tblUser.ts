import LocalDb from "./LocalDb/LocalDb";
import { type UserModel, User } from "./LocalDb/Model/UserModel";
import { encryptPassword } from "./utils";

const findByUserName = async (
  user: Partial<UserModel>
): Promise<string | null> => {
  if (!user?.username) return null;

  const db = new LocalDb();
  const data = await db.getAll<UserModel>(User.name);
  const result =
    data.find((u: UserModel) => u.username === user.username) ?? null;
  if (!result) return null;
  return result.id;
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

const post = async (user: UserModel): Promise<string | null> => {
  user.password = encryptPassword(user.password ?? "");
  const db = new LocalDb();
  const data = await db.create(User.name, user);
  console.log("User created:", data);
  return "1";
};

const put = async (user: UserModel): Promise<string | null> => {
  if (!user?.id) return null;
  const db = new LocalDb();
  const data = await db.put(User.name, user);
  console.log("User created:", data);
  return user.id;
};

const remove = async (user: UserModel): Promise<string | null> => {
  if (!user?.id) return null;
  const db = new LocalDb();
  const data = await db.delete(User.name, user.id);
  console.log("User created:", data);
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
