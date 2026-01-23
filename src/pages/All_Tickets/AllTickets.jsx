import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaSort } from 'react-icons/fa';
import AdminApprovedCard from '../../components/sheard/AdminApprovedCard';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/sheard/loading/Loading';

const AllTickets = () => {
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState("");
    const [transport, setTransport] = useState("");
    const [sortPrice, setSortPrice] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const { data: tickets = [], isLoading } = useQuery({
        queryKey: ["tickets"],
        queryFn: async () => {
            const res = await axiosSecure.get("/tickets");
            return res.data;
        }
    });

    if (isLoading) {
        return <Loading />;
    }

    let filteredTickets = tickets.filter(
        ticket => ticket.adminStatus === "approved"
    );

    filteredTickets = filteredTickets.filter(ticket =>
        `${ticket.from} ${ticket.to}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    if (transport) {
        filteredTickets = filteredTickets.filter(
            ticket => ticket.transport === transport
        );
    }

    if (sortPrice === "low") {
        filteredTickets.sort((a, b) => a.price - b.price);
    }
    if (sortPrice === "high") {
        filteredTickets.sort((a, b) => b.price - a.price);
    }

    const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedTickets = filteredTickets.slice(
        startIndex,
        startIndex + itemsPerPage
    );

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
            className='py-12 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 min-h-screen'
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                {/* Header */}
                <motion.div 
                    className="mb-8"
                    variants={itemVariants}
                >
                    <div className="text-center mb-8">
                        <h1 className="text-4xl lg:text-5xl font-black text-secondary-content mb-4">
                            All Tickets
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                            Discover amazing travel destinations and book your perfect journey
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Search */}
                            <div className="relative">
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search routes (e.g., Dhaka to Chittagong)"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-secondary-content/20 focus:border-secondary-content transition-all duration-200"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>

                            {/* Transport Filter */}
                            <div className="relative">
                                <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <select
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-secondary-content/20 focus:border-secondary-content transition-all duration-200 appearance-none"
                                    value={transport}
                                    onChange={(e) => setTransport(e.target.value)}
                                >
                                    <option value="">All Transport Types</option>
                                    <option value="Bus">🚌 Bus</option>
                                    <option value="Train">🚂 Train</option>
                                    <option value="Air">✈️ Air</option>
                                    <option value="Launch">🚢 Launch</option>
                                </select>
                            </div>

                            {/* Price Sort */}
                            <div className="relative">
                                <FaSort className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <select
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-secondary-content/20 focus:border-secondary-content transition-all duration-200 appearance-none"
                                    value={sortPrice}
                                    onChange={(e) => setSortPrice(e.target.value)}
                                >
                                    <option value="">Sort by Price</option>
                                    <option value="low">💰 Low to High</option>
                                    <option value="high">💎 High to Low</option>
                                </select>
                            </div>
                        </div>

                        {/* Results Count */}
                        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Showing <span className="font-semibold text-secondary-content">{paginatedTickets.length}</span> of{' '}
                                <span className="font-semibold text-secondary-content">{filteredTickets.length}</span> tickets
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Tickets Grid */}
                <motion.div variants={itemVariants}>
                    {paginatedTickets.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {paginatedTickets.map((ticket, index) => (
                                <motion.div
                                    key={ticket._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <AdminApprovedCard ticket={ticket} />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <motion.div 
                            className="text-center py-16"
                            variants={itemVariants}
                        >
                            <div className="w-24 h-24 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FaSearch className="w-12 h-12 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                                No tickets found
                            </h3>
                            <p className="text-gray-500 dark:text-gray-500 mb-6">
                                Try adjusting your search criteria or filters
                            </p>
                            <motion.button
                                onClick={() => {
                                    setSearch("");
                                    setTransport("");
                                    setSortPrice("");
                                }}
                                className="px-6 py-3 bg-secondary-content text-white rounded-xl hover:bg-secondary-content/90 transition-all duration-200 font-medium"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Clear Filters
                            </motion.button>
                        </motion.div>
                    )}
                </motion.div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <motion.div 
                        className="flex justify-center gap-2 mt-12"
                        variants={itemVariants}
                    >
                        <div className="flex items-center gap-2">
                            {currentPage > 1 && (
                                <motion.button
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Previous
                                </motion.button>
                            )}
                            
                            {[...Array(totalPages).keys()].map(num => (
                                <motion.button
                                    key={num}
                                    onClick={() => setCurrentPage(num + 1)}
                                    className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
                                        currentPage === num + 1
                                            ? "bg-secondary-content text-white shadow-lg"
                                            : "border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-800"
                                    }`}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    {num + 1}
                                </motion.button>
                            ))}
                            
                            {currentPage < totalPages && (
                                <motion.button
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Next
                                </motion.button>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default AllTickets;
