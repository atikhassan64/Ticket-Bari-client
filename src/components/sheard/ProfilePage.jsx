import React, { useState } from 'react';
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

    const nameParts = fullName.split(" ");
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

    return (
        <div className="p-6 mx-auto bg-base-100">
            <h2 className="text-2xl font-semibold text-secondary-content mb-6">My Profile</h2>

            {/* Profile Card */}
            <div className="flex items-center gap-4 bg-base-200 shadow rounded-lg p-6 mb-6">
                <img
                    src={dbUser.photoURL}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                    <h3 className="text-xl font-medium mb-2">{dbUser.displayName}</h3>
                    <p className="text-gray-500">{dbUser.role}</p>
                </div>
            </div>

            {/* Personal Information */}
            <div className="bg-base-200 shadow rounded-lg p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg text-secondary-content font-semibold">Personal Information</h3>
                    <button onClick={openModal} className="btn button">
                        Edit
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-10">
                    <div>
                        <p className="text-gray-500">First Name</p>
                        <p>{firstNameFromDB}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Last Name</p>
                        <p>{lastNameFromDB}</p>
                    </div>
                    <div className="w-full">
                        <p className="text-gray-500">Email</p>
                        <p className="break-all text-sm sm:text-base">
                            {dbUser.email}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500">Role</p>
                        <p>{dbUser.role}</p>
                    </div>
                </div>
            </div>

            {/* EDIT MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
                    <div className="bg-base-100 rounded-lg shadow-lg p-6 w-96 relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-3 right-3 font-bold"
                        >
                            ✕
                        </button>

                        <h3 className="text-lg font-semibold mb-4">
                            Edit Profile
                        </h3>

                        <form onSubmit={handleSaveProfile}>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="First Name"
                                    className="w-full border rounded-lg px-4 py-2"
                                />
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Last Name"
                                    className="w-full border rounded-lg px-4 py-2"
                                />
                            </div>

                            <input
                                type="file"
                                onChange={(e) => setImageFile(e.target.files[0])}
                                className="w-full border rounded-lg px-4 py-2 file-input file-input-bordered"
                            />

                            <button
                                type="submit"
                                className="btn button w-full mt-4"
                            >
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;