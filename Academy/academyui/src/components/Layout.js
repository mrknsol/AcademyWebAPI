import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import NavItems from '../routes';

const Layout = () => {
    const location = useLocation();
    const [selectedPage, setSelectedPage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setSelectedPage(location.pathname.split('/').pop() || 'home');
    }, [location]);

    const handleMenuClick = (path) => {
        setSelectedPage(path);
        navigate(path);
    };

    return (
        <div className="flex flex-1 bg-gray-50">
            <div className="hidden md:flex md:w-64 md:flex-col">
                <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white">
                    <div className="flex items-center flex-shrink-0 px-4">
                        <img className="w-auto h-8" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo.svg" alt="" />
                    </div>
                    <div className="px-4 mt-8">
                        <label htmlFor="" className="sr-only">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </div>
                            <input type="search" name="" id="" className="block w-full py-2 pl-10 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm" placeholder="Search here" />
                        </div>
                    </div>
                    <div className="px-4 mt-6">
                        <hr className="border-gray-200" />
                    </div>
                    <div className="flex flex-col flex-1 px-3 mt-6">
                        <div className="space-y-4">
                            <nav className="flex-1 space-y-2">
                                {NavItems[0].children.map((item) => (
                                    <div key={item.path}>
                                        <button
                                            onClick={() => handleMenuClick(item.path)}
                                            className={`flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg ${selectedPage === item.path ? 'bg-indigo-600 text-white' : 'text-gray-900 hover:text-white hover:bg-indigo-600'}`}
                                        >
                                            <svg className="flex-shrink-0 w-5 h-5 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                            </svg>
                                            {item.path.replace('-', ' ').replace(/^\w/, (c) => c.toUpperCase())}
                                        </button>
                                        {selectedPage === item.path && item.children && (
                                            <div className="pl-6">
                                                {item.children.map((subItem) => (
                                                    <Link to={`${item.path}/${subItem.path}`} key={subItem.path}>
                                                        <a
                                                            className={`block px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${selectedPage === subItem.path ? 'bg-indigo-600 text-white' : 'text-gray-900 hover:text-white hover:bg-indigo-600'}`}
                                                        >
                                                            {subItem.path.replace('-', ' ').replace(/^\w/, (c) => c.toUpperCase())}
                                                        </a>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </nav>
                        </div>
                        <div className="pb-4 mt-20">
                            <button type="button" className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-900 transition-all duration-200 rounded-lg hover:bg-gray-100">
                                <img className="flex-shrink-0 object-cover w-6 h-6 mr-3 rounded-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/vertical-menu/2/avatar-male.png" alt="" />
                                Jacob Jones
                                <svg className="w-5 h-5 ml-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col flex-1">
                <main>
                    <div className="py-6">
                        <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Layout;