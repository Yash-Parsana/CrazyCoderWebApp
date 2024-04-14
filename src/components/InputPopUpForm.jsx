import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Loader from './Loader';

function InputPopUpForm({ title, element, optionManu = false, btnClick, closeBtn = null,showCloseBtn = false }) {
    const { register, handleSubmit, errors } = useForm();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const submitForm = async (data) => {
        setLoading(true);
        setError('');
        try {
            if (optionManu) {
                if (!data.platform || data.platform.includes(' ')) {
                    setError('Please select platform');
                    setLoading(false);
                    return;
                }
                await btnClick(data);
                setLoading(false);
                return;
            } else if (!data.username || data.username.includes(' ')) {
                setError('Invalid Username');
                setLoading(false);
                return;
            }
            await btnClick(data.username);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const closePopUp = () => {
        if (optionManu || showCloseBtn) {
            closeBtn();
        }
    };

    return (
        <>
            <div className='relative min-h-[600px] sm:bg-transparent flex items-center justify-center lg:bg-bgcolor px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover'>
                {/* <div className='absolute opacity-60 inset-0 z-0'></div> */}
                <div className='max-w-md w-full p-8 bg-white rounded-xl z-10'>
                    {(optionManu || showCloseBtn) && (
                            <div className='w-full flex justify-end '>
                                <img src='./crossBlack.svg' className='h-6 cursor-pointer' onClick={closePopUp} />
                            </div>
                        )}
                    <div className='text-center'>
                        <h2 className='mt-6 text-3xl font-bold text-gray-900'>{title}</h2>
                    </div>
                    {error && <p className='text-red mt-8 text-center'>{error}</p>}
                    {/* <div className='flex items-center justify-center space-x-2'>
                        <span className='h-px w-16 bg-gray-300'></span>
                        <span className='h-px w-16 bg-gray-300'></span>
                    </div> */}
                    <form className='mt-8 space-y-6' onSubmit={handleSubmit(submitForm)}>
                        {optionManu && (
                            <div>
                                <select
                                    className='bg-light-grey py-3 px-4 pe-9 block w-full border-gray rounded-lg text-sm focus:border-blue focus:ring-blue disabled:opacity-50 disabled:pointer-events-none'
                                    {...register('platform')}
                                >
                                    <option>Select Platform</option>
                                    <option className='py-3 px-4 pe-9'>Atcoder</option>
                                    <option>Codechef</option>
                                    <option>Codeforces</option>
                                    <option>Leetcode</option>
                                </select>
                            </div>
                        )}

                        <div className='mt-8 content-center'>
                            <label className='text-sm font-bold text-gray-700 tracking-wide'>{element.label}</label>
                            <input
                                className=' w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
                                type='text'
                                placeholder={element.placeholder}
                                required
                                {...register(element.field)}
                            />
                        </div>
                        <div>
                            {loading ? (
                                <Loader />
                            ) : (
                                <button
                                    type='submit'
                                    className='w-full flex justify-center bg-blue text-white p-4 mt-10 rounded-full tracking-wide
                                font-semibold  focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300'
                                >
                                    Submit
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default InputPopUpForm;
