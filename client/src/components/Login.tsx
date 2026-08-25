import type { ChangeEvent, FormEvent } from 'react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { getCsrfToken } from '../services/csrf';

function Login() {
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState<string[]>([]);

    function handleChange(evt: ChangeEvent<HTMLInputElement>) {
        setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    }

    async function handleSubmit(evt: FormEvent<HTMLFormElement>) {
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
        <>
            <h4>Log into your account</h4>

            <form onSubmit={handleSubmit}>
                {errors.length > 0 && <ul>
                    {errors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>}

                <div className="form-control">
                    <label htmlFor="email-input">Email: </label>
                    <input type="email" id="email-input" name="email" onChange={handleChange} value={credentials.email} />
                </div>

                <div className="form-control">
                    <label htmlFor="password-input">Password: </label>
                    <input type="password" id="password-input" name="password" onChange={handleChange} value={credentials.password} />
                </div>
                    <button type="submit">Log in!</button>
            </form>
        </>
    );
}

export default Login;
