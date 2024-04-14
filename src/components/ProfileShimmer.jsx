import React from 'react';

function ProfileShimmer({ lLoading=false, rLoading=false }) {
    return (
        <>
            //{' '}
            {/* <div className='flex w-full items-start h-screen'> */}
                {lLoading && (
                    <div className='w-2/5 flex-1 h-full'>
                        <div className='flex py-10 px-6 animate-pulse'>
                            <div className='relative h-48 w-48'>
                                <img className='h-full w-full rounded-full' src='./blueuser.svg' />
                            </div>
                            <div className='flex-1 py-10 ml-8'>
                                <div className='bg-bgl h-4 w-1/2 rounded-md text-3xl'></div>
                                <div className='flex my-3'>
                                    <img className='h-9 pr-4' src='./atcoder.png' />
                                    <img className='h-9 pr-4' src='./codechef.svg' />
                                    <img className='h-9 pr-4' src='./codeforces.svg' />
                                    <img className='h-9 pr-4' src='./leetcode.svg' />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {rLoading && (
                    <div className='w-full flex-1 py-4 animate-pulse'>
                        <div className='flex justify-between px-6'>
                            <div className='w-1/2 h-3 bg-bgl mx-4 rounded-md'></div>
                            <div className='w-1/2 h-3 bg-bgl mx-4 rounded-md'></div>
                        </div>
                        <div className='flex justify-between px-6 my-12'>
                            <div className='w-1/2 h-3 bg-bgl mx-4 rounded-md'></div>
                            <div className='w-1/2 h-3 bg-bgl mx-4 rounded-md'></div>
                        </div>
                        <div className='flex justify-between px-6 my-12'>
                            <div className='w-1/2 h-3 bg-bgl mx-4 rounded-md'></div>
                            <div className='w-1/2 h-3 bg-bgl mx-4 rounded-md'></div>
                        </div>
                        <div className='flex justify-between px-6 my-12'>
                            <div className='w-1/2 h-3 bg-bgl mx-4 rounded-md'></div>
                            <div className='w-1/2 h-3 bg-bgl mx-4 rounded-md'></div>
                        </div>
                        <div className='flex justify-between px-6 my-12'>
                            <div className='w-1/2 h-3 bg-bgl mx-4 rounded-md'></div>
                            <div className='w-1/2 h-3 bg-bgl mx-4 rounded-md'></div>
                        </div>
                        <div className='flex justify-between px-6 my-12'>
                            <div className='w-1/2 h-3 bg-bgl mx-4 rounded-md'></div>
                            <div className='w-1/2 h-3 bg-bgl mx-4 rounded-md'></div>
                        </div>
                        <div className='flex justify-between px-6 my-12'>
                            <div className='w-1/2 h-3 bg-bgl mx-4 rounded-md'></div>
                            <div className='w-1/2 h-3 bg-bgl mx-4 rounded-md'></div>
                        </div>
                        <div className='flex justify-between px-6 my-12'>
                            <div className='w-1/2 h-3 bg-bgl mx-4 rounded-md'></div>
                            <div className='w-1/2 h-3 bg-bgl mx-4 rounded-md'></div>
                        </div>
                    </div>
                )}
                //{' '}
            {/* </div> */}
        </>
    );
}

export default ProfileShimmer;
