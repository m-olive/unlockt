import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { findById } from '../services/games';
import { STATUS_OPTIONS, update } from '../services/library';
import AuthContext from '../context/AuthContext';
import StarRating from './StarRating';

function GameDetail() {

    const { gameId } = useParams();
    const { user, initialized } = useContext(AuthContext);
    const [form, setForm] = useState(null);
    const [game, setGame] = useState(null);
    const [errors, setErrors] = useState([]);
    const [saveErrors, setSaveErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            setLoading(true);
            setErrors([]);
            setSaveErrors([]);

            const result = await findById(gameId);
            if (cancelled) {
                return;
            }

            if (result.ok) {
                setGame(result.game);
                setForm(result.game.entry === null ? null : {
                    status: result.game.entry.status,
                    overallRating: result.game.entry.overallRating,
                    difficultyRating: result.game.entry.difficultyRating,
                    notes: result.game.entry.notes ?? ''
                });
            } else {
                setGame(null);
                setErrors(result.errors);
            }

            setLoading(false);
        }

        load();

        return () => {
            cancelled = true;
        };
    }, [gameId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (errors.length > 0) {
        return (
            <>
                <ul className="text-danger">
                    {errors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>
                <Link to="/library">Back to library</Link>
            </>
        );
    }

    if (game === null) {
        return null;
    }

    const entry = game.entry;
    const entryId = entry?.id;

    async function handleSubmit(evt) {
        evt.preventDefault();
        setSaveErrors([]);

        const result = await update(entryId, form);

        if (result.ok) {
            const updated = await findById(gameId);
            if (updated.ok) {
                setGame(updated.game);
            } else {
                setSaveErrors(updated.errors);
            }
        } else {
            setSaveErrors(result.errors);
        }
    }

    return (
        <>
            {initialized && user && 
                <Link to="/library">Back to library</Link>}

            {game.coverArtUrl
                ? <img src={game.coverArtUrl} alt="" width={96} />
                : <span className="text-muted">no cover art available</span>}

            <h4>{game.title}</h4>
            <p className="text-muted">
                {game.genre ?? 'Unknown genre'}
                {game.platform && <> &middot; {game.platform}</>}
                {game.owned && <> &middot; <span className="badge text-bg-secondary">Owned</span></>}
            </p>

            <p className="mb-1">
                {game.overallRatingCount > 0
                    ? <>Community overall rating {game.averageOverallRating.toFixed(1)} based on {game.overallRatingCount} {game.overallRatingCount === 1 ? 'rating' : 'ratings'}</>
                    : <span className="text-muted">No community overall rating yet</span>}
            </p>

            <p className="mb-1">
                {game.difficultyRatingCount > 0
                    ? <>Community difficulty rating {game.averageDifficulty.toFixed(1)} based on {game.difficultyRatingCount} {game.difficultyRatingCount === 1 ? 'rating' : 'ratings'}</>
                    : <span className="text-muted">No community difficulty rating yet</span>}
            </p>

            {form && <>
                <h5>Your entry</h5>
                    <form onSubmit={handleSubmit}>
                        {saveErrors.length > 0 && <ul className="text-danger">
                            {saveErrors.map((error, i) => <li key={i}>{error}</li>)}
                        </ul>}

                        <div className="form-control">
                            <label htmlFor="status-input">Status:</label>
                            <select id="status-input" className="mb-1" value={form.status} onChange={evt => {
                                setForm(f => ({ ...f, status: evt.target.value }))
                            }}>
                                {STATUS_OPTIONS.map(o => 
                                <option key={o.value} value={o.value}>{o.label}</option>
                                )}
                            </select>
                        </div>
                        <div className="form-control">
                            <label htmlFor="rating-input">Your overall rating:</label>
                            <StarRating value={form.overallRating} onChange={v => {
                                setForm(f => ({...f, overallRating: v}))
                            }} />
                        </div>
                        <div className="form-control">
                            <label htmlFor="difficulty-input">Your difficulty rating:</label>
                            <StarRating value={form.difficultyRating} onChange={v => {
                                setForm(f => ({...f, difficultyRating: v}))
                            }} />
                        </div>
                        <label htmlFor="notes-input">Notes:</label>
                        <textarea id="notes-input" value={form.notes} className="mb-0" onChange={evt => {
                            setForm(f => ({ ...f, notes: evt.target.value}))
                        }}/>
                        <button type="submit">Save</button>
                    </form>
            </>}
        </>
    );
}

export default GameDetail;
