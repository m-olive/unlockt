import { createContext } from 'react';

export type AuthUser = {
    id: string,
    email: string,
    displayName: string
};

export type AuthContextValue = {
    user: AuthUser | null,
    setUser: (user: AuthUser | null) => void,
    initialized: boolean
};

const AuthContext = createContext<AuthContextValue>({
    user: null,
    setUser: () => {},
    initialized: false
});

export default AuthContext;
