import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    FaDollarSign, 
    FaReceipt, 
    FaCalendarAlt, 
    FaSearch, 
    FaFilter,
    FaDownload,
    FaEye,
    FaCreditCard,
    FaCheckCircle,
    FaTicketAlt
} from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/sheard/loading/Loading';

const TransactionHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState('');
    const [dateFilter, setDateFilter] = useState('all');

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ["payments", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`)
            return res.data
        }
    });

    // Filter payments
    const filteredPayments = payments.filter(payment => {
        const matchesSearch = payment.ticketTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
        
        if (dateFilter === 'all') return matchesSearch;
        
        const paymentDate = new Date(payment.paidAt);
        const now = new Date();
        
        switch (dateFilter) {
            case 'today':
                return matchesSearch && paymentDate.toDateString() === now.toDateString();
            case 'week':
                const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                return matchesSearch && paymentDate >= weekAgo;
            case 'month':
                const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                return matchesSearch && paymentDate >= monthAgo;
            default:
                return matchesSearch;
        }
    });

    // Calculate stats
    const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);
    const thisMonthAmount = payments
        .filter(payment => {
            const paymentDate = new Date(payment.paidAt);
            const now = new Date();
            return paymentDate.getMonth() === now.getMonth() && paymentDate.getFullYear() === now.getFullYear();
        })
        .reduce((sum, payment) => sum + payment.amount, 0);

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
                        <FaReceipt className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-secondary-content">
                            Transaction History
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            View all your payment transactions and receipts
                        </p>
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search by ticket title or transaction ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-secondary-content/20 focus:border-secondary-content transition-all duration-200"
                        />
                    </div>
                    <div className="relative">
                        <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <select
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                            className="pl-10 pr-8 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-secondary-content/20 focus:border-secondary-content transition-all duration-200"
                        >
                            <option value="all">All Time</option>
                            <option value="today">Today</option>
                            <option value="week">Last 7 Days</option>
                            <option value="month">Last 30 Days</option>
                        </select>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                                <FaDollarSign className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">${totalAmount}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Total Spent</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                                <FaCalendarAlt className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">${thisMonthAmount}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">This Month</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                                <FaReceipt className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{payments.length}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Transactions</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Transactions */}
            <motion.div variants={itemVariants}>
                {filteredPayments.length > 0 ? (
                    <div className="space-y-4">
                        {filteredPayments.map((payment, index) => (
                            <motion.div
                                key={payment._id}
                                className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all duration-300 p-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                whileHover={{ y: -2 }}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                                            <FaCreditCard className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                                                {payment.ticketTitle}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                                                ID: {payment.transactionId}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="text-right">
                                        <div className="flex items-center gap-2 mb-1">
                                            <FaDollarSign className="w-4 h-4 text-green-500" />
                                            <span className="text-2xl font-bold text-green-600">
                                                {payment.amount}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                            <FaCalendarAlt className="w-3 h-3" />
                                            <span>
                                                {new Date(payment.paidAt).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric"
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <FaCheckCircle className="w-4 h-4 text-green-500" />
                                            <span className="text-sm font-medium text-green-600">Payment Successful</span>
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {new Date(payment.paidAt).toLocaleTimeString("en-US", {
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.div 
                        className="text-center py-16"
                        variants={itemVariants}
                    >
                        <div className="w-24 h-24 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FaReceipt className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                            {searchTerm || dateFilter !== 'all' ? 'No transactions match your filters' : 'No transactions yet'}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-500 mb-6">
                            {searchTerm || dateFilter !== 'all' 
                                ? 'Try adjusting your search or filter criteria' 
                                : 'Your payment history will appear here after you make purchases'
                            }
                        </p>
                        {!searchTerm && dateFilter === 'all' && (
                            <motion.button
                                onClick={() => window.location.href = '/all-tickets'}
                                className="px-6 py-3 bg-secondary-content text-white rounded-xl hover:bg-secondary-content/90 transition-all duration-200 font-medium"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Browse Tickets
                            </motion.button>
                        )}
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default TransactionHistory;