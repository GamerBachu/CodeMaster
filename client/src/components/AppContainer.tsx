import React, { type ReactNode } from "react";

interface AppContainerProps {
  children: ReactNode;
}

const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
  return <div className="wrapper-body">{children}</div>;
};

export default AppContainer;
