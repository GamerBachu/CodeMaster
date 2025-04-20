import { IUserConfig } from "@/models/IUserConfig";
export interface IUserConfigContextProps {
  userConfig: IUserConfig;
  setUserConfig: (val: IUserConfig) => void;
}
