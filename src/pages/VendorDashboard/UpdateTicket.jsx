import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/sheard/loading/Loading";
import { 
    FaTicketAlt, 
    FaMapMarkerAlt, 
    FaBus, 
    FaDollarSign, 
    FaCalendarAlt, 
    FaImage, 
    FaStar,
    FaEdit,
    FaArrowLeft,
    FaCheckCircle,
    FaExclamationTriangle
} from "react-icons/fa";

const UpdateTicket = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const { data: ticket = {}, isLoading } = useQuery({
        queryKey: ["ticket", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tickets/${id}`);
            return res.data;
        }
    });

    const formatDateForInput = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
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

    if (isLoading) return <Loading />;

    if (ticket.adminStatus === "rejected") {
        return (
            <motion.div 
                className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-2xl shadow-2xl border border-red-200 dark:border-red-800 text-center max-w-md mx-4">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <FaExclamationTriangle className="w-10 h-10 text-red-500" />
                    </motion.div>
                    <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
                        Ticket Rejected
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        This ticket was rejected by the admin. You cannot update it at this time.
                    </p>
                    <motion.button
                        onClick={() => navigate("/dashboard/my-added-tickets")}
                        className="flex items-center gap-2 mx-auto px-6 py-3 bg-secondary-content text-white rounded-xl hover:bg-secondary-content/90 transition-colors duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaArrowLeft className="w-4 h-4" />
                        Back to My Tickets
                    </motion.button>
                </div>
            </motion.div>
        );
    }

    const handleUpdateTicket = async (data) => {
        setIsSubmitting(true);
        try {
            // Format departure
            const convertToAMPM = new Date(data.departure).toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
                hour12: true
            });
            data.departure = convertToAMPM;

            let imageURL = ticket.image;
            if (data.image?.length > 0) {
                const formData = new FormData();
                formData.append("image", data.image[0]);
                const photo_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_photo_host}`;
                const res = await axios.post(photo_API_URL, formData);
                imageURL = res.data.data.url;
            }

            const updatedTicket = {
                ...data,
                image: imageURL,
                price: Number(data.price),
                quantity: Number(data.quantity),
                adminStatus: "pending",
                status: "pending"
            };

            await axiosSecure.patch(`/tickets/${id}`, updatedTicket);
            toast.success("Ticket updated successfully. Waiting for admin approval.");
            reset();
            navigate("/dashboard/my-added-tickets");

        } catch (error) {
            console.error(error);
            toast.error("Failed to update ticket. Try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div 
            className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4 sm:p-6 lg:p-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div 
                    className="flex items-center justify-between mb-6 sm:mb-8"
                    variants={itemVariants}
                >
                    <div className="flex items-center gap-4">
                        <motion.button
                            onClick={() => navigate("/dashboard/my-added-tickets")}
                            className="p-2 sm:p-3 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-200"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" />
                        </motion.button>
                        <div>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-3">
                                <FaEdit className="w-6 h-6 sm:w-8 sm:h-8 text-secondary-content" />
                                Update Ticket
                            </h1>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
                                Modify your ticket details and submit for admin approval
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Current Ticket Preview */}
                <motion.div 
                    className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-6 sm:mb-8"
                    variants={itemVariants}
                >
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                        <FaTicketAlt className="w-5 h-5 text-secondary-content" />
                        Current Ticket Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-gray-50 dark:bg-slate-800 p-3 rounded-xl">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Title</p>
                            <p className="font-semibold text-gray-800 dark:text-gray-200 truncate">{ticket.title}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-slate-800 p-3 rounded-xl">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Route</p>
                            <p className="font-semibold text-gray-800 dark:text-gray-200 truncate">{ticket.from} → {ticket.to}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-slate-800 p-3 rounded-xl">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Price</p>
                            <p className="font-semibold text-secondary-content">${ticket.price}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-slate-800 p-3 rounded-xl">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Status</p>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                ticket.adminStatus === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                ticket.adminStatus === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                            }`}>
                                {ticket.adminStatus}
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Update Form */}
                <motion.div 
                    className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                    variants={itemVariants}
                >
                    <div className="bg-gradient-to-r from-secondary-content to-secondary-content/90 p-4 sm:p-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                            <FaEdit className="w-5 h-5 sm:w-6 sm:h-6" />
                            Update Ticket Information
                        </h2>
                        <p className="text-white/90 text-sm sm:text-base mt-1">
                            Make your changes below and submit for admin review
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit(handleUpdateTicket)}
                        className="p-4 sm:p-6 lg:p-8 space-y-6"
                    >
                        {/* Title */}
                        <motion.div variants={itemVariants}>
                            <label className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                <FaTicketAlt className="w-4 h-4 text-secondary-content" />
                                Ticket Title *
                            </label>
                            <input
                                type="text"
                                defaultValue={ticket.title}
                                {...register("title", { required: "Title is required" })}
                                className="w-full px-4 py-3 sm:py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-slate-800 focus:ring-2 focus:ring-secondary-content/20 focus:border-secondary-content transition-all duration-200 text-gray-800 dark:text-gray-200"
                                placeholder="Enter ticket title"
                            />
                            {errors.title && <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                <FaExclamationTriangle className="w-3 h-3" />
                                {errors.title.message}
                            </p>}
                        </motion.div>

                        {/* From / To */}
                        <motion.div variants={itemVariants}>
                            <label className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                <FaMapMarkerAlt className="w-4 h-4 text-secondary-content" />
                                Route Information *
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                <div>
                                    <input
                                        defaultValue={ticket.from}
                                        {...register("from", { required: "From location is required" })}
                                        className="w-full px-4 py-3 sm:py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-slate-800 focus:ring-2 focus:ring-secondary-content/20 focus:border-secondary-content transition-all duration-200 text-gray-800 dark:text-gray-200"
                                        placeholder="From"
                                    />
                                    {errors.from && <p className="text-red-500 text-sm mt-1">{errors.from.message}</p>}
                                </div>
                                <div>
                                    <input
                                        defaultValue={ticket.to}
                                        {...register("to", { required: "To location is required" })}
                                        className="w-full px-4 py-3 sm:py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-slate-800 focus:ring-2 focus:ring-secondary-content/20 focus:border-secondary-content transition-all duration-200 text-gray-800 dark:text-gray-200"
                                        placeholder="To"
                                    />
                                    {errors.to && <p className="text-red-500 text-sm mt-1">{errors.to.message}</p>}
                                </div>
                            </div>
                        </motion.div>

                        {/* Transport */}
                        <motion.div variants={itemVariants}>
                            <label className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                <FaBus className="w-4 h-4 text-secondary-content" />
                                Transport Type *
                            </label>
                            <select
                                defaultValue={ticket.transport}
                                {...register("transport", { required: "Transport type is required" })}
                                className="w-full px-4 py-3 sm:py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-slate-800 focus:ring-2 focus:ring-secondary-content/20 focus:border-secondary-content transition-all duration-200 text-gray-800 dark:text-gray-200"
                            >
                                <option value="">Select Transport Type</option>
                                <option value="Bus">Bus</option>
                                <option value="Train">Train</option>
                                <option value="Launch">Launch</option>
                                <option value="Air">Air</option>
                            </select>
                            {errors.transport && <p className="text-red-500 text-sm mt-1">{errors.transport.message}</p>}
                        </motion.div>

                        {/* Price / Quantity */}
                        <motion.div variants={itemVariants}>
                            <label className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                <FaDollarSign className="w-4 h-4 text-secondary-content" />
                                Pricing & Availability *
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                <div>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        defaultValue={ticket.price}
                                        {...register("price", { required: true, min: 0 })}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-slate-800 focus:ring-2 focus:ring-secondary-content/20 focus:border-secondary-content transition-all duration-200 text-gray-800 dark:text-gray-200"
                                        placeholder="Price ($)"
                                    />
                                    {errors.price && <p className="text-red-500 text-sm mt-1">Price is required</p>}
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        min="1"
                                        defaultValue={ticket.quantity}
                                        {...register("quantity", { required: true, min: 1 })}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-slate-800 focus:ring-2 focus:ring-secondary-content/20 focus:border-secondary-content transition-all duration-200 text-gray-800 dark:text-gray-200"
                                        placeholder="Available Quantity"
                                    />
                                    {errors.quantity && <p className="text-red-500 text-sm mt-1">Quantity is required</p>}
                                </div>
                            </div>
                        </motion.div>

                        {/* Route Information */}
                        <motion.div variants={itemVariants}>
                            <label className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                <FaMapMarkerAlt className="w-4 h-4 text-secondary-content" />
                                Route Information *
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                <div>
                                    <input
                                        type="text"
                                        defaultValue={ticket.from}
                                        {...register("from", { required: true })}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-slate-800 focus:ring-2 focus:ring-secondary-content/20 focus:border-secondary-content transition-all duration-200 text-gray-800 dark:text-gray-200"
                                        placeholder="From (Departure City)"
                                    />
                                    {errors.from && <p className="text-red-500 text-sm mt-1">Departure city is required</p>}
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        defaultValue={ticket.to}
                                        {...register("to", { required: true })}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-slate-800 focus:ring-2 focus:ring-secondary-content/20 focus:border-secondary-content transition-all duration-200 text-gray-800 dark:text-gray-200"
                                        placeholder="To (Destination City)"
                                    />
                                    {errors.to && <p className="text-red-500 text-sm mt-1">Destination city is required</p>}
                                </div>
                            </div>
                        </motion.div>

                        {/* Departure Time */}
                        <motion.div variants={itemVariants}>
                            <label className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                <FaCalendarAlt className="w-4 h-4 text-secondary-content" />
                                Departure Time *
                            </label>
                            <input
                                type="datetime-local"
                                defaultValue={formatDateForInput(ticket.departure)}
                                {...register("departure", { required: true })}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-slate-800 focus:ring-2 focus:ring-secondary-content/20 focus:border-secondary-content transition-all duration-200 text-gray-800 dark:text-gray-200"
                            />
                            {errors.departure && <p className="text-red-500 text-sm mt-1">Departure time is required</p>}
                        </motion.div>

                        {/* Perks */}
                        <motion.div variants={itemVariants}>
                            <label className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                <FaStar className="w-4 h-4 text-secondary-content" />
                                Amenities & Perks
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {["AC", "Breakfast", "WiFi", "Entertainment", "Blanket", "Water"].map(perk => (
                                    <label key={perk} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-slate-800 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors cursor-pointer">
                                        <input
                                            type="checkbox"
                                            {...register("perks")}
                                            value={perk}
                                            defaultChecked={Array.isArray(ticket.perks) ? ticket.perks.includes(perk) : false}
                                            className="checkbox checkbox-sm checkbox-secondary"
                                        />
                                        <span className="text-sm text-gray-700 dark:text-gray-300">{perk}</span>
                                    </label>
                                ))}
                            </div>
                        </motion.div>

                        {/* Image Upload */}
                        <motion.div variants={itemVariants}>
                            <label className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                <FaImage className="w-4 h-4 text-secondary-content" />
                                Ticket Image
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                {...register("image")}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-slate-800 focus:ring-2 focus:ring-secondary-content/20 focus:border-secondary-content transition-all duration-200 text-gray-800 dark:text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-secondary-content file:text-white hover:file:bg-secondary-content/90"
                            />
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Upload a new image to replace the current one (optional)</p>
                        </motion.div>

                        {/* Submit Button */}
                        <motion.div 
                            variants={itemVariants}
                            className="pt-4"
                        >
                            <motion.button 
                                type="submit" 
                                disabled={isSubmitting}
                                className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center gap-3 ${
                                    isSubmitting 
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : 'bg-gradient-to-r from-secondary-content to-secondary-content/90 hover:from-secondary-content/90 hover:to-secondary-content shadow-lg hover:shadow-xl'
                                }`}
                                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Updating Ticket...
                                    </>
                                ) : (
                                    <>
                                        <FaCheckCircle className="w-5 h-5" />
                                        Update Ticket
                                    </>
                                )}
                            </motion.button>
                        </motion.div>
                    </form>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default UpdateTicket;
