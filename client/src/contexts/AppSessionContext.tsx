import { createContext } from "react";
import type { IAppSessionContextProps } from "./interfaces";
import { defaultSession } from ".";

const AppSessionContext = createContext<IAppSessionContextProps>({
  info: defaultSession,
  setInfo: () => defaultSession,
});

export default AppSessionContext;
