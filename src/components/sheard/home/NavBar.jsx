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
                        ? "text-primary-content font-semibold border-b-2 border-primary-content rounded-none"
                        : "hover:text-primary-content"
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
                        ? "text-primary-content font-semibold border-b-2 border-primary-content rounded-none"
                        : "hover:text-primary-content"
                }
            >
                All Tickets
            </NavLink>
        </li>

        <li>
            <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                    isActive
                        ? "text-primary-content font-semibold border-b-2 border-primary-content rounded-none"
                        : "hover:text-primary-content"
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
        <div className="shadow-sm sticky top-0 z-50 bg-base-100">
            <div className="navbar max-w-[1200px] mx-auto px-4">

                {/* navbar start */}
                <div className="navbar-start">

                    {/* mobile menu */}
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>

                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>

                    {/* logo */}
                    {
                        theme === "dark" ?
                            <Link to={'/'}>
                                <img className="w-28 sm:w-32 lg:w-40" src={LogoWhite} alt="Logo" />
                            </Link>
                            :
                            <Link to={'/'}>
                                <img className="w-28 sm:w-32 lg:w-40" src={Logo} alt="Logo" />
                            </Link>
                    }
                </div>

                {/* navbar center (desktop only) */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>

                {/* navbar end */}
                <div className="navbar-end flex items-center gap-2">

                    {/* theme toggle */}
                    <label className="toggle text-base-content scale-90 sm:scale-100 mr-2">
                        <input
                            onChange={(e) => handleTheme(e.target.checked)}
                            type="checkbox"
                            defaultChecked={localStorage.getItem('theme') === "dark"}
                            className="theme-controller"
                        />
                        <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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
                        <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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
                                className="flex items-center gap-2 cursor-pointer">
                                <img
                                    src={dbUser?.photoURL}
                                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border object-cover"
                                    alt="avatar"
                                />
                                <span className="font-medium hidden md:block">
                                    {dbUser?.displayName}
                                </span>
                                <svg width="16" height="16">
                                    <path d="M4 6l4 4 4-4" stroke="currentColor" fill="none" />
                                </svg>
                            </div>

                            <ul
                                tabIndex={0}
                                className="dropdown-content menu p-4 shadow-lg bg-base-100 rounded-lg w-48 sm:w-52 z-50"
                            >
                                <li>
                                    <Link to="/dashboard/profile">
                                        Profile
                                    </Link>
                                </li>
                                <div className="border-t my-2"></div>
                                <li>
                                    <button onClick={handleLogOut} className="text-red-500">
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <Link to="/login" className="btn button btn-sm sm:btn-md">
                            LogIn
                        </Link>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Navbar;
