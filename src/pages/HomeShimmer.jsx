import React from 'react';
import ContestShimmer from '../components/ContestShimmer';

function HomeShimmer() {
    return (
        <div className='flex flex-col h-full px-2 lg:px-8'>
            {Array.from({ length: 10 }, (_, index) => (
                <ContestShimmer key={index} />
            ))}
        </div>
    );
}

export default HomeShimmer;
