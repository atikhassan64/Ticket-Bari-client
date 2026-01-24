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
    const [showMobileFilters, setShowMobileFilters] = useState(false);
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
            className='py-6 lg:py-12 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 min-h-screen'
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className='max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8'>
                {/* Mobile Filter Toggle */}
                <div className="lg:hidden mb-6">
                    <button
                        onClick={() => setShowMobileFilters(!showMobileFilters)}
                        className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex items-center justify-between shadow-sm"
                    >
                        <div className="flex items-center gap-2">
                            <FaFilter className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            <span className="font-medium text-gray-700 dark:text-gray-300">Filters</span>
                            {(search || transport || sortPrice) && (
                                <span className="bg-secondary-content text-white text-xs px-2 py-1 rounded-full">
                                    Active
                                </span>
                            )}
                        </div>
                        <div className={`transform transition-transform duration-200 ${showMobileFilters ? 'rotate-180' : ''}`}>
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </div>
                    </button>
                </div>

                {/* Mobile Filters Dropdown */}
                {showMobileFilters && (
                    <motion.div 
                        className="lg:hidden mb-6 bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Mobile Search */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Search Routes
                            </label>
                            <div className="relative">
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="e.g., Dhaka to Chittagong"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-secondary-content/20 focus:border-secondary-content transition-all duration-200 text-sm"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Mobile Transport Filter */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Transport Type
                            </label>
                            <select
                                className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-secondary-content/20 focus:border-secondary-content transition-all duration-200 text-sm"
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

                        {/* Mobile Price Sort */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Sort by Price
                            </label>
                            <select
                                className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-secondary-content/20 focus:border-secondary-content transition-all duration-200 text-sm"
                                value={sortPrice}
                                onChange={(e) => setSortPrice(e.target.value)}
                            >
                                <option value="">Default</option>
                                <option value="low">💰 Low to High</option>
                                <option value="high">💎 High to Low</option>
                            </select>
                        </div>

                        {/* Mobile Clear Filters */}
                        <button
                            onClick={() => {
                                setSearch("");
                                setTransport("");
                                setSortPrice("");
                            }}
                            className="w-full bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-slate-700 transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            <FaFilter className="w-4 h-4" />
                            Clear All Filters
                        </button>
                    </motion.div>
                )}

                <div className='flex flex-col lg:flex-row gap-6 lg:gap-8'>
                    {/* Desktop Sidebar */}
                    <div className="hidden lg:block w-80 bg-white dark:bg-slate-900 shadow-xl border border-gray-200 dark:border-gray-700 rounded-2xl sticky top-6 h-fit">
                        <div className="p-6">
                            {/* Sidebar Header */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-secondary-content mb-2">
                                    Filter Tickets
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    Find your perfect journey
                                </p>
                            </div>

                            {/* Search Filter */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                    Search Routes
                                </label>
                                <div className="relative">
                                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="e.g., Dhaka to Chittagong"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-secondary-content/20 focus:border-secondary-content transition-all duration-200 text-sm"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Transport Type Filter */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                    Transport Type
                                </label>
                                <div className="space-y-2">
                                    {[
                                        { value: "", label: "All Types", icon: "🚀" },
                                        { value: "Bus", label: "Bus", icon: "🚌" },
                                        { value: "Train", label: "Train", icon: "🚂" },
                                        { value: "Air", label: "Air", icon: "✈️" },
                                        { value: "Launch", label: "Launch", icon: "🚢" }
                                    ].map((option) => (
                                        <label
                                            key={option.value}
                                            className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                                                transport === option.value
                                                    ? 'bg-secondary-content/10 border-2 border-secondary-content/30'
                                                    : 'bg-gray-50 dark:bg-slate-800 border-2 border-transparent hover:bg-gray-100 dark:hover:bg-slate-700'
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name="transport"
                                                value={option.value}
                                                checked={transport === option.value}
                                                onChange={(e) => setTransport(e.target.value)}
                                                className="sr-only"
                                            />
                                            <span className="text-xl mr-3">{option.icon}</span>
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {option.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Sort Filter */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                    Sort by Price
                                </label>
                                <div className="space-y-2">
                                    {[
                                        { value: "", label: "Default", icon: "📋" },
                                        { value: "low", label: "Low to High", icon: "💰" },
                                        { value: "high", label: "High to Low", icon: "💎" }
                                    ].map((option) => (
                                        <label
                                            key={option.value}
                                            className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                                                sortPrice === option.value
                                                    ? 'bg-secondary-content/10 border-2 border-secondary-content/30'
                                                    : 'bg-gray-50 dark:bg-slate-800 border-2 border-transparent hover:bg-gray-100 dark:hover:bg-slate-700'
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name="sortPrice"
                                                value={option.value}
                                                checked={sortPrice === option.value}
                                                onChange={(e) => setSortPrice(e.target.value)}
                                                className="sr-only"
                                            />
                                            <span className="text-lg mr-3">{option.icon}</span>
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {option.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Results Summary */}
                            <div className="mb-6 p-4 bg-gray-50 dark:bg-slate-800 rounded-xl">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-secondary-content mb-1">
                                        {filteredTickets.length}
                                    </p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                        Tickets Found
                                    </p>
                                </div>
                            </div>

                            {/* Clear Filters Button */}
                            <button
                                onClick={() => {
                                    setSearch("");
                                    setTransport("");
                                    setSortPrice("");
                                }}
                                className="w-full bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-slate-700 transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                <FaFilter className="w-4 h-4" />
                                Clear All Filters
                            </button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Header */}
                        <motion.div 
                            className="mb-6 lg:mb-8"
                            variants={itemVariants}
                        >
                            <div className="text-center mb-6 lg:mb-8">
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-secondary-content mb-2 lg:mb-4">
                                    All Tickets
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
                                    Discover amazing travel destinations and book your perfect journey
                                </p>
                            </div>

                            {/* Results Count */}
                            <div className="bg-white dark:bg-slate-900 rounded-xl lg:rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-4 lg:p-6">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Showing <span className="font-semibold text-secondary-content">{paginatedTickets.length}</span> of{' '}
                                        <span className="font-semibold text-secondary-content">{filteredTickets.length}</span> tickets
                                    </p>
                                    {filteredTickets.length > 0 && (
                                        <p className="text-xs text-gray-500 dark:text-gray-500">
                                            Page {currentPage} of {totalPages}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </motion.div>

                        {/* Tickets Grid */}
                        <motion.div variants={itemVariants}>
                            {paginatedTickets.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
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
                                    className="text-center py-12 lg:py-16"
                                    variants={itemVariants}
                                >
                                    <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6">
                                        <FaSearch className="w-10 h-10 lg:w-12 lg:h-12 text-gray-400" />
                                    </div>
                                    <h3 className="text-lg lg:text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                                        No tickets found
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-500 mb-4 lg:mb-6 text-sm lg:text-base">
                                        Try adjusting your search criteria or filters
                                    </p>
                                    <motion.button
                                        onClick={() => {
                                            setSearch("");
                                            setTransport("");
                                            setSortPrice("");
                                        }}
                                        className="px-4 lg:px-6 py-2 lg:py-3 bg-secondary-content text-white rounded-lg lg:rounded-xl hover:bg-secondary-content/90 transition-all duration-200 font-medium text-sm lg:text-base"
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
                                className="flex justify-center gap-2 mt-8 lg:mt-12"
                                variants={itemVariants}
                            >
                                <div className="flex items-center gap-1 lg:gap-2">
                                    {currentPage > 1 && (
                                        <motion.button
                                            onClick={() => setCurrentPage(currentPage - 1)}
                                            className="px-3 lg:px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors text-sm lg:text-base"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Previous
                                        </motion.button>
                                    )}
                                    
                                    {[...Array(Math.min(totalPages, 5)).keys()].map(num => {
                                        let pageNum;
                                        if (totalPages <= 5) {
                                            pageNum = num + 1;
                                        } else if (currentPage <= 3) {
                                            pageNum = num + 1;
                                        } else if (currentPage >= totalPages - 2) {
                                            pageNum = totalPages - 4 + num;
                                        } else {
                                            pageNum = currentPage - 2 + num;
                                        }
                                        
                                        return (
                                            <motion.button
                                                key={pageNum}
                                                onClick={() => setCurrentPage(pageNum)}
                                                className={`w-8 h-8 lg:w-10 lg:h-10 rounded-lg font-medium transition-all duration-200 text-sm lg:text-base ${
                                                    currentPage === pageNum
                                                        ? "bg-secondary-content text-white shadow-lg"
                                                        : "border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-800"
                                                }`}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                {pageNum}
                                            </motion.button>
                                        );
                                    })}
                                    
                                    {currentPage < totalPages && (
                                        <motion.button
                                            onClick={() => setCurrentPage(currentPage + 1)}
                                            className="px-3 lg:px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors text-sm lg:text-base"
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
                </div>
            </div>
        </motion.div>
    );
};

export default AllTickets;