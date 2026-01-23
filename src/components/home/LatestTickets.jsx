import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaClock, FaFire, FaArrowRight, FaBus, FaTrain, FaShip, FaPlane, FaMapMarkerAlt } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../sheard/loading/Loading';

const LatestTickets = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: tickets = [], isLoading } = useQuery({
        queryKey: ["tickets"],
        queryFn: async () => {
            const res = await axiosSecure.get("/tickets");
            return res.data;
        }
    });

    const handleViewAllClick = () => {
        navigate('/all-tickets');
    };

    const handleBookNow = (ticketId) => {
        navigate(`/ticket-details/${ticketId}`);
    };

    if (isLoading) {
        return <Loading />;
    }

    const latestTickets = [...tickets]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 8);

    // Get transport icon
    const getTransportIcon = (transportType) => {
        switch (transportType?.toLowerCase()) {
            case 'bus':
                return FaBus;
            case 'train':
                return FaTrain;
            case 'launch':
            case 'ship':
                return FaShip;
            case 'air':
            case 'plane':
                return FaPlane;
            default:
                return FaBus;
        }
    };

    // Get transport color
    const getTransportColor = (transportType) => {
        switch (transportType?.toLowerCase()) {
            case 'bus':
                return 'text-secondary-content bg-secondary-content/10';
            case 'train':
                return 'text-secondary-content bg-secondary-content/10';
            case 'launch':
            case 'ship':
                return 'text-secondary-content bg-secondary-content/10';
            case 'air':
            case 'plane':
                return 'text-secondary-content bg-secondary-content/10';
            default:
                return 'text-secondary-content bg-secondary-content/10';
        }
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

    const cardVariants = {
        hidden: { 
            opacity: 0, 
            y: 50,
            scale: 0.9
        },
        visible: { 
            opacity: 1, 
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-10 sm:top-20 right-5 sm:right-10 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 bg-blue-500/5 rounded-full blur-xl sm:blur-2xl"></div>
                <div className="absolute bottom-10 sm:bottom-20 left-5 sm:left-10 w-20 sm:w-32 md:w-40 h-20 sm:h-32 md:h-40 bg-purple-500/5 rounded-full blur-xl sm:blur-2xl"></div>
                <div className="absolute top-1/3 left-1/4 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-gradient-to-r from-blue-500/3 to-purple-500/3 rounded-full blur-2xl sm:blur-3xl"></div>
            </div>

            <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-slate-50/50 via-white to-blue-50/30 dark:from-slate-900/50 dark:via-slate-800 dark:to-slate-900/30 relative">
                <div className='max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8'>
                    
                    {/* Section Header - Left Title, Right Button */}
                    <motion.div 
                        className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 sm:mb-12 md:mb-16 gap-4 sm:gap-6"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Left Side - Title and Description */}
                        <div className="flex-1 w-full lg:w-auto">
                            {/* Badge */}
                            <motion.div
                                className="inline-flex items-center gap-2 bg-secondary-content/10 text-secondary-content rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold mb-3 sm:mb-4"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <FaFire className="w-3 sm:w-4 h-3 sm:h-4 text-orange-500 animate-pulse" />
                                Fresh Arrivals
                            </motion.div>

                            {/* Main Title */}
                            <motion.h2 
                                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-secondary-content mb-3 sm:mb-4 tracking-tight leading-tight"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                            >
                                Latest Tickets Available
                            </motion.h2>

                            {/* Subtitle */}
                            <motion.p 
                                className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-full lg:max-w-2xl leading-relaxed"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                Discover the newest travel opportunities and book your next adventure
                            </motion.p>

                            {/* Decorative Line */}
                            <motion.div 
                                className="w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-secondary-content to-primary-content rounded-full mt-4 sm:mt-6"
                                initial={{ width: 0 }}
                                whileInView={{ width: 96 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                            ></motion.div>
                        </div>

                        {/* Right Side - View All Button */}
                        <motion.div
                            className="flex-shrink-0 w-full lg:w-auto"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            <motion.button
                                onClick={handleViewAllClick}
                                className="
                                    w-full lg:w-auto
                                    bg-gradient-to-r from-secondary-content to-secondary-content/90 
                                    hover:from-secondary-content/90 hover:to-secondary-content
                                    text-white 
                                    px-6 sm:px-8 py-3 sm:py-4 
                                    rounded-full 
                                    font-bold 
                                    text-sm sm:text-base lg:text-lg
                                    shadow-xl 
                                    hover:shadow-2xl
                                    transform 
                                    hover:scale-105 
                                    transition-all 
                                    duration-300
                                    border-2 
                                    border-transparent
                                    hover:border-white/20
                                    relative
                                    overflow-hidden
                                    group
                                "
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {/* Button Shimmer Effect */}
                                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-700"></div>
                                <span className="relative z-10 flex items-center gap-2 justify-center">
                                    View All
                                    <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                </span>
                            </motion.button>
                        </motion.div>
                    </motion.div>

                    {/* Tickets Grid */}
                    {latestTickets.length > 0 ? (
                        <motion.div 
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            {latestTickets.map((ticket) => {
                                const TransportIcon = getTransportIcon(ticket.transportType);
                                const transportColor = getTransportColor(ticket.transportType);

                                return (
                                    <motion.div
                                        key={ticket._id}
                                        variants={cardVariants}
                                        whileHover={{ 
                                            y: -8,
                                            transition: { duration: 0.3 }
                                        }}
                                        className="group w-full"
                                    >
                                        {/* Custom Card Design */}
                                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 group-hover:border-blue-200 dark:group-hover:border-blue-400">
                                            {/* Card Header */}
                                            <div className="p-4 sm:p-6">
                                                {/* Transport Icon and Price */}
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${transportColor}`}>
                                                        <TransportIcon className="w-5 h-5" />
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-2xl font-bold text-secondary-content">
                                                            ${ticket.price}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Route Information */}
                                                <div className="mb-4">
                                                    <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1 truncate">
                                                        {ticket.from} → {ticket.to}
                                                    </div>
                                                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2 truncate">
                                                        {ticket.title}
                                                    </h3>
                                                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 truncate">
                                                        <FaClock className="w-4 h-4 mr-2 flex-shrink-0" />
                                                        <span className="truncate">Departure: {new Date(ticket.departure).toLocaleTimeString('en-US', { 
                                                            hour: '2-digit', 
                                                            minute: '2-digit',
                                                            hour12: true 
                                                        })}</span>
                                                    </div>
                                                </div>

                                                {/* Book Now Button */}
                                                <motion.button
                                                    onClick={() => handleBookNow(ticket._id)}
                                                    className="w-full bg-secondary-content hover:bg-secondary-content/90 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    Book Now
                                                </motion.button>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    ) : (
                        <motion.div 
                            className="text-center py-12 sm:py-16 px-4"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            {/* Empty State */}
                            <div className="max-w-md mx-auto">
                                <div className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                                    <FaClock className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 text-gray-400 dark:text-gray-500" />
                                </div>
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    No Latest Tickets Available
                                </h3>
                                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
                                    New tickets will appear here as they become available. Check back soon!
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {/* Statistics Section */}
                    {latestTickets.length > 0 && (
                        <motion.div 
                            className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                        >
                            {[
                                { label: 'Total Tickets', value: tickets.length, color: 'text-secondary-content' },
                                { label: 'Latest Added', value: latestTickets.length, color: 'text-secondary-content' },
                                { label: 'Routes Available', value: new Set(tickets.map(t => `${t.from}-${t.to}`)).size, color: 'text-secondary-content' },
                                { label: 'Transport Types', value: new Set(tickets.map(t => t.transportType)).size, color: 'text-secondary-content' }
                            ].map((stat, index) => (
                                <motion.div
                                    key={index}
                                    className="text-center p-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className={`text-2xl sm:text-3xl font-bold ${stat.color} mb-1`}>
                                        {stat.value}
                                    </div>
                                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default LatestTickets;
