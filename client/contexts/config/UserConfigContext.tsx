"use client";
import React, { createContext, useState, ReactNode } from "react";
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

  return (
    <UserConfigContext.Provider value={{ userConfig, setUserConfig }}>
 
      {children}
    </UserConfigContext.Provider>
  );
};
