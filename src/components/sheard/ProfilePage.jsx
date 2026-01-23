import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from './loading/Loading';
import axios from 'axios';
import toast from 'react-hot-toast';

const ProfilePage = () => {
    const { user, updateUser } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: dbUser = {}, isLoading, refetch } = useQuery({
        queryKey: ["user", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });

    const fullName = dbUser?.displayName;
    const nameParts = fullName?.split(" ") || [];
    const firstNameFromDB = nameParts[0] || "";
    const lastNameFromDB = nameParts.slice(1).join(" ") || "";

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [firstName, setFirstName] = useState(firstNameFromDB);
    const [lastName, setLastName] = useState(lastNameFromDB);
    const [imageFile, setImageFile] = useState(null);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    if (isLoading) {
        return <Loading />;
    }

    const handleSaveProfile = (e) => {
        e.preventDefault();

        const displayName = `${firstName} ${lastName}`;

        if (imageFile) {
            const formData = new FormData();
            formData.append("image", imageFile);

            const photo_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_photo_host}`;

            axios.post(photo_API_URL, formData)
                .then(res => {
                    const imageURL = res.data.data.url;
                    updateProfileData(displayName, imageURL);
                });
        } else {
            updateProfileData(displayName, dbUser.photoURL);
        }
    };

    const updateProfileData = async (displayName, photoURL) => {
        await updateUser(displayName, photoURL);
        await axiosSecure.patch(`/users/profile/${user.email}`, {
            displayName,
            photoURL
        });

        toast.success("Profile updated successfully");
        refetch();
        closeModal();
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
            className="p-6 lg:p-8 max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Page Header */}
            <motion.div 
                className="mb-8"
                variants={itemVariants}
            >
                <h1 className="text-2xl lg:text-3xl font-bold text-secondary-content mb-2">
                    My Profile
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Manage your account settings and personal information
                </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <motion.div 
                    className="lg:col-span-1"
                    variants={itemVariants}
                >
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                        {/* Cover Background */}
                        <div className="h-32 bg-gradient-to-br from-secondary-content to-secondary-content/80 relative">
                            <div className="absolute inset-0 bg-black/10"></div>
                        </div>
                        
                        {/* Profile Content */}
                        <div className="relative px-6 pb-6">
                            {/* Profile Image */}
                            <div className="flex justify-center -mt-16 mb-4">
                                <div className="relative">
                                    <img
                                        src={dbUser.photoURL}
                                        alt="Profile"
                                        className="w-24 h-24 rounded-full border-4 border-white dark:border-slate-900 shadow-xl object-cover"
                                    />
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></div>
                                </div>
                            </div>
                            
                            {/* User Info */}
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-1">
                                    {dbUser.displayName}
                                </h3>
                                <p className="text-secondary-content font-semibold capitalize mb-4">
                                    {dbUser.role}
                                </p>
                                
                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-secondary-content">12</div>
                                        <div className="text-xs text-gray-500">Bookings</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-secondary-content">5</div>
                                        <div className="text-xs text-gray-500">Reviews</div>
                                    </div>
                                </div>
                                
                                {/* Edit Button */}
                                <button 
                                    onClick={openModal}
                                    className="w-full bg-gradient-to-r from-secondary-content to-secondary-content/90 hover:from-secondary-content/90 hover:to-secondary-content text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                >
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Personal Information */}
                <motion.div 
                    className="lg:col-span-2"
                    variants={itemVariants}
                >
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-6 lg:p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-secondary-content">Personal Information</h3>
                            <div className="w-12 h-1 bg-gradient-to-r from-secondary-content to-primary-content rounded-full"></div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* First Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                    First Name
                                </label>
                                <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                                    <p className="text-gray-800 dark:text-gray-200 font-medium">
                                        {firstNameFromDB || 'Not provided'}
                                    </p>
                                </div>
                            </div>

                            {/* Last Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                    Last Name
                                </label>
                                <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                                    <p className="text-gray-800 dark:text-gray-200 font-medium">
                                        {lastNameFromDB || 'Not provided'}
                                    </p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                    Email Address
                                </label>
                                <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                                    <p className="text-gray-800 dark:text-gray-200 font-medium break-all">
                                        {dbUser.email}
                                    </p>
                                </div>
                            </div>

                            {/* Role */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                    Account Role
                                </label>
                                <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center gap-2">
                                        <span className={`w-3 h-3 rounded-full ${
                                            dbUser.role === 'admin' ? 'bg-red-500' :
                                            dbUser.role === 'vendor' ? 'bg-blue-500' : 'bg-green-500'
                                        }`}></span>
                                        <p className="text-gray-800 dark:text-gray-200 font-medium capitalize">
                                            {dbUser.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Additional Info Section */}
                        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                                Account Status
                            </h4>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Active Account</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Verified Email</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* ENHANCED EDIT MODAL */}
            {isModalOpen && (
                <motion.div 
                    className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div 
                        className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                                Edit Profile
                            </h3>
                            <button
                                onClick={closeModal}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSaveProfile} className="space-y-4">
                            {/* Name Fields */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="First Name"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-secondary-content focus:border-transparent bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="Last Name"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-secondary-content focus:border-transparent bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200"
                                    />
                                </div>
                            </div>

                            {/* File Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Profile Picture
                                </label>
                                <input
                                    type="file"
                                    onChange={(e) => setImageFile(e.target.files[0])}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-secondary-content focus:border-transparent bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-secondary-content/10 file:text-secondary-content hover:file:bg-secondary-content/20"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-gradient-to-r from-secondary-content to-secondary-content/90 hover:from-secondary-content/90 hover:to-secondary-content text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </motion.div>
    );
};

export default ProfilePage;