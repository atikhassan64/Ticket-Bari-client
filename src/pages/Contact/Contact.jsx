import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import { emailjsConfig } from '../../config/emailjs';
import { web3formsConfig } from '../../config/web3forms';
import { 
    FaMapMarkerAlt, 
    FaPhone, 
    FaEnvelope, 
    FaClock, 
    FaPaperPlane,
    FaUser,
    FaTag,
    FaComments,
    FaCheckCircle,
    FaHeadset
} from 'react-icons/fa';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // Using Web3Forms - free form backend service
            const formDataToSend = new FormData();
            formDataToSend.append('access_key', web3formsConfig.accessKey);
            formDataToSend.append('name', formData.name);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('subject', `TicketBari Contact: ${formData.subject}`);
            formDataToSend.append('message', `
New message from TicketBari contact form:

From: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

---
This message was sent from the TicketBari contact form.
You can reply directly to this email to respond to ${formData.name}.
            `);
            formDataToSend.append('redirect', 'false');
            formDataToSend.append('from_name', 'TicketBari Contact Form');
            formDataToSend.append('replyto', formData.email);

            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formDataToSend
            });

            const result = await response.json();

            if (result.success) {
                toast.success('Message sent successfully! We will get back to you soon.');
                setFormData({ name: '', email: '', subject: '', message: '' });
                
                // Log success for debugging
                console.log('Email sent successfully to:', web3formsConfig.toEmail);
                console.log('Message details:', {
                    from: formData.name,
                    email: formData.email,
                    subject: formData.subject
                });
            } else {
                throw new Error(result.message || 'Failed to send message');
            }

        } catch (error) {
            console.error('Web3Forms Error:', error);
            
            // Fallback: Try EmailJS if configured
            try {
                if (emailjsConfig.publicKey && emailjsConfig.publicKey !== 'YOUR_PUBLIC_KEY_HERE') {
                    const templateParams = {
                        from_name: formData.name,
                        from_email: formData.email,
                        subject: formData.subject,
                        message: formData.message,
                        to_email: 'atikhassant64@gmail.com',
                        reply_to: formData.email
                    };

                    await emailjs.send(
                        emailjsConfig.serviceId, 
                        emailjsConfig.templateId, 
                        templateParams, 
                        emailjsConfig.publicKey
                    );
                    
                    toast.success('Message sent successfully! We will get back to you soon.');
                    setFormData({ name: '', email: '', subject: '', message: '' });
                } else {
                    throw new Error('Email service not available');
                }
            } catch (fallbackError) {
                console.error('Fallback Email Error:', fallbackError);
                toast.error('Unable to send message at the moment. Please contact us directly at atikhassant64@gmail.com');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

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

    const contactInfo = [
        {
            icon: <FaMapMarkerAlt className="w-6 h-6" />,
            title: "Address",
            content: "Level 4, Bashundhara City\nDhaka, Bangladesh",
            color: "from-blue-500 to-blue-600"
        },
        {
            icon: <FaPhone className="w-6 h-6" />,
            title: "Phone",
            content: "+880 1234 567 890",
            color: "from-green-500 to-green-600"
        },
        {
            icon: <FaEnvelope className="w-6 h-6" />,
            title: "Email",
            content: "support@ticketbari.com",
            color: "from-purple-500 to-purple-600"
        },
        {
            icon: <FaClock className="w-6 h-6" />,
            title: "Business Hours",
            content: "24/7 Customer Support\nMon - Fri: 9:00 AM - 6:00 PM",
            color: "from-orange-500 to-orange-600"
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
                {/* Header */}
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
                            Contact Us
                            <motion.div
                                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 sm:w-24 h-1 bg-gradient-to-r from-secondary-content to-secondary-content/60 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: "6rem" }}
                                transition={{ duration: 1, delay: 0.5 }}
                            />
                        </h1>
                    </motion.div>
                    <motion.p 
                        className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        Have questions or need assistance? We're here to help! 
                        Reach out to us through any of the channels below.
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Contact Information */}
                    <motion.div
                        variants={itemVariants}
                        className="order-2 lg:order-1"
                    >
                        <motion.div
                            className="flex items-center gap-3 mb-6 sm:mb-8"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="p-2 bg-secondary-content/10 rounded-lg">
                                <FaHeadset className="w-6 h-6 sm:w-8 sm:h-8 text-secondary-content" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-secondary-content">Get in Touch</h2>
                        </motion.div>
                        
                        <div className="space-y-4 sm:space-y-6">
                            {contactInfo.map((info, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-start gap-4 group"
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                                    whileHover={{ x: 5 }}
                                >
                                    <motion.div 
                                        className={`bg-gradient-to-br ${info.color} text-white p-3 sm:p-4 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300`}
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {info.icon}
                                    </motion.div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg sm:text-xl text-gray-800 dark:text-gray-200 mb-1 sm:mb-2">
                                            {info.title}
                                        </h3>
                                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                            {info.content}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Additional Info Card */}
                        <motion.div
                            className="mt-8 sm:mt-10 p-6 sm:p-8 bg-gradient-to-br from-secondary-content/5 to-secondary-content/10 rounded-2xl border border-secondary-content/20"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <FaCheckCircle className="w-6 h-6 text-secondary-content" />
                                <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200">
                                    Quick Response Guarantee
                                </h3>
                            </div>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                We typically respond to all inquiries within 2-4 hours during business hours. 
                                For urgent matters, please call our 24/7 support line.
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        variants={itemVariants}
                        className="order-1 lg:order-2"
                    >
                        <motion.div
                            className="flex items-center gap-3 mb-6 sm:mb-8"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="p-2 bg-secondary-content/10 rounded-lg">
                                <FaPaperPlane className="w-6 h-6 sm:w-8 sm:h-8 text-secondary-content" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-secondary-content">Send us a Message</h2>
                        </motion.div>
                        
                        <motion.div
                            className="bg-white dark:bg-slate-900 p-6 sm:p-8 lg:p-10 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 relative overflow-hidden"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            {/* Background Pattern */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-secondary-content/5 to-transparent rounded-bl-full" />
                            
                            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: 0.5 }}
                                    >
                                        <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Full Name *
                                        </label>
                                        <div className="relative">
                                            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full pl-10 pr-4 py-3 sm:py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-slate-800 focus:ring-2 focus:ring-secondary-content/20 focus:border-secondary-content transition-all duration-200 text-sm sm:text-base text-gray-800 dark:text-gray-200"
                                                placeholder="Your full name"
                                            />
                                        </div>
                                    </motion.div>
                                    
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: 0.6 }}
                                    >
                                        <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Email Address *
                                        </label>
                                        <div className="relative">
                                            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full pl-10 pr-4 py-3 sm:py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-slate-800 focus:ring-2 focus:ring-secondary-content/20 focus:border-secondary-content transition-all duration-200 text-sm sm:text-base text-gray-800 dark:text-gray-200"
                                                placeholder="your.email@example.com"
                                            />
                                        </div>
                                    </motion.div>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.7 }}
                                >
                                    <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Subject *
                                    </label>
                                    <div className="relative">
                                        <FaTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-10 pr-4 py-3 sm:py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-slate-800 focus:ring-2 focus:ring-secondary-content/20 focus:border-secondary-content transition-all duration-200 text-sm sm:text-base text-gray-800 dark:text-gray-200"
                                            placeholder="What is this regarding?"
                                        />
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.8 }}
                                >
                                    <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Message *
                                    </label>
                                    <div className="relative">
                                        <FaComments className="absolute left-3 top-4 text-gray-400 w-4 h-4" />
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows="6"
                                            className="w-full pl-10 pr-4 py-3 sm:py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-slate-800 focus:ring-2 focus:ring-secondary-content/20 focus:border-secondary-content transition-all duration-200 resize-none text-sm sm:text-base text-gray-800 dark:text-gray-200"
                                            placeholder="Please describe your inquiry in detail..."
                                        ></textarea>
                                    </div>
                                </motion.div>

                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-3 sm:py-4 px-6 rounded-xl font-semibold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl ${
                                        isSubmitting 
                                            ? 'bg-gray-400 cursor-not-allowed' 
                                            : 'bg-gradient-to-r from-secondary-content to-secondary-content/90 hover:from-secondary-content/90 hover:to-secondary-content text-white'
                                    }`}
                                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.9 }}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <FaPaperPlane className="w-4 h-4 sm:w-5 sm:h-5" />
                                            Send Message
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default Contact;