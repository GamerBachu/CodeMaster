import { useCallback, useMemo, useState, type ReactNode } from "react";
import type { IAppSession } from "./interfaces";
import AppSessionContext from "./AppSessionContext";
import defaultSession from "./defaultSession";

const AppSessionProvider = ({ children }: { children: ReactNode }) => {
  const [info, setInfoState] = useState<IAppSession>(defaultSession);

  const setInfo = useCallback((value: IAppSession | undefined) => {
    const newValue = value ?? defaultSession;
    setInfoState(newValue);
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
