import React from 'react';

function ChatShimmer({ loading=true, chatLoading=false }) {
    return (
        <div className='grow flex overflow-hidden'>
            {loading && (
                <div className='w-1/4 h-full flex flex-col overflow-hidden'>
                    {/* <!-- Sidebar Header --> */}
                    <header className='p-4 flex bg-bgl mx-3 rounded-md animate-pulse justify-between items-center text-white'>
                        <div className='text-2xl w-1/2 rounded-md h-4 bg-dark-grey font-semibold'></div>
                        <div className='relative'>
                            <button
                                id='menuButton'
                                className='focus:outline-none '
                                onClick={() => {
                                    setAddFriendPopUp(true);
                                }}
                            >
                                <img className='h-8' src='./add-user.svg' />
                            </button>
                        </div>
                    </header>

                    {/* <!-- Contact List --> */}
                    <div className='overflow-y-auto p-4 h-full'>
                        <div className='flex mb-4 bg-bgl cursor-pointer p-2 rounded-md animate-pulse'>
                            <div className='w-12 h-12 bg-gray-300 rounded-full mr-3'>
                                <img src='./user.svg' alt='User Avatar' className='w-12 h-12 rounded-full' />
                            </div>
                            <div className='flex-1 float-start'>
                                <div className='h-2 w-1/2 bg-dark-grey rounded-md my-2'></div>
                                <div className='h-1 w-1/4 bg-dark-grey rounded-md'></div>
                            </div>
                        </div>

                        <div className='flex mb-4 bg-bgl cursor-pointer p-2 rounded-md animate-pulse'>
                            <div className='w-12 h-12 bg-gray-300 rounded-full mr-3'>
                                <img src='./user.svg' alt='User Avatar' className='w-12 h-12 rounded-full' />
                            </div>
                            <div className='flex-1 float-start'>
                                <div className='h-2 w-1/2 bg-dark-grey rounded-md my-2'></div>
                                <div className='h-1 w-1/4 bg-dark-grey rounded-md'></div>
                            </div>
                        </div>

                        <div className='flex mb-4 bg-bgl cursor-pointer p-2 rounded-md animate-pulse'>
                            <div className='w-12 h-12 bg-gray-300 rounded-full mr-3'>
                                <img src='./user.svg' alt='User Avatar' className='w-12 h-12 rounded-full' />
                            </div>
                            <div className='flex-1 float-start'>
                                <div className='h-2 w-1/2 bg-dark-grey rounded-md my-2'></div>
                                <div className='h-1 w-1/4 bg-dark-grey rounded-md'></div>
                            </div>
                        </div>
                        <div className='flex mb-4 bg-bgl cursor-pointer p-2 rounded-md animate-pulse'>
                            <div className='w-12 h-12 bg-gray-300 rounded-full mr-3'>
                                <img src='./user.svg' alt='User Avatar' className='w-12 h-12 rounded-full' />
                            </div>
                            <div className='flex-1 float-start'>
                                <div className='h-2 w-1/2 bg-dark-grey rounded-md my-2'></div>
                                <div className='h-1 w-1/4 bg-dark-grey rounded-md'></div>
                            </div>
                        </div>
                        <div className='flex mb-4 bg-bgl cursor-pointer p-2 rounded-md animate-pulse'>
                            <div className='w-12 h-12 bg-gray-300 rounded-full mr-3'>
                                <img src='./user.svg' alt='User Avatar' className='w-12 h-12 rounded-full' />
                            </div>
                            <div className='flex-1 float-start'>
                                <div className='h-2 w-1/2 bg-dark-grey rounded-md my-2'></div>
                                <div className='h-1 w-1/4 bg-dark-grey rounded-md'></div>
                            </div>
                        </div>
                        <div className='flex mb-4 bg-bgl cursor-pointer p-2 rounded-md animate-pulse'>
                            <div className='w-12 h-12 bg-gray-300 rounded-full mr-3'>
                                <img src='./user.svg' alt='User Avatar' className='w-12 h-12 rounded-full' />
                            </div>
                            <div className='flex-1 float-start'>
                                <div className='h-2 w-1/2 bg-dark-grey rounded-md my-2'></div>
                                <div className='h-1 w-1/4 bg-dark-grey rounded-md'></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* {chatLoading && <div className='w-1/4 h-full flex flex-col overflow-hidden'></div>} */}
            {(loading || chatLoading) && (
                <div className={`${chatLoading?'w-full':'w-3/4'} flex flex-col`}>
                    {/* <!-- Chat Header --> */}
                    <div className='bg-bgl p-4 grow-0 text-white flex animate-pulse items-center rounded-md mb-4 mr-4'>
                        <img src='./user.svg' alt='User Avatar' className='w-12 h-12 rounded-full' />
                        <div className='w-1/6 h-1/4 bg-dark-grey mx-2 rounded-md'></div>
                    </div>
                    {/* <!-- Chat Messages --> */}
                    <div className='grow bg-bgl overflow-y-auto p-4 rounded-md mr-4 animate-pulse'>
                        <div className='flex items-center mb-4 cursor-pointer '>
                            <div className='w-9 h-9 rounded-full flex items-center justify-center mr-2'>
                                <img src='./user.svg' alt='User Avatar' className='w-8 h-8 rounded-full' />
                            </div>
                            <div className='w-full'>
                                <div className='w-1/3 h-4 bg-dark-grey rounded-md mb-2'></div>
                                <div className='w-1/5 h-2 bg-dark-grey rounded-md'></div>
                            </div>
                        </div>
                        <div className='flex w-full justify-end mb-4 cursor-pointer'>
                            <div className='flex-1 w-full items-start max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3'>
                                <div className='w-full h-4 bg-dark-grey rounded-md mb-2'></div>
                                <div className='w-1/2 h-2 bg-dark-grey rounded-md'></div>
                            </div>
                            <div className='w-9 h-9 rounded-full flex items-center justify-center ml-2'>
                                <img src='./user.svg' alt='My Avatar' className='w-8 h-8 rounded-full' />
                            </div>
                        </div>
                        <div className='flex items-center mb-4 cursor-pointer '>
                            <div className='w-9 h-9 rounded-full flex items-center justify-center mr-2'>
                                <img src='./user.svg' alt='User Avatar' className='w-8 h-8 rounded-full' />
                            </div>
                            <div className='w-full'>
                                <div className='w-1/3 h-4 bg-dark-grey rounded-md mb-2'></div>
                                <div className='w-1/5 h-2 bg-dark-grey rounded-md'></div>
                            </div>
                        </div>
                        <div className='flex w-full justify-end mb-4 cursor-pointer'>
                            <div className='flex-1 w-full items-start max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3'>
                                <div className='w-full h-4 bg-dark-grey rounded-md mb-2'></div>
                                <div className='w-1/2 h-2 bg-dark-grey rounded-md'></div>
                            </div>
                            <div className='w-9 h-9 rounded-full flex items-center justify-center ml-2'>
                                <img src='./user.svg' alt='My Avatar' className='w-8 h-8 rounded-full' />
                            </div>
                        </div>
                        <div className='flex items-center mb-4 cursor-pointer '>
                            <div className='w-9 h-9 rounded-full flex items-center justify-center mr-2'>
                                <img src='./user.svg' alt='User Avatar' className='w-8 h-8 rounded-full' />
                            </div>
                            <div className='w-full'>
                                <div className='w-1/3 h-4 bg-dark-grey rounded-md mb-2'></div>
                                <div className='w-1/5 h-2 bg-dark-grey rounded-md'></div>
                            </div>
                        </div>

                        <div className='flex items-center mb-4 cursor-pointer '>
                            <div className='w-9 h-9 rounded-full flex items-center justify-center mr-2'>
                                <img src='./user.svg' alt='User Avatar' className='w-8 h-8 rounded-full' />
                            </div>
                            <div className='w-full'>
                                <div className='w-1/3 h-4 bg-dark-grey rounded-md mb-2'></div>
                                <div className='w-1/5 h-2 bg-dark-grey rounded-md'></div>
                            </div>
                        </div>
                        <div className='flex w-full justify-end mb-4 cursor-pointer'>
                            <div className='flex-1 w-full items-start max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3'>
                                <div className='w-full h-4 bg-dark-grey rounded-md mb-2'></div>
                                <div className='w-1/2 h-2 bg-dark-grey rounded-md'></div>
                            </div>
                            <div className='w-9 h-9 rounded-full flex items-center justify-center ml-2'>
                                <img src='./user.svg' alt='My Avatar' className='w-8 h-8 rounded-full' />
                            </div>
                        </div>
                    </div>
                    {/* <!-- Chat Input --> */}
                    <div className='py-4 mr-4 animate-pulse'>
                        <div className='flex items-center'>
                            <div
                                type='text'
                                className='h-10 px-4 flex items-center bg-bgl text-white text-lg w-full p-2 rounded-md mr-2'
                            >
                                <div className='w-1/4 h-3 rounded-md bg-dark-grey'></div>
                            </div>
                            <img className='h-6' src='./send.svg' />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChatShimmer;
