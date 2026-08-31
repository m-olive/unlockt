import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { link, doImport } from '../services/steam';

function LinkSteam() {
    const [profileInput, setProfileInput] = useState('');
    const [errors, setErrors] = useState([]);
    const [pending, setPending] = useState(false);
    const [summary, setSummary] = useState(null);

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

        const importResult = await doImport();
        if (!importResult.ok) {
            setErrors(importResult.errors);
            setPending(false);
            return;
        }

        setSummary(importResult.summary);
        setPending(false);
    }

    return (
        <>
            <h4>Link your Steam account</h4>
            <p>We'll import the games you own and completed achievements in each one.</p>

            <form onSubmit={handleSubmit}>
                {errors.length > 0 && <ul>
                    {errors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>}

                <div className="form-control">
                    <label htmlFor="profile-input">Steam profile URL or vanity name: </label>
                    <input
                        type="text"
                        id="profile-input"
                        name="profileInput"
                        placeholder="steamcommunity.com/id/yourname"
                        value={profileInput}
                        onChange={(evt) => setProfileInput(evt.target.value)}
                        disabled={pending}
                    />
                    <small>You can use either the full URL or just the name at the end, after the last slash.</small>
                </div>

                <button type="submit" disabled={pending}>
                    {pending ? 'Linking...' : 'Link account'}
                </button>
            </form>

            <section>
                <h5>What gets imported</h5>
                <ul>
                    <li>Every game you own, with cover art</li>
                    <li>Nothing is posted to your Steam profile</li>
                </ul>
                <p>Your Steam profile's Game Details setting has to be public for the import to work. You can set it back afterwards.</p>
            </section>

            {summary && <section>
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
