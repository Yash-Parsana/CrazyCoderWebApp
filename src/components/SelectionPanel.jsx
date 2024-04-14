import React, { useState, useRef } from 'react';

function SelectionPanel({ type, platforms, cornerButton, activePlatform, slectPlatform, cornerBtnClickFun }) {
    const handleCornerButtonClick = (e) => {
        if (type === 'contest') {
            cornerBtnClickFun(e.target.innerText);
        } else {
            cornerBtnClickFun();
        }
    };

    const containerRef = useRef(null);

    const handleScroll = () => {
        const scrollDistance = 80;
        if (containerRef.current) {
            containerRef.current.scrollLeft += scrollDistance;
        }
    };

    const platformChange = (platform) => {
        slectPlatform(platform?.slug);
    };

    return (
        <div className='flex pl-6 pr-2 mt-2 lg:px-10 lg:mt-2 pb-2 bg-bgcolor'>
            <div className='bg-blue min-w-24 text-center'>
                <p
                    className='text-white px-2 py-1 lg:px-2 lg:py-1 cursor-pointer'
                    onClick={(e) => {
                        handleCornerButtonClick(e);
                    }}
                >
                    {cornerButton}
                </p>
            </div>
            <div className='w-0 ml-2 border-l-2 border-light-grey'></div>
            <ul ref={containerRef} className='flex item-center justify-start overflow-auto scrollbar-hide px-1'>
                {platforms.map((platform, index) => (
                    <li
                        key={index}
                        onClick={() => {
                            platformChange(platform);
                        }}
                        className={`${
                            activePlatform === platform.slug
                                ? 'bg-blue border-blue'
                                : 'bg-transparent border-white rounded-3xl'
                        } border-2 text-white rounded-3xl mx-2 px-3 py-1 cursor-pointer`}
                    >
                        {platform.name}
                    </li>
                ))}
            </ul>
            <div
                className='md:hidden'
                onClick={() => {
                    handleScroll();
                }}
            >
                <img className='w-24 max-h-12' src='/Right.gif' />
            </div>
        </div>
    );
}

export default SelectionPanel;
