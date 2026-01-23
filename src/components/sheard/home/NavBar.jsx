import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import Logo from '../../../assets/logo.png'
import LogoWhite from '../../../assets/logo-white.png'
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Navbar = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const { user, logOutUser } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const { data: dbUser = {}} = useQuery({
        queryKey: ["user", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });

    useEffect(() => {
        const html = document.querySelector("html");
        html.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleTheme = (checked) => {
        setTheme(checked ? "dark" : "light");
    };

    const links = <>
        <li>
            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive
                        ? "text-secondary-content font-semibold bg-secondary-content/10 px-4 py-2 rounded-lg transition-all duration-200"
                        : "hover:text-secondary-content hover:bg-secondary-content/5 px-4 py-2 rounded-lg transition-all duration-200"
                }
            >
                Home
            </NavLink>
        </li>

        <li>
            <NavLink
                to="/all-tickets"
                className={({ isActive }) =>
                    isActive
                        ? "text-secondary-content font-semibold bg-secondary-content/10 px-4 py-2 rounded-lg transition-all duration-200"
                        : "hover:text-secondary-content hover:bg-secondary-content/5 px-4 py-2 rounded-lg transition-all duration-200"
                }
            >
                All Tickets
            </NavLink>
        </li>

        <li>
            <NavLink
                to="/about"
                className={({ isActive }) =>
                    isActive
                        ? "text-secondary-content font-semibold bg-secondary-content/10 px-4 py-2 rounded-lg transition-all duration-200"
                        : "hover:text-secondary-content hover:bg-secondary-content/5 px-4 py-2 rounded-lg transition-all duration-200"
                }
            >
                About Us
            </NavLink>
        </li>

        <li>
            <NavLink
                to="/contact"
                className={({ isActive }) =>
                    isActive
                        ? "text-secondary-content font-semibold bg-secondary-content/10 px-4 py-2 rounded-lg transition-all duration-200"
                        : "hover:text-secondary-content hover:bg-secondary-content/5 px-4 py-2 rounded-lg transition-all duration-200"
                }
            >
                Contact
            </NavLink>
        </li>

        <li>
            <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                    isActive
                        ? "text-secondary-content font-semibold bg-secondary-content/10 px-4 py-2 rounded-lg transition-all duration-200"
                        : "hover:text-secondary-content hover:bg-secondary-content/5 px-4 py-2 rounded-lg transition-all duration-200"
                }
            >
                Dashboard
            </NavLink>
        </li>
    </>


    const handleLogOut = () => {
        logOutUser()
            .then(() => {
                toast.success('Logout successfully');
                navigate("/");
            })
            .catch((error) => {
                toast.error(error.message);
            })
    }

    return (
        <div className="shadow-lg sticky top-0 z-50 bg-base-100/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
            <div className="navbar max-w-[1200px] mx-auto px-4 py-2">

                {/* navbar start */}
                <div className="navbar-start">

                    {/* mobile menu */}
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>

                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-xl z-50 mt-3 w-64 p-4 shadow-xl border border-gray-100 dark:border-gray-800">
                            {links}
                        </ul>
                    </div>

                    {/* logo */}
                    <Link to={'/'} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        {
                            theme === "dark" ?
                                <img className="w-28 sm:w-32 lg:w-40" src={LogoWhite} alt="TicketBari Logo" />
                                :
                                <img className="w-28 sm:w-32 lg:w-40" src={Logo} alt="TicketBari Logo" />
                        }
                    </Link>
                </div>

                {/* navbar center (desktop only) */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-2">
                        {links}
                    </ul>
                </div>

                {/* navbar end */}
                <div className="navbar-end flex items-center gap-4">

                    {/* theme toggle */}
                    <label className="toggle text-base-content scale-90 sm:scale-100">
                        <input
                            onChange={(e) => handleTheme(e.target.checked)}
                            type="checkbox"
                            defaultChecked={localStorage.getItem('theme') === "dark"}
                            className="theme-controller"
                        />
                        <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none"
                                stroke="currentColor">
                                <circle cx="12" cy="12" r="4"></circle>
                                <path d="M12 2v2"></path>
                                <path d="M12 20v2"></path>
                                <path d="m4.93 4.93 1.41 1.41"></path>
                                <path d="m17.66 17.66 1.41 1.41"></path>
                                <path d="M2 12h2"></path>
                                <path d="M20 12h2"></path>
                                <path d="m6.34 17.66-1.41 1.41"></path>
                                <path d="m19.07 4.93-1.41 1.41"></path>
                            </g>
                        </svg>
                        <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none"
                                stroke="currentColor">
                                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                            </g>
                        </svg>
                    </label>

                    {/* user */}
                    {user ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button"
                                className="flex items-center gap-3 cursor-pointer hover:bg-base-200 p-2 rounded-xl transition-colors">
                                <img
                                    src={dbUser?.photoURL}
                                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-gray-200 dark:border-gray-700 object-cover"
                                    alt="User Avatar"
                                />
                                <div className="hidden md:block text-left">
                                    <div className="font-semibold text-sm">
                                        {dbUser?.displayName}
                                    </div>
                                    <div className="text-xs text-gray-500 capitalize">
                                        {dbUser?.role || 'User'}
                                    </div>
                                </div>
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>

                            <ul
                                tabIndex={0}
                                className="dropdown-content menu p-4 shadow-xl bg-base-100 rounded-xl w-56 z-50 border border-gray-100 dark:border-gray-800 mt-2"
                            >
                                <li className="mb-2">
                                    <Link to="/dashboard/profile" className="flex items-center gap-3 p-3 hover:bg-base-200 rounded-lg">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                        </svg>
                                        Profile
                                    </Link>
                                </li>
                                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                                <li>
                                    <button 
                                        onClick={handleLogOut} 
                                        className="flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg w-full text-left"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                                        </svg>
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link 
                                to="/login" 
                                className="btn btn-ghost btn-sm sm:btn-md font-semibold hover:bg-secondary-content/10 hover:text-secondary-content transition-colors"
                            >
                                Login
                            </Link>
                            <Link 
                                to="/register" 
                                className="btn bg-secondary-content text-white btn-sm sm:btn-md font-semibold hover:bg-secondary-content/90 border-none transition-colors"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Navbar;
