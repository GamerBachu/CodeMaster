import type { IAccount } from "../models/accounts";

export type IAppSession = {
  account: IAccount | undefined;
  isAuthorized: boolean;
  appTheme: string;
  appToken: string;
};

export type IAppSessionContextProps = {
  info: IAppSession;
  setInfo: (value: IAppSession) => IAppSession;
};
