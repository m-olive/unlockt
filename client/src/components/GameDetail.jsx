import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { findById } from '../services/games';
import { STATUS_OPTIONS } from '../services/library';
import AuthContext from '../context/AuthContext';


function statusLabel(value) {
    return STATUS_OPTIONS.find(o => o.value === value)?.label ?? value;
}

function GameDetail() {
    const { gameId } = useParams();
    const { user, initialized } = useContext(AuthContext);
    const [game, setGame] = useState(null);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            setLoading(true);
            setErrors([]);

            const result = await findById(gameId);
            if (cancelled) {
                return;
            }

            if (result.ok) {
                setGame(result.game);
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

    return (
        <>
            {initialized && user && <Link to="/library">Back to library</Link>}

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
                {game.ratingCount > 0
                    ? <>Community average {game.averageDifficulty.toFixed(1)} from {game.ratingCount} {game.ratingCount === 1 ? 'rating' : 'ratings'}</>
                    : <span className="text-muted">Not yet rated by the community</span>}
            </p>

            {entry && <>
                <h5>Your entry</h5>
                <p className="mb-1">Status: {statusLabel(entry.status)}</p>
                <p className="mb-1">Your rating: {entry.overallRating ?? 'not rated'}</p>
                <p className="mb-1">Overall difficulty: {entry.difficultyRating ?? 'not rated'}</p>
                <p className="mb-0">Notes: {entry.notes ?? <span className="text-muted">none</span>}</p>
            </>}
        </>
    );
}

export default GameDetail;
