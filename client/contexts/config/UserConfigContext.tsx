"use client";
import React, { createContext, useState, ReactNode, useEffect } from "react";
import { IUserConfigContextProps } from "./interfaces";
import { IUserConfig } from "@/models/IUserConfig";
import { defaultConfig } from "./constants";

export const UserConfigContext = createContext<
  IUserConfigContextProps | undefined
>(undefined);

export const UserConfigProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userConfig, setUserConfig] = useState<IUserConfig>(defaultConfig);

  useEffect(() => {
    const theme = userConfig.theme;
    document.documentElement.setAttribute("data-bs-theme", theme);
    return () => {
      document.documentElement.removeAttribute("data-bs-theme");
    };
  }, [userConfig]);

  return (
    <UserConfigContext.Provider value={{ userConfig, setUserConfig }}>
      {children}
    </UserConfigContext.Provider>
  );
};
