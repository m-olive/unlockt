import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function ProtectedRoute({ children }) {
    const { user, initialized } = useContext(AuthContext);

    if (!initialized) {
        return null;
    }

    if (user === null) {
        return <Navigate to="/login" replace />;
    }

    return (
    <>
        {children}
    </>
    );
}

export default ProtectedRoute;
