import { Link } from 'react-router-dom';
import Padlock from './Padlock';

function RegisterSuccess() {
    return (
        <div className="border rounded p-4 p-lg-5">
            <h1 className="d-flex align-items-center gap-2">
                <Padlock unlocked size={44} className="text-warning" />
                You're in
            </h1>
            <p className="lead">Your account is ready. Log in and link your Steam library to get started.</p>
            <Link to="/login" className="btn btn-primary btn-lg">Log in</Link>
        </div>
    );
}

export default RegisterSuccess;
