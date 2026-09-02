import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { findAll, findAchievements } from '../services/leaderboard';
import Padlock from './Padlock';

function Landing() {
    const { user, initialized } = useContext(AuthContext);
    const [games, setGames] = useState([]);
    const [achievements, setAchievements] = useState([]);

    useEffect(() => {
        let canceled = false;

        async function load() {
            const [gameResult, achievementResult] = await Promise.all([findAll(), findAchievements()]);
            if (canceled) {
                return;
            }

            if (gameResult.ok) {
                setGames(gameResult.rows);
            }

            if (achievementResult.ok) {
                setAchievements(achievementResult.achievements);
            }
        }

        load();

        return () => {
            canceled = true;
        };
    }, []);

    const hardestGame = games[0];
    const hardestAchievement = achievements[0];

    return (
        <>
            <div className="border rounded p-4 p-lg-5 mb-5">
                <div className="row align-items-center g-4">
                    <div className="col-lg-6">
                        <h1 className="d-flex align-items-center gap-2">
                            <Padlock unlocked size={44} className="text-warning" />
                            unlockt
                        </h1>
                        <p className="lead">Track your backlog by how hard it actually is.</p>
                        <p>
                            Every backlog tracker can tell you what you own. Unlockt tells you what you are in for.
                            Link your Steam account and your whole library imports in one pass, cover art and all.
                            Then rate what you play on two separate axes: how much you liked it, and how hard it was.
                        </p>
                        <p>
                            Difficulty ratings go deeper than the game. Rate individual achievements too, so the
                            hundred-percent run that took you three weeks is recorded as exactly that.
                        </p>

                        {initialized && (user
                            ? <>
                                <Link to="/library" className="btn btn-primary btn-lg me-2">Your library</Link>
                                <Link to="/leaderboard" className="btn btn-secondary btn-lg">Hardest games</Link>
                              </>
                            : <>
                                <Link to="/register" className="btn btn-primary btn-lg me-2">Create an account</Link>
                                <Link to="/browse" className="btn btn-secondary btn-lg">Browse games</Link>
                              </>)}
                    </div>

                    <div className="col-lg-6">
                        <div className="row row-cols-2 g-2">
                            {games.slice(0, 6).map(game => (
                                <div key={game.gameId} className="col">
                                    <Link to={`/games/${game.gameId}`}>
                                        <img src={game.coverArtUrl} alt={game.title} className="img-fluid rounded" />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <h2 className="mb-3">How it works</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
                <div className="col">
                    <div className="border rounded p-3 h-100">
                        <h5>1. Link Steam</h5>
                        <p className="mb-0">
                            Paste your profile URL or vanity name. No password, no permissions to grant, and
                            nothing is ever posted back to your Steam profile.
                        </p>
                    </div>
                </div>
                <div className="col">
                    <div className="border rounded p-3 h-100">
                        <h5>2. Import your library</h5>
                        <p className="mb-0">
                            Every game you own arrives at once with its store art. Re-import whenever you like:
                            games already in your library are skipped, so your ratings and notes are never overwritten.
                        </p>
                    </div>
                </div>
                <div className="col">
                    <div className="border rounded p-3 h-100">
                        <h5>3. Rate the difficulty</h5>
                        <p className="mb-0">
                            Score a game one to five, then open its achievement list and score those individually.
                            Your unlocks and unlock dates come straight from Steam.
                        </p>
                    </div>
                </div>
            </div>

            {(hardestGame || hardestAchievement) && <>
                <h2 className="mb-3">Hardest right now</h2>
                <div className="row row-cols-1 row-cols-md-2 g-4 mb-5">
                    {hardestGame && <div className="col">
                        <div className="d-flex align-items-center gap-3 border rounded p-3 h-100">
                            {hardestGame.coverArtUrl &&
                                <img src={hardestGame.coverArtUrl} alt="" width={160} className="rounded" />}
                            <div>
                                <p className="text-muted mb-1">Hardest game</p>
                                <h5 className="mb-1">
                                    <Link to={`/games/${hardestGame.gameId}`}>{hardestGame.title}</Link>
                                </h5>
                                <p className="mb-0">
                                    {hardestGame.averageDifficulty.toFixed(2)} out of 5 across {hardestGame.voteCount} ratings
                                </p>
                            </div>
                        </div>
                    </div>}

                    {hardestAchievement && <div className="col">
                        <div className="d-flex align-items-center gap-3 border rounded p-3 h-100">
                            {hardestAchievement.iconUrl &&
                                <img src={hardestAchievement.iconUrl} alt="" width={64} className="rounded" />}
                            <div>
                                <p className="text-muted mb-1">Hardest achievement</p>
                                <h5 className="mb-1">{hardestAchievement.name}</h5>
                                <p className="mb-0">
                                    <Link to={`/games/${hardestAchievement.gameId}`}>{hardestAchievement.gameTitle}</Link>
                                    {' '}&middot;{' '}
                                    {hardestAchievement.averageDifficulty.toFixed(2)} out of 5
                                </p>
                            </div>
                        </div>
                    </div>}
                </div>
            </>}

            <h2 className="mb-3">Why two ratings</h2>
            <p className="mb-5">
                A game you loved and a game that broke you are not the same thing, and averaging them together
                loses both. Unlockt keeps overall rating and difficulty completely separate: only difficulty feeds
                the leaderboard, so a hard game does not climb it just by being popular. Games need ratings from
                more than one player before they rank at all.
            </p>
        </>
    );
}

export default Landing;
