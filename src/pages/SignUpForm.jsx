import Form from '../components/Form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    signUpWithEmailAndPass,
    setDocumentInFirestore,
    isUsernameExist,
    signInWithGoogle,
} from '../services/firebaseService';
import { login } from '../store/authSlice';

function SignUpForm() {
    const fields = [
        {
            label: 'Username',
            type: 'text',
            placeholder: 'Username should not include space',
            field: 'username',
        },
        {
            label: 'Email',
            type: 'email',
            placeholder: 'crazy@coder.com',
            field: 'email',
        },
        {
            label: 'Password',
            type: 'password',
            placeholder: '',
            field: 'password',
        },
        {
            label: 'Confirm Password',
            type: 'text',
            placeholder: '',
            field: 'cpassword',
        },
    ];
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleForm = async (data) => {
        const { email, password, username } = data;
        if (!email || !password || !username) {
            throw new Error('Ivalid Email, username');
        }
        const isUsernameAvailable = !(await isUsernameExist(username));
        if (isUsernameAvailable) {
            const user = await signUpWithEmailAndPass(email, password);
            const obj = {
                email,
                status: false,
                username: username,
                chatfriends: [],
            };
            await setDocumentInFirestore('users', user.uid, obj);
            navigate('/login');
        } else {
            throw new Error(`Sorry! Username ${username} is not available.`);
        }
    };

    const handleSignInWithGoogle = async (username) => {
        const isUsernameAvailable = !(await isUsernameExist(username));
        if (isUsernameAvailable) {
            const user = await signInWithGoogle();
            const obj = {
                email: user.email,
                status: false,
                username: username,
                chatfriends: [],
            };
            await setDocumentInFirestore('users', user.uid, obj);
            setUserSession(user, username);
        }
    };

    const setUserSession = async (user, username) => {
        try {
            const obj = {
                email: user.email,
                uid: user.uid,
                username,
            };
            dispatch(login(obj));
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Form
            title={'Create Your Account'}
            fields={fields}
            type='signup'
            btnClick={handleForm}
            signInWithGoogleFun={handleSignInWithGoogle}
        />
    );
}

export default SignUpForm;
