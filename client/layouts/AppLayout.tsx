"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { AuthorizedProvider, useAuthorized } from "@/contexts/auth";
import { IUser } from "@/models/IUser";
import UnAuthorizedLayout from "./UnAuthorizedLayout";
import AuthorizedLayout from "./AuthorizedLayout";
import { UserConfigProvider } from "@/contexts/config/";
interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <>
      <AuthorizedProvider>
        <UserConfigProvider>
          <CreateLayout>{children}</CreateLayout>
        </UserConfigProvider>
      </AuthorizedProvider>
    </>
  );
};
export default AppLayout;

export const CreateLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [userSession, setUserSession] = useState<IUser | null>(null);

  const { isAuthorized, user } = useAuthorized();

  useEffect(() => {
    if (isAuthorized) setUserSession(user);
    else setUserSession(null);

    return () => {
      setUserSession(null);
    };
  }, [isAuthorized, user]);
  return (
    <>
      {userSession === null ? (
        <UnAuthorizedLayout>{children}</UnAuthorizedLayout>
      ) : (
        <AuthorizedLayout>{children}</AuthorizedLayout>
      )}
    </>
  );
};
