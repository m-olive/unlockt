import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCsrfToken } from '../services/csrf';
import Padlock from './Padlock';

function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        displayName: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState([]);

    function handleChange(evt) {
        setForm({ ...form, [evt.target.name]: evt.target.value });
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        setErrors([]);

        if (form.password !== form.confirmPassword) {
            setErrors(['Passwords do not match']);
            return;
        }

        const token = getCsrfToken();
        if (token === undefined) {
            setErrors(['Missing CSRF token']);
            return;
        }

        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': token,
                },
                body: JSON.stringify({
                    email: form.email,
                    displayName: form.displayName,
                    passwordHash: form.password,
                })
            });

            if (response.status === 201) {
                navigate('/register-success');
            } else if (response.status === 400) {
                const body = await response.json().catch(() => null);
                setErrors(Array.isArray(body) ? body : ['Registration failed']);
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
                    <p className="lead">Track your backlog by how hard it actually is.</p>
                    <p className="mb-0">
                        Link your Steam account and your whole library imports in one pass. Rate what you
                        play on two separate axes: how much you liked it, and how hard it was.
                    </p>
                </div>

                <div className="col-lg-6">
                    <h4>Create an account</h4>

                    {errors.length > 0 && <ul className="text-danger">
                        {errors.map((error, i) => <li key={i}>{error}</li>)}
                    </ul>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email-input" className="form-label">Email</label>
                            <input type="email" id="email-input" name="email" className="form-control" onChange={handleChange} value={form.email} autoFocus />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="display-name-input" className="form-label">Display name</label>
                            <input type="text" id="display-name-input" name="displayName" className="form-control" onChange={handleChange} value={form.displayName} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password-input" className="form-label">Password</label>
                            <input type="password" id="password-input" name="password" className="form-control" onChange={handleChange} value={form.password} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="confirm-password-input" className="form-label">Confirm password</label>
                            <input type="password" id="confirm-password-input" name="confirmPassword" className="form-control" onChange={handleChange} value={form.confirmPassword} />
                        </div>

                        <button type="submit" className="btn btn-primary w-100">Create account</button>
                    </form>

                    <div className="d-flex align-items-center gap-2 my-3">
                        <hr className="flex-grow-1" />
                        <span className="text-body-secondary">or</span>
                        <hr className="flex-grow-1" />
                    </div>

                    <div className="d-grid gap-2">
                        <a className="btn btn-outline-primary" href="/oauth2/authorization/github">Continue with GitHub</a>
                        <a className="btn btn-outline-primary" href="/oauth2/authorization/google">Continue with Google</a>
                    </div>

                    <p className="mt-3 mb-0">
                        Already have an account? <Link to="/login">Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
