import type { IAccount, ILogin } from "../models/accounts";
import db from "../database";
import { generateGuid } from "../utils/helper/guid";

export const login = async (account: ILogin): Promise<IAccount | null> => {
  if (account.password === "" || account.username === "") return null;
  try {
    const r = await db.tblUser.getByLogin({
      username: account.username,
      password: account.password,
    });
    if (r) {
      return {
        id: r.id,
        name: r.name,
        email: r.email,
        username: r.username,
        password: "******", // Do not return the password
        isActive: r.isActive,
        createdAt: r.createdAt ?? new Date(),
        updatedAt: r.updatedAt ?? new Date(),
        token: generateGuid(),
      };
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

export const createNew = async (account: ILogin): Promise<string | null> => {
  if (account.password === "" || account.username === "") return null;
  try {
    const already = await db.tblUser.findByUserName({
      username: account.username,
    });
    if (already) return null;

    const r = await db.tblUser.post({
      id: generateGuid(),
      name: account.username,
      email: account.username,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      username: account.username,
      password: account.password,
    });
    return r;
  } catch {
    return null;
  }
};
