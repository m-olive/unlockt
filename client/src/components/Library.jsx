import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { findAll, STATUS_OPTIONS, doDelete } from '../services/library';

const SORT_OPTIONS = [
    { value: 'title', label: 'Title' },
    { value: 'added', label: 'Recently added' },
    { value: 'difficulty', label: 'Difficulty' },
    { value: 'rating', label: 'Rating' },
];

const INITIAL_FILTERS = {
    status: '',
    genre: '',
    platform: '',
    sort: 'title',
};

function distinct(values) {
    return [...new Set(values.filter(v => v !== null && v !== ''))].sort();
}

function formatDate(value) {
    const dateTime = new Date(value);
    return Number.isNaN(dateTime.getTime()) ? value : dateTime.toLocaleDateString();
}

function Library() {
    const navigate = useNavigate();

    const [entries, setEntries] = useState([]);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState(INITIAL_FILTERS);
    const [genres, setGenres] = useState([]);
    const [platforms, setPlatforms] = useState([]);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            setLoading(true);
            setErrors([]);

            const result = await findAll(filters);
            if (cancelled) {
                return;
            }

            if (result.ok) {
                setEntries(result.entries);
                setGenres(g => g.length > 0 ? g : distinct(result.entries.map(e => e.genre)));
                setPlatforms(p => p.length > 0 ? p: distinct(result.entries.map(e => e.platform)));
            } else if (result.status === 401) {
                navigate('/login');
                return;
            } else {
                setEntries([]);
                setErrors(result.errors);
            }

            setLoading(false);
        }

        load();

        return () => {
            cancelled = true;
        };
    }, [filters, navigate]);

    function handleFilterChange(evt) {
        const { name, value } = evt.target;
        setFilters(v => ({ ...v, [name]: value }));
    }

    function handleReset() {
        setFilters(INITIAL_FILTERS);
    }

    async function handleDelete(entryId) {
        setErrors([]);
        const response = await doDelete(entryId);
        if(response.ok) {
            setEntries(en => en.filter(e => e.id !== entryId))
        } else {
            setErrors(response.errors);
        }
    }

    const filtered = filters.status !== '' || filters.genre !== '' || filters.platform !== '';

    return (
        <>
            <h4>Your library</h4>
            <p className="text-muted">{entries.length} {entries.length === 1 ? 'game' : 'games'}</p>

            {errors.length > 0 && <ul className="text-danger">
                {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>}

            <div className="row g-2 mb-3">
                <div className="col-auto">
                    <label htmlFor="status-filter" className="form-label">Status</label>
                    <select id="status-filter" name="status" className="form-select"
                            value={filters.status} onChange={handleFilterChange}>
                        <option value="">All</option>
                        {STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                </div>

                <div className="col-auto">
                    <label htmlFor="genre-filter" className="form-label">Genre</label>
                    <select id="genre-filter" name="genre" className="form-select"
                            value={filters.genre} onChange={handleFilterChange}>
                        <option value="">All</option>
                        {genres.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                </div>

                <div className="col-auto">
                    <label htmlFor="platform-filter" className="form-label">Platform</label>
                    <select id="platform-filter" name="platform" className="form-select"
                            value={filters.platform} onChange={handleFilterChange}>
                        <option value="">All</option>
                        {platforms.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                </div>

                <div className="col-auto">
                    <label htmlFor="sort-filter" className="form-label">Sort</label>
                    <select id="sort-filter" name="sort" className="form-select"
                            value={filters.sort} onChange={handleFilterChange}>
                        {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                </div>
            </div>

            {loading && <p>Loading your library...</p>}

            {!loading && errors.length === 0 && entries.length === 0 && (filtered
                ? <>
                    <p>No games found that match these filters.</p>
                    <button type="button" className="btn btn-secondary" onClick={handleReset}>Clear filters</button>
                  </>
                : <p>Your library is empty. Add a game to get started.</p>)}

            {!loading && entries.length > 0 && <ul className="list-unstyled">
                {entries.map(entry => <li key={entry.id} className="border rounded p-2 mb-2">
                    {entry.coverArtUrl
                        ? <img src={entry.coverArtUrl} alt="" width={64} />
                        : <span className="text-muted">no cover art available</span>}
                    <h5><Link to={`/games/${entry.gameId}`}>{entry.title}</Link></h5>
                    <p className="mb-1 text-muted">
                        {entry.status}
                        {entry.platform && <> &middot; {entry.platform}</>}
                        {entry.genre && <> &middot; {entry.genre}</>}
                    </p>
                    <p className="mb-1">
                        Your difficulty: {entry.difficultyRating ?? 'not rated'}
                        {' '}&middot;{' '}
                        Your rating: {entry.overallRating ?? 'not rated'}
                    </p>
                    <p className="mb-0 text-muted">Added {formatDate(entry.addedAt)}</p>
                    <button type="button" onClick={() => handleDelete(entry.id)}>Delete</button>
                </li>)}
            </ul>}
        </>
    );
}

export default Library;
