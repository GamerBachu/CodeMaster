import type { IAppSession } from "./interfaces";
const defaultSession: IAppSession = {
  account: undefined,
  isAuthorized: false,
  appTheme: "light",
  appToken: "",
};
export default defaultSession;
