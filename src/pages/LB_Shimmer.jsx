import React from 'react';
import LeaderBoardShimmer from '../components/LeaderBoardShimmer';

function LB_Shimmer() {
    return (
        <div className='flex flex-col h-full px-2 lg:px-8'>
            {Array.from({ length: 10 }, (_, index) => (
                <LeaderBoardShimmer key={index} />
            ))}
        </div>
    );
}

export default LB_Shimmer;
