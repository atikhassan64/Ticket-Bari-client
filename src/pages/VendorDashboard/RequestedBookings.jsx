import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    FaUsers, 
    FaTicketAlt, 
    FaCheckCircle, 
    FaTimesCircle, 
    FaHourglassHalf,
    FaEnvelope,
    FaUser,
    FaDollarSign,
    FaSearch,
    FaFilter,
    FaEye
} from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/sheard/loading/Loading';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';

const RequestedBookings = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const { data: bookings = [], isLoading, refetch } = useQuery({
        queryKey: ["requestedBookings", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get("/ticket-booked");
            return res.data;
        },
        enabled: !!user?.email,
    });

    const vendorBookings = bookings.filter(
        booking => booking.vendorEmail === user?.email
    );

    const handleAccept = (id) => {
        Swal.fire({
            title: "Accept Booking?",
            text: "This will confirm the booking request.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#22c55e",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Accept",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/requested-bookings/${id}/accept`)
                    .then(() => {
                        Swal.fire("Booking Accepted!", "The booking has been confirmed.", "success");
                        refetch();
                    })
                    .catch(() => {
                        Swal.fire("Error!", "Failed to accept booking.", "error");
                    });
            }
        });
    };

    const handleReject = (id) => {
        Swal.fire({
            title: "Reject Booking?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Reject",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/requested-bookings/${id}/reject`)
                    .then(() => {
                        Swal.fire("Booking Rejected!", "The booking has been rejected.", "success");
                        refetch();
                    })
                    .catch(() => {
                        Swal.fire("Error!", "Failed to reject booking.", "error");
                    });
            }
        });
    };

    // Filter bookings
    const filteredBookings = vendorBookings.filter(booking => {
        const matchesSearch = booking.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            booking.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            booking.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Get status display
    const getStatusDisplay = (status) => {
        switch (status) {
            case 'accepted':
            case 'paid':
                return {
                    icon: FaCheckCircle,
                    color: 'text-green-600',
                    bg: 'bg-green-100 dark:bg-green-900/30',
                    text: status === 'paid' ? 'Paid' : 'Accepted'
                };
            case 'rejected':
                return {
                    icon: FaTimesCircle,
                    color: 'text-red-600',
                    bg: 'bg-red-100 dark:bg-red-900/30',
                    text: 'Rejected'
                };
            default:
                return {
                    icon: FaHourglassHalf,
                    color: 'text-yellow-600',
                    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
                    text: 'Pending'
                };
        }
    };

    if (isLoading) return <Loading />;

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
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-secondary-content to-secondary-content/80 rounded-xl flex items-center justify-center">
                        <FaUsers className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-secondary-content">
                            Requested Bookings
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Manage customer booking requests
                        </p>
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search by customer name, email, or ticket..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-secondary-content/20 focus:border-secondary-content transition-all duration-200"
                        />
                    </div>
                    <div className="relative">
                        <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="pl-10 pr-8 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-secondary-content/20 focus:border-secondary-content transition-all duration-200"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                            <option value="paid">Paid</option>
                        </select>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                <FaUsers className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{vendorBookings.length}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Total Requests</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                                <FaHourglassHalf className="w-5 h-5 text-yellow-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                                    {vendorBookings.filter(b => b.status === 'pending').length}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                                <FaCheckCircle className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                                    {vendorBookings.filter(b => b.status === 'accepted' || b.status === 'paid').length}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Accepted</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                                <FaDollarSign className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                                    ${vendorBookings.filter(b => b.status === 'accepted' || b.status === 'paid')
                                        .reduce((sum, b) => sum + (b.totalPrice || b.price * b.bookingQty), 0)}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Revenue</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Bookings List */}
            <motion.div variants={itemVariants}>
                {filteredBookings.length > 0 ? (
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                        {/* Desktop Table */}
                        <div className="hidden lg:block overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-slate-800 border-b border-gray-100 dark:border-gray-700">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                            Customer
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                            Ticket
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                            Quantity
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                            Total Price
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                    {filteredBookings.map((booking, index) => {
                                        const statusDisplay = getStatusDisplay(booking.status);
                                        const StatusIcon = statusDisplay.icon;

                                        return (
                                            <motion.tr 
                                                key={booking._id}
                                                className="hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                                            <FaUser className="w-4 h-4 text-white" />
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-gray-800 dark:text-gray-200">
                                                                {booking.userName}
                                                            </p>
                                                            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                                                <FaEnvelope className="w-3 h-3" />
                                                                {booking.userEmail}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <FaTicketAlt className="w-4 h-4 text-secondary-content" />
                                                        <span className="font-medium text-gray-800 dark:text-gray-200">
                                                            {booking.title}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                                                        {booking.bookingQty}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-1">
                                                        <FaDollarSign className="w-4 h-4 text-green-500" />
                                                        <span className="font-bold text-green-600">
                                                            {booking.totalPrice || booking.price * booking.bookingQty}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${statusDisplay.bg}`}>
                                                        <StatusIcon className={`w-3 h-3 ${statusDisplay.color}`} />
                                                        <span className={`text-xs font-semibold ${statusDisplay.color}`}>
                                                            {statusDisplay.text}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex gap-2">
                                                        <motion.button
                                                            disabled={booking.status === "accepted" || booking.status === "paid"}
                                                            onClick={() => handleAccept(booking._id)}
                                                            className="px-3 py-1 bg-green-500 text-white text-xs rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                                            whileHover={{ scale: booking.status === "accepted" || booking.status === "paid" ? 1 : 1.05 }}
                                                            whileTap={{ scale: booking.status === "accepted" || booking.status === "paid" ? 1 : 0.95 }}
                                                        >
                                                            Accept
                                                        </motion.button>
                                                        <motion.button
                                                            disabled={booking.status === "rejected" || booking.status === "paid"}
                                                            onClick={() => handleReject(booking._id)}
                                                            className="px-3 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                                            whileHover={{ scale: booking.status === "rejected" || booking.status === "paid" ? 1 : 1.05 }}
                                                            whileTap={{ scale: booking.status === "rejected" || booking.status === "paid" ? 1 : 0.95 }}
                                                        >
                                                            Reject
                                                        </motion.button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="lg:hidden space-y-4 p-4">
                            {filteredBookings.map((booking, index) => {
                                const statusDisplay = getStatusDisplay(booking.status);
                                const StatusIcon = statusDisplay.icon;

                                return (
                                    <motion.div
                                        key={booking._id}
                                        className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4 space-y-3"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                                    <FaUser className="w-4 h-4 text-white" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-800 dark:text-gray-200">
                                                        {booking.userName}
                                                    </p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        {booking.userEmail}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${statusDisplay.bg}`}>
                                                <StatusIcon className={`w-3 h-3 ${statusDisplay.color}`} />
                                                <span className={`text-xs font-semibold ${statusDisplay.color}`}>
                                                    {statusDisplay.text}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <FaTicketAlt className="w-4 h-4 text-secondary-content" />
                                                <span className="font-medium text-gray-800 dark:text-gray-200">
                                                    {booking.title}
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600 dark:text-gray-400">
                                                    Quantity: <span className="font-semibold">{booking.bookingQty}</span>
                                                </span>
                                                <div className="flex items-center gap-1">
                                                    <FaDollarSign className="w-3 h-3 text-green-500" />
                                                    <span className="font-bold text-green-600">
                                                        {booking.totalPrice || booking.price * booking.bookingQty}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-2 pt-2">
                                            <motion.button
                                                disabled={booking.status === "accepted" || booking.status === "paid"}
                                                onClick={() => handleAccept(booking._id)}
                                                className="flex-1 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                                whileHover={{ scale: booking.status === "accepted" || booking.status === "paid" ? 1 : 1.02 }}
                                                whileTap={{ scale: booking.status === "accepted" || booking.status === "paid" ? 1 : 0.98 }}
                                            >
                                                Accept
                                            </motion.button>
                                            <motion.button
                                                disabled={booking.status === "rejected" || booking.status === "paid"}
                                                onClick={() => handleReject(booking._id)}
                                                className="flex-1 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                                whileHover={{ scale: booking.status === "rejected" || booking.status === "paid" ? 1 : 1.02 }}
                                                whileTap={{ scale: booking.status === "rejected" || booking.status === "paid" ? 1 : 0.98 }}
                                            >
                                                Reject
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FaUsers className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                            {searchTerm || statusFilter !== 'all' ? 'No bookings match your filters' : 'No booking requests yet'}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-500">
                            {searchTerm || statusFilter !== 'all' 
                                ? 'Try adjusting your search or filter criteria' 
                                : 'Booking requests will appear here when customers book your tickets'
                            }
                        </p>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default RequestedBookings;