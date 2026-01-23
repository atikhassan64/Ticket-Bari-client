import React from 'react';
import { motion } from 'framer-motion';
import { 
    FaDollarSign, 
    FaTicketAlt, 
    FaChartLine, 
    FaCalendarAlt,
    FaUsers,
    FaEye
} from 'react-icons/fa';
import { MdTrendingUp } from 'react-icons/md';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import Loading from '../../components/sheard/loading/Loading';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    Area,
    AreaChart
} from 'recharts';

const COLORS = ['#17a34a', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

const RevenueOverview = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: bookings = [], isLoading: bookingLoading } = useQuery({
        queryKey: ['revenueBookings', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/ticket-booked');
            return res.data;
        },
        enabled: !!user?.email,
    });

    const { data: tickets = [], isLoading: ticketLoading } = useQuery({
        queryKey: ['vendorTickets', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/tickets');
            return res.data;
        },
        enabled: !!user?.email,
    });

    if (bookingLoading || ticketLoading) return <Loading />;

    // Filter vendor-specific data
    const vendorTickets = tickets.filter(t => t.vendorEmail === user?.email);
    const vendorBookings = bookings.filter(b => b.vendorEmail === user?.email);
    const acceptedBookings = vendorBookings.filter(b => b.status === 'accepted' || b.status === 'paid');

    // Calculate metrics
    const totalRevenue = acceptedBookings.reduce(
        (sum, b) => sum + (b.totalPrice || b.price * b.bookingQty),
        0
    );

    const totalTicketsSold = acceptedBookings.reduce(
        (sum, b) => sum + b.bookingQty,
        0
    );

    const totalTicketsAdded = vendorTickets.length;
    const pendingBookings = vendorBookings.filter(b => b.status === 'pending').length;
    const averageTicketPrice = totalTicketsSold > 0 ? Math.round(totalRevenue / totalTicketsSold) : 0;

    // Prepare chart data
    const monthlyData = [];
    const last6Months = [];
    const currentDate = new Date();
    
    for (let i = 5; i >= 0; i--) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
        const monthName = date.toLocaleDateString('en-US', { month: 'short' });
        last6Months.push({
            month: monthName,
            revenue: Math.floor(Math.random() * 5000) + 1000, // Mock data for demo
            bookings: Math.floor(Math.random() * 50) + 10
        });
    }

    const barData = [
        { name: 'Revenue', value: totalRevenue, color: '#17a34a' },
        { name: 'Tickets Sold', value: totalTicketsSold, color: '#3b82f6' },
        { name: 'Tickets Added', value: totalTicketsAdded, color: '#f59e0b' },
        { name: 'Pending', value: pendingBookings, color: '#ef4444' }
    ];

    const pieData = [
        { name: 'Sold Tickets', value: totalTicketsSold, color: '#17a34a' },
        { name: 'Available Tickets', value: Math.max(0, totalTicketsAdded - totalTicketsSold), color: '#3b82f6' }
    ];

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
                    <div className="w-12 h-12 bg-gradient-to-br from-secondary-content to-secondary-content/80 rounded-xl flex items-center justify-center">
                        <FaChartLine className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-secondary-content">
                            Revenue Overview
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Track your business performance and earnings
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                variants={itemVariants}
            >
                {[
                    {
                        title: "Total Revenue",
                        value: `$${totalRevenue.toLocaleString()}`,
                        icon: FaDollarSign,
                        color: "bg-green-500",
                        bgColor: "bg-green-100 dark:bg-green-900/30",
                        change: "+12.5%",
                        changeType: "positive"
                    },
                    {
                        title: "Tickets Sold",
                        value: totalTicketsSold.toLocaleString(),
                        icon: FaTicketAlt,
                        color: "bg-blue-500",
                        bgColor: "bg-blue-100 dark:bg-blue-900/30",
                        change: "+8.2%",
                        changeType: "positive"
                    },
                    {
                        title: "Total Tickets",
                        value: totalTicketsAdded.toLocaleString(),
                        icon: FaEye,
                        color: "bg-purple-500",
                        bgColor: "bg-purple-100 dark:bg-purple-900/30",
                        change: "+15.3%",
                        changeType: "positive"
                    },
                    {
                        title: "Avg. Price",
                        value: `$${averageTicketPrice}`,
                        icon: MdTrendingUp,
                        color: "bg-orange-500",
                        bgColor: "bg-orange-100 dark:bg-orange-900/30",
                        change: "+5.7%",
                        changeType: "positive"
                    }
                ].map((stat, index) => (
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
                            <div className={`flex items-center gap-1 text-sm font-medium ${
                                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
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

            {/* Charts Section */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
                {/* Revenue Trend */}
                <motion.div 
                    className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6"
                    variants={itemVariants}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                            <FaChartLine className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                                Revenue Trend
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Last 6 months performance
                            </p>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={last6Months}>
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#17a34a" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#17a34a" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis 
                                dataKey="month" 
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: '#6b7280' }}
                            />
                            <YAxis 
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: '#6b7280' }}
                            />
                            <Tooltip 
                                contentStyle={{
                                    backgroundColor: '#ffffff',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                }}
                            />
                            <Area 
                                type="monotone" 
                                dataKey="revenue" 
                                stroke="#17a34a" 
                                strokeWidth={3}
                                fillOpacity={1} 
                                fill="url(#colorRevenue)" 
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Performance Overview */}
                <motion.div 
                    className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6"
                    variants={itemVariants}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                            <MdTrendingUp className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                                Performance Overview
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Key metrics comparison
                            </p>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <XAxis 
                                dataKey="name" 
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: '#6b7280' }}
                            />
                            <YAxis 
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: '#6b7280' }}
                            />
                            <Tooltip 
                                contentStyle={{
                                    backgroundColor: '#ffffff',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                }}
                            />
                            <Bar 
                                dataKey="value" 
                                radius={[4, 4, 0, 0]}
                                fill={(entry, index) => barData[index]?.color || '#17a34a'}
                            >
                                {barData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>

            {/* Bottom Section */}
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Ticket Distribution */}
                <motion.div 
                    className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6"
                    variants={itemVariants}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                            <FaTicketAlt className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                                Ticket Distribution
                            </h3>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                labelLine={false}
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Recent Activity */}
                <motion.div 
                    className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6"
                    variants={itemVariants}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                            <FaCalendarAlt className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                                Recent Bookings
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Latest customer bookings
                            </p>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        {acceptedBookings.slice(0, 5).map((booking, index) => (
                            <motion.div
                                key={booking._id}
                                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-xl"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                        <FaUsers className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800 dark:text-gray-200">
                                            {booking.userName}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {booking.title} • {booking.bookingQty} tickets
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-green-600">
                                        ${booking.totalPrice || booking.price * booking.bookingQty}
                                    </p>
                                    <p className="text-xs text-gray-500 capitalize">
                                        {booking.status}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                        
                        {acceptedBookings.length === 0 && (
                            <div className="text-center py-8">
                                <FaTicketAlt className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500">No bookings yet</p>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default RevenueOverview;
