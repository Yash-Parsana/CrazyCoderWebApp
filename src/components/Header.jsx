import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, NavLink } from 'react-router-dom';

function Header() {
    const authStatus = useSelector((state) => state.auth.status);

    const navItems = [
        {
            name: 'Home',
            url: '/',
            active: true,
        },
        {
            name: 'Leader Board',
            url: '/leaderboard',
            active: true,
        },
        {
            name: 'Chat',
            url: '/chat',
            active: true,
        },
        {
            name: 'Profile',
            url: '/profile',
            active: true,
        },
        {
            name: 'SignUp/Login',
            url: '/login',
            active: !authStatus,
        },
        {
            name: 'Logout',
            url: '/logout',
            active: authStatus,
        },
    ];

    const [menuIcon, setMenuIcon] = useState(true);

    const navigate = useNavigate();
    

    return (
        <header className='flex flex-col'>
            <nav className='w-full flex items-center px-5 py-5 lg:px-10 lg:py-5'>
                <div className='mr-4 flex grow-0 items-center justify-between'>
                    <Link to='/'>
                        <img className='w-12 lg:w-14' src='/logo.png'></img>
                    </Link>
                    <p className='mx-3 font-bold text-2xl lg:text-3xl text-white'>Crazy Coder</p>
                </div>
                <div className={`hidden lg:flex lg:grow lg:items-center lg:justify-end`}>
                    {navItems.map((item) =>
                        item.active ? (
                            <NavLink
                                key={item.name}
                                to={item.url}
                                className={({ isActive }) =>
                                    ` cursor-pointer text-xl font-medium f mx-4 ${
                                        isActive ? 'text-blue' : 'text-white'
                                    } border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                }
                            >
                                {item.name}
                            </NavLink>
                        ) : null,
                    )}
                </div>
                <div className={`flex grow transition-all justify-end lg:hidden cursor-pointer`}>
                    <img
                        className={`w-14`}
                        src='/menu.svg'
                        alt=''
                        onClick={() => {
                            setMenuIcon(false);
                        }}
                    />
                </div>
            </nav>

            <div
                className={` ${menuIcon ? 'hidden' : ''} fixed top-4 right-4 w-full 
                max-w-xs bg-light-bg rounded-lg shadow-lg px-6 py-8
                text-base font-semibold text-slate-900 z-10
                `}
            >
                <button
                    type='button'
                    className='absolute top-5 right-5 w-6 flex items-center justify-center text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300'
                >
                    <span className='sr-only'>Close navigation</span>
                    <img
                        src='/cross.svg'
                        className={`${menuIcon ? 'hidden' : 'block'}`}
                        onClick={() => {
                            setMenuIcon(true);
                        }}
                    />
                </button>

                <ul className={`space-y-6 lg:hidden`}>
                    {navItems.map((item) =>
                        item.active ? (
                            <li
                                key={item.name}
                                onClick={() => {
                                    setMenuIcon(true), navigate(item.url);
                                }}
                                className='text-white cursor-pointer hover:text-textHover text-xl font-medium f m-2'
                            >
                                {item.name}
                            </li>
                        ) : null,
                    )}
                </ul>
            </div>
        </header>
    );
}

export default Header;
