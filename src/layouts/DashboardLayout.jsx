import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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

    // Navigation items based on role
    const getNavigationItems = () => {
        const commonItems = [
            {
                to: "/",
                icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" className="w-5 h-5">
                        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                        <path d="M3 10l9-7l9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    </svg>
                ),
                label: "Homepage",
                badge: null
            },
            {
                to: "/dashboard",
                icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" className="w-5 h-5">
                        <rect x="3" y="3" width="7" height="7"></rect>
                        <rect x="14" y="3" width="7" height="7"></rect>
                        <rect x="14" y="14" width="7" height="7"></rect>
                        <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                ),
                label: "Dashboard",
                badge: null
            },
            {
                to: "profile",
                icon: <FaRegUserCircle className="w-5 h-5" />,
                label: "Profile",
                badge: null
            }
        ];

        const roleItems = {
            user: [
                {
                    to: "my-booked-tickets",
                    icon: <MdBookmarkAdded className="w-5 h-5" />,
                    label: "My Booked Tickets",
                    badge: null
                },
                {
                    to: "transaction-history",
                    icon: <MdHistory className="w-5 h-5" />,
                    label: "Transaction History",
                    badge: null
                }
            ],
            vendor: [
                {
                    to: "add-tickets",
                    icon: <VscDiffAdded className="w-5 h-5" />,
                    label: "Add Ticket",
                    badge: null
                },
                {
                    to: "my-added-tickets",
                    icon: <FaTicketAlt className="w-5 h-5" />,
                    label: "My Added Tickets",
                    badge: null
                },
                {
                    to: "requested-bookings",
                    icon: <MdAssignmentTurnedIn className="w-5 h-5" />,
                    label: "Requested Bookings",
                    badge: "New"
                },
                {
                    to: "revenue-overview",
                    icon: <MdOutlineAnalytics className="w-5 h-5" />,
                    label: "Revenue Overview",
                    badge: null
                }
            ],
            admin: [
                {
                    to: "manage-tickets",
                    icon: <MdConfirmationNumber className="w-5 h-5" />,
                    label: "Manage Tickets",
                    badge: null
                },
                {
                    to: "manage-users",
                    icon: <FaUsersCog className="w-5 h-5" />,
                    label: "Manage Users",
                    badge: null
                },
                {
                    to: "advertise-tickets",
                    icon: <MdCampaign className="w-5 h-5" />,
                    label: "Advertise Tickets",
                    badge: null
                }
            ]
        };

        return [...commonItems, ...(roleItems[role] || [])];
    };

    const navigationItems = getNavigationItems();

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

            {/* ================= CONTENT ================= */}
            <div className="drawer-content flex flex-col">
                {/* Enhanced Navbar */}
                <motion.nav 
                    className="navbar bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-40"
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex-1">
                        <label htmlFor="my-drawer-4" className="btn btn-ghost btn-circle lg:hidden hover:bg-secondary-content/10">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="w-6 h-6">
                                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                                <path d="M9 4v16" />
                                <path d="M14 10l2 2l-2 2" />
                            </svg>
                        </label>

                        {/* <Link to="/" className="ml-2 hover:opacity-80 transition-opacity">
                            <img 
                                src={theme === "dark" ? logoWhite : logo} 
                                alt="TicketBari Logo" 
                                className="h-8 w-auto"
                            />
                        </Link> */}
                    </div>

                    {/* User Info */}
                    <div className="flex-none">
                        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-base-200/50 hover:bg-base-200 transition-colors">
                            <img
                                src={dbUser?.photoURL}
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full border-2 border-secondary-content/20 object-cover"
                            />
                            <div className="block min-w-0 flex-1">
                                <div className="text-sm font-semibold truncate">{dbUser?.displayName}</div>
                                <div className="text-xs text-gray-500 capitalize truncate">{role}</div>
                            </div>
                        </div>
                    </div>
                </motion.nav>

                {/* Page Content with Animation */}
                <motion.div 
                    className="flex-1 bg-gradient-to-br from-base-100 via-base-50 to-base-200/30 min-h-screen"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Outlet />
                </motion.div>
            </div>

            {/* ================= ENHANCED SIDEBAR ================= */}
            <div className="drawer-side">
                <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

                <motion.div 
                    className="flex flex-col h-full w-64 sm:w-72 lg:w-64 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-r border-gray-200 dark:border-gray-700 shadow-xl"
                    initial={{ x: -300 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    {/* Sidebar Header */}
                    <div className="flex-shrink-0 p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-secondary-content to-secondary-content/80 rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-lg">
                                    {dbUser?.displayName?.charAt(0) || 'U'}
                                </span>
                            </div>
                            <div className="min-w-0 flex-1">
                                <h3 className="font-semibold text-gray-800 dark:text-gray-200 truncate">
                                    {dbUser?.displayName}
                                </h3>
                                <p className="text-sm text-gray-500 capitalize truncate">{role} Dashboard</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Menu - Scrollable */}
                    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                        <div className="p-3 sm:p-4 pb-6">
                            <nav className="space-y-1 sm:space-y-2">
                                {navigationItems.map((item, index) => (
                                    <motion.div
                                        key={item.to}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                    >
                                        <NavLink
                                            to={item.to}
                                            end={item.to === "/dashboard"}
                                            className={({ isActive }) =>
                                                `flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                                                    isActive
                                                        ? 'bg-gradient-to-r from-secondary-content to-secondary-content/90 text-white shadow-lg'
                                                        : 'text-gray-600 dark:text-gray-300 hover:bg-secondary-content/10 hover:text-secondary-content'
                                                }`
                                            }
                                        >
                                            {/* Background Animation */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-secondary-content/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            
                                            {/* Icon */}
                                            <div className="relative z-10 flex-shrink-0">
                                                {item.icon}
                                            </div>
                                            
                                            {/* Label */}
                                            <span className="relative z-10 font-medium text-sm sm:text-base truncate flex-1">
                                                {item.label}
                                            </span>
                                            
                                            {/* Badge */}
                                            {item.badge && (
                                                <span className="relative z-10 ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium flex-shrink-0">
                                                    {item.badge}
                                                </span>
                                            )}
                                        </NavLink>
                                    </motion.div>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Sidebar Footer - Fixed at bottom */}
                    <div className="flex-shrink-0 p-3 sm:p-4 border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-slate-900/50">
                        <motion.div 
                            className="bg-gradient-to-r from-secondary-content/10 to-primary-content/10 rounded-xl p-3 sm:p-4 shadow-sm"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                        >
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-secondary-content/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-secondary-content">
                                        <circle cx="12" cy="12" r="10"/>
                                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                                        <path d="M12 17h.01"/>
                                    </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-200 mb-1">
                                        Need Help?
                                    </h4>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
                                        Contact our support team for assistance
                                    </p>
                                    <Link 
                                        to="/contact" 
                                        className="inline-flex items-center justify-center gap-2 text-xs bg-secondary-content text-white px-3 py-2 rounded-lg hover:bg-secondary-content/90 transition-all duration-200 font-medium shadow-sm hover:shadow-md w-full sm:w-auto"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                                        </svg>
                                        Get Support
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Enhanced Toast Notifications */}
            <Toaster
                position="top-right"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toasterId="default"
                toastOptions={{
                    className: 'backdrop-blur-md',
                    duration: 4000,
                    style: {
                        background: 'rgba(255, 255, 255, 0.9)',
                        color: '#374151',
                        border: '1px solid rgba(229, 231, 235, 0.5)',
                        borderRadius: '12px',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    },
                    success: {
                        duration: 3000,
                        style: {
                            background: 'rgba(34, 197, 94, 0.1)',
                            color: '#15803d',
                            border: '1px solid rgba(34, 197, 94, 0.2)',
                        },
                        iconTheme: {
                            primary: '#22c55e',
                            secondary: '#ffffff',
                        },
                    },
                    error: {
                        style: {
                            background: 'rgba(239, 68, 68, 0.1)',
                            color: '#dc2626',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                        },
                        iconTheme: {
                            primary: '#ef4444',
                            secondary: '#ffffff',
                        },
                    },
                }}
            />
        </div>
    );
};

export default DashboardLayout;
