import { createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import Home from './features/home/Home.jsx';
import LeaderBoard from './features/leaderboard/LeaderBoard.jsx';
import SignUpForm from './features/auth/SignUpForm.jsx';
import SignInForm from './features/auth/SignInForm.jsx';
import ProtectedRoute from './features/auth/ProtectedRoute.jsx';
import Logout from './features/auth/Logout.jsx';
import Chat from './features/chat/Chat.jsx';
import Profile from './features/profile/Profile.jsx';

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
