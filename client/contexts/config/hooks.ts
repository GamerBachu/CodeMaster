'use client';
import { useContext } from "react";
import { IUserConfigContextProps } from "./interfaces";
import { UserConfigContext } from "./UserConfigContext";

export const useUserConfig = (): IUserConfigContextProps => {
  const context = useContext(UserConfigContext);
  if (!context) {
    throw new Error("useUserConfig must be used within an UserConfigProvider");
  }
  return context;
};