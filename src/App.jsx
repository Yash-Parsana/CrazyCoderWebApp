import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import { useEffect } from 'react';
import { onAuthChanged, getDocumentFromFireStore } from './services/firebaseService';
import { login, logout } from './store/authSlice';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Chat from './components/Chat';

function App() {
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        const unsubscribe = onAuthChanged(async (firebaseUser) => {
            if (!firebaseUser) {
                dispatch(logout());
                return;
            }
            const userDoc = await getDocumentFromFireStore('users', firebaseUser.uid);
            if (userDoc) {
                dispatch(login({ email: userDoc.email, uid: firebaseUser.uid, username: userDoc.username }));
            }
        });
        return () => unsubscribe();
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
