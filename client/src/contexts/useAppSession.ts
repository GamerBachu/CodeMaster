import { useContext } from "react";
import AppSessionContext from "./AppSessionContext";
import type { IAppSessionContextProps } from "./interfaces";

function useAppSession(): IAppSessionContextProps {
  const context = useContext(AppSessionContext);
  if (!context) {
    throw new Error("useAppSession must be used within an AppSessionProvider");
  }
  return context;
}
export default useAppSession;
