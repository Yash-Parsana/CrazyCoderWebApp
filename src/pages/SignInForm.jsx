import React, { useEffect, useState } from 'react';
import Form from '../components/Form';
import { useDispatch } from 'react-redux';
import {
    logInWithEmailAndPassword,
    signInWithGoogle,
    getDocumentFromFireStore,
    isUsernameExist,
    setDocumentInFirestore,
} from '../services/firebaseService';
import { login } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { generateToken } from '../services/jwtService';
import InputPopUpForm from '../components/InputPopUpForm';

function SignInForm() {
    const fields = [
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
    ];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [popUpForm, setPopUpForm] = useState(false);
    const [user, setUser] = useState(null);

    const handleForm = async (data) => {
        try {
            const { email, password } = data;
            if (!email || !password) {
                throw new Error('Ivalid Email, password');
            }
            const cUser = await logInWithEmailAndPassword(email, password);
            if (cUser) {
                setUserSession(cUser.uid);
            } else {
                throw new Error(`User with email ${email} does not exist. please signup.`);
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    const handleSignInWithGoogle = async () => {
        const loggedInUser = await signInWithGoogle();
        const userinFirestore = await getDocumentFromFireStore('users', loggedInUser.uid);
        if (userinFirestore) {
            setUserSession(loggedInUser.uid);
        } else {
            setUser(loggedInUser);
            setPopUpForm(true);
        }
    };

    const handlePopBtnClick = async (username) => {
        try {
            const isUsernameAvailable = !(await isUsernameExist(username));
            if (isUsernameAvailable) {
                const obj = {
                    email: user.email,
                    status: false,
                    username: username,
                    chatfriends: [],
                };
                await setDocumentInFirestore('users', user.uid, obj);
                setPopUpForm(false);
                setUserSession(user.uid);
            } else {
                throw new Error(`Sorry! Username ${username} is not available.`);
            }
        } catch (err) {
            throw err;
        }
    };

    const setUserSession = async (uid) => {
        try {
            const user = await getDocumentFromFireStore('users', uid);
            const obj = {
                email: user.email,
                uid: uid,
                username: user.username,
            };
            dispatch(login(obj));
            const jwtToken = await generateToken(obj);
            localStorage.setItem('jwtToken', jwtToken);
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };
    // useEffect(() => {
    //     setUserSession();
    // },[user])

    return (
        <>
            {!popUpForm && (
                <Form
                    title={'Welcome Back!'}
                    fields={fields}
                    type='login'
                    btnClick={handleForm}
                    signInWithGoogleFun={handleSignInWithGoogle}
                />
            )}
            {popUpForm && (
                <InputPopUpForm
                    title={'Select Username'}
                    element={{ label: 'Username', field: 'username', placeholder: 'Username should not include space' }}
                    optionManu={false}
                    btnClick={handlePopBtnClick}
                />
            )}
        </>
    );
}

export default SignInForm;
