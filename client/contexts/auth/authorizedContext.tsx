'use client';
import React, { createContext,  useState, ReactNode } from 'react';
import { IAuthorizedContextProps } from './interfaces';
import { IUser } from '@/models/IUser';

export const AuthorizedContext = createContext<IAuthorizedContextProps | undefined>(undefined);

export const AuthorizedProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthorized, setAuthorized] = useState(false);
    const [user, setUser] = useState<IUser | null>(null);

    return (
        <AuthorizedContext.Provider value={{ isAuthorized, setAuthorized , user, setUser }}>
            {children}
        </AuthorizedContext.Provider>
    );
};