import AppSessionProvider from "./AppSessionProvider";
import type { IAppSession } from "./interfaces";
import useAppSession from "./useAppSession";

const defaultSession: IAppSession = {
  account: undefined,
  isAuthorized: false,
  appTheme: "light",
  appToken: "",
};

export { defaultSession, AppSessionProvider, useAppSession };
