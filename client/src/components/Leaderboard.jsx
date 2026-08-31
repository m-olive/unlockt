import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { findAll } from '../services/leaderboard';

function Leaderboard() {
    const [rows, setRows] = useState([]);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <>
            <h4>Hardest games</h4>
            <p className="text-muted">Ranked by average community difficulty rating.</p>

            {errors.length > 0 && <ul className="text-danger">
                {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>}

            {loading && <p>Loading the leaderboard...</p>}

            {!loading && errors.length === 0 && rows.length === 0 &&
                <p>No games have enough community ratings yet. Check back once more players have rated.</p>}

            {!loading && rows.length > 0 && <table className="table align-middle">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Game</th>
                        <th scope="col">Average difficulty</th>
                        <th scope="col">Ratings</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, i) => <tr key={row.gameId}>
                        <td className="text-muted">{i + 1}</td>
                        <td>
                            {row.coverArtUrl && <img src={row.coverArtUrl} alt="" width="52" className="me-2" />}
                            <Link to={`/games/${row.gameId}`}>{row.title}</Link>
                        </td>
                        <td>{row.averageDifficulty.toFixed(2)}</td>
                        <td className="text-muted">{row.voteCount}</td>
                    </tr>)}
                </tbody>
            </table>}
        </>
    );

}

export default Leaderboard;