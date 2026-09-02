import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { findAll, findAchievements } from '../services/leaderboard';

function Leaderboard() {
    const [rows, setRows] = useState([]);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [achievements, setAchievements] = useState(null);
    const [achievementErrors, setAchievementErrors] = useState([]);

    useEffect(() => {
        let canceled = false;
        async function load() {
            setLoading(true);
            setErrors([]);

            const result = await findAll();
            if (canceled) {
                return;
            }

            if (result.ok) {
                setRows(result.rows);
            } else {
                setRows([]);
                setErrors(result.errors);
            }

            setLoading(false);
        }

        load();

        return () => {
            canceled = true;
        };
    }, []);

    useEffect(() => {
        let canceled = false;

        async function loadAchievements() {
            setAchievements(null);
            setAchievementErrors([]);

            const result = await findAchievements();
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
        };
    }, []);

    return (
        <div className="row row-cols-1 row-cols-lg-2 g-4">
            <div className="col">
            <h3>Hardest games</h3>
            <p className="text-muted">Ranked by average community difficulty rating.</p>

            {errors.length > 0 && <ul className="text-danger">
                {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>}

            {loading && <p>Loading the leaderboard...</p>}

            {!loading && errors.length === 0 && rows.length === 0 &&
                <p>No games have enough community ratings yet. Check back once more players have rated.</p>}

            {!loading && rows.length > 0 && <ul className="list-unstyled">
                {rows.map((row, i) => <li key={row.gameId} className="d-flex align-items-center gap-3 border rounded p-3 mb-3">
                    <span className="fs-2 text-muted">{i + 1}</span>
                    {row.coverArtUrl && <img src={row.coverArtUrl} alt="" width={160} className="rounded" />}
                    <div>
                        <h5 className="mb-1"><Link to={`/games/${row.gameId}`}>{row.title}</Link></h5>
                        <p className="mb-0">Average difficulty {row.averageDifficulty.toFixed(2)}</p>
                        <p className="mb-0 text-muted">{row.voteCount} {row.voteCount === 1 ? 'rating' : 'ratings'}</p>
                    </div>
                </li>)}
            </ul>}

            </div>

            <div className="col">
            <h3>Hardest achievements</h3>
            <p className="text-muted">Ranked by average community difficulty rating.</p>

            {achievementErrors.length > 0 && <ul className="text-danger">
                {achievementErrors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>}

            {achievements === null && achievementErrors.length === 0 && <p>Loading the achievement leaderboard...</p>}

            {achievements !== null && achievements.length === 0 &&
                <p>No achievements have enough community ratings yet.</p>}

            {achievements !== null && achievements.length > 0 && <ul className="list-unstyled">
                {achievements.map((row, i) => <li key={row.achievementId} className="d-flex align-items-center gap-3 border rounded p-3 mb-3">
                    <span className="fs-4 text-muted">{i + 1}</span>
                    {row.iconUrl && <img src={row.iconUrl} alt="" width={56} className="rounded" />}
                    <div>
                        <h5 className="mb-1">{row.name}</h5>
                        <p className="mb-0">
                            <Link to={`/games/${row.gameId}`}>{row.gameTitle}</Link>
                        </p>
                        <p className="mb-0">
                            Average difficulty {row.averageDifficulty.toFixed(2)}
                            {' '}&middot;{' '}
                            <span className="text-muted">{row.voteCount} {row.voteCount === 1 ? 'rating' : 'ratings'}</span>
                        </p>
                    </div>
                </li>)}
            </ul>}
            </div>
        </div>
    );

}

export default Leaderboard;