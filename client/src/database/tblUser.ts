import config from "./config";

interface IUser {
  id: string;
  name: string;

  email: string;
  createdAt?: Date;
  updatedAt?: Date;

  username: string;
  password: string;
  isActive: boolean;
}

const getById = async (user: IUser): Promise<IUser | null> => {
  if (!user?.id) return null;

  const userList = await config.loadData<IUser[]>(config.dbTable.USER);
  if (!Array.isArray(userList) || userList.length === 0) return null;

  const data = userList.find((u) => u.id === user.id);
  if (!data) return null;

  return {
    ...data,
    createdAt: data.createdAt ?? new Date(),
    updatedAt: data.updatedAt ?? new Date(),
  };
};

const getByUserName = async (user: IUser): Promise<IUser | null> => {
  if (!user?.username) return null;

  const userList = await config.loadData<IUser[]>(config.dbTable.USER);
  if (!Array.isArray(userList) || userList.length === 0) return null;

  const data = userList.find((u) => u.username === user.username);
  if (!data) return null;

  return {
    ...data,
    createdAt: data.createdAt ?? new Date(),
    updatedAt: data.updatedAt ?? new Date(),
  };
};

const get = async (): Promise<IUser[] | null> => {
  const userList = await config.loadData<IUser[]>(config.dbTable.USER);
  return userList;
};

const set = async (user: IUser): Promise<void> => {
  await config.saveData(config.dbTable.USER, user);
};

const tblUser = {
  getById,
  getByUserName,
  get,
  set,
};
export default tblUser;
