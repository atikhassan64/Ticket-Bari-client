import React from 'react';
import { motion } from 'framer-motion';
import { 
    FaRocket, 
    FaShieldAlt, 
    FaCheckCircle, 
    FaUsers, 
    FaBus, 
    FaTicketAlt, 
    FaHeadset,
    FaEye,
    FaBullseye,
    FaStar
} from 'react-icons/fa';

const About = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    const features = [
        {
            icon: <FaRocket className="w-8 h-8" />,
            title: "Fast Booking",
            description: "Book your tickets instantly with our streamlined booking process"
        },
        {
            icon: <FaShieldAlt className="w-8 h-8" />,
            title: "Secure Payments",
            description: "Your payment information is protected with SSL encryption"
        },
        {
            icon: <FaCheckCircle className="w-8 h-8" />,
            title: "Verified Operators",
            description: "All transport operators are thoroughly verified for your safety"
        }
    ];

    const stats = [
        {
            icon: <FaUsers className="w-6 h-6" />,
            number: "50K+",
            label: "Happy Customers"
        },
        {
            icon: <FaBus className="w-6 h-6" />,
            number: "200+",
            label: "Transport Partners"
        },
        {
            icon: <FaTicketAlt className="w-6 h-6" />,
            number: "100K+",
            label: "Tickets Booked"
        },
        {
            icon: <FaHeadset className="w-6 h-6" />,
            number: "24/7",
            label: "Customer Support"
        }
    ];

    return (
        <motion.div 
            className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="max-w-[1200px] mx-auto px-4 py-8 sm:py-12 lg:py-16">
                {/* Hero Section */}
                <motion.div 
                    className="text-center mb-12 sm:mb-16 lg:mb-20"
                    variants={itemVariants}
                >
                    <motion.div
                        className="inline-block mb-6"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-content mb-4 sm:mb-6 relative">
                            About TicketBari
                            <motion.div
                                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 sm:w-32 h-1 bg-gradient-to-r from-secondary-content to-secondary-content/60 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: "8rem" }}
                                transition={{ duration: 1, delay: 0.5 }}
                            />
                        </h1>
                    </motion.div>
                    <motion.p 
                        className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed px-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        Your trusted partner for seamless travel booking across Bangladesh. 
                        We connect you with reliable transportation services for buses, trains, launches, and flights.
                    </motion.p>
                </motion.div>

                {/* Mission & Vision */}
                <motion.div 
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16 lg:mb-20"
                    variants={itemVariants}
                >
                    <motion.div 
                        className="bg-white dark:bg-slate-900 p-6 sm:p-8 lg:p-10 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 relative overflow-hidden group"
                        whileHover={{ y: -5, scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-secondary-content/10 to-transparent rounded-bl-full" />
                        <div className="flex items-center gap-4 mb-4 sm:mb-6">
                            <div className="p-3 bg-secondary-content/10 rounded-xl">
                                <FaBullseye className="w-6 h-6 sm:w-8 sm:h-8 text-secondary-content" />
                            </div>
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-secondary-content">Our Mission</h2>
                        </div>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                            To revolutionize travel booking in Bangladesh by providing a secure, 
                            user-friendly platform that connects travelers with verified transport operators, 
                            ensuring safe and comfortable journeys for everyone.
                        </p>
                        <motion.div
                            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-secondary-content to-secondary-content/60"
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            transition={{ duration: 1, delay: 0.2 }}
                            viewport={{ once: true }}
                        />
                    </motion.div>

                    <motion.div 
                        className="bg-white dark:bg-slate-900 p-6 sm:p-8 lg:p-10 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 relative overflow-hidden group"
                        whileHover={{ y: -5, scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-secondary-content/10 to-transparent rounded-bl-full" />
                        <div className="flex items-center gap-4 mb-4 sm:mb-6">
                            <div className="p-3 bg-secondary-content/10 rounded-xl">
                                <FaEye className="w-6 h-6 sm:w-8 sm:h-8 text-secondary-content" />
                            </div>
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-secondary-content">Our Vision</h2>
                        </div>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                            To become Bangladesh's leading digital travel platform, 
                            making transportation booking as simple as a few clicks while 
                            maintaining the highest standards of safety and customer satisfaction.
                        </p>
                        <motion.div
                            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-secondary-content to-secondary-content/60"
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            transition={{ duration: 1, delay: 0.4 }}
                            viewport={{ once: true }}
                        />
                    </motion.div>
                </motion.div>

                {/* Features */}
                <motion.div 
                    className="mb-12 sm:mb-16 lg:mb-20"
                    variants={itemVariants}
                >
                    <motion.div
                        className="text-center mb-8 sm:mb-12 lg:mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary-content mb-4">
                            Why Choose TicketBari?
                        </h2>
                        <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-secondary-content to-secondary-content/60 rounded-full mx-auto" />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="text-center group"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10 }}
                            >
                                <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 lg:p-10 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 h-full relative overflow-hidden">
                                    <motion.div 
                                        className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-secondary-content to-secondary-content/80 text-white rounded-2xl mb-4 sm:mb-6 mx-auto shadow-lg"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {feature.icon}
                                    </motion.div>
                                    <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-200">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                        {feature.description}
                                    </p>
                                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-secondary-content/5 to-transparent rounded-bl-full" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Stats */}
                <motion.div 
                    className="relative"
                    variants={itemVariants}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="bg-gradient-to-r from-secondary-content via-secondary-content/90 to-secondary-content text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-center relative overflow-hidden shadow-2xl">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full" />
                            <div className="absolute top-20 right-20 w-16 h-16 border-2 border-white rounded-full" />
                            <div className="absolute bottom-10 left-20 w-12 h-12 border-2 border-white rounded-full" />
                            <div className="absolute bottom-20 right-10 w-24 h-24 border-2 border-white rounded-full" />
                        </div>

                        <motion.div
                            className="relative z-10"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6 lg:mb-8">
                                <FaStar className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-300" />
                                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Our Impact</h2>
                                <FaStar className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-300" />
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 relative z-10">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    className="group"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
                                        <div className="flex items-center justify-center mb-2 sm:mb-3">
                                            {stat.icon}
                                        </div>
                                        <motion.div 
                                            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2"
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                                            viewport={{ once: true }}
                                        >
                                            {stat.number}
                                        </motion.div>
                                        <div className="text-xs sm:text-sm lg:text-base opacity-90 font-medium">
                                            {stat.label}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default About;