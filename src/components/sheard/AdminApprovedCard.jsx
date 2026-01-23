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
            <div className="relative h-48 overflow-hidden">
                <img
                    src={ticket.image}
                    alt={ticket.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4">
                    <div className="bg-secondary-content text-white px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg backdrop-blur-sm">
                        <FaDollarSign className="w-3 h-3" />
                        <span className="font-bold text-sm">{ticket.price}</span>
                    </div>
                </div>

                {/* Transport Badge */}
                <div className="absolute top-4 left-4">
                    <div className="bg-white/90 dark:bg-slate-800/90 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg backdrop-blur-sm">
                        {getTransportIcon(ticket.transport)}
                        <span className="font-medium text-xs uppercase tracking-wide truncate">{ticket.transport}</span>
                    </div>
                </div>

                {/* Approved Badge */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-green-500 text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs">
                        <FaCheckCircle className="w-3 h-3" />
                        <span className="font-medium truncate">Approved</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
                {/* Title */}
                <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2 truncate group-hover:text-secondary-content transition-colors duration-200">
                        {ticket.title}
                    </h3>
                    
                    {/* Route */}
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <FaMapMarkerAlt className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        <span className="font-medium text-sm truncate">{ticket.from}</span>
                        <FaArrowRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
                        <span className="font-medium text-sm truncate">{ticket.to}</span>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                            <FaTicketAlt className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Available</p>
                            <p className="font-semibold text-gray-800 dark:text-gray-200 truncate">{ticket.quantity}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                            <FaClock className="w-4 h-4 text-orange-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Departure</p>
                            <p className="font-semibold text-gray-800 dark:text-gray-200 text-xs truncate">
                                {ticket.departure?.split(' ').slice(0, 2).join(' ')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Perks */}
                {ticket?.perks?.length > 0 && (
                    <div className="space-y-2">
                        <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide truncate">Amenities</p>
                        <div className="flex gap-1 overflow-hidden">
                            {ticket.perks.slice(0, 3).map((perk, index) => (
                                <span 
                                    key={index}
                                    className="px-2 py-1 bg-gray-100 dark:bg-slate-800 text-xs rounded-full text-gray-600 dark:text-gray-400 font-medium truncate flex-shrink-0 max-w-16"
                                >
                                    {perk}
                                </span>
                            ))}
                            {ticket.perks.length > 3 && (
                                <span className="px-2 py-1 bg-gray-100 dark:bg-slate-800 text-xs rounded-full text-gray-600 dark:text-gray-400 font-medium flex-shrink-0">
                                    +{ticket.perks.length - 3}
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* Action Button */}
                <motion.button
                    onClick={() => navigate(`/ticket-details/${ticket._id}`)}
                    className="w-full bg-gradient-to-r from-secondary-content to-secondary-content/90 text-white py-3 px-4 rounded-xl font-semibold hover:from-secondary-content/90 hover:to-secondary-content transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <span className="truncate">View Details</span>
                    <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0" />
                </motion.button>
            </div>

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-secondary-content/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </motion.div>
    );
};

export default AdminApprovedCard;
