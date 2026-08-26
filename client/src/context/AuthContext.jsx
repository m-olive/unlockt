import { createContext } from 'react';

const AuthContext = createContext({
    user: null,
    setUser: () => {},
    initialized: false
});

export default AuthContext;
