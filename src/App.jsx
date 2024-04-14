import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import { useEffect } from 'react';
import { verifyToken } from './services/jwtService';
import { login } from './store/authSlice';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Chat from './components/Chat';

function App() {
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        async function checkAuth() {
            const jwtToken = localStorage.getItem('jwtToken');
            if (jwtToken) {
                const user = await verifyToken(jwtToken);
                if (user) {
                    dispatch(login(user));
                }
            }
        }
        checkAuth();
    }, []);

    if (location.pathname == '/chat') {
        return (
            <main>
                <Outlet />
            </main>
        );
    } else {
        return (
            <>
                <Header />
                <main>
                    <Outlet />
                </main>
                <Footer />
            </>
        );
    }
}

export default App;
