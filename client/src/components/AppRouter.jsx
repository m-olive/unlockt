import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GameDetail from './GameDetail';
import Landing from './Landing';
import Layout from './Layout';
import Library from './Library';
import LinkSteam from './LinkSteam';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import RegisterSuccess from './RegisterSuccess';

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
                path: 'login',
                element: <Login />,
            },
            {
                path: 'register',
                element: <Register />,
            },
            {
                path: 'register-success',
                element: <RegisterSuccess />,
            },
            {
                path: 'games/:gameId',
                element: <GameDetail />,
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: 'library',
                        element: <Library />,
                    },
                    {
                        path: 'link',
                        element: <LinkSteam />,
                    },
                ],
            },
        ],
    },
];

const router = createBrowserRouter(routes);

function AppRouter() {
    return <RouterProvider router={router} />;
}

export default AppRouter;
