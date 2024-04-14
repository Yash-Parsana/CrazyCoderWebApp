import React from 'react';
import parse from 'html-react-parser';

function Board({ bgc = 'bg-transparent', px = 'px-4', lipx = 'px-3', py = 'py-2', fz = 'text-base lg:text-lg', row, deleteBtnClick = null }) {
    
    const handleClick = (ele) => {
        if (ele.visible == 'd') {
            deleteBtnClick(row[1].text, row[0].visible=='visible');
        }
    }

    return (
        <div className='flex flex-col mt-3 lg:mt-5 lg:mx-10'>
            <ul className={`flex ${bgc} ${px} ${py} ${fz} items-center text-white weight-bold`}>
                {row?.map((col, index) => (
                    <li
                        key={index}
                        onClick={()=>{handleClick(col)}}
                        className={`${col.width} ${col.ta} ${lipx} ${
                            col.visible && `${col.visible} flex flex-col justify-center items-center ${col.visible=='d'?'cursor-pointer':''}`
                        } h-auto`}
                    >
                        {col.visible ? parse(col.text) : col.text}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Board;
