import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landing from './Landing';
import Layout from './Layout';
import Login from './Login';
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
                    element: <RegisterSuccess/>
                },
            ]
        }
    ];

    const router = createBrowserRouter(routes);
    return <RouterProvider router={router} />;
}

export default AppRouter;
