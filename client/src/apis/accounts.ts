import type { IAccount, ILogin } from "../models/accounts";
import db from "../database/index";
import type { UserModel } from "../database/localDb/model/UserModel";
import type { UserTokenModel } from "../database/localDb/model/UserTokenModel";

export const login = async (account: ILogin): Promise<IAccount | null> => {
  if (account.password === "" || account.username === "") return null;
  try {
    const res = await db.tblUser.getByLogin({ username: account.username, password: account.password, }, "web");
    return mapUserResultToAccount(res);
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


export const validate = async (token: string): Promise<IAccount | null> => {
  if (token === "") return null;
  try {
    const res = await db.tblUser.validateToken(token, "web");
    return mapUserResultToAccount(res);
  } catch {
    return null;
  }
};


function mapUserResultToAccount(res: { UserModel: UserModel; UserTokenModel: UserTokenModel; } | null): IAccount | PromiseLike<IAccount | null> | null {
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
}

