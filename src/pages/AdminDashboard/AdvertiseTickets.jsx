import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MdCampaign, MdSearch, MdFilterList, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { FaTicketAlt, FaEye, FaEyeSlash, FaBullhorn } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const AdvertiseTickets = () => {
    const axiosSecure = useAxiosSecure();
    const [tickets, setTickets] = useState([]);
    const [advertisedCount, setAdvertisedCount] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [isLoading, setIsLoading] = useState(true);

    const fetchTickets = async () => {
        try {
            setIsLoading(true);
            const res = await axiosSecure.get('/tickets');
            setTickets(res.data);

            const count = res.data.filter(
                ticket => ticket.isAdvertised
            ).length;

            setAdvertisedCount(count);
        } catch (err) {
            toast.error('Failed to fetch tickets');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    const handleToggleAdvertise = async (ticket) => {
        if (!ticket.isAdvertised && advertisedCount >= 6) {
            toast.error('You can advertise maximum 6 tickets at a time');
            return;
        }

        try {
            const updatedStatus = !ticket.isAdvertised;

            const res = await axiosSecure.patch(
                `/tickets/advertise/${ticket._id}`,
                { isAdvertised: updatedStatus }
            );

            if (res.data.modifiedCount > 0) {
                toast.success(
                    `Ticket "${ticket.title}" ${updatedStatus ? 'Advertised' : 'Unadvertised'}`
                );

                fetchTickets();
            } else {
                toast.error('Failed to update ticket');
            }
        } catch (err) {
            toast.error('Something went wrong');
            console.error(err);
        }
    };

    // Filter tickets based on search and status
    const filteredTickets = tickets.filter(ticket => {
        const matchesSearch = ticket.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            ticket.from?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            ticket.to?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === "all" || 
                            (statusFilter === "advertised" && ticket.isAdvertised) ||
                            (statusFilter === "not-advertised" && !ticket.isAdvertised);
        
        return matchesSearch && matchesStatus;
    });

    // Stats calculation
    const stats = {
        total: tickets.length,
        advertised: tickets.filter(t => t.isAdvertised).length,
        notAdvertised: tickets.filter(t => !t.isAdvertised).length,
        available: 6 - advertisedCount,
    };

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

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="loading loading-spinner loading-lg text-secondary-content"></div>
            </div>
        );
    }

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
                        <MdCampaign className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-secondary-content">
                        Advertise Tickets
                    </h1>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                    Promote tickets on the homepage to increase visibility and bookings
                </p>
            </motion.div>

            {/* Stats Cards */}
            <motion.div 
                className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
                variants={itemVariants}
            >
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                            <FaTicketAlt className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{stats.total}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Total Tickets</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                            <FaEye className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{stats.advertised}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Advertised</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-900/30 rounded-xl flex items-center justify-center">
                            <FaEyeSlash className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{stats.notAdvertised}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Not Advertised</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                            <FaBullhorn className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{stats.available}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Available Slots</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Advertisement Limit Notice */}
            <motion.div 
                className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border border-orange-200 dark:border-orange-800 rounded-2xl p-6 mb-8"
                variants={itemVariants}
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                        <MdCampaign className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-orange-800 dark:text-orange-200">Advertisement Limit</h3>
                        <p className="text-sm text-orange-700 dark:text-orange-300">
                            Currently advertised: <span className="font-bold">{advertisedCount} / 6</span> tickets. 
                            {stats.available > 0 ? ` You can advertise ${stats.available} more tickets.` : ' Maximum limit reached.'}
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Filters */}
            <motion.div 
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 mb-8 border border-gray-100 dark:border-gray-800 shadow-sm"
                variants={itemVariants}
            >
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search tickets by title or route..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-secondary-content focus:border-transparent bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200"
                        />
                    </div>

                    {/* Status Filter */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-secondary-content focus:border-transparent bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200"
                    >
                        <option value="all">All Tickets</option>
                        <option value="advertised">Advertised</option>
                        <option value="not-advertised">Not Advertised</option>
                    </select>
                </div>
            </motion.div>

            {/* Tickets Table */}
            <motion.div 
                className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden"
                variants={itemVariants}
            >
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">#</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Ticket Details</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Route</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Price & Quantity</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredTickets.map((ticket, index) => (
                                <motion.tr 
                                    key={ticket._id}
                                    className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                >
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-semibold text-gray-800 dark:text-gray-200">{ticket.title}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Departure: {ticket.departure}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-800 dark:text-gray-200">{ticket.from}</span>
                                            <span className="text-gray-400">→</span>
                                            <span className="text-gray-800 dark:text-gray-200">{ticket.to}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-semibold text-secondary-content">৳ {ticket.price}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Qty: {ticket.quantity}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {ticket.isAdvertised ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                                    <span className="text-green-600 dark:text-green-400 font-medium text-sm">
                                                        Advertised
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                                                    <span className="text-gray-600 dark:text-gray-400 font-medium text-sm">
                                                        Not Advertised
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleToggleAdvertise(ticket)}
                                            disabled={!ticket.isAdvertised && advertisedCount >= 6}
                                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all transform hover:scale-105 ${
                                                ticket.isAdvertised
                                                    ? 'bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50'
                                                    : 'bg-green-100 hover:bg-green-200 text-green-700 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:transform-none'
                                            }`}
                                        >
                                            {ticket.isAdvertised ? (
                                                <>
                                                    <MdVisibilityOff className="w-4 h-4" />
                                                    Remove Ad
                                                </>
                                            ) : (
                                                <>
                                                    <MdVisibility className="w-4 h-4" />
                                                    Advertise
                                                </>
                                            )}
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredTickets.length === 0 && (
                        <div className="text-center py-12">
                            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MdCampaign className="w-12 h-12 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                No tickets found
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                {searchTerm || statusFilter !== "all" 
                                    ? "Try adjusting your search or filter criteria"
                                    : "No admin-approved tickets available for advertising"
                                }
                            </p>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default AdvertiseTickets;
