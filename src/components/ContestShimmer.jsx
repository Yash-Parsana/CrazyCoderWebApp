import React from 'react';

function ContestShimmer() {
    return (
        <ul className='flex h-auto my-5'>
            <li
                className='w-1/2 h-5 animate-pulse bg-blue rounded-2xl mx-3'
                style={{ '--shimmer-color': '#2563eb', '--shimmer-color2': '#60a5fa' }}
            ></li>
            <li
                className='w-1/4 h-5 animate-pulse bg-blue rounded-2xl mx-3'
                style={{ '--shimmer-color': '#2563eb', '--shimmer-color2': '#60a5fa' }}
            ></li>
            <li
                className='w-1/4 h-5 animate-pulse bg-blue rounded-2xl mx-3'
                style={{ '--shimmer-color': '#2563eb', '--shimmer-color2': '#60a5fa' }}
            ></li>
        </ul>
    );
}

export default ContestShimmer;
