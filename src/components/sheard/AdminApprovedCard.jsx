import React from 'react';
import { motion } from 'framer-motion';
import { 
    FaMapMarkerAlt, 
    FaDollarSign, 
    FaTicketAlt, 
    FaBus, 
    FaClock, 
    FaArrowRight,
    FaStar,
    FaCheckCircle
} from 'react-icons/fa';
import { useNavigate } from 'react-router';

const AdminApprovedCard = ({ ticket }) => {
    const navigate = useNavigate();

    if (!ticket) return null;

    // Get transport icon
    const getTransportIcon = (transport) => {
        switch (transport?.toLowerCase()) {
            case 'bus':
                return <FaBus className="w-4 h-4" />;
            case 'train':
                return (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v6H4V6z"/>
                    </svg>
                );
            case 'air':
            case 'plane':
                return (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                    </svg>
                );
            case 'launch':
                return (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                );
            default:
                return <FaBus className="w-4 h-4" />;
        }
    };

    return (
        <motion.div
            className="group relative bg-white dark:bg-slate-900 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300"
            whileHover={{ y: -8 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Image Container */}
            <div className="relative h-40 lg:h-48 overflow-hidden">
                <img
                    src={ticket.image}
                    alt={ticket.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Price Badge */}
                <div className="absolute top-2 lg:top-4 right-2 lg:right-4">
                    <div className="bg-secondary-content text-white px-2 lg:px-3 py-1 lg:py-1.5 rounded-full flex items-center gap-1 shadow-lg backdrop-blur-sm">
                        <FaDollarSign className="w-2 h-2 lg:w-3 lg:h-3" />
                        <span className="font-bold text-xs lg:text-sm">{ticket.price}</span>
                    </div>
                </div>

                {/* Transport Badge */}
                <div className="absolute top-2 lg:top-4 left-2 lg:left-4">
                    <div className="bg-white/90 dark:bg-slate-800/90 text-gray-700 dark:text-gray-300 px-2 lg:px-3 py-1 lg:py-1.5 rounded-full flex items-center gap-1 lg:gap-2 shadow-lg backdrop-blur-sm">
                        {getTransportIcon(ticket.transport)}
                        <span className="font-medium text-xs uppercase tracking-wide truncate">{ticket.transport}</span>
                    </div>
                </div>

                {/* Approved Badge */}
                <div className="absolute bottom-2 lg:bottom-4 right-2 lg:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-green-500 text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs">
                        <FaCheckCircle className="w-2 h-2 lg:w-3 lg:h-3" />
                        <span className="font-medium truncate">Approved</span>
                    </div>
                </div>
            </div>

                {/* Content */}
                <div className="p-4 lg:p-6 space-y-3 lg:space-y-4">
                    {/* Title */}
                    <div>
                        <h3 className="text-lg lg:text-xl font-bold text-gray-800 dark:text-gray-200 mb-2 truncate group-hover:text-secondary-content transition-colors duration-200">
                            {ticket.title}
                        </h3>
                        
                        {/* Route */}
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <FaMapMarkerAlt className="w-3 h-3 text-blue-500 flex-shrink-0" />
                            <span className="font-medium text-xs lg:text-sm truncate">{ticket.from}</span>
                            <FaArrowRight className="w-2 h-2 text-gray-400 flex-shrink-0" />
                            <span className="font-medium text-xs lg:text-sm truncate">{ticket.to}</span>
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-3 lg:gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 lg:w-8 lg:h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                                <FaTicketAlt className="w-3 h-3 lg:w-4 lg:h-4 text-green-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Available</p>
                                <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm truncate">{ticket.quantity}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 lg:w-8 lg:h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                                <FaClock className="w-3 h-3 lg:w-4 lg:h-4 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Time</p>
                                <p className="font-semibold text-gray-800 dark:text-gray-200 text-xs truncate">
                                    {ticket.departure?.split(' ').slice(0, 2).join(' ')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <motion.button
                        onClick={() => navigate(`/ticket-details/${ticket._id}`)}
                        className="w-full bg-gradient-to-r from-secondary-content to-secondary-content/90 text-white py-2 lg:py-3 px-4 rounded-xl font-semibold hover:from-secondary-content/90 hover:to-secondary-content transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span className="truncate">View Details</span>
                        <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0" />
                    </motion.button>
                </div>

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-secondary-content/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </motion.div>
    );
};

export default AdminApprovedCard;
