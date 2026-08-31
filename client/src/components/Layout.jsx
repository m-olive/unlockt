import { useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { getCsrfToken } from '../services/csrf';

function Layout() {
    const { user, setUser, initialized } = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleLogout() {
        const token = getCsrfToken();

        await fetch('/api/auth/logout', {
            method: 'POST',
            headers: token ? { 'X-XSRF-TOKEN': token } : {}
        }).catch(() => null);

        setUser(null);
        navigate('/login');
    }

    return (
        <>
            <nav>
                <Link to="/">Home</Link>
                {initialized && (user
                    ? <>
                        <span>{user.displayName}</span>
                        <Link to='/link'>Link Steam Account</Link>
                        <Link to='/library'>Library</Link>
                        <button type="button" onClick={handleLogout}>Log out</button>
                      </>
                    : <>
                        <Link to='/login'>Log in</Link>
                        <Link to='/register'>Register</Link>
                      </>)}
                <Link to="/leaderboard">Game Leaderboard</Link>
            </nav>
            <Outlet />
        </>
    );
}

export default Layout;
