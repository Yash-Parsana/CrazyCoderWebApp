import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home.jsx';
import { Provider } from 'react-redux';
import store from './store/store.js';
import LeaderBoard from './pages/LeaderBoard.jsx';
import SignUpForm from './pages/SignUpForm.jsx';
import SignInForm from './pages/SignInForm.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Logout from './pages/Logout.jsx'
import Chat from './components/Chat.jsx';
import Profile from './pages/Profile.jsx';

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

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
