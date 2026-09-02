import { useContext, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { link, doImport } from '../services/steam';
import AuthContext from '../context/AuthContext';
import steamLogo from '../assets/steam.png';

function LinkSteam() {
    const { user, setUser } = useContext(AuthContext);
    const [profileInput, setProfileInput] = useState('');
    const [errors, setErrors] = useState([]);
    const [pending, setPending] = useState(false);
    const [summary, setSummary] = useState(null);
    const [relinking, setRelinking] = useState(false);

    const linked = Boolean(user?.steamId64);

    async function refreshUser() {
        const response = await fetch('/api/auth/me').catch(() => null);
        if (response && response.status === 200) {
            const payload = await response.json().catch(() => null);
            if (payload !== null) {
                setUser(payload);
            }
        }
    }

    async function runImport() {
        const importResult = await doImport();
        if (!importResult.ok) {
            setErrors(importResult.errors);
            setPending(false);
            return;
        }

        setSummary(importResult.summary);
        await refreshUser();
        setPending(false);
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        setErrors([]);
        setSummary(null);
        setPending(true);

        const linkResult = await link(profileInput);
        if (!linkResult.ok) {
            setErrors(linkResult.errors);
            setPending(false);
            return;
        }

        setRelinking(false);
        await runImport();
    }

    async function handleUpdate() {
        setErrors([]);
        setSummary(null);
        setPending(true);

        await runImport();
    }

    async function handlePaste() {
        try {
            const text = await navigator.clipboard.readText();
            setProfileInput(text.trim());
        } catch {
            setErrors(['Your browser blocked clipboard access. Paste with Ctrl+V instead.']);
        }
    }

    return (
        <>
            <img src={steamLogo} alt="Steam" className="invert-on-dark mb-3" style={{ maxWidth: 240 }} />

            <h4>Link your Steam account</h4>
            <p>We'll import the games you own and completed achievements in each one.</p>

            {errors.length > 0 && <ul className="text-danger">
                {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>}

            {linked && <p>
                Linked to Steam ID <strong>{user.steamId64}</strong>
                {user.lastSyncedAt && <> &middot; last import {new Date(user.lastSyncedAt).toLocaleString()}</>}
            </p>}

            {linked && !relinking && <div className="d-flex gap-2 mb-4">
                <button className="btn btn-primary" type="button" onClick={handleUpdate} disabled={pending}>
                    {pending ? 'Updating...' : 'Update my library'}
                </button>
                <button className="btn btn-outline-warning" type="button" onClick={() => setRelinking(true)} disabled={pending}>
                    Link a different account
                </button>
            </div>}

            {(!linked || relinking) && <form onSubmit={handleSubmit} className="mb-4">
                <label htmlFor="profile-input" className="form-label">Steam profile URL or vanity name</label>
                <div className="input-group input-group-lg">
                    <input
                        type="text"
                        id="profile-input"
                        name="profileInput"
                        className="form-control"
                        placeholder="steamcommunity.com/id/yourname"
                        value={profileInput}
                        onChange={(evt) => setProfileInput(evt.target.value)}
                        disabled={pending}
                        autoFocus
                    />
                    {navigator.clipboard && <button className="btn btn-outline-secondary" type="button" onClick={handlePaste} disabled={pending}>
                        Paste
                    </button>}
                </div>
                <div className="form-text mb-3">You can use either the full URL or just the name at the end, after the last slash.</div>

                <button className="btn btn-primary" type="submit" disabled={pending}>
                    {pending ? 'Linking...' : 'Link account'}
                </button>
                {relinking && <button className="btn btn-link" type="button" onClick={() => setRelinking(false)} disabled={pending}>
                    Cancel
                </button>}
            </form>}

            <section>
                <h5>What gets imported</h5>
                <ul>
                    <li>Every game you own, with cover art</li>
                    <li>Nothing is posted to your Steam profile</li>
                </ul>
                <p>Your Steam profile's Game Details setting has to be public for the import to work. You can set it back afterwards.</p>
            </section>


            {summary && <section className="mt-4">
                <h5>Import complete</h5>
                <ul>
                    <li>{summary.gamesAdded} added to your library</li>
                    <li>{summary.alreadyInLibrary} already in your library</li>
                    <li>{summary.steamTotal} owned on Steam</li>
                </ul>
                <RouterLink to="/library">Go to your library</RouterLink>
            </section>}
        </>
    );
}

export default LinkSteam;
