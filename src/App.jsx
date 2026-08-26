import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Loader from './components/Loader';
import { Suspense, useEffect } from 'react';
import { onAuthChanged, getDocumentFromFireStore } from './services/firebaseService';
import { login, logout } from './features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

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
    }, [dispatch]);

    if (location.pathname == '/chat') {
        return (
            <main>
                <Suspense fallback={<Loader />}>
                    <Outlet />
                </Suspense>
            </main>
        );
    } else {
        return (
            <>
                <Header />
                <main>
                    <Suspense fallback={<Loader />}>
                        <Outlet />
                    </Suspense>
                </main>
                <Footer />
            </>
        );
    }
}

export default App;
