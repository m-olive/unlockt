import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landing from './Landing';
import Layout from './Layout';
import Login from './Login';

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
            ]
        }
    ];

    const router = createBrowserRouter(routes);
    return <RouterProvider router={router} />;
}

export default AppRouter;
