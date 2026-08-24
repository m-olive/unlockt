import { useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { getCsrfToken } from '../services/csrf';

function Layout() {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleLogout() {
        const token = getCsrfToken();

        await fetch('/api/auth/logout', {
            method: 'POST',
            headers: token ? { 'X-XSRF-TOKEN': token } : {}
        });

        setUser(null);
        navigate('/login');
    }

    return (
        <>
            <nav>
                <Link to="/">Home</Link>
                {user
                    ? <>
                        <span>Signed in as {user.displayName}</span>
                        <button type="button" onClick={handleLogout}>Log out</button>
                      </>
                    : <Link to="/login">Log in</Link>}
            </nav>
            <Outlet />
        </>
    );
}

export default Layout;
