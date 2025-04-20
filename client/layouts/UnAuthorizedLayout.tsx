import React, { ReactNode } from 'react';
interface UnAuthorizedLayoutProps{
    children:ReactNode;
};

const UnAuthorizedLayout :React.FC<UnAuthorizedLayoutProps>= ({children}) => {
    return<>{children}</>;
};
export default UnAuthorizedLayout;
