import type { IAccount, ILogin } from "../models/accounts";

export const login = (account: ILogin): IAccount | null => {
  if (account.password === "" || account.username === "") return null;
  return {
    id: "1",
    username: account.username,
    password: account.password,
    email: "user@example.com",
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  };
};
