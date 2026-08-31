import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function Landing() {
    const { user, initialized } = useContext(AuthContext);

    return (
        <>
            <h1>unlockt</h1>
            <p className="lead">Track your game backlog by how hard it actually is. Link your Steam account to import everything you own, rate games and achievements on difficulty, and see which titles the community considers the hardest.</p>

            {initialized && (user
                ? <>
                    <Link to="/library" className="btn btn-primary me-2">Your library</Link>
                    <Link to="/leaderboard" className="btn btn-secondary">Hardest games</Link>
                  </>
                : <>
                    <Link to="/register" className="btn btn-primary me-2">Create an account</Link>
                    <Link to="/leaderboard" className="btn btn-secondary">Hardest games</Link>
                  </>)}
        </>
    );
}

export default Landing;
