import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import AuthContext, { type AuthUser } from './AuthContext';

function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [initialized, setInitialized] = useState(false);

    // The session cookie survives a page refresh, but React state doesn't.
    // Ask the server who we are on mount so a reload doesn't look like a logout.
    useEffect(() => {
        async function loadUser() {
            try {
                const response = await fetch('/api/auth/me');
                if (response.status === 200) {
                    const payload = await response.json().catch(() => null);
                    if (payload !== null) {
                        setUser(payload);
                    }
                }
            } catch {
                setUser(null);
            } finally {
                setInitialized(true);
            }
        }

        loadUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, initialized }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
