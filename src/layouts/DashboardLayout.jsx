import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { FaRegUserCircle, FaTicketAlt, FaUsersCog } from 'react-icons/fa';
import { MdBookmarkAdded, MdHistory, MdAssignmentTurnedIn, MdOutlineAnalytics, MdCampaign, MdConfirmationNumber } from "react-icons/md";
import { VscDiffAdded } from "react-icons/vsc";
import logo from "../assets/logo.png";
import logoWhite from "../assets/logo-white.png";
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../components/sheard/loading/Loading';
import useAuth from '../hooks/useAuth';
import { Toaster } from 'react-hot-toast';

const DashboardLayout = () => {
    const { user } = useAuth();
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.querySelector("html").setAttribute("data-theme", savedTheme);
        const interval = setInterval(() => {
            const currentTheme = localStorage.getItem("theme");
            if (currentTheme !== theme) {
                setTheme(currentTheme);
            }
        }, 300);

        return () => clearInterval(interval);
    }, [theme]);



    // user profile data
    const { data: dbUser = {}, isLoading } = useQuery({
        queryKey: ["user", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    })

    const role = dbUser?.role;

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

            {/* ================= CONTENT ================= */}
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full bg-base-300">
                    <label htmlFor="my-drawer-4" className="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                            strokeLinejoin="round" strokeLinecap="round"
                            strokeWidth="2" fill="none" stroke="currentColor"
                            className="my-1.5 inline-block size-4">
                            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                            <path d="M9 4v16" />
                            <path d="M14 10l2 2l-2 2" />
                        </svg>
                    </label>

                    <div className="px-1">
                        <div className="w-30">
                            {
                                theme === "dark" ?
                                    <Link to={`/`} className='w-30'><img src={logoWhite} alt="" /></Link>
                                    :
                                    <Link to={`/`} className='w-30'><img src={logo} alt="" /></Link>
                            }
                        </div>
                    </div>
                </nav>

                {/* Page Content */}
                <Outlet />
            </div>

           
            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

                <div className="flex min-h-full flex-col items-start bg-base-200
                                is-drawer-close:w-14 is-drawer-open:w-64">

                    <ul className="menu w-full grow">

                        {/* ---------- COMMON ---------- */}
                        <li>
                            <NavLink
                                to="/"
                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                data-tip="Homepage"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2" stroke="currentColor"
                                    fill="none"
                                    className="my-1.5 inline-block size-4">
                                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                                    <path d="M3 10l9-7l9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                </svg>
                                <span className="is-drawer-close:hidden">Homepage</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to={`profile`}
                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                data-tip="Profile"
                            >
                                <FaRegUserCircle className="size-4 my-1.5 inline-block" />
                                <span className="is-drawer-close:hidden">Profile</span>
                            </NavLink>
                        </li>

                        {/* ---------- USER ---------- */}
                        {role === "user" && (
                            <>
                                <li>
                                    <NavLink
                                        to="my-booked-tickets"
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                        data-tip="My Booked Tickets"
                                    >
                                        <MdBookmarkAdded className="size-4 my-1.5 inline-block" />
                                        <span className="is-drawer-close:hidden">My Booked Tickets</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="transaction-history"
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                        data-tip="Transaction History"
                                    >
                                        <MdHistory className="size-4 my-1.5 inline-block" />
                                        <span className="is-drawer-close:hidden">Transaction History</span>
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* ---------- VENDOR ---------- */}
                        {role === "vendor" && (
                            <>
                                <li>
                                    <NavLink to="add-tickets"
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                        data-tip="Add Ticket">
                                        <VscDiffAdded className="size-4 my-1.5 inline-block" />
                                        <span className="is-drawer-close:hidden">Add Ticket</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="my-added-tickets"
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                        data-tip="My Added Tickets">
                                        <FaTicketAlt className="size-4 my-1.5 inline-block" />
                                        <span className="is-drawer-close:hidden">My Added Tickets</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="requested-bookings"
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                        data-tip="Requested Bookings">
                                        <MdAssignmentTurnedIn className="size-4 my-1.5 inline-block" />
                                        <span className="is-drawer-close:hidden">Requested Bookings</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="revenue-overview"
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                        data-tip="Revenue Overview">
                                        <MdOutlineAnalytics className="size-4 my-1.5 inline-block" />
                                        <span className="is-drawer-close:hidden">Revenue Overview</span>
                                    </NavLink>
                                </li>
                            </>
                        )}
                        {/* ---------- VENDOR ---------- */}
                        {role === "admin" && (
                            <>
                                <li>
                                    <NavLink to="manage-tickets"
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                        data-tip="Manage Tickets">
                                        <MdConfirmationNumber className="size-4 my-1.5 inline-block" />
                                        <span className="is-drawer-close:hidden">Manage Tickets</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="manage-users"
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                        data-tip="Manage Users">
                                        <FaUsersCog className="size-4 my-1.5 inline-block" />
                                        <span className="is-drawer-close:hidden">Manage Users</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="advertise-tickets"
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                        data-tip="Advertise Tickets">
                                        <MdCampaign className="size-4 my-1.5 inline-block" />
                                        <span className="is-drawer-close:hidden">Advertise Tickets</span>
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>

            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toasterId="default"
                toastOptions={{
                    className: '',
                    duration: 2000,
                    removeDelay: 1000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },

                    success: {
                        duration: 3000,
                        iconTheme: {
                            primary: 'green',
                            secondary: 'black',
                        },
                    },
                }}
            />
        </div>
    );
};

export default DashboardLayout;

