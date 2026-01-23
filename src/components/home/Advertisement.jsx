import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AdminApprovedCard from '../sheard/AdminApprovedCard';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../sheard/loading/Loading';

const Advertisement = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: tickets = [], isLoading } = useQuery({
        queryKey: ["advertisedTickets"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tickets`);
            const advertisedTickets = res.data.filter(ticket => ticket.isAdvertised);
            return advertisedTickets.slice(0, 6);
        }
    });

    const handleAllTicketsClick = () => {
        navigate('/all-tickets');
    };

    if (isLoading) {
        return <Loading />;
    }

    // Container animation variants
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

    // Card animation variants
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
                <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 bg-secondary-content/5 rounded-full blur-xl sm:blur-2xl"></div>
                <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-20 sm:w-32 md:w-40 h-20 sm:h-32 md:h-40 bg-primary-content/5 rounded-full blur-xl sm:blur-2xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-gradient-to-r from-secondary-content/3 to-primary-content/3 rounded-full blur-2xl sm:blur-3xl"></div>
            </div>

            <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-base-200 dark:bg-slate-900 relative">
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
                                <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-secondary-content rounded-full animate-pulse"></span>
                                Featured Deals
                            </motion.div>

                            {/* Main Title */}
                            <motion.h2 
                                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-secondary-content mb-3 sm:mb-4 tracking-tight leading-tight"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                            >
                                Advertisement Tickets
                            </motion.h2>

                            {/* Subtitle */}
                            <motion.p 
                                className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-full lg:max-w-2xl leading-relaxed"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                Discover exclusive deals and special offers on premium travel experiences
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

                        {/* Right Side - All Tickets Button */}
                        <motion.div
                            className="flex-shrink-0 w-full lg:w-auto"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            <motion.button
                                onClick={handleAllTicketsClick}
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
                                "
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {/* Button Shimmer Effect */}
                                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent hover:translate-x-full transition-transform duration-700"></div>
                                <span className="relative z-10">All Tickets</span>
                            </motion.button>
                        </motion.div>
                    </motion.div>

                    {/* Tickets Grid */}
                    {tickets.length > 0 ? (
                        <motion.div 
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            {tickets.map((ticket) => (
                                <motion.div
                                    key={ticket._id}
                                    variants={cardVariants}
                                    whileHover={{ 
                                        y: -8,
                                        transition: { duration: 0.3 }
                                    }}
                                    className="group w-full"
                                >
                                    {/* Enhanced Card Wrapper */}
                                    <div className="relative w-full">
                                        {/* Glow Effect */}
                                        <div className="absolute -inset-1 bg-gradient-to-r from-secondary-content/20 to-primary-content/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        
                                        {/* Card Content */}
                                        <div className="relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 group-hover:border-secondary-content/30 w-full">
                                            {/* Special Offer Badge */}
                                            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10">
                                                <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 sm:px-3 py-1 rounded-full shadow-lg animate-pulse">
                                                    SPECIAL
                                                </div>
                                            </div>

                                            {/* Shimmer Effect */}
                                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                                            
                                            <AdminApprovedCard ticket={ticket} />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
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
                                <div className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                                    <svg className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    No Advertisement Tickets Available
                                </h3>
                                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
                                    Check back soon for exciting deals and special offers on travel tickets.
                                </p>
                            </div>
                        </motion.div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Advertisement;
