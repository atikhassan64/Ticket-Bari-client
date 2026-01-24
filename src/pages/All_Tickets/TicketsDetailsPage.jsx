import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router';
import { motion } from 'framer-motion';
import { 
    FaMapMarkerAlt, 
    FaDollarSign, 
    FaTicketAlt, 
    FaBus, 
    FaClock, 
    FaArrowRight,
    FaStar,
    FaCheckCircle,
    FaCalendarAlt,
    FaUsers,
    FaTimes
} from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/sheard/loading/Loading';
import useAuth from '../../hooks/useAuth';

const TicketsDetailsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookingQty, setBookingQty] = useState(1);
    const { user } = useAuth();
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: ticket = [], isLoading } = useQuery({
        queryKey: ["ticket", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tickets/${id}`);
            return res.data;
        }
    });

    const { data: dbUser = {} } = useQuery({
        queryKey: ["user", user?.email],
        queryFn: async () => {
            if (!user?.email) return {};
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });

    const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        if (!ticket.departure) return;

        const interval = setInterval(() => {
            const now = new Date();
            const departureTime = new Date(ticket.departure);
            const diff = departureTime - now;

            if (diff <= 0) {
                clearInterval(interval);
                setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((diff / 1000 / 60) % 60);
                const seconds = Math.floor((diff / 1000) % 60);
                setCountdown({ days, hours, minutes, seconds });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [ticket.departure]);

    const isExpired = new Date(ticket.departure) - new Date() <= 0;
    const isOutOfStock = ticket.quantity === 0;

    const handleConfirm = () => {
        const bookedTicket = {
            ticketId: ticket._id,
            title: ticket.title,
            image: ticket.image,
            from: ticket.from,
            to: ticket.to,
            departure: ticket.departure,
            unitPrice: ticket.price,
            bookingQty: bookingQty,
            totalPrice: ticket.price * bookingQty,
            userEmail: user.email,
            userName: user.displayName,
            vendorEmail: ticket.vendorEmail
        };

        axiosSecure.post("/ticket-booked", bookedTicket)
            .then(res => {
                console.log("booked data goes to database : ", res.data);
                setIsModalOpen(false);
            })
    }

    // Get transport icon
    const getTransportIcon = (transport) => {
        switch (transport?.toLowerCase()) {
            case 'bus':
                return <FaBus className="w-5 h-5" />;
            case 'train':
                return (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v6H4V6z"/>
                    </svg>
                );
            case 'air':
            case 'plane':
                return (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                    </svg>
                );
            case 'launch':
                return (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                );
            default:
                return <FaBus className="w-5 h-5" />;
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <motion.div 
            className='py-4 sm:py-6 lg:py-12 px-3 sm:px-4 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 min-h-screen'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            {/* Enhanced Modal */}
            {isModalOpen && (
                <motion.div 
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center px-3 sm:px-4 z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div 
                        className="bg-white dark:bg-slate-900 p-4 sm:p-6 lg:p-8 rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md border border-gray-200 dark:border-gray-700 mx-3"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200">Book Ticket</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors duration-200"
                            >
                                <FaTimes className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="mb-4 sm:mb-6">
                            <label className="block mb-2 sm:mb-3 font-semibold text-sm sm:text-base text-gray-700 dark:text-gray-300">
                                Booking Quantity
                            </label>
                            <div className="relative">
                                <FaUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                                <input
                                    type="number"
                                    min={1}
                                    max={ticket.quantity}
                                    value={bookingQty}
                                    onChange={(e) => setBookingQty(Number(e.target.value))}
                                    className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-secondary-content/20 focus:border-secondary-content transition-all duration-200 text-sm sm:text-base"
                                />
                            </div>
                            {bookingQty > ticket.quantity && (
                                <motion.p 
                                    className="text-red-500 text-sm mt-2 flex items-center gap-2"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <FaTimes className="w-3 h-3" />
                                    Quantity cannot be greater than available tickets
                                </motion.p>
                            )}
                        </div>

                        <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                            <div className="flex justify-between items-center">
                                <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Total Price:</span>
                                <span className="text-xl sm:text-2xl font-bold text-secondary-content">
                                    ${(ticket.price * bookingQty).toFixed(2)}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <motion.button
                                className="w-full px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-all duration-200 font-medium text-sm sm:text-base"
                                onClick={() => setIsModalOpen(false)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Cancel
                            </motion.button>
                            <Link
                                to={`/dashboard/my-booked-tickets`}
                                className={`w-full px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base ${
                                    bookingQty > ticket.quantity
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-secondary-content text-white hover:bg-secondary-content/90 shadow-lg hover:shadow-xl'
                                }`}
                                onClick={bookingQty <= ticket.quantity ? handleConfirm : (e) => e.preventDefault()}
                            >
                                <FaCheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                                Confirm Booking
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            <div className="max-w-7xl mx-auto">
                {/* Hero Image Section */}
                <motion.div 
                    className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden rounded-xl sm:rounded-2xl mb-6 sm:mb-8 shadow-2xl"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <img
                        src={ticket.image}
                        alt={ticket.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Price Badge */}
                    <div className="absolute top-3 sm:top-4 lg:top-6 right-3 sm:right-4 lg:right-6">
                        <div className="bg-secondary-content text-white px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-full flex items-center gap-1 sm:gap-2 shadow-lg backdrop-blur-sm">
                            <FaDollarSign className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="font-bold text-sm sm:text-base lg:text-lg">{ticket.price}</span>
                        </div>
                    </div>

                    {/* Transport Badge */}
                    <div className="absolute top-3 sm:top-4 lg:top-6 left-3 sm:left-4 lg:left-6">
                        <div className="bg-white/90 dark:bg-slate-800/90 text-gray-700 dark:text-gray-300 px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-full flex items-center gap-1 sm:gap-2 shadow-lg backdrop-blur-sm">
                            {getTransportIcon(ticket.transport)}
                            <span className="font-medium text-xs sm:text-sm uppercase tracking-wide">{ticket.transport}</span>
                        </div>
                    </div>

                    {/* Status Badges */}
                    <div className="absolute bottom-3 sm:bottom-4 lg:bottom-6 right-3 sm:right-4 lg:right-6 flex gap-1 sm:gap-2">
                        {isExpired && (
                            <div className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                                Expired
                            </div>
                        )}
                        {isOutOfStock && (
                            <div className="bg-orange-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                                Sold Out
                            </div>
                        )}
                        {!isExpired && !isOutOfStock && (
                            <div className="bg-green-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1">
                                <FaCheckCircle className="w-2 h-2 sm:w-3 sm:h-3" />
                                Available
                            </div>
                        )}
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6 lg:space-y-8">
                        {/* Title and Route */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4 sm:mb-6 px-1">
                                {ticket.title}
                            </h1>
                            
                            <div className="bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                                    <div className="text-center flex-1">
                                        <FaMapMarkerAlt className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 mx-auto mb-2" />
                                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">From</p>
                                        <p className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200 truncate">{ticket.from}</p>
                                    </div>
                                    
                                    <div className="flex-1 flex items-center justify-center order-first sm:order-none">
                                        <div className="w-full h-px bg-gray-300 dark:bg-gray-600 relative hidden sm:block">
                                            <FaArrowRight className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-secondary-content bg-white dark:bg-slate-900 p-1 rounded-full" />
                                        </div>
                                        <FaArrowRight className="w-6 h-6 text-secondary-content sm:hidden" />
                                    </div>
                                    
                                    <div className="text-center flex-1">
                                        <FaMapMarkerAlt className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mx-auto mb-2" />
                                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">To</p>
                                        <p className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200 truncate">{ticket.to}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Departure and Countdown */}
                        <motion.div
                            className="bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                                <FaCalendarAlt className="w-5 h-5 sm:w-6 sm:h-6 text-secondary-content" />
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200">Departure Time</h2>
                            </div>
                            
                            <div className="flex flex-col gap-4 sm:gap-6">
                                <div className="text-center lg:text-left">
                                    <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 mb-2">Scheduled Departure</p>
                                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-gray-200">{ticket.departure}</p>
                                </div>
                                
                                <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-sm mx-auto lg:mx-0">
                                    {["days", "hours", "minutes", "seconds"].map((unit, idx) => (
                                        <motion.div
                                            key={idx}
                                            className="flex flex-col items-center bg-gradient-to-b from-secondary-content to-secondary-content/80 text-white p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl shadow-lg"
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <span className="text-lg sm:text-xl lg:text-2xl font-bold">
                                                {countdown[unit]}
                                            </span>
                                            <span className="text-xs uppercase tracking-wide opacity-90">{unit}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Perks Section */}
                        {ticket.perks && ticket.perks.length > 0 && (
                            <motion.div
                                className="bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                                    <FaStar className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200">Amenities & Perks</h2>
                                </div>
                                
                                <div className="grid grid-cols-1 gap-2 sm:gap-3">
                                    {ticket.perks.map((perk, index) => (
                                        <motion.div
                                            key={index}
                                            className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 dark:bg-slate-800 rounded-lg sm:rounded-xl"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                                        >
                                            <FaCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                                            <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{perk}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4 sm:space-y-6">
                        {/* Booking Card */}
                        <motion.div
                            className="bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700 lg:sticky lg:top-6"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 sm:mb-6">Booking Details</h3>
                            
                            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                                <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-slate-800 rounded-lg sm:rounded-xl">
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <FaDollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                                        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Price per ticket</span>
                                    </div>
                                    <span className="text-xl sm:text-2xl font-bold text-secondary-content">${ticket.price}</span>
                                </div>
                                
                                <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-slate-800 rounded-lg sm:rounded-xl">
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <FaTicketAlt className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                                        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Available tickets</span>
                                    </div>
                                    <span className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200">{ticket.quantity}</span>
                                </div>
                            </div>

                            <motion.button
                                onClick={() => setIsModalOpen(true)}
                                className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg transition-all duration-200 flex items-center justify-center gap-2 sm:gap-3 ${
                                    isExpired || isOutOfStock || dbUser?.role === "vendor" || dbUser?.role === "admin"
                                        ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-secondary-content to-secondary-content/90 text-white hover:from-secondary-content/90 hover:to-secondary-content shadow-lg hover:shadow-xl'
                                }`}
                                disabled={isExpired || isOutOfStock || dbUser?.role === "vendor" || dbUser?.role === "admin"}
                                whileHover={!isExpired && !isOutOfStock && dbUser?.role !== "vendor" && dbUser?.role !== "admin" ? { scale: 1.02 } : {}}
                                whileTap={!isExpired && !isOutOfStock && dbUser?.role !== "vendor" && dbUser?.role !== "admin" ? { scale: 0.98 } : {}}
                            >
                                <FaTicketAlt className="w-4 h-4 sm:w-5 sm:h-5" />
                                {isExpired ? 'Expired' : isOutOfStock ? 'Sold Out' : 'Book Now'}
                            </motion.button>

                            {(dbUser?.role === "vendor" || dbUser?.role === "admin") && (
                                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center mt-2 sm:mt-3">
                                    Booking not available for {dbUser?.role}s
                                </p>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default TicketsDetailsPage;