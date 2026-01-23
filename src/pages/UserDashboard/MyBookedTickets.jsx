import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FaTicketAlt, 
    FaMapMarkerAlt, 
    FaClock, 
    FaDollarSign, 
    FaArrowRight,
    FaCheckCircle,
    FaTimesCircle,
    FaHourglassHalf,
    FaCreditCard,
    FaSearch,
    FaFilter,
    FaExclamationTriangle
} from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import Loading from '../../components/sheard/loading/Loading';

const MyBookedTickets = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [countdowns, setCountdowns] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    
    const { data: bookedTickets = [], isLoading } = useQuery({
        queryKey: ["ticketBooked", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`ticket-booked?email=${user.email}`);
            return res.data
        }
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const newCountdowns = {};
            bookedTickets.forEach(ticket => {
                const departureTime = new Date(ticket.departure);
                const now = new Date();
                const diff = departureTime - now;

                if (diff <= 0) {
                    newCountdowns[ticket._id] = { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
                } else {
                    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                    const minutes = Math.floor((diff / 1000 / 60) % 60);
                    const seconds = Math.floor((diff / 1000) % 60);
                    newCountdowns[ticket._id] = { days, hours, minutes, seconds, isExpired: false };
                }
            });
            setCountdowns(newCountdowns);
        }, 1000);

        return () => clearInterval(interval);
    }, [bookedTickets]);

    const handlePayment = async (ticket) => {
        const paymentInfo = {
            ticketId: ticket._id,
            ticketTitle: ticket.title,
            bookingQty: ticket.bookingQty,
            totalPrice: ticket.unitPrice,
            userEmail: user.email
        };
        const res = await axiosSecure.post("/payment", paymentInfo);
        window.location.assign(res.data.url);
    };

    // Filter tickets
    const filteredTickets = bookedTickets.filter(ticket => {
        const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            ticket.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            ticket.to.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Get status display
    const getStatusDisplay = (status) => {
        switch (status) {
            case 'paid':
                return {
                    icon: FaCheckCircle,
                    color: 'text-green-600',
                    bg: 'bg-green-100 dark:bg-green-900/30',
                    text: 'Paid',
                    borderColor: 'border-green-200'
                };
            case 'accepted':
                return {
                    icon: FaCheckCircle,
                    color: 'text-blue-600',
                    bg: 'bg-blue-100 dark:bg-blue-900/30',
                    text: 'Accepted',
                    borderColor: 'border-blue-200'
                };
            case 'rejected':
                return {
                    icon: FaTimesCircle,
                    color: 'text-red-600',
                    bg: 'bg-red-100 dark:bg-red-900/30',
                    text: 'Rejected',
                    borderColor: 'border-red-200'
                };
            default:
                return {
                    icon: FaHourglassHalf,
                    color: 'text-yellow-600',
                    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
                    text: 'Pending',
                    borderColor: 'border-yellow-200'
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
                            My Booked Tickets
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Track your bookings and manage payments
                        </p>
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search tickets by title or route..."
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
                            <option value="paid">Paid</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                <FaTicketAlt className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{bookedTickets.length}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Total Bookings</p>
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
                                    {bookedTickets.filter(t => t.status === 'paid').length}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Paid</p>
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
                                    {bookedTickets.filter(t => t.status === 'pending' || t.status === 'accepted').length}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
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
                                    ${bookedTickets.filter(t => t.status === 'paid')
                                        .reduce((sum, t) => sum + (t.totalPrice || 0), 0)}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Total Spent</p>
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
                            const countdown = countdowns[ticket._id] || { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false };
                            const statusDisplay = getStatusDisplay(ticket.status);
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
                                        
                                        {/* Status Badge */}
                                        <div className="absolute top-3 right-3">
                                            <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusDisplay.bg} backdrop-blur-sm border ${statusDisplay.borderColor}`}>
                                                <StatusIcon className={`w-3 h-3 ${statusDisplay.color}`} />
                                                <span className={`text-xs font-semibold ${statusDisplay.color}`}>
                                                    {statusDisplay.text}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Price Badge */}
                                        <div className="absolute top-3 left-3">
                                            <div className="bg-secondary-content text-white px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                                                <FaDollarSign className="w-3 h-3" />
                                                <span className="font-bold text-sm">{ticket.totalPrice}</span>
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
                                                <span className="text-sm">{ticket.from}</span>
                                                <FaArrowRight className="w-3 h-3 text-gray-400" />
                                                <span className="text-sm">{ticket.to}</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div className="flex items-center gap-2">
                                                <FaTicketAlt className="w-4 h-4 text-purple-500" />
                                                <span>Qty: {ticket.bookingQty}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FaClock className="w-4 h-4 text-orange-500" />
                                                <span>{new Date(ticket.departure).toLocaleDateString()}</span>
                                            </div>
                                        </div>

                                        {/* Countdown Timer */}
                                        {ticket.status !== "rejected" && !countdown.isExpired && (
                                            <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4">
                                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 text-center">Time until departure</p>
                                                <div className="grid grid-cols-4 gap-2">
                                                    {[
                                                        { value: countdown.days, label: 'Days' },
                                                        { value: countdown.hours, label: 'Hours' },
                                                        { value: countdown.minutes, label: 'Min' },
                                                        { value: countdown.seconds, label: 'Sec' }
                                                    ].map((item, idx) => (
                                                        <div key={idx} className="text-center">
                                                            <div className="bg-white dark:bg-slate-700 rounded-lg p-2 border border-gray-200 dark:border-gray-600">
                                                                <div className="text-lg font-bold text-secondary-content">{item.value}</div>
                                                                <div className="text-xs text-gray-500">{item.label}</div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Expired Warning */}
                                        {countdown.isExpired && ticket.status !== "paid" && (
                                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3">
                                                <div className="flex items-center gap-2">
                                                    <FaExclamationTriangle className="w-4 h-4 text-red-600" />
                                                    <p className="text-sm text-red-700 dark:text-red-400">
                                                        Departure time has passed. Payment unavailable.
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Action Button */}
                                        {ticket.status === "accepted" && !countdown.isExpired && (
                                            <motion.button
                                                onClick={() => handlePayment(ticket)}
                                                className="w-full bg-gradient-to-r from-secondary-content to-secondary-content/90 text-white py-3 px-4 rounded-xl font-semibold hover:from-secondary-content/90 hover:to-secondary-content transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <FaCreditCard className="w-4 h-4" />
                                                <span>Pay Now</span>
                                            </motion.button>
                                        )}
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
                            {searchTerm || statusFilter !== 'all' ? 'No tickets match your filters' : 'No booked tickets yet'}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-500 mb-6">
                            {searchTerm || statusFilter !== 'all' 
                                ? 'Try adjusting your search or filter criteria' 
                                : 'Start by browsing and booking your first ticket'
                            }
                        </p>
                        {!searchTerm && statusFilter === 'all' && (
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
            </AnimatePresence>
        </motion.div>
    );
};

export default MyBookedTickets;
