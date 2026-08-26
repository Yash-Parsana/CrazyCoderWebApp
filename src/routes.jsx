import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import ProtectedRoute from './features/auth/ProtectedRoute.jsx';

const Home = lazy(() => import('./features/home/Home.jsx'));
const LeaderBoard = lazy(() => import('./features/leaderboard/LeaderBoard.jsx'));
const SignUpForm = lazy(() => import('./features/auth/SignUpForm.jsx'));
const SignInForm = lazy(() => import('./features/auth/SignInForm.jsx'));
const Logout = lazy(() => import('./features/auth/Logout.jsx'));
const Chat = lazy(() => import('./features/chat/Chat.jsx'));
const Profile = lazy(() => import('./features/profile/Profile.jsx'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/leaderboard',
                element: (
                    <ProtectedRoute>
                        <LeaderBoard />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/chat',
                element: (
                    <ProtectedRoute>
                        <Chat />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/profile',
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/signup',
                element: <SignUpForm />,
            },
            {
                path: '/login',
                element: <SignInForm />,
            },
            {
                path: '/logout',
                element: <Logout />,
            },
        ],
    },
]);

export default router;
