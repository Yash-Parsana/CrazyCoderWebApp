import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Loader from './Loader';

function Form({ title, fields, type = 'login', btnClick, signInWithGoogleFun }) {
    const { register, handleSubmit,errors } = useForm();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const submitForm = async (data, e) => {
        setError('');
        setLoading(true);
        if (type == 'signup') {
            if (data.password != data.cpassword) {
                setError('Password and Confirm password should be same');
                setLoading(false);
                return;
            }
            else if (data.username?.trim().includes(' ')) {
                setError('Invalid Username');
                setLoading(false);
                return;
            }
        }
        try {
            await btnClick(data);
            setLoading(false);
            e.target.reset();
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleSignWithGoogle = () => {
        setError('');
        if (type === 'signup') {
            const username = document.getElementById('username')?.value;
            if (!username) {
                setError('Invalid Username');
            } else if (username.includes(' ')) {
                setError('Username should not include space character');
            } else {
                signInWithGoogleFun(username);
            }
        }
        else signInWithGoogleFun();
    };

    return (
        <>
            <div className='relative min-h-screen flex items-center justify-center bg-bgcolor px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover'>
                <div className='absolute bg-black opacity-60 inset-0 z-0'></div>
                <div className='max-w-md w-full p-8 bg-white rounded-xl z-10'>
                    {error && <p className='text-red mt-8 text-center'>{error}</p>}
                    <div className='text-center'>
                        <h2 className='mt-6 text-3xl font-bold text-gray-900'>{title}</h2>
                        <p className='mt-2 text-sm text-gray-600'>Please sign in to your account</p>
                    </div>
                    <div className='flex flex-row justify-center items-center space-x-3 m-5'>
                        <span
                            className='w-11 h-11 items-center justify-center inline-flex rounded-full font-bold text-lg  text-white  bg-blue-900 hover:shadow-lg cursor-pointer transition ease-in duration-300'
                            onClick={handleSignWithGoogle}
                        >
                            <img className='w-16 h-16' src='/google.svg' />
                        </span>
                    </div>
                    <div className='flex items-center justify-center space-x-2'>
                        <span className='h-px w-16 bg-gray-300'></span>
                        <span className='text-gray-500 font-normal'>OR</span>
                        <span className='h-px w-16 bg-gray-300'></span>
                    </div>
                    <form className='mt-8 space-y-6' onSubmit={handleSubmit(submitForm)}>
                        {fields.map((element, index) => (
                            <div className='mt-8 content-center' key={index}>
                                <label className='text-sm font-bold text-gray-700 tracking-wide'>{element.label}</label>
                                <input
                                    id={element.field}
                                    className=' w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
                                    type={element.type}
                                    placeholder={element.placeholder}
                                    required
                                    {...register(element.field)}
                                />
                            </div>
                        ))}
                        <div>
                            {loading ? (
                                <Loader />
                            ) : (
                                <button
                                    type='submit'
                                    className='w-full flex justify-center bg-blue text-white p-4 mt-10 rounded-full tracking-wide
                                font-semibold  focus:outline-none focus:shadow-outline hover:bg-dark-blue shadow-lg cursor-pointer transition ease-in duration-300'
                                >
                                    {type == 'login' ? 'Login' : 'Sign up'}
                                </button>
                            )}
                        </div>
                        <p className='flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500'>
                            <span>{type == 'login' ? "Don't have an account?" : 'Alrady have an account?'}</span>
                            <Link
                                to={type == 'login' ? '/signup' : '/login'}
                                className='text-indigo-500 hover:text-indigo-500no-underline hover:underline cursor-pointer transition ease-in duration-300'
                            >
                                {type == 'login' ? 'Sign up' : 'Login'}
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Form;
