import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { getCsrfToken } from '../services/csrf';
import Padlock from './Padlock';

function Login() {
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState([]);

    function handleChange(evt) {
        setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        setErrors([]);

        const token = getCsrfToken();
        if (token === undefined) {
            setErrors(['Missing CSRF token']);
            return;
        }

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': token,
                },
                body: JSON.stringify(credentials)
            });

            if (response.status === 200) {
                const payload = await response.json().catch(() => null);
                if (payload === null) {
                    setErrors(['Error']);
                    return;
                }
                setUser(payload);
                navigate('/');
            } else if (response.status === 401) {
                setErrors(['Login failed']);
            } else if (response.status === 403) {
                setErrors(['CSRF rejected']);
            } else {
                setErrors(['Error']);
            }
        } catch {
            setErrors(['Could not reach the server. Please try again.']);
        }
    }

    return (
        <div className="border rounded p-4 p-lg-5">
            <div className="row align-items-center g-4">
                <div className="col-lg-6">
                    <h1 className="d-flex align-items-center gap-2">
                        <Padlock unlocked size={44} className="text-warning" />
                        unlockt
                    </h1>
                    <p className="lead mb-0">Welcome back. Your library is where you left it.</p>
                </div>

                <div className="col-lg-6">
                    <h4>Log into your account</h4>

                    {errors.length > 0 && <ul className="text-danger">
                        {errors.map((error, i) => <li key={i}>{error}</li>)}
                    </ul>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email-input" className="form-label">Email</label>
                            <input type="email" id="email-input" name="email" className="form-control" onChange={handleChange} value={credentials.email} autoFocus />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password-input" className="form-label">Password</label>
                            <input type="password" id="password-input" name="password" className="form-control" onChange={handleChange} value={credentials.password} />
                        </div>

                        <button type="submit" className="btn btn-primary w-100">Log in</button>
                    </form>

                    <p className="mt-3 mb-0">
                        Need an account? <Link to="/register">Create one</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
