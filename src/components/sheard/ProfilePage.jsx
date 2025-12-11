import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';

const ProfilePage = () => {
    const { user } = useAuth();
    const fullName = user?.displayName || "";
    const nameParts = fullName.split(" ");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div>
            <div className="p-6 mx-auto bg-base-100">
                {/* Header */}
                <h2 className="text-2xl font-semibold mb-6">My Profile</h2>

                {/* Profile Card */}
                <div className="flex items-center gap-4 bg-base-200 shadow rounded-lg p-6 mb-6">
                    <img
                        src={user.photoURL}
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover"
                    />
                    <div>
                        <h3 className="text-xl font-medium mb-2">{user?.displayName}</h3>
                        <p className="text-gray-500">Admin</p>
                    </div>
                </div>

                {/* Personal Information */}
                <div className="bg-base-200 shadow rounded-lg p-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Personal Information</h3>
                        <button
                            onClick={openModal}
                            className="btn button">
                             Edit
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-500">First Name</p>
                            <p>{nameParts[0] || ""}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Last Name</p>
                            <p>{nameParts[1] || ""}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Email Address</p>
                            <p>{user?.email}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">User Role</p>
                            <p>Admin</p>
                        </div>
                    </div>
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center  z-50">
                        <div className="bg-base-100 rounded-lg shadow-lg p-6 w-96 relative">
                            <button
                                onClick={closeModal}
                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold"
                            >
                                ✕
                            </button>
                            <h3 className="text-lg font-semibold mb-4">Edit Personal Information</h3>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="text-gray-500 text-sm">First Name</label>
                                    <input
                                        type="text"
                                        defaultValue={nameParts[0] || ""}
                                        className="w-full mb-2 border rounded-lg px-4 py-2 focus:outline-primary-content"
                                    />
                                </div>
                                <div>
                                    <label className="text-gray-500 text-sm">Last Name</label>
                                    <input
                                        type="text"
                                        defaultValue={nameParts[1] || ""}
                                        className="w-full mb-2 border rounded-lg px-4 py-2 focus:outline-primary-content"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="text-gray-500 text-sm">Email Address</label>
                                    <input
                                        type="email"
                                        defaultValue={user?.email || ""}
                                        className="w-full mb-2 border rounded-lg px-4 py-2 focus:outline-primary-content"
                                        disabled
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="text-gray-500 text-sm">User Role</label>
                                    <select className="w-full mb-2 border rounded-lg px-4 py-2 focus:outline-primary-content">
                                        <option>Admin</option>
                                        <option>User</option>
                                    </select>
                                </div>
                            </div>
                            <button className="button btn  px-4 py-2 rounded">
                                Save Changes
                            </button>
                        </div>
                    </div>
                )}


                {/* Address Information */}
                {/* <div className="bg-white shadow rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Address</h3>
                        <button className="flex items-center gap-1 text-white bg-orange-500 px-3 py-1 rounded hover:bg-orange-600">
                            <FaEdit /> Edit
                        </button>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <p className="text-gray-500">Country</p>
                            <p>United Kingdom</p>
                        </div>
                        <div>
                            <p className="text-gray-500">City</p>
                            <p>Leeds, East London</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Postal Code</p>
                            <p>ERT 1254</p>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default ProfilePage;