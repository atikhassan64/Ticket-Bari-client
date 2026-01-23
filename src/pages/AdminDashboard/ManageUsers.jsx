import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { FaUserShield, FaStore, FaBan, FaUsers, FaSearch, FaUserCheck, FaUserTimes } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");

    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });

    const handleMakeAdmin = async (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This user will get full admin access to the system.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#2563eb",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, Make Admin",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/users/admin/${user._id}`);

                if (res.data.modifiedCount > 0) {
                    toast.success(`${user.displayName} is now an Admin`);
                    refetch();

                    Swal.fire({
                        title: "Success!",
                        text: "User has been promoted to Admin.",
                        icon: "success",
                    });
                }
            }
        });
    };

    const handleMakeVendor = async (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This user will be promoted to Vendor and can add tickets.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#16a34a",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, Make Vendor",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/users/vendor/${user._id}`);

                if (res.data.modifiedCount > 0) {
                    toast.success(`${user.displayName} is now a Vendor`);
                    refetch();

                    Swal.fire({
                        title: "Success!",
                        text: "User role has been updated to Vendor.",
                        icon: "success",
                    });
                }
            }
        });
    };

    const handleFraud = async (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This vendor will be marked as fraud and cannot add tickets anymore!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Mark as Fraud",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/users/fraud/${user._id}`);

                if (res.data?.success) {
                    toast.error(`${user.displayName} marked as Fraud`);
                    refetch();

                    Swal.fire({
                        title: "Marked as Fraud!",
                        text: "This vendor is now blocked from adding tickets.",
                        icon: "success",
                    });
                }
            }
        });
    };

    // Filter users based on search and role
    const filteredUsers = users.filter(user => {
        const matchesSearch = user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.email?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesRole = roleFilter === "all" || user.role === roleFilter;
        
        return matchesSearch && matchesRole;
    });

    // Stats calculation
    const stats = {
        total: users.length,
        admins: users.filter(u => u.role === "admin").length,
        vendors: users.filter(u => u.role === "vendor").length,
        users: users.filter(u => u.role === "user").length,
        fraud: users.filter(u => u.isFraud).length,
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

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="loading loading-spinner loading-lg text-secondary-content"></div>
            </div>
        );
    }

    return (
        <motion.div 
            className="p-6 lg:p-8 max-w-7xl mx-auto"
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
                    <div className="w-10 h-10 bg-gradient-to-br from-secondary-content to-secondary-content/80 rounded-xl flex items-center justify-center">
                        <FaUsers className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-secondary-content">
                        Manage Users
                    </h1>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                    Manage user roles and permissions across the platform
                </p>
            </motion.div>

            {/* Stats Cards */}
            <motion.div 
                className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8"
                variants={itemVariants}
            >
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                            <FaUsers className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{stats.total}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                            <FaUserShield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{stats.admins}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Admins</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                            <FaStore className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{stats.vendors}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Vendors</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl flex items-center justify-center">
                            <FaUserCheck className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{stats.users}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Regular Users</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                            <FaBan className="w-6 h-6 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{stats.fraud}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Fraud Users</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Filters */}
            <motion.div 
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 mb-8 border border-gray-100 dark:border-gray-800 shadow-sm"
                variants={itemVariants}
            >
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search users by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-secondary-content focus:border-transparent bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200"
                        />
                    </div>

                    {/* Role Filter */}
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-secondary-content focus:border-transparent bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200"
                    >
                        <option value="all">All Roles</option>
                        <option value="user">Users</option>
                        <option value="vendor">Vendors</option>
                        <option value="admin">Admins</option>
                    </select>
                </div>
            </motion.div>

            {/* Users Table */}
            <motion.div 
                className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden"
                variants={itemVariants}
            >
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">#</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">User</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Role & Status</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredUsers.map((user, index) => (
                                <motion.tr 
                                    key={user._id}
                                    className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                >
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=random`}
                                                alt={user.displayName}
                                                className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                                            />
                                            <div>
                                                <p className="font-semibold text-gray-800 dark:text-gray-200">{user.displayName}</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">ID: {user._id.slice(-6)}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">{user.email}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-2">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium w-fit ${
                                                user.role === "admin"
                                                    ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
                                                    : user.role === "vendor"
                                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                                    : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                            }`}>
                                                {user.role}
                                            </span>
                                            {user.isFraud && (
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 w-fit">
                                                    Fraud
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-2">
                                            {/* Make Admin */}
                                            <button
                                                onClick={() => handleMakeAdmin(user)}
                                                disabled={user.role === "admin" || user.isFraud}
                                                className="inline-flex items-center gap-1 px-3 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-xs font-medium rounded-lg transition-colors"
                                            >
                                                <FaUserShield className="w-3 h-3" />
                                                Admin
                                            </button>

                                            {/* Make Vendor */}
                                            <button
                                                onClick={() => handleMakeVendor(user)}
                                                disabled={user.role === "vendor" || user.isFraud}
                                                className="inline-flex items-center gap-1 px-3 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-xs font-medium rounded-lg transition-colors"
                                            >
                                                <FaStore className="w-3 h-3" />
                                                Vendor
                                            </button>

                                            {/* Mark as Fraud (only for vendor) */}
                                            {user.role === "vendor" && (
                                                <button
                                                    onClick={() => handleFraud(user)}
                                                    disabled={user.isFraud}
                                                    className="inline-flex items-center gap-1 px-3 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-xs font-medium rounded-lg transition-colors"
                                                >
                                                    <FaBan className="w-3 h-3" />
                                                    {user.isFraud ? "Fraud" : "Mark Fraud"}
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredUsers.length === 0 && (
                        <div className="text-center py-12">
                            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaUsers className="w-12 h-12 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                No users found
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                {searchTerm || roleFilter !== "all" 
                                    ? "Try adjusting your search or filter criteria"
                                    : "No users have registered yet"
                                }
                            </p>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ManageUsers;