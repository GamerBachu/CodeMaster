import config from "./config";
import type IUser from "./modal/IUser";
import { encryptPassword } from "./utils";

const getById = async (user: Partial<IUser>): Promise<IUser | null> => {
  if (!user?.id) return null;

  const userList = await config.loadData<IUser[]>(config.dbTable.USER);
  if (!Array.isArray(userList) || userList.length === 0) return null;

  const result = userList.find((u) => u.id === user.id);
  if (!result) return null;

  return {
    ...result,
    createdAt: result.createdAt ?? new Date(),
    updatedAt: result.updatedAt ?? new Date(),
  };
};

const findByUserName = async (user: Partial<IUser>): Promise<string | null> => {
  if (!user?.username) return null;

  const userList = await config.loadData<IUser[]>(config.dbTable.USER);
  if (!Array.isArray(userList) || userList.length === 0) return null;

  const result = userList.find((u) => u.username === user.username);
  if (!result) return null;

  return result.id;
};

const getByLogin = async (user: Partial<IUser>): Promise<IUser | null> => {
  if (!user?.username) return null;
  if (!user?.password) return null;

  const userList = await config.loadData<IUser[]>(config.dbTable.USER);
  if (!Array.isArray(userList) || userList.length === 0) return null;

  const result = userList.find(
    (u) =>
      u.username === user.username &&
      u.password === encryptPassword(user.password ?? "")
  );
  if (!result) return null;

  return {
    ...result,
    createdAt: result.createdAt ?? new Date(),
    updatedAt: result.updatedAt ?? new Date(),
  };
};

const get = async (): Promise<IUser[] | null> => {
  const result = await config.loadData<IUser[]>(config.dbTable.USER);
  return result;
};

const post = async (user: IUser): Promise<string | null> => {
  const results = (await config.loadData<IUser[]>(config.dbTable.USER)) ?? [];
  user.password = encryptPassword(user.password ?? "");
  results.push(user);
  await config.saveData(config.dbTable.USER, results);
  return user.id;
};

const put = async (user: IUser): Promise<string | null> => {
  const userList = (await config.loadData<IUser[]>(config.dbTable.USER)) ?? [];
  const result = userList.find((f) => f.id === user.id);
  if (result) {
    result.name = user.name;
    result.updatedAt = new Date();
    result.password = user.password;
    result.isActive = user.isActive;
    await config.saveData(config.dbTable.USER, userList);
  }
  return user.id;
};

const remove = async (user: IUser): Promise<string | null> => {
  const userList = (await config.loadData<IUser[]>(config.dbTable.USER)) ?? [];
  const result = userList.find((f) => f.id === user.id);
  if (result) {
    userList.filter((f) => f.id === user.id);
    await config.saveData(config.dbTable.USER, userList);
  }
  return user.id;
};

const tblUser = {
  getById,
  findByUserName,
  getByLogin,
  get,
  post,
  put,
  remove,
};
export default tblUser;
