import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landing from './Landing';
import Layout from './Layout';
import Library from './Library';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import RegisterSuccess from './RegisterSuccess';

function AppRouter() {
    const routes = [
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    path: '/',
                    element: <Landing />,
                },
                {
                    path: '/login',
                    element: <Login />,
                },
                {
                    path: '/register',
                    element: <Register />,
                },
                {
                    path: '/register-success',
                    element: <RegisterSuccess/>,
                },
                {
                    path: '/library',
                    element: <ProtectedRoute><Library /></ProtectedRoute>,
                },
            ]
        }
    ];

    const router = createBrowserRouter(routes);
    return <RouterProvider router={router} />;
}

export default AppRouter;
