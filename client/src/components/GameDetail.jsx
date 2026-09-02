import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { findById } from '../services/games';
import { STATUS_OPTIONS, update } from '../services/library';
import { findByGameId, rate } from '../services/achievements';
import AuthContext from '../context/AuthContext';
import StarRating from './StarRating';
import Padlock from './Padlock';

function GameDetail() {

    const { gameId } = useParams();
    const { user, initialized } = useContext(AuthContext);
    const [form, setForm] = useState(null);
    const [game, setGame] = useState(null);
    const [errors, setErrors] = useState([]);
    const [saveErrors, setSaveErrors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [achievements, setAchievements] = useState(null);
    const [achievementFilter, setAchievementFilter] = useState('ALL');
    const [achievementErrors, setAchievementErrors] = useState([]);


    useEffect(() => {
        let canceled = false;

        async function load() {
            setLoading(true);
            setErrors([]);
            setSaveErrors([]);

            const result = await findById(gameId);
            if (canceled) {
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
            canceled = true;
        };
    }, [gameId]);

    useEffect(() => {
        let canceled = false;

        async function loadAchievements() {
            setAchievements(null);
            setAchievementErrors([]);

            const result = await findByGameId(gameId);
            if (canceled) {
                return;
            }

            if (result.ok) {
                setAchievements(result.achievements);
            } else {
                setAchievementErrors(result.errors);
            }
        }

        loadAchievements();

        return () => {
            canceled = true;
        }
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

    async function handleRate(achievementId, difficultyRating) {
        setAchievementErrors([]);

        const result = await rate(gameId, achievementId, difficultyRating);

        if (result.ok) {
            setAchievements(list => list.map(a =>
                a.achievementId === achievementId ? result.achievement : a));
        } else {
            setAchievementErrors(result.errors);
        }
    }

    const visibleAchievements = achievements === null ? [] : 
             achievements.filter(a => achievementFilter === 'ALL' ||
            (achievementFilter === 'UNLOCKED' ? a.unlocked : !a.unlocked));

    return (
        <>
            {initialized && user &&
                <div className="d-flex justify-content-end mb-3">
                    <Link to="/library">Back to library</Link>
                </div>}

            <div className="row g-4 mb-4">
                <div className="col-md-6">
                    {game.coverArtUrl
                        ? <img src={game.coverArtUrl} alt="" className="img-fluid rounded" />
                        : <span className="text-muted">no cover art available</span>}
                </div>

                <div className="col-md-6">
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
                </div>
            </div>

            {form && <>
                <h5 className="mt-4">Your entry</h5>
                <form onSubmit={handleSubmit} className="mb-4">
                    {saveErrors.length > 0 && <ul className="text-danger">
                        {saveErrors.map((error, i) => <li key={i}>{error}</li>)}
                    </ul>}

                    <div className="mb-3">
                        <label htmlFor="status-input" className="form-label">Status</label>
                        <select id="status-input" className="form-select" value={form.status} onChange={evt => {
                            setForm(f => ({ ...f, status: evt.target.value }))
                        }}>
                            {STATUS_OPTIONS.map(o =>
                            <option key={o.value} value={o.value}>{o.label}</option>
                            )}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label d-block">Your overall rating</label>
                        <StarRating value={form.overallRating} onChange={v => {
                            setForm(f => ({...f, overallRating: v}))
                        }} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label d-block">Your difficulty rating</label>
                        <StarRating value={form.difficultyRating} onChange={v => {
                            setForm(f => ({...f, difficultyRating: v}))
                        }} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="notes-input" className="form-label">Notes</label>
                        <textarea id="notes-input" className="form-control" rows={3} value={form.notes} onChange={evt => {
                            setForm(f => ({ ...f, notes: evt.target.value}))
                        }}/>
                    </div>

                    <button type="submit" className="btn btn-primary">Save</button>
                </form>
            </>}

            <h5 className="mt-4">Achievements</h5>

            {achievementErrors.length > 0 && <ul className="text-danger">
                {achievementErrors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>}

            {achievements === null
                ? achievementErrors.length === 0 && <p>Loading achievements...</p>
                : achievements.length === 0
                    ? <p className="text-muted">This Steam game ships no achievements, so there is nothing to track here.</p>
                    : <>
                        <p className="mb-1">
                            {achievements.filter(a => a.unlocked).length} of {achievements.length} unlocked
                            {initialized && user && <> &middot; you&apos;ve rated {achievements.filter(a => a.difficultyRating !== null).length}</>}
                        </p>

                        <select className="form-select w-auto mb-3" value={achievementFilter} onChange={evt => {
                            setAchievementFilter(evt.target.value)
                        }}>
                            <option value="ALL">All</option>
                            <option value="UNLOCKED">Unlocked</option>
                            <option value="LOCKED">Locked</option>
                        </select>

                        <ul className="list-unstyled row row-cols-1 row-cols-md-2 g-3">
                            {visibleAchievements.map(a => (
                                <li key={a.achievementId} className="col">
                                    <div className="d-flex gap-3 border rounded p-3 h-100">
                                        {a.iconUrl && <img src={a.iconUrl} alt="" width={48} height={48} className="rounded" />}
                                        <div>
                                            <strong>{a.name}</strong>
                                            {a.description && <p className="mb-0 text-muted">{a.description}</p>}
                                            <p className="mb-0 d-flex align-items-center gap-2">
                                                {a.unlocked
                                                    ? <><Padlock unlocked className="text-success" /> Unlocked {new Date(a.unlockedAt).toLocaleDateString()}</>
                                                    : <span className="text-muted"><Padlock /> Locked</span>}
                                            </p>
                                            {initialized && user &&
                                                <StarRating value={a.difficultyRating} onChange={v => {
                                                    handleRate(a.achievementId, v)
                                                }} />}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </>}
        </>
    );
}

export default GameDetail;
