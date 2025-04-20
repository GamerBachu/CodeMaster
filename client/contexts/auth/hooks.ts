'use client';
import { useContext } from "react";
import { IAuthorizedContextProps } from "./interfaces";
import { AuthorizedContext } from "./authorizedContext";

export const useAuthorized = (): IAuthorizedContextProps => {
  const context = useContext(AuthorizedContext);
  if (!context) {
    throw new Error("useAuthorized must be used within an AuthorizedProvider");
  }
  return context;
};