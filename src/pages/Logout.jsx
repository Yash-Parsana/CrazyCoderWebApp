import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { signOutUser } from '../services/firebaseService';

function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        async function doLogout() {
            await signOutUser();
            dispatch(logout());
            navigate('/');
        }
        doLogout();
    },[])

    return null;
}

export default Logout