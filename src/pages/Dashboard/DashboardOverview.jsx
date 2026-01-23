import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import {
    FaUsers,
    FaTicketAlt,
    FaChartLine,
    FaDollarSign,
    FaEye,
    FaClock,
    FaCheckCircle,
    FaTimesCircle,
    FaUserShield,
    FaStore,
    FaBullhorn,
    FaCalendarAlt
} from 'react-icons/fa';
import { MdDashboard, MdTrendingUp, MdPendingActions } from 'react-icons/md';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import Loading from '../../components/sheard/loading/Loading';

const DashboardOverview = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    // Fetch user data
    const { data: dbUser = {}, isLoading: userLoading } = useQuery({
        queryKey: ["user", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });

    // Fetch all users for admin stats
    const { data: allUsers = [] } = useQuery({
        queryKey: ["allUsers"],
        enabled: dbUser?.role === 'admin',
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    // Fetch all tickets for stats
    const { data: allTickets = [] } = useQuery({
        queryKey: ["allTickets"],
        enabled: !!dbUser?.role,
        queryFn: async () => {
            if (dbUser.role === 'admin') {
                const res = await axiosSecure.get('/tickets/admin');
                return res.data;
            } else if (dbUser.role === 'vendor') {
                const res = await axiosSecure.get('/tickets');
                return res.data.filter(ticket => ticket.vendorEmail === user.email);
            } else {
                const res = await axiosSecure.get('/tickets');
                return res.data;
            }
        }
    });

    const role = dbUser?.role;

    if (userLoading) {
        return <Loading />;
    }

    // Calculate dashboard stats from real data
    const getDashboardStats = () => {
        switch (role) {
            case 'admin': {
                const totalUsers = allUsers.length;
                const totalTickets = allTickets.length;
                const pendingTickets = allTickets.filter(ticket => ticket.adminStatus === 'pending').length;
                const activeVendors = allUsers.filter(user => user.role === 'vendor' && !user.isFraud).length;

                return {
                    totalUsers,
                    totalTickets,
                    pendingTickets,
                    activeVendors
                };
            }

            case 'vendor': {
                const myTickets = allTickets.length;
                const approvedTickets = allTickets.filter(ticket => ticket.adminStatus === 'approved').length;

                return {
                    myTickets,
                    approvedTickets,
                    totalRevenue: myTickets * 1500, // Mock calculation
                    monthlyRevenue: approvedTickets * 500 // Mock calculation
                };
            }

            case 'user':
            default:
                return {
                    myBookings: 0, // Would need bookings API
                    totalSpent: 0,
                    completedTrips: 0,
                    upcomingTrips: 0
                };
        }
    };

    const dashboardStats = getDashboardStats();

    // Helper function to calculate time ago
    const getTimeAgo = (dateString) => {
        if (!dateString) return 'Recently';

        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return `${diffInHours} hours ago`;

        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `${diffInDays} days ago`;

        const diffInWeeks = Math.floor(diffInDays / 7);
        return `${diffInWeeks} weeks ago`;
    };

    // Generate recent activities from real data
    const getRecentActivities = () => {
        const activities = [];

        switch (role) {
            case 'admin': {
                // Recent user registrations
                const recentUsers = allUsers
                    .sort((a, b) => new Date(b.createdAt || Date.now()) - new Date(a.createdAt || Date.now()))
                    .slice(0, 2);

                recentUsers.forEach(user => {
                    activities.push({
                        title: "New user registered",
                        description: `${user.displayName} joined as ${user.role}`,
                        time: getTimeAgo(user.createdAt),
                        icon: FaUsers,
                        iconColor: "text-blue-600",
                        bgColor: "bg-blue-100 dark:bg-blue-900/30"
                    });
                });

                // Recent ticket submissions
                const recentTickets = allTickets
                    .sort((a, b) => new Date(b.createdAt || Date.now()) - new Date(a.createdAt || Date.now()))
                    .slice(0, 2);

                recentTickets.forEach(ticket => {
                    activities.push({
                        title: `Ticket ${ticket.adminStatus}`,
                        description: `${ticket.title} - ${ticket.from} to ${ticket.to}`,
                        time: getTimeAgo(ticket.createdAt),
                        icon: ticket.adminStatus === 'approved' ? FaCheckCircle : FaTimesCircle,
                        iconColor: ticket.adminStatus === 'approved' ? "text-green-600" : "text-red-600",
                        bgColor: ticket.adminStatus === 'approved' ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"
                    });
                });
                break;
            }

            case 'vendor': {
                // Recent ticket submissions
                const vendorRecentTickets = allTickets
                    .sort((a, b) => new Date(b.createdAt || Date.now()) - new Date(a.createdAt || Date.now()))
                    .slice(0, 3);

                vendorRecentTickets.forEach(ticket => {
                    activities.push({
                        title: ticket.adminStatus === 'approved' ? "Ticket approved" : "Ticket submitted",
                        description: `${ticket.title} - ${ticket.from} to ${ticket.to}`,
                        time: getTimeAgo(ticket.createdAt),
                        icon: ticket.adminStatus === 'approved' ? FaCheckCircle : FaTicketAlt,
                        iconColor: ticket.adminStatus === 'approved' ? "text-green-600" : "text-blue-600",
                        bgColor: ticket.adminStatus === 'approved' ? "bg-green-100 dark:bg-green-900/30" : "bg-blue-100 dark:bg-blue-900/30"
                    });
                });
                break;
            }

            case 'user':
            default: {
                // For users, show general platform activities since we don't have booking data
                const userRecentTickets = allTickets
                    .filter(ticket => ticket.adminStatus === 'approved')
                    .sort((a, b) => new Date(b.createdAt || Date.now()) - new Date(a.createdAt || Date.now()))
                    .slice(0, 3);

                userRecentTickets.forEach(ticket => {
                    activities.push({
                        title: "New ticket available",
                        description: `${ticket.title} - ${ticket.from} to ${ticket.to}`,
                        time: getTimeAgo(ticket.createdAt),
                        icon: FaTicketAlt,
                        iconColor: "text-green-600",
                        bgColor: "bg-green-100 dark:bg-green-900/30"
                    });
                });
                break;
            }
        }

        return activities.slice(0, 6);
    };

    const recentActivities = getRecentActivities();

    // Get role-specific stats cards
    const getStatsCards = () => {
        switch (role) {
            case 'admin':
                return [
                    {
                        title: "Total Users",
                        value: dashboardStats.totalUsers?.toLocaleString() || 0,
                        icon: FaUsers,
                        color: "bg-blue-500",
                        bgColor: "bg-blue-100 dark:bg-blue-900/30",
                        change: "+5.2%",
                        changeType: "positive"
                    },
                    {
                        title: "Total Tickets",
                        value: dashboardStats.totalTickets?.toLocaleString() || 0,
                        icon: FaTicketAlt,
                        color: "bg-purple-500",
                        bgColor: "bg-purple-100 dark:bg-purple-900/30",
                        change: "+12.8%",
                        changeType: "positive"
                    },
                    {
                        title: "Pending Approvals",
                        value: dashboardStats.pendingTickets || 0,
                        icon: MdPendingActions,
                        color: "bg-yellow-500",
                        bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
                        change: dashboardStats.pendingTickets > 0 ? "+2.1%" : "0%",
                        changeType: dashboardStats.pendingTickets > 0 ? "positive" : "neutral"
                    },
                    {
                        title: "Active Vendors",
                        value: dashboardStats.activeVendors || 0,
                        icon: FaStore,
                        color: "bg-green-500",
                        bgColor: "bg-green-100 dark:bg-green-900/30",
                        change: "+3.7%",
                        changeType: "positive"
                    }
                ];

            case 'vendor':
                return [
                    {
                        title: "My Tickets",
                        value: dashboardStats.myTickets || 0,
                        icon: FaTicketAlt,
                        color: "bg-blue-500",
                        bgColor: "bg-blue-100 dark:bg-blue-900/30",
                        change: "+15.3%",
                        changeType: "positive"
                    },
                    {
                        title: "Approved Tickets",
                        value: dashboardStats.approvedTickets || 0,
                        icon: FaCheckCircle,
                        color: "bg-green-500",
                        bgColor: "bg-green-100 dark:bg-green-900/30",
                        change: "+22.1%",
                        changeType: "positive"
                    },
                    {
                        title: "Estimated Revenue",
                        value: `৳ ${dashboardStats.totalRevenue?.toLocaleString() || 0}`,
                        icon: FaDollarSign,
                        color: "bg-green-500",
                        bgColor: "bg-green-100 dark:bg-green-900/30",
                        change: "+12.5%",
                        changeType: "positive"
                    },
                    {
                        title: "Monthly Estimate",
                        value: `৳ ${dashboardStats.monthlyRevenue?.toLocaleString() || 0}`,
                        icon: FaChartLine,
                        color: "bg-blue-500",
                        bgColor: "bg-blue-100 dark:bg-blue-900/30",
                        change: "+8.2%",
                        changeType: "positive"
                    }
                ];

            case 'user':
            default:
                return [
                    {
                        title: "Available Tickets",
                        value: allTickets.filter(t => t.adminStatus === 'approved').length || 0,
                        icon: FaTicketAlt,
                        color: "bg-blue-500",
                        bgColor: "bg-blue-100 dark:bg-blue-900/30",
                        change: "+25.0%",
                        changeType: "positive"
                    },
                    {
                        title: "My Bookings",
                        value: dashboardStats.myBookings || 0,
                        icon: FaCheckCircle,
                        color: "bg-green-500",
                        bgColor: "bg-green-100 dark:bg-green-900/30",
                        change: "+18.5%",
                        changeType: "positive"
                    },
                    {
                        title: "Total Routes",
                        value: new Set(allTickets.filter(t => t.adminStatus === 'approved').map(t => `${t.from}-${t.to}`)).size || 0,
                        icon: FaStore,
                        color: "bg-purple-500",
                        bgColor: "bg-purple-100 dark:bg-purple-900/30",
                        change: "+12.3%",
                        changeType: "positive"
                    },
                    {
                        title: "Active Vendors",
                        value: allUsers.filter(u => u.role === 'vendor' && !u.isFraud).length || 0,
                        icon: FaUsers,
                        color: "bg-orange-500",
                        bgColor: "bg-orange-100 dark:bg-orange-900/30",
                        change: "+5.7%",
                        changeType: "positive"
                    }
                ];
        }
    };

    const statsCards = getStatsCards();

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    // Get welcome message based on role
    const getWelcomeMessage = () => {
        const timeOfDay = new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening';

        switch (role) {
            case 'admin':
                return {
                    greeting: `Good ${timeOfDay}, Admin!`,
                    message: "Here's your platform overview and key metrics."
                };
            case 'vendor':
                return {
                    greeting: `Good ${timeOfDay}, ${dbUser.displayName}!`,
                    message: "Track your ticket sales and manage your business."
                };
            case 'user':
            default:
                return {
                    greeting: `Good ${timeOfDay}, ${dbUser.displayName}!`,
                    message: "Welcome back to your travel dashboard."
                };
        }
    };

    const welcomeMessage = getWelcomeMessage();

    return (
        <motion.div
            className="p-6 lg:p-8 max-w-7xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Header */}
            <motion.div
                className="mb-8"
                variants={itemVariants}
            >
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-secondary-content to-secondary-content/80 rounded-xl flex items-center justify-center">
                        <MdDashboard className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-secondary-content">
                            {welcomeMessage.greeting}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            {welcomeMessage.message}
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                variants={itemVariants}
            >
                {statsCards.map((stat, index) => (
                    <motion.div
                        key={index}
                        className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all duration-300"
                        whileHover={{ y: -5 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                                <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                            </div>
                            <div className={`flex items-center gap-1 text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                                }`}>
                                <MdTrendingUp className="w-3 h-3" />
                                {stat.change}
                            </div>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1">
                                {stat.value}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {stat.title}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Recent Activities */}
                <motion.div
                    className="lg:col-span-2"
                    variants={itemVariants}
                >
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                                Recent Activities
                            </h3>
                            <FaClock className="w-5 h-5 text-gray-400" />
                        </div>

                        <div className="space-y-4">
                            {recentActivities.length > 0 ? (
                                recentActivities.slice(0, 6).map((activity, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-slate-800 rounded-xl"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                    >
                                        <div className={`w-10 h-10 ${activity.bgColor} rounded-full flex items-center justify-center`}>
                                            <activity.icon className={`w-5 h-5 ${activity.iconColor}`} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-800 dark:text-gray-200">
                                                {activity.title}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {activity.description}
                                            </p>
                                        </div>
                                        <span className="text-xs text-gray-500">
                                            {activity.time}
                                        </span>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <FaClock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500">No recent activities</p>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    className="lg:col-span-1"
                    variants={itemVariants}
                >
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                            Quick Actions
                        </h3>

                        <div className="space-y-3">
                            {role === 'admin' && (
                                <>
                                    <button className="w-full flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-xl transition-colors text-left">
                                        <FaUsers className="w-5 h-5 text-blue-600" />
                                        <span className="font-medium text-gray-800 dark:text-gray-200">Manage Users</span>
                                    </button>
                                    <button className="w-full flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-xl transition-colors text-left">
                                        <FaTicketAlt className="w-5 h-5 text-purple-600" />
                                        <span className="font-medium text-gray-800 dark:text-gray-200">Manage Tickets</span>
                                    </button>
                                    <button className="w-full flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-xl transition-colors text-left">
                                        <FaBullhorn className="w-5 h-5 text-green-600" />
                                        <span className="font-medium text-gray-800 dark:text-gray-200">Advertise Tickets</span>
                                    </button>
                                </>
                            )}

                            {role === 'vendor' && (
                                <>
                                    <button className="w-full flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-xl transition-colors text-left">
                                        <FaTicketAlt className="w-5 h-5 text-blue-600" />
                                        <span className="font-medium text-gray-800 dark:text-gray-200">Add New Ticket</span>
                                    </button>
                                    <button className="w-full flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-xl transition-colors text-left">
                                        <FaChartLine className="w-5 h-5 text-green-600" />
                                        <span className="font-medium text-gray-800 dark:text-gray-200">View Revenue</span>
                                    </button>
                                    <button className="w-full flex items-center gap-3 p-4 bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/30 rounded-xl transition-colors text-left">
                                        <FaEye className="w-5 h-5 text-orange-600" />
                                        <span className="font-medium text-gray-800 dark:text-gray-200">My Tickets</span>
                                    </button>
                                </>
                            )}

                            {role === 'user' && (
                                <>
                                    <button className="w-full flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-xl transition-colors text-left">
                                        <FaTicketAlt className="w-5 h-5 text-blue-600" />
                                        <span className="font-medium text-gray-800 dark:text-gray-200">Browse Tickets</span>
                                    </button>
                                    <button className="w-full flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-xl transition-colors text-left">
                                        <FaEye className="w-5 h-5 text-green-600" />
                                        <span className="font-medium text-gray-800 dark:text-gray-200">My Bookings</span>
                                    </button>
                                    <button className="w-full flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-xl transition-colors text-left">
                                        <FaDollarSign className="w-5 h-5 text-purple-600" />
                                        <span className="font-medium text-gray-800 dark:text-gray-200">Transaction History</span>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default DashboardOverview;