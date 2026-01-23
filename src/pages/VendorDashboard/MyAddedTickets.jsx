import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FaTicketAlt, 
    FaEdit, 
    FaTrash, 
    FaEye, 
    FaMapMarkerAlt, 
    FaClock, 
    FaDollarSign,
    FaCheckCircle,
    FaTimesCircle,
    FaHourglassHalf,
    FaSearch,
    FaFilter
} from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/sheard/loading/Loading';
import { useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const MyAddedTickets = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const { data: tickets = [], isLoading, refetch } = useQuery({
        queryKey: ["tickets", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tickets?email=${user.email}`);
            return res.data;
        }
    });

    const handleTicketDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this ticket!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/tickets/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your ticket has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to delete ticket.",
                            icon: "error"
                        });
                    });
            }
        });
    };

    // Filter tickets based on search and status
    const filteredTickets = tickets.filter(ticket => {
        const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            ticket.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            ticket.to.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || ticket.adminStatus === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Get status icon and color
    const getStatusDisplay = (status) => {
        switch (status) {
            case 'approved':
                return {
                    icon: FaCheckCircle,
                    color: 'text-green-600',
                    bg: 'bg-green-100 dark:bg-green-900/30',
                    text: 'Approved'
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

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.3 }
        },
        exit: { 
            opacity: 0, 
            scale: 0.9,
            transition: { duration: 0.2 }
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
                        <FaTicketAlt className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-secondary-content">
                            My Added Tickets
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Manage and track your ticket listings
                        </p>
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search tickets by title, from, or to..."
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
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                <FaTicketAlt className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{tickets.length}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Total Tickets</p>
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
                                    {tickets.filter(t => t.adminStatus === 'approved').length}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Approved</p>
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
                                    {tickets.filter(t => t.adminStatus === 'pending').length}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Tickets Grid */}
            <AnimatePresence>
                {filteredTickets.length > 0 ? (
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        variants={containerVariants}
                    >
                        {filteredTickets.map((ticket) => {
                            const statusDisplay = getStatusDisplay(ticket.adminStatus);
                            const StatusIcon = statusDisplay.icon;

                            return (
                                <motion.div
                                    key={ticket._id}
                                    className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
                                    variants={cardVariants}
                                    whileHover={{ y: -5 }}
                                    layout
                                >
                                    {/* Image */}
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={ticket.image}
                                            alt={ticket.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-3 right-3">
                                            <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusDisplay.bg} backdrop-blur-sm`}>
                                                <StatusIcon className={`w-3 h-3 ${statusDisplay.color}`} />
                                                <span className={`text-xs font-semibold ${statusDisplay.color}`}>
                                                    {statusDisplay.text}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 space-y-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2 line-clamp-2">
                                                {ticket.title}
                                            </h3>
                                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                <FaMapMarkerAlt className="w-4 h-4 text-blue-500" />
                                                <span className="text-sm">{ticket.from} → {ticket.to}</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div className="flex items-center gap-2">
                                                <FaDollarSign className="w-4 h-4 text-green-500" />
                                                <span className="font-semibold">${ticket.price}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FaTicketAlt className="w-4 h-4 text-purple-500" />
                                                <span>{ticket.quantity} available</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                            <FaClock className="w-4 h-4 text-orange-500" />
                                            <span>{ticket.departure}</span>
                                        </div>

                                        {ticket?.perks?.length > 0 && (
                                            <div className="flex flex-wrap gap-1">
                                                {ticket.perks.slice(0, 3).map((perk, index) => (
                                                    <span 
                                                        key={index}
                                                        className="px-2 py-1 bg-gray-100 dark:bg-slate-800 text-xs rounded-full text-gray-600 dark:text-gray-400"
                                                    >
                                                        {perk}
                                                    </span>
                                                ))}
                                                {ticket.perks.length > 3 && (
                                                    <span className="px-2 py-1 bg-gray-100 dark:bg-slate-800 text-xs rounded-full text-gray-600 dark:text-gray-400">
                                                        +{ticket.perks.length - 3} more
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {/* Action Buttons */}
                                        <div className="flex gap-2 pt-4">
                                            <motion.button
                                                disabled={ticket.adminStatus === "rejected"}
                                                onClick={() => navigate(`/dashboard/update-ticket/${ticket._id}`)}
                                                className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-secondary-content text-white rounded-xl hover:bg-secondary-content/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                                whileHover={{ scale: ticket.adminStatus === "rejected" ? 1 : 1.02 }}
                                                whileTap={{ scale: ticket.adminStatus === "rejected" ? 1 : 0.98 }}
                                            >
                                                <FaEdit className="w-4 h-4" />
                                                <span className="text-sm font-medium">Edit</span>
                                            </motion.button>

                                            <motion.button
                                                onClick={() => handleTicketDelete(ticket._id)}
                                                disabled={ticket.adminStatus === "rejected"}
                                                className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-red-500 text-white rounded-xl hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                                whileHover={{ scale: ticket.adminStatus === "rejected" ? 1 : 1.02 }}
                                                whileTap={{ scale: ticket.adminStatus === "rejected" ? 1 : 0.98 }}
                                            >
                                                <FaTrash className="w-4 h-4" />
                                                <span className="text-sm font-medium">Delete</span>
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                ) : (
                    <motion.div 
                        className="text-center py-16"
                        variants={itemVariants}
                    >
                        <div className="w-24 h-24 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FaTicketAlt className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                            {searchTerm || statusFilter !== 'all' ? 'No tickets match your filters' : 'No tickets added yet'}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-500 mb-6">
                            {searchTerm || statusFilter !== 'all' 
                                ? 'Try adjusting your search or filter criteria' 
                                : 'Start by adding your first ticket to get bookings'
                            }
                        </p>
                        {!searchTerm && statusFilter === 'all' && (
                            <motion.button
                                onClick={() => navigate('/dashboard/add-tickets')}
                                className="px-6 py-3 bg-secondary-content text-white rounded-xl hover:bg-secondary-content/90 transition-all duration-200 font-medium"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Add Your First Ticket
                            </motion.button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default MyAddedTickets;
