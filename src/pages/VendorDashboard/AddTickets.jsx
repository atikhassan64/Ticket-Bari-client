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


import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/sheard/loading/Loading";
import toast from "react-hot-toast";

const AddTickets = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

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
        }
    };

    return (
        <div className='p-6 mx-auto'>
            <div className="w-full bg-base-100">
                <h2 className="text-2xl text-secondary-content font-bold mb-6">Add New Ticket</h2>

                <form onSubmit={handleSubmit(handleAddTickets)} className="bg-base-200 dark:bg-gray-900 shadow-md rounded-2xl p-8 space-y-6 border">

                    {/* Ticket Title */}
                    <div>
                        <label className="font-medium">Ticket Title</label>
                        <input
                            type="text"
                            {...register("title", { required: true })}
                            className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary-content bg-base-100"
                            placeholder="Enter ticket title"
                        />
                        {errors.title && <p className='text-xs text-red-500 mt-2'>Ticket Title is required</p>}
                    </div>

                    {/* From + To */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="font-medium">From (Location)</label>
                            <input
                                type="text"
                                {...register("from", { required: true })}
                                className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary-content bg-base-100"
                                placeholder="Dhaka"
                            />
                            {errors.from && <p className='text-xs text-red-500 mt-2'>From is required</p>}
                        </div>

                        <div>
                            <label className="font-medium">To (Location)</label>
                            <input
                                type="text"
                                {...register("to", { required: true })}
                                className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary-content bg-base-100"
                                placeholder="Chittagong"
                            />
                            {errors.to && <p className='text-xs text-red-500 mt-2'>To is required</p>}
                        </div>
                    </div>

                    {/* Transport Type */}
                    <div>
                        <label className="font-medium">Transport Type</label>
                        <input
                            type="text"
                            {...register("transport", { required: true })}
                            className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary-content bg-base-100"
                            placeholder="Bus / Train / Air / Launch"
                        />
                        {errors.transport && <p className='text-xs text-red-500 mt-2'>Transport Type is required</p>}
                    </div>

                    {/* Price + Quantity */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="font-medium">Price (per unit)</label>
                            <input
                                type="number"
                                {...register("price", { required: true })}
                                className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary-content bg-base-100"
                                placeholder="1200"
                            />
                            {errors.price && <p className='text-xs text-red-500 mt-2'>Price is required</p>}
                        </div>

                        <div>
                            <label className="font-medium">Ticket Quantity</label>
                            <input
                                type="number"
                                {...register("quantity", { required: true })}
                                className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary-content bg-base-100"
                                placeholder="30"
                            />
                            {errors.quantity && <p className='text-xs text-red-500 mt-2'>Quantity is required</p>}
                        </div>
                    </div>

                    {/* Departure */}
                    <div>
                        <label className="font-medium">Departure Date & Time</label>
                        <input
                            type="datetime-local"
                            {...register("departure", { required: true })}
                            className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary-content bg-base-100"
                        />
                        {errors.departure && <p className='text-xs text-red-500 mt-2'>Departure is required</p>}
                    </div>

                    {/* Perks */}
                    <div>
                        <label className="font-medium">Perks</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3 text-sm">
                            {["AC", "Breakfast", "WiFi"].map((perk) => (
                                <label key={perk} className="flex gap-2 items-center">
                                    <input type="checkbox" {...register("perks")} value={perk} className="checkbox checkbox-sm" /> {perk}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="font-medium">Upload Image</label>
                        <input
                            type="file"
                            {...register("image", { required: true })}
                            className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary-content bg-base-100 file-input file-input-bordered"
                        />
                        {errors.image && <p className='text-xs text-red-500 mt-2'>Upload Image is required</p>}
                    </div>

                    {/* Vendor Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="font-medium">Vendor Name</label>
                            <input
                                readOnly
                                {...register("vendorName")}
                                className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary-content bg-base-100"
                                defaultValue={user?.displayName}
                            />
                        </div>

                        <div>
                            <label className="font-medium">Vendor Email</label>
                            <input
                                readOnly
                                {...register("vendorEmail")}
                                className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary-content bg-base-100"
                                defaultValue={user?.email}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={dbUser?.isFraud}
                        className="btn button w-full mt-4 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {dbUser?.isFraud ? "Fraud Vendor - Cannot Add Ticket" : "Add Ticket"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTickets;
