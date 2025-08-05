import LocalDb from "./localDb/LocalDb";
import { type UserModel, User } from "./localDb/model/UserModel";
import { type UserTokenModel, UserToken } from "./localDb/model/UserTokenModel";
import { encryptPassword, generateGuid, tokenCreate, tokenValidate } from "./utils";

const findByUserName = async (user: Partial<UserModel>): Promise<string | number | null> => {
  if (!user?.username) return null;

  const db = new LocalDb();
  const data = await db.getAll<UserModel>(User.name);
  const result =
    data.find((u: UserModel) => u.username === user.username) ?? null;
  if (!result) return null;
  return result.id as number;
};

const getByLogOut = async (user: Partial<UserModel>, device: string): Promise<void> => {
 
  if (!user?.username) return;
  if (!user?.password) return;
  await cleanUpToken();

  const db = new LocalDb();
  const data = await db.getAll<UserTokenModel>(UserToken.name);

  const result = data.filter((u: UserTokenModel) => u.username === user.username && u.deviceName === device) ?? null;

  result.forEach((p: UserTokenModel) => {
    if (p.id) db.delete(UserToken.name, p.id);
  });
};

const getByLogin = async (user: Partial<UserModel>, device: string):
  Promise<{ UserModel: UserModel; UserTokenModel: UserTokenModel; } | null> => {
  if (!user?.username) return null;
  if (!user?.password) return null;
  await cleanUpToken();
  const db = new LocalDb();
  const data = await db.getAll<UserModel>(User.name);
  const result = data.find((u: UserModel) =>
    u.username === user.username && u.password === encryptPassword(user.password ?? "")
  ) ?? null;

  if (result === null) return null;

  const sub = tokenCreate(result);
  sub.deviceName = device;
  await db.create(UserToken.name, sub);

  return { UserModel: result, UserTokenModel: sub };
};


const validateToken = async (token: string, device: string):
  Promise<{ UserModel: UserModel; UserTokenModel: UserTokenModel; } | null> => {
  const d = tokenValidate(token);
  await cleanUpToken();
  if (!d) return null;
  d.deviceName = device;
  const db = new LocalDb();

  const data = await db.getAll<UserTokenModel>(UserToken.name);
  const result = data.find((u: UserTokenModel) =>
    u.username === d.username && u.validTil === d.validTil && u.token === d.token && u.deviceName === d.deviceName
  ) ?? null;

  if (result === null) return null;

  const data2 = await db.getAll<UserModel>(User.name);
  const result2 = data2.find((u: UserModel) =>
    u.username === d.username
  ) ?? null;

  if (result2 === null) return null;

  const sub = tokenCreate(result2);
  sub.deviceName = device;
  await db.create(UserToken.name, sub);

  return { UserModel: result2, UserTokenModel: sub };
};

const get = async (user: Partial<UserModel>): Promise<UserModel | null> => {
  if (!user?.id) return null;
  const db = new LocalDb();
  const data = await db.getAll<UserModel>(User.name);
  return data.find((u: UserModel) => u.id === user.id) ?? null;
};

const post = async (user: Partial<UserModel>): Promise<string | number | null> => {
  user.createdDate = new Date().toISOString();
  user.createdBy = 0;
  user.updatedDate = new Date().toISOString();
  user.updatedBy = 0;
  user.deletedDate = new Date().toISOString();
  user.deletedBy = 0;
  user.isActive = true;
  user.password = encryptPassword(user.password ?? "");
  user.guid = generateGuid();
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

  user.updatedDate = new Date().toISOString();

  const data = await db.put(User.name, old);
  return data as number;
};

const remove = async (user: UserModel): Promise<string | number | null> => {
  if (!user?.id) return null;
  const db = new LocalDb();
  await db.delete(User.name, user.id);
  return user.id;
};

const cleanUpToken = async (): Promise<void> => {
  const db = new LocalDb();
  const data = await db.getAll<UserTokenModel>(UserToken.name);

  const result = data.filter((u: UserTokenModel) =>
    new Date(u.validTil) <= new Date()
  ) ?? null;

  result.forEach((p: UserTokenModel) => {
    if (p.id) db.delete(UserToken.name, p.id);
  });
};


const tblUser = {
  findByUserName,
  getByLogin,
  get,
  post,
  put,
  remove,
  validateToken,
  getByLogOut
};
export default tblUser;
