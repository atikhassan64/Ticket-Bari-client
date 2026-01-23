// import React from "react";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAuth from "../../hooks/useAuth";
// import { useQuery } from "@tanstack/react-query";
// import Loading from "../../components/sheard/loading/Loading";
// import toast from "react-hot-toast";

// const AddTickets = () => {
//     const axiosSecure = useAxiosSecure();
//     const { user } = useAuth();
//     const { register, handleSubmit, formState: { errors }, reset } = useForm();

//     const { data: dbUser = {}, isLoading, } = useQuery({
//         queryKey: ["dbUser", user?.email],
//         enabled: !!user?.email,
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/users/${user.email}`);
//             return res.data;
//         }
//     });

//     if (isLoading) {
//         return <Loading></Loading>;
//     }

//     if (dbUser?.isFraud) {
//         toast.error("You are marked as fraud. You cannot add tickets.");
//         return;
//     }

//     const handleAddTickets = (data) => {
//         const convertToAMPM = new Date(data.departure).toLocaleString("en-US", {
//             dateStyle: "medium",
//             timeStyle: "short",
//             hour12: true
//         });

//         data.departure = convertToAMPM;

//         const uploadPhoto = data.image[0];
//         const formData = new FormData();
//         formData.append("image", uploadPhoto);
//         const photo_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_photo_host}`
//         axios.post(photo_API_URL, formData)
//             .then(res => {
//                 const imageURL = res.data.data.url;
//                 const ticket = {
//                     ...data,
//                     image: imageURL,
//                     adminStatus: "pending",
//                     status: "pending",
//                 }

//                 axiosSecure.post("/tickets", ticket)
//                     .then(() => {
//                         toast.success("Ticket added successfully. Waiting for admin approval.");
//                         reset()
//                     })
//             })
//     };



//     return (
//         <div className='p-6 mx-auto'>
//             <div className="w-full bg-base-100">
//                 <h2 className="text-2xl text-secondary-content font-bold mb-6">Add New Ticket</h2>

//                 <form onSubmit={handleSubmit(handleAddTickets)} className="bg-base-200 dark:bg-gray-900 shadow-md rounded-2xl p-8 space-y-6 border">

//                     <div>
//                         <label className="font-medium">Ticket Title</label>
//                         <input
//                             type="text"
//                             {...register("title", { required: true })}
//                             className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary-content bg-base-100"
//                             placeholder="Enter ticket title"
//                         />
//                         {
//                             errors.title?.type === "required" && <p className='text-xs text-red-500 mt-2'>Ticket Title is required</p>
//                         }
//                     </div>

//                     {/* From + To */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                             <label className="font-medium">From (Location)</label>
//                             <input
//                                 type="text"
//                                 {...register("from", { required: true })}
//                                 className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary-content bg-base-100"
//                                 placeholder="Dhaka"
//                             />

//                             {
//                                 errors.from?.type === "required" && <p className='text-xs text-red-500 mt-2'>From (Location) is required</p>
//                             }
//                         </div>

//                         <div>
//                             <label className="font-medium">To (Location)</label>
//                             <input
//                                 type="text"
//                                 {...register("to", { required: true })}
//                                 className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary-content bg-base-100"
//                                 placeholder="Chittagong"
//                             />
//                             {
//                                 errors.to?.type === "required" && <p className='text-xs text-red-500 mt-2'>To (Location) is required</p>
//                             }
//                         </div>
//                     </div>

//                     {/* Transport Type */}
//                     <div>
//                         <label className="font-medium">Transport Type</label>
//                         <input
//                             type="text"
//                             {...register("transport", { required: true })}
//                             className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary-content bg-base-100"
//                             placeholder="Bus / Train / Air / Launch"
//                         />
//                         {
//                             errors.transport?.type === "required" && <p className='text-xs text-red-500 mt-2'>Transport Type is required</p>
//                         }
//                     </div>

//                     {/* Price + Quantity */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                             <label className="font-medium">Price (per unit)</label>
//                             <input
//                                 type="number"
//                                 {...register("price", { required: true })}
//                                 className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary-content bg-base-100"
//                                 placeholder="1200"
//                             />
//                             {
//                                 errors.price?.type === "required" && <p className='text-xs text-red-500 mt-2'>Price is required</p>
//                             }
//                         </div>

//                         <div>
//                             <label className="font-medium">Ticket Quantity</label>
//                             <input
//                                 type="number"
//                                 {...register("quantity", { required: true })}
//                                 className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary-content bg-base-100"
//                                 placeholder="30"
//                             />
//                             {
//                                 errors.quantity?.type === "required" && <p className='text-xs text-red-500 mt-2'>Ticket Quantity is required</p>
//                             }
//                         </div>
//                     </div>

//                     {/* Departure */}
//                     <div>
//                         <label className="font-medium">Departure Date & Time</label>
//                         <input
//                             type="datetime-local"
//                             {...register("departure", { required: true })}
//                             className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary-content bg-base-100"
//                         />
//                         {
//                             errors.departure?.type === "required" && <p className='text-xs text-red-500 mt-2'>Departure Date & Time is required</p>
//                         }
//                     </div>

//                     {/* Perks */}
//                     <div>
//                         <label className="font-medium">Perks</label>

//                         <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3 text-sm">
//                             <label className="flex gap-2 items-center">
//                                 <input type="checkbox" {...register("perks")} value="AC" className="checkbox checkbox-sm" /> AC
//                             </label>

//                             <label className="flex gap-2 items-center">
//                                 <input type="checkbox" {...register("perks")} value="Breakfast" className="checkbox checkbox-sm" /> Breakfast
//                             </label>

//                             <label className="flex gap-2 items-center">
//                                 <input type="checkbox" {...register("perks")} value="WiFi" className="checkbox checkbox-sm" /> WiFi
//                             </label>
//                         </div>
//                     </div>

//                     {/* Image Upload */}
//                     <div>
//                         <label className="font-medium">Upload Image</label>
//                         <input
//                             type="file"
//                             {...register("image", { required: true })}
//                             className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary-content bg-base-100 file-input file-input-bordered"
//                         />
//                         {
//                             errors.image?.type === "required" && <p className='text-xs text-red-500 mt-2'>Upload Image is required</p>
//                         }
//                     </div>

//                     {/* Vendor Info */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                             <label className="font-medium">Vendor Name</label>
//                             <input
//                                 readOnly
//                                 {...register("vendorName")}
//                                 className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary-content bg-base-100"
//                                 defaultValue={user?.displayName}
//                                 placeholder="Your Name"
//                             />
//                         </div>

//                         <div>
//                             <label className="font-medium">Vendor Email</label>
//                             <input
//                                 readOnly
//                                 {...register("vendorEmail")}
//                                 className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary-content bg-base-100"
//                                 defaultValue={user?.email}
//                                 placeholder="Your email"
//                             />
//                         </div>
//                     </div>

//                     {/* Submit Button */}
//                     <button
//                         type="submit"
//                         disabled={dbUser?.isFraud}
//                         className="btn button w-full mt-4 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                         {dbUser?.isFraud ? "Fraud Vendor - Cannot Add Ticket" : "Add Ticket"}
//                     </button>

//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AddTickets;


import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { 
    FaTicketAlt, 
    FaMapMarkerAlt, 
    FaBus, 
    FaDollarSign, 
    FaClock, 
    FaImage,
    FaUser,
    FaEnvelope,
    FaPlus,
    FaCheckCircle
} from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/sheard/loading/Loading";
import toast from "react-hot-toast";

const AddTickets = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { data: dbUser = {}, isLoading } = useQuery({
        queryKey: ["dbUser", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });

    if (isLoading) return <Loading />;

    const handleAddTickets = async (data) => {
        if (dbUser?.isFraud) {
            toast.error("You are marked as fraud. You cannot add tickets.");
            return;
        }

        setIsSubmitting(true);
        try {
            // Format departure
            const convertToAMPM = new Date(data.departure).toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
                hour12: true
            });

            data.departure = convertToAMPM;

            // Upload image
            const uploadPhoto = data.image[0];
            const formData = new FormData();
            formData.append("image", uploadPhoto);

            const photo_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_photo_host}`;
            const res = await axios.post(photo_API_URL, formData);
            const imageURL = res.data.data.url;

            // Prepare ticket data
            const ticket = {
                ...data,
                image: imageURL,
                price: Number(data.price),
                quantity: Number(data.quantity),
                adminStatus: "pending",
                status: "pending",
            };

            await axiosSecure.post("/tickets", ticket);
            toast.success("Ticket added successfully. Waiting for admin approval.");
            reset();

        } catch (error) {
            console.error(error);
            toast.error("Failed to add ticket. Try again.");
        } finally {
            setIsSubmitting(false);
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

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <motion.div 
            className='p-6 lg:p-8 max-w-7xl mx-auto'
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Header */}
            <motion.div 
                className="mb-8"
                variants={itemVariants}
            >
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-secondary-content to-secondary-content/80 rounded-xl flex items-center justify-center">
                        <FaPlus className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-secondary-content">
                            Add New Ticket
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Create a new travel ticket for your customers
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Fraud Warning */}
            {dbUser?.isFraud && (
                <motion.div 
                    className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
                    variants={itemVariants}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                            <span className="text-red-600 text-sm">⚠️</span>
                        </div>
                        <p className="text-red-700 dark:text-red-400 font-medium">
                            Your account is marked as fraud. You cannot add new tickets.
                        </p>
                    </div>
                </motion.div>
            )}

            <motion.form 
                onSubmit={handleSubmit(handleAddTickets)} 
                className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-8 space-y-8"
                variants={itemVariants}
            >
                {/* Ticket Title */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300">
                        <FaTicketAlt className="w-4 h-4 text-secondary-content" />
                        Ticket Title
                    </label>
                    <input
                        type="text"
                        {...register("title", { required: "Ticket title is required" })}
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-secondary-content/20 focus:border-secondary-content transition-all duration-200"
                        placeholder="Enter an attractive ticket title"
                    />
                    {errors.title && <p className='text-xs text-red-500 mt-1'>{errors.title.message}</p>}
                </div>

                {/* From + To */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300">
                            <FaMapMarkerAlt className="w-4 h-4 text-blue-500" />
                            From (Departure)
                        </label>
                        <input
                            type="text"
                            {...register("from", { required: "Departure location is required" })}
                            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-secondary-content/20 focus:border-secondary-content transition-all duration-200"
                            placeholder="e.g., Dhaka"
                        />
                        {errors.from && <p className='text-xs text-red-500 mt-1'>{errors.from.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300">
                            <FaMapMarkerAlt className="w-4 h-4 text-green-500" />
                            To (Destination)
                        </label>
                        <input
                            type="text"
                            {...register("to", { required: "Destination is required" })}
                            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-secondary-content/20 focus:border-secondary-content transition-all duration-200"
                            placeholder="e.g., Chittagong"
                        />
                        {errors.to && <p className='text-xs text-red-500 mt-1'>{errors.to.message}</p>}
                    </div>
                </div>

                {/* Transport Type */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300">
                        <FaBus className="w-4 h-4 text-purple-500" />
                        Transport Type
                    </label>
                    <select
                        {...register("transport", { required: "Transport type is required" })}
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-secondary-content/20 focus:border-secondary-content transition-all duration-200"
                    >
                        <option value="">Select transport type</option>
                        <option value="Bus">Bus</option>
                        <option value="Train">Train</option>
                        <option value="Air">Air</option>
                        <option value="Launch">Launch</option>
                    </select>
                    {errors.transport && <p className='text-xs text-red-500 mt-1'>{errors.transport.message}</p>}
                </div>

                {/* Price + Quantity */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300">
                            <FaDollarSign className="w-4 h-4 text-green-500" />
                            Price (per ticket)
                        </label>
                        <input
                            type="number"
                            min="1"
                            {...register("price", { required: "Price is required", min: 1 })}
                            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-secondary-content/20 focus:border-secondary-content transition-all duration-200"
                            placeholder="1200"
                        />
                        {errors.price && <p className='text-xs text-red-500 mt-1'>{errors.price.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300">
                            <FaTicketAlt className="w-4 h-4 text-orange-500" />
                            Available Quantity
                        </label>
                        <input
                            type="number"
                            min="1"
                            {...register("quantity", { required: "Quantity is required", min: 1 })}
                            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-secondary-content/20 focus:border-secondary-content transition-all duration-200"
                            placeholder="30"
                        />
                        {errors.quantity && <p className='text-xs text-red-500 mt-1'>{errors.quantity.message}</p>}
                    </div>
                </div>

                {/* Departure */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300">
                        <FaClock className="w-4 h-4 text-blue-500" />
                        Departure Date & Time
                    </label>
                    <input
                        type="datetime-local"
                        {...register("departure", { required: "Departure time is required" })}
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-secondary-content/20 focus:border-secondary-content transition-all duration-200"
                    />
                    {errors.departure && <p className='text-xs text-red-500 mt-1'>{errors.departure.message}</p>}
                </div>

                {/* Perks */}
                <div className="space-y-3">
                    <label className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300">
                        <FaCheckCircle className="w-4 h-4 text-green-500" />
                        Available Perks
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {["AC", "Breakfast", "WiFi", "Entertainment", "Blanket", "Water"].map((perk) => (
                            <label key={perk} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    {...register("perks")} 
                                    value={perk} 
                                    className="w-4 h-4 text-secondary-content bg-gray-100 border-gray-300 rounded focus:ring-secondary-content focus:ring-2" 
                                />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{perk}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300">
                        <FaImage className="w-4 h-4 text-pink-500" />
                        Upload Ticket Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        {...register("image", { required: "Image is required" })}
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-secondary-content/20 focus:border-secondary-content transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-secondary-content file:text-white hover:file:bg-secondary-content/90"
                    />
                    {errors.image && <p className='text-xs text-red-500 mt-1'>{errors.image.message}</p>}
                </div>

                {/* Vendor Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300">
                            <FaUser className="w-4 h-4 text-blue-500" />
                            Vendor Name
                        </label>
                        <input
                            readOnly
                            {...register("vendorName")}
                            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400"
                            defaultValue={user?.displayName}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300">
                            <FaEnvelope className="w-4 h-4 text-green-500" />
                            Vendor Email
                        </label>
                        <input
                            readOnly
                            {...register("vendorEmail")}
                            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400"
                            defaultValue={user?.email}
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <motion.button
                    type="submit"
                    disabled={dbUser?.isFraud || isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-secondary-content to-secondary-content/90 text-white font-bold rounded-xl hover:from-secondary-content/90 hover:to-secondary-content transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    whileHover={{ scale: dbUser?.isFraud || isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: dbUser?.isFraud || isSubmitting ? 1 : 0.98 }}
                >
                    {isSubmitting ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Adding Ticket...
                        </>
                    ) : dbUser?.isFraud ? (
                        "Fraud Vendor - Cannot Add Ticket"
                    ) : (
                        <>
                            <FaPlus className="w-5 h-5" />
                            Add Ticket
                        </>
                    )}
                </motion.button>
            </motion.form>
        </motion.div>
    );
};

export default AddTickets;
