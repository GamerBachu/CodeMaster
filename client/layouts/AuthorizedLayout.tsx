import React, { ReactNode } from 'react';

interface AuthorizedLayoutProps {
    children: ReactNode;
}

export const AuthorizedLayout: React.FC<AuthorizedLayoutProps> = ({ children }) => {
    return (<>{children}</>);
};

export default AuthorizedLayout;