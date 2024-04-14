import React from 'react'

function Loader() {
    
    return (
        <div className='flex flex-row gap-2 justify-center p-5 mt-10'>
            <div className='w-4 h-4 rounded-full bg-blue animate-bounce [animation-delay:.7s]'></div>
            <div className='w-4 h-4 rounded-full bg-blue animate-bounce [animation-delay:.3s]'></div>
            <div className='w-4 h-4 rounded-full bg-blue animate-bounce [animation-delay:.7s]'></div>
        </div>
    );
}

export default Loader