import type { IAccount, ILogin } from "../models/accounts";
import db from "../database/index";

export const login = async (account: ILogin): Promise<IAccount | null> => {
  if (account.password === "" || account.username === "") return null;
  try {
    const res = await db.tblUser.getByLogin({ username: account.username, password: account.password, }, "web");

    if (res) {

      return {
        id: res.UserModel.id,
        name: res.UserModel.name,
        email: res.UserModel.email,
        username: res.UserModel.username,
        password: "******", // Do not return the password
        isActive: res.UserModel.isActive,
        createdDate: res.UserModel.createdDate,
        updatedDate: res.UserModel.updatedDate,
        token: res.UserTokenModel.token,
      };
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

export const createNew = async (account: ILogin): Promise<string | number | null> => {
  if (account.password === "" || account.username === "") return null;
  try {
    const already = await db.tblUser.findByUserName({
      username: account.username,
    });
    if (already) return null;

    const r = await db.tblUser.post({
      name: account.username,
      email: account.username,
      isActive: true,
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
      username: account.username,
      password: account.password,
    });
    return r;
  } catch {
    return null;
  }
};
