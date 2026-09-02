import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { search } from '../services/games';

function Browse() {
    const [query, setQuery] = useState('');
    const [submitted, setSubmitted] = useState('');
    const [games, setGames] = useState(null);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        let canceled = false;

        async function load() {
            setGames(null);
            setErrors([]);

            const result = await search(submitted);
            if (canceled) {
                return;
            }

            if (result.ok) {
                setGames(result.games);
            } else {
                setErrors(result.errors);
            }
        }

        load();

        return () => {
            canceled = true;
        };
    }, [submitted]);

    function handleSubmit(evt) {
        evt.preventDefault();
        setSubmitted(query.trim());
    }

    return (
        <>
            <h3>Browse games</h3>
            <p className="text-muted">
                {submitted
                    ? <>Results for &ldquo;{submitted}&rdquo;</>
                    : <>A random selection of games people have imported. Search to find a specific one.</>}
            </p>

            <form onSubmit={handleSubmit} className="mb-4">
                <div className="input-group input-group-lg">
                    <input
                        type="text"
                        id="search-input"
                        className="form-control"
                        placeholder="Search by title"
                        value={query}
                        onChange={evt => setQuery(evt.target.value)}
                        autoFocus
                    />
                    <button className="btn btn-primary" type="submit">Search</button>
                </div>
            </form>

            {errors.length > 0 && <ul className="text-danger">
                {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>}

            {games === null && errors.length === 0 && <p>Loading games...</p>}

            {games !== null && games.length === 0 &&
                <p>No games match that title yet. Only games someone has imported from Steam show up here.</p>}

            {games !== null && games.length > 0 && <ul className="list-unstyled row row-cols-1 row-cols-md-2 g-3">
                {games.map(game => <li key={game.gameId} className="col">
                    <div className="border rounded p-3 h-100">
                        {game.coverArtUrl
                            ? <img src={game.coverArtUrl} alt="" className="img-fluid rounded mb-2" />
                            : <span className="text-muted">no cover art available</span>}
                        <h5 className="mb-1"><Link to={`/games/${game.gameId}`}>{game.title}</Link></h5>
                        {game.voteCount > 0
                            ? <p className="mb-0">
                                Average difficulty {game.averageDifficulty.toFixed(2)}
                                {' '}&middot;{' '}
                                <span className="text-muted">{game.voteCount} {game.voteCount === 1 ? 'rating' : 'ratings'}</span>
                              </p>
                            : <p className="mb-0 text-muted">No ratings yet</p>}
                    </div>
                </li>)}
            </ul>}
        </>
    );
}

export default Browse;
