import { motion } from 'framer-motion';
import { FaBus, FaTrain, FaShip, FaPlane } from 'react-icons/fa';

const popularRoutes = [
    { from: "Dhaka", to: "Chittagong", transport: "Train" },
    { from: "Dhaka", to: "Sylhet", transport: "Bus" },
    { from: "Dhaka", to: "Barishal", transport: "Launch" },
    { from: "Dhaka", to: "Chittagong", transport: "Flight" },
];

const PopularRoutes = () => {
    // Get transport icon
    const getTransportIcon = (transportType) => {
        switch (transportType?.toLowerCase()) {
            case 'bus':
                return FaBus;
            case 'train':
                return FaTrain;
            case 'launch':
                return FaShip;
            case 'flight':
                return FaPlane;
            default:
                return FaBus;
        }
    };

    // Get transport color
    const getTransportColor = (transportType) => {
        switch (transportType?.toLowerCase()) {
            case 'bus':
                return 'text-blue-500 bg-blue-50';
            case 'train':
                return 'text-green-500 bg-green-50';
            case 'launch':
                return 'text-cyan-500 bg-cyan-50';
            case 'flight':
                return 'text-purple-500 bg-purple-50';
            default:
                return 'text-blue-500 bg-blue-50';
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
            y: 30,
            scale: 0.9
        },
        visible: { 
            opacity: 1, 
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 bg-indigo-500/5 rounded-full blur-xl sm:blur-2xl"></div>
                <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-20 sm:w-32 md:w-40 h-20 sm:h-32 md:h-40 bg-teal-500/5 rounded-full blur-xl sm:blur-2xl"></div>
                <div className="absolute top-1/2 left-1/3 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-gradient-to-r from-indigo-500/3 to-teal-500/3 rounded-full blur-2xl sm:blur-3xl"></div>
            </div>

            <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-base-200 dark:bg-slate-900 relative">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Section Header */}
                    <motion.div 
                        className="text-left mb-8 sm:mb-12 md:mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Title */}
                        <motion.h2 
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-content tracking-tight"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            Popular Routes
                        </motion.h2>
                    </motion.div>

                    {/* Routes Grid */}
                    <motion.div 
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {popularRoutes.map((route, index) => {
                            const TransportIcon = getTransportIcon(route.transport);
                            const transportColor = getTransportColor(route.transport);

                            return (
                                <motion.div
                                    key={index}
                                    variants={cardVariants}
                                    whileHover={{ 
                                        y: -8,
                                        scale: 1.02,
                                        transition: { duration: 0.3 }
                                    }}
                                    className="group"
                                >
                                    {/* Enhanced Card */}
                                    <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 group-hover:border-indigo-200 dark:group-hover:border-indigo-400 p-6 text-center">
                                        {/* Glow Effect */}
                                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-teal-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        
                                        {/* Card Content */}
                                        <div className="relative z-10">
                                            {/* Transport Icon */}
                                            <div className="flex justify-center mb-4">
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${transportColor} group-hover:scale-110 transition-transform duration-300`}>
                                                    <TransportIcon className="w-6 h-6" />
                                                </div>
                                            </div>

                                            {/* Route Text */}
                                            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                                                {route.from} → {route.to}
                                            </h3>
                                            
                                            {/* Transport Type */}
                                            <p className="text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300 font-medium">
                                                {route.transport}
                                            </p>
                                        </div>

                                        {/* Shimmer Effect */}
                                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default PopularRoutes;