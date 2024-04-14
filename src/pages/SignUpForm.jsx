import React from 'react';
import Form from '../components/Form';
import { useNavigate } from 'react-router-dom';
import {
    signUpWithEmailAndPass,
    setDocumentInFirestore,
    isUsernameExist,
    signInWithGoogle,
} from '../services/firebaseService';

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
    const handleForm = async (data) => {
        try {
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
        } catch (err) {
            throw err;
        }
    };

    const handleSignInWithGoogle = async (username) => {
        const isUsernameAvailable = !(await isUsernameExist(username));
        if (isUsernameAvailable) {
            const user = await signInWithGoogle();
            const obj = {
                email,
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
            const jwtToken = await generateToken(obj);
            localStorage.setItem('jwtToken', jwtToken);
            navigate('/');
        } catch (err) {}
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
