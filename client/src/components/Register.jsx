import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCsrfToken } from '../services/csrf';

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
        <>
            <h4>Create an account</h4>

            <form onSubmit={handleSubmit}>
                {errors.length > 0 && <ul>
                    {errors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>}

                <div className="form-control">
                    <label htmlFor="email-input">Email: </label>
                    <input type="email" id="email-input" name="email" onChange={handleChange} value={form.email} autoFocus />
                </div>

                <div className="form-control">
                    <label htmlFor="display-name-input">Display name: </label>
                    <input type="text" id="display-name-input" name="displayName" onChange={handleChange} value={form.displayName} />
                </div>

                <div className="form-control">
                    <label htmlFor="password-input">Password: </label>
                    <input type="password" id="password-input" name="password" onChange={handleChange} value={form.password} />
                </div>

                <div className="form-control">
                    <label htmlFor="confirm-password-input">Confirm password: </label>
                    <input type="password" id="confirm-password-input" name="confirmPassword" onChange={handleChange} value={form.confirmPassword} />
                </div>
                    <button type="submit">Register!</button>
            </form>
        </>
    );
}

export default Register;
