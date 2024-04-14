import React from 'react';

function Footer() {
    return (
        <div className=' bg-gray-900 mt-8 mx-6 lg:mx-10 lg:pt-10 border-t border-light-grey'>
            <div className='max-w-2xl mx-auto text-white py-10'>
                <div className='text-center'>
                    <h3 className='text-3xl mb-3'> Download Our App </h3>
                    <p> Keep Coding, Keep Improwing. </p>
                    <div className='flex justify-center my-10'>
                        <a
                            className='flex items-center border w-auto rounded-lg px-4 py-2 mx-2 cursor-pointer'
                            href='https://play.google.com/store/apps/details?id=com.parsanatech.crazycoder&hl=en&gl=US&pli=1'
                        >
                            <img src='https://cdn-icons-png.flaticon.com/512/888/888857.png' className='w-7 md:w-8' />
                            <div className='text-left ml-3'>
                                <p className='text-xs text-gray-200'>Download on </p>
                                <p className='text-sm md:text-base'> Google Play Store </p>
                            </div>
                        </a>
                    </div>
                </div>
                <div className=' mt-16 lg:mt-28 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400'>
                    <p className='order-2 md:order-1 mt-8 md:mt-0'> &copy; Crazy Coder, 2024. </p>
                    <div className='order-1 md:order-2 flex'>
                        <a
                            href='https://github.com/Yash-Parsana'
                            target='_blank'
                            className='flex items-center space-x-3 hover:text-sky-400 transition px-2'
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='currentColor'
                                className='w-5'
                                viewBox='0 0 16 16'
                            >
                                <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z' />
                            </svg>
                        </a>
                        <a
                            href='https://in.linkedin.com/in/yash-parsana-a9176a1b2'
                            className='text-grey-700 hover:text-grey-900 px-2'
                            target='_blank'
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='18'
                                height='18'
                                viewBox='0 0 18 18'
                                fill='none'
                            >
                                <path
                                    d='M16.2 0H1.8C0.81 0 0 0.81 0 1.8V16.2C0 17.19 0.81 18 1.8 18H16.2C17.19 18 18 17.19 18 16.2V1.8C18 0.81 17.19 0 16.2 0ZM5.4 15.3H2.7V7.2H5.4V15.3ZM4.05 5.67C3.15 5.67 2.43 4.95 2.43 4.05C2.43 3.15 3.15 2.43 4.05 2.43C4.95 2.43 5.67 3.15 5.67 4.05C5.67 4.95 4.95 5.67 4.05 5.67ZM15.3 15.3H12.6V10.53C12.6 9.81004 11.97 9.18 11.25 9.18C10.53 9.18 9.9 9.81004 9.9 10.53V15.3H7.2V7.2H9.9V8.28C10.35 7.56 11.34 7.02 12.15 7.02C13.86 7.02 15.3 8.46 15.3 10.17V15.3Z'
                                    fill='currentColor'
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
