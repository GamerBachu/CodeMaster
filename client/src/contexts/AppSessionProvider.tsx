import { useCallback, useMemo, useState, type ReactNode } from "react";
import type { IAppSession } from "./interfaces";
import AppSessionContext from "./AppSessionContext";
import defaultSession from "./defaultSession";
import sessionStorage from "../utils/web/sessionStorage";
import applicationStorage from "../utils/web/applicationStorage";
import { storageKey } from "../constant/index";

const AppSessionProvider = ({ children }: { children: ReactNode; }) => {
  const [info, setInfoState] = useState<IAppSession>(defaultSession);

  const setInfo = useCallback((value: IAppSession | undefined) => {
    const newValue = value ?? defaultSession;
    setInfoState(newValue);
    const tokenStorage = new sessionStorage(storageKey.tokenKey);
    tokenStorage.set(newValue.appToken);

    const themeStorage = new applicationStorage(storageKey.themeKey);
    themeStorage.set(newValue.appTheme);

    return newValue;
  }, []);

  const contextValue = useMemo(() => ({ info, setInfo }), [info, setInfo]);



  return (
    <AppSessionContext.Provider value={contextValue}>
      {children}
    </AppSessionContext.Provider>
  );
};
export default AppSessionProvider;
