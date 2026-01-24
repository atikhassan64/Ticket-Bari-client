import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../../../assets/logo.png'
import LogoWhite from '../../../assets/logo-white.png'
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { 
    FaSignOutAlt, 
    FaChevronDown,
    FaUserCircle
} from 'react-icons/fa';

const Navbar = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

                    {/* user */}
                    {user ? (
                        <div className="relative">
                            <motion.div 
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center gap-2 sm:gap-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800 p-2 sm:p-3 rounded-2xl transition-all duration-200 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-lg max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="relative flex-shrink-0">
                                    <img
                                        src={dbUser?.photoURL}
                                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-3 border-white dark:border-gray-700 object-cover shadow-lg ring-2 ring-secondary-content/20"
                                        alt="User Avatar"
                                    />
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                                </div>
                                <div className="text-left min-w-0 flex-1">
                                    <div className="font-bold text-sm sm:text-base text-gray-800 dark:text-gray-200 truncate max-w-[120px] sm:max-w-[150px] md:max-w-[200px] lg:max-w-[250px]">
                                        {dbUser?.displayName}
                                    </div>
                                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 capitalize font-medium truncate">
                                        {dbUser?.role || 'User'}
                                    </div>
                                </div>
                                <motion.div
                                    animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex-shrink-0"
                                >
                                    <FaChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                                </motion.div>
                            </motion.div>

                            <AnimatePresence>
                                {isDropdownOpen && (
                                    <>
                                        {/* Backdrop */}
                                        <div 
                                            className="fixed inset-0 z-40" 
                                            onClick={() => setIsDropdownOpen(false)}
                                        ></div>
                                        
                                        {/* Dropdown Menu */}
                                        <motion.div
                                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                            transition={{ duration: 0.2, ease: "easeOut" }}
                                            className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden backdrop-blur-xl"
                                        >
                                            {/* User Info Header */}
                                            <div className="p-4 sm:p-6 bg-gradient-to-r from-secondary-content/5 to-secondary-content/10 border-b border-gray-200 dark:border-gray-700">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative">
                                                        <img
                                                            src={dbUser?.photoURL}
                                                            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-3 border-white dark:border-gray-700 object-cover shadow-lg"
                                                            alt="User Avatar"
                                                        />
                                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200 truncate">
                                                            {dbUser?.displayName}
                                                        </h3>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400 capitalize font-medium truncate">
                                                            {dbUser?.role || 'User'}
                                                        </p>
                                                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 truncate">
                                                            {dbUser?.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Menu Items */}
                                            <div className="p-2">
                                                <motion.div
                                                    whileHover={{ x: 4 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <Link 
                                                        to="/dashboard/profile" 
                                                        onClick={() => setIsDropdownOpen(false)}
                                                        className="flex items-center gap-4 p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-xl transition-all duration-200 group"
                                                    >
                                                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                                                            <FaUserCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                                Profile
                                                            </div>
                                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                                View and edit your profile
                                                            </div>
                                                        </div>
                                                        <FaChevronDown className="w-3 h-3 text-gray-400 rotate-[-90deg] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                                                    </Link>
                                                </motion.div>

                                                {/* Theme Toggle */}
                                                <motion.div
                                                    whileHover={{ x: 4 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <div className="flex items-center gap-4 p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-xl transition-all duration-200 group">
                                                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 text-purple-600 dark:text-purple-400">
                                                                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                                                                    {theme === 'dark' ? (
                                                                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                                                                    ) : (
                                                                        <>
                                                                            <circle cx="12" cy="12" r="4"></circle>
                                                                            <path d="M12 2v2"></path>
                                                                            <path d="M12 20v2"></path>
                                                                            <path d="m4.93 4.93 1.41 1.41"></path>
                                                                            <path d="m17.66 17.66 1.41 1.41"></path>
                                                                            <path d="M2 12h2"></path>
                                                                            <path d="M20 12h2"></path>
                                                                            <path d="m6.34 17.66-1.41 1.41"></path>
                                                                            <path d="m19.07 4.93-1.41 1.41"></path>
                                                                        </>
                                                                    )}
                                                                </g>
                                                            </svg>
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                                                {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                                                            </div>
                                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                                Switch to {theme === 'dark' ? 'light' : 'dark'} theme
                                                            </div>
                                                        </div>
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                checked={theme === 'dark'}
                                                                onChange={(e) => handleTheme(e.target.checked)}
                                                                className="sr-only peer"
                                                            />
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                                                        </label>
                                                    </div>
                                                </motion.div>

                                                {/* Divider */}
                                                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>

                                                <motion.div
                                                    whileHover={{ x: 4 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <button 
                                                        onClick={() => {
                                                            handleLogOut();
                                                            setIsDropdownOpen(false);
                                                        }}
                                                        className="flex items-center gap-4 p-3 sm:p-4 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 w-full text-left group"
                                                    >
                                                        <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center group-hover:bg-red-200 dark:group-hover:bg-red-900/50 transition-colors">
                                                            <FaSignOutAlt className="w-5 h-5 text-red-600 dark:text-red-400" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="font-semibold text-red-600 dark:text-red-400 group-hover:text-red-700 dark:group-hover:text-red-300 transition-colors">
                                                                Logout
                                                            </div>
                                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                                Sign out of your account
                                                            </div>
                                                        </div>
                                                        <FaChevronDown className="w-3 h-3 text-red-400 rotate-[-90deg] group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" />
                                                    </button>
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            {/* Theme toggle for non-logged in users */}
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
                            
                            <Link 
                                to="/login" 
                                className="btn bg-secondary-content text-white btn-sm sm:btn-md font-semibold hover:bg-secondary-content/90 border-none transition-colors"
                            >
                                Login
                            </Link>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Navbar;
