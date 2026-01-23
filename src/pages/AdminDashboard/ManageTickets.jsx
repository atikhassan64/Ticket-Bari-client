import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdConfirmationNumber, MdFilterList, MdSearch } from "react-icons/md";
import { FaCheck, FaTimes, FaEye, FaTicketAlt } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ManageTickets = () => {
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const { data: tickets = [], refetch, isLoading } = useQuery({
        queryKey: ["tickets"],
        queryFn: async () => {
            const res = await axiosSecure.get("/tickets/admin");
            return res.data;
        }
    });

    const handleApprove = async (ticket) => {
        try {
            await axiosSecure.patch(`/tickets/approved/${ticket._id}`, {
                adminStatus: "approved",
            });
            toast.success(`Ticket "${ticket.title}" approved successfully`);
            refetch();
        } catch (error) {
            toast.error("Failed to approve ticket");
        }
    };

    const handleReject = async (ticket) => {
        try {
            await axiosSecure.patch(`/tickets/rejected/${ticket._id}`, {
                adminStatus: "rejected"
            });
            toast.success(`Ticket "${ticket.title}" rejected`);
            refetch();
        } catch (error) {
            toast.error("Failed to reject ticket");
        }
    };

    // Filter tickets based on search and status
    const filteredTickets = tickets.filter(ticket => {
        const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            ticket.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            ticket.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            ticket.vendorEmail.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === "all" || ticket.adminStatus === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    // Stats calculation
    const stats = {
        total: tickets.length,
        approved: tickets.filter(t => t.adminStatus === "approved").length,
        pending: tickets.filter(t => t.adminStatus === "pending").length,
        rejected: tickets.filter(t => t.adminStatus === "rejected").length,
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
                        <MdConfirmationNumber className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-secondary-content">
                        Manage Tickets
                    </h1>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                    Review and manage all ticket submissions from vendors
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
                            <FaCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{stats.approved}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Approved</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center">
                            <MdFilterList className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{stats.pending}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                            <FaTimes className="w-6 h-6 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{stats.rejected}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Rejected</p>
                        </div>
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
                            placeholder="Search tickets, routes, or vendors..."
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
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
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
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Vendor</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Actions</th>
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
                                        <span className="font-semibold text-secondary-content">৳ {ticket.price}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">{ticket.vendorEmail}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                            ticket.adminStatus === "approved"
                                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                                : ticket.adminStatus === "rejected"
                                                ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                        }`}>
                                            {ticket.adminStatus}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button
                                                disabled={ticket.adminStatus === "approved"}
                                                onClick={() => handleApprove(ticket)}
                                                className="inline-flex items-center gap-1 px-3 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-xs font-medium rounded-lg transition-colors"
                                            >
                                                <FaCheck className="w-3 h-3" />
                                                Approve
                                            </button>

                                            <button
                                                disabled={ticket.adminStatus === "rejected"}
                                                onClick={() => handleReject(ticket)}
                                                className="inline-flex items-center gap-1 px-3 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-xs font-medium rounded-lg transition-colors"
                                            >
                                                <FaTimes className="w-3 h-3" />
                                                Reject
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredTickets.length === 0 && (
                        <div className="text-center py-12">
                            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MdConfirmationNumber className="w-12 h-12 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                No tickets found
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                {searchTerm || statusFilter !== "all" 
                                    ? "Try adjusting your search or filter criteria"
                                    : "No tickets have been submitted yet"
                                }
                            </p>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ManageTickets;
