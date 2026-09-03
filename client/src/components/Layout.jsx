import { useContext, useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { getCsrfToken } from '../services/csrf';
import Padlock from './Padlock';
import ThemeIcon from './ThemeIcon';
import Avatar from './Avatar';
import { PRESET_AVATARS, updateAvatar } from '../services/users';

function readStoredTheme() {
    try {
        return localStorage.getItem('theme') === 'light' ? 'light' : 'dark';
    } catch {
        return 'dark';
    }
}

function Layout() {
    const { user, setUser, initialized } = useContext(AuthContext);
    const navigate = useNavigate();
    const [theme, setTheme] = useState(readStoredTheme);

    useEffect(() => {
        document.documentElement.setAttribute('data-bs-theme', theme);

        try {
            localStorage.setItem('theme', theme);
        } catch {
            return;
        }
    }, [theme]);

    const [avatarErrors, setAvatarErrors] = useState([]);

    async function handleAvatar(avatar) {
        setAvatarErrors([]);

        const result = await updateAvatar(avatar);

        if (result.ok) {
            setUser(u => ({ ...u, ...result.avatar }));
        } else {
            setAvatarErrors(result.errors);
        }
    }

    function toggleTheme() {
        setTheme(t => t === 'dark' ? 'light' : 'dark');
    }

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
            <nav className="navbar navbar-expand bg-dark border-bottom mb-4" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-3 d-flex align-items-center gap-2" to="/">
                        <Padlock unlocked size={32} className="text-warning" />
                        unlockt
                    </Link>

                    <ul className="navbar-nav me-auto ms-5">
                        <li><Link className="nav-link" to="/browse">Browse games</Link></li>
                        <li><Link className="nav-link" to="/leaderboard">Leaderboard</Link></li>
                        {initialized && user && <>
                            <li><Link className="nav-link" to="/library">Library</Link></li>
                            <li><Link className="nav-link" to="/link">Link Steam</Link></li>
                        </>}
                    </ul>

                    <ul className="navbar-nav align-items-center gap-2">
                        {initialized && (user
                            ? <>
                                <li className="navbar-text">{user.displayName}</li>
                                <li className="dropdown">
                                    <button className="btn p-0" type="button"
                                        data-bs-toggle="dropdown" aria-expanded="false" aria-label="Account menu">
                                        <Avatar user={user} />
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li>
                                            <button className="dropdown-item d-flex align-items-center gap-2" type="button" onClick={toggleTheme}>
                                                <ThemeIcon dark={theme === 'light'} />
                                                {theme === 'light' ? 'Dark mode' : 'Light mode'}
                                            </button>
                                        </li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><h6 className="dropdown-header">Profile picture</h6></li>

                                        {avatarErrors.length > 0 && <li>
                                            <span className="dropdown-item-text text-danger">{avatarErrors[0]}</span>
                                        </li>}

                                        <li className="d-flex gap-1 px-3 py-1">
                                            {Object.entries(PRESET_AVATARS).map(([key, emoji]) => (
                                                <button key={key} className="btn btn-sm p-1" type="button"
                                                    aria-label={key} onClick={() => handleAvatar(key)}>
                                                    {emoji}
                                                </button>
                                            ))}
                                        </li>

                                        <li>
                                            <button className="dropdown-item d-flex align-items-center gap-2" type="button" onClick={() => handleAvatar('STEAM')}>
                                                {user.steamAvatarUrl
                                                    ? <img src={user.steamAvatarUrl} alt="" className="rounded-circle" style={{ width: 24, height: 24 }} />
                                                    : <Padlock unlocked size={24} />}
                                                Use Steam profile picture
                                            </button>
                                        </li>

                                        <li>
                                            <button className="dropdown-item" type="button" onClick={() => handleAvatar(null)}>
                                                Use my initial
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <button className="btn btn-outline-light btn-sm" type="button" onClick={handleLogout}>Log out</button>
                                </li>
                              </>
                            : <>
                                <li><Link className="nav-link" to="/login">Log in</Link></li>
                                <li><Link className="btn btn-warning btn-sm" to="/register">Register</Link></li>
                              </>)}
                    </ul>
                </div>
            </nav>
            <main className="container">
                <Outlet />
            </main>
        </>
    );
}

export default Layout;
