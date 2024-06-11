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
            <div className='relative h-[90vh] w-full flex items-center justify-center bg-bgcolor px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover z-5 '>
                <div className='absolute bg-black opacity-60 inset-0 z-0'></div>
                <div className='max-w-md w-full p-8 bg-white rounded-xl z-0'>
                    {error && <p className='text-red text-center'>{error}</p>}
                    <div className='text-center'>
                        <h2 className='text-3xl font-bold text-gray-900 font-[Helvetica]'>{title}</h2>
                        <p className='mt-2 text-sm text-gray-600 font-[Helvetica]'>Please sign in to your account</p>
                    </div>
                    <div className='flex flex-row justify-center items-center space-x-3 py-4'>
                        <span
                            className='w-11 h-11 items-center justify-center inline-flex rounded-full font-bold text-lg  text-white  bg-blue-900 hover:shadow-lg cursor-pointer transition ease-in duration-300'
                            onClick={handleSignWithGoogle}
                        >
                            <img className='w-16 h-16' src='/google.svg' />
                        </span>
                    </div>
                    <div className='flex items-center justify-center w-full h-5'>
                        <div className='w-[45%] h-[1px] bg-bgcolor rounded-full'></div>
                        <div className='text-gray-500 font-semibold flex justify-center h-full pb-1 items-center w-[10%]'>or</div>
                        <div className='w-[45%] h-[1px] bg-bgcolor rounded-full'></div>
                    </div>
                    <form className='space-y-6' onSubmit={handleSubmit(submitForm)}>
                        {fields.map((element, index) => (
                            <div className='mt-8 content-center font-[Helvetica]' key={index}>
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
                                    className='w-full flex font-bold text-xl justify-center bg-blue text-white p-3 rounded-xl tracking-wide
                                font-[Helvetica] focus:outline-none focus:shadow-outline hover:bg-dark-blue shadow-lg cursor-pointer transition ease-in duration-300'
                                >
                                    {type == 'login' ? 'Login' : 'Sign up'}
                                </button>
                            )}
                        </div>
                        <p className='flex gap-2 items-center justify-center mt-10 text-center text-md text-gray-500 font-[Helvetica]'>
                            <span>{type == 'login' ? "Don't have an account?" : 'Alrady have an account?'}</span>
                            <Link
                                to={type == 'login' ? '/signup' : '/login'}
                                className='text-blue hover:text-dark-blue text-md font-bold transition-all duration-100 hover:underline cursor-pointer ease-in-out'
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
