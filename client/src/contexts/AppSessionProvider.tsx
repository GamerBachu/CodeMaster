import React, { useState } from "react";
import type { IAppSession } from "./interfaces";
import AppSessionContext from "./AppSessionContext";
import { defaultSession } from ".";

const AppSessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [info, setInfoState] = useState<IAppSession>(defaultSession);

  const setInfo = React.useCallback((value: IAppSession | undefined) => {
    const newValue = value ?? defaultSession;
    setInfoState(newValue);
    return newValue;
  }, []);

  const contextValue = React.useMemo(
    () => ({ info, setInfo }),
    [info, setInfo]
  );

  return (
    <AppSessionContext.Provider value={contextValue}>
      {children}
    </AppSessionContext.Provider>
  );
};
export default AppSessionProvider;
