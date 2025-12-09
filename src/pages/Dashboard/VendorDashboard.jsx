import React, { useEffect, useState } from 'react';
import { FaHistory, FaRegUserCircle, FaTicketAlt } from 'react-icons/fa';
import { MdAssignmentTurnedIn, MdBookmarkAdded, MdHistory, MdOutlineAnalytics, MdPendingActions } from "react-icons/md";
import { VscDiffAdded } from "react-icons/vsc";
import { Link, NavLink, Outlet } from 'react-router';
import logo from "../../assets/logo.png"
import logoWhite from "../../assets/logo-white.png"

const VendorDashboard = () => {

    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        const interval = setInterval(() => {
            const currentTheme = localStorage.getItem("theme");
            if (currentTheme !== theme) {
                setTheme(currentTheme);
            }
        }, 300);

        return () => clearInterval(interval);
    }, [theme]);

    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Navbar */}
                    <nav className="navbar w-full bg-base-300">
                        <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            {/* Sidebar toggle icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                        </label>
                        <div className="px-1">
                            <div className='w-30'>
                                {
                                    theme === "dark" ?
                                        <Link to={`/`} className='w-30'><img src={logoWhite} alt="" /></Link>
                                        :
                                        <Link to={`/`} className='w-30'><img src={logo} alt="" /></Link>
                                }
                            </div>
                        </div>
                    </nav>
                    {/* Page content here */}
                    <Outlet></Outlet>
                    {/* <div className="p-4">Page Content vendor</div> */}
                </div>

                <div className="drawer-side is-drawer-close:overflow-visible">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                        {/* Sidebar content here */}
                        <ul className="menu w-full grow">

                            {/* Home Page */}
                            <li>
                                <Link to={`/`} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                    {/* Home icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                                    <span className="is-drawer-close:hidden">Homepage</span>
                                </Link>
                            </li>

                            {/* Vendor Profile */}
                            <li>
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Vendor Profile">
                                    {/* Profile icon */}
                                    <FaRegUserCircle className='size-4 my-1.5 inline-block' />
                                    <span className="is-drawer-close:hidden">Vendor Profile</span>
                                </button>
                            </li>

                            {/* Add Ticket */}
                            <li>
                                <NavLink to={`/dashboard/add-tickets`} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Add Ticket">
                                    {/* Add Ticket icon */}
                                    <VscDiffAdded className='size-4 my-1.5 inline-block' />
                                    <span className="is-drawer-close:hidden">Add Ticket</span>
                                </NavLink>
                            </li>

                            {/* My Added Tickets */}
                            <li>
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Added Tickets">
                                    {/* My Added Tickets icon */}
                                    <FaTicketAlt className='size-4 my-1.5 inline-block' />
                                    <span className="is-drawer-close:hidden">My Added Tickets</span>
                                </button>
                            </li>

                            {/* Requested Bookings */}
                            <li>
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Requested Bookings">
                                    {/* Requested Bookings icon */}
                                    <MdAssignmentTurnedIn className='size-4 my-1.5 inline-block' />
                                    <span className="is-drawer-close:hidden">Requested Bookings</span>
                                </button>
                            </li>

                            {/* Revenue Overview */}
                            <li>
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Revenue Overview">
                                    {/* Revenue Overview icon */}
                                    <MdOutlineAnalytics className='size-4 my-1.5 inline-block' />
                                    <span className="is-drawer-close:hidden">Revenue Overview</span>
                                </button>
                            </li>

                            {/* List item */}
                            <li>
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                                    {/* Settings icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
                                    <span className="is-drawer-close:hidden">Settings</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorDashboard;