import { Link } from 'react-router-dom';

function RegisterSuccess() {
    return (
        <>
        <h1>Registration successful!</h1>
        <Link to='/login'>Login</Link>
        </>
    )
}

export default RegisterSuccess;