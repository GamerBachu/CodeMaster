import type { IAccount, ILogin } from "../models/accounts";
import db from "../database";

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
      };
    } else {
      return null;
    }
  } catch {
    return null;
  }
};
