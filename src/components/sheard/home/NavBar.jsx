import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import Logo from '../../../assets/logo.png'
import LogoWhite from '../../../assets/logo-white.png'
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';

const Navbar = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const { user, logOutUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const html = document.querySelector("html");
        html.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);


    const handleTheme = (checked) => {
        setTheme(checked ? "dark" : "light");
    };

    const links = <>
        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'/all-tickets'}>All Tickets</NavLink></li>
        <li><NavLink to={'/dashboard'}>Dashboard</NavLink></li>
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
        <div className=' shadow-sm '>
            <div className="navbar max-w-11/12 mx-auto ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>

                    {
                        theme === "dark" ?
                            <Link to={'/'}>
                                <img className='w-40' src={LogoWhite} alt="Logo" />
                            </Link>
                            :
                            <Link to={'/'}>
                                <img className='w-40' src={Logo} alt="Logo" />
                            </Link>
                    }


                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                {/* <div className="navbar-end">
                    <div>
                        <label className="toggle text-base-content mr-3">
                            <input
                                onChange={(e) => handleTheme(e.target.checked)}
                                type="checkbox"
                                defaultChecked={localStorage.getItem('theme') === "dark"}
                                className="theme-controller" />

                            <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></g></svg>

                            <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></g></svg>

                        </label>
                    </div>
                    {
                        user ?
                            <Link onClick={handleLogOut} className="button btn">LogOut</Link>
                            :
                            <Link to={`/login`} className="button btn">LogIn</Link>
                    }
                </div> */}

                <div className="navbar-end">

                    <div>
                        <label className="toggle text-base-content mr-3">
                            <input
                                onChange={(e) => handleTheme(e.target.checked)}
                                type="checkbox"
                                defaultChecked={localStorage.getItem('theme') === "dark"}
                                className="theme-controller"
                            />
                            <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></g></svg>
                            <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></g></svg>
                        </label>
                    </div>

                    {user ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="flex items-center gap-2 cursor-pointer">
                                <img
                                    src={user?.photoURL}
                                    className="w-10 h-10 rounded-full border object-cover"
                                    alt="avatar"
                                />
                                <span className="font-medium">{user?.displayName}</span>
                                <svg width="16" height="16">
                                    <path d="M4 6l4 4 4-4" stroke="currentColor" fill="none" />
                                </svg>
                            </div>

                            <ul
                                tabIndex={0}
                                className="dropdown-content menu p-4 shadow-lg bg-base-100 rounded-lg w-52 z-10"
                            >
                                <li>
                                    <Link to="/profile">
                                        <i className="fa-regular fa-user"></i> Profile
                                    </Link>
                                </li>
                                {/* <li>
                                    <Link to="/calendar">
                                        <i className="fa-regular fa-calendar"></i> Calendar
                                    </Link>
                                </li> */}
                                {/* <li>
                                    <Link to="/settings">
                                        <i className="fa-solid fa-sliders"></i> Settings
                                    </Link>
                                </li> */}
                                <div className="border-t my-2"></div>
                                <li>
                                    <button onClick={handleLogOut} className="text-red-500">
                                        <i className="fa-solid fa-power-off"></i> Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <Link to="/login" className="button btn">LogIn</Link>
                    )}

                </div>

            </div>
        </div>
    );
};

export default Navbar;