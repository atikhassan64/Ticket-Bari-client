// import React from "react";

// const AddTickets = () => {

//     return (
//         <div className='p-10'>
//             <div className="w-full bg-base-100">
//                 <h2 className="text-3xl font-bold mb-8">Add New Ticket</h2>

//                 <div className="bg-base-200 dark:bg-gray-900 shadow-md rounded-2xl p-8 space-y-6 border">

//                     {/* Ticket Title */}
//                     <div>
//                         <label className="font-medium">Ticket Title</label>
//                         <input
//                             type="text"
//                             className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary-content bg-base-100"
//                             placeholder="Enter ticket title"
//                         />
//                     </div>

//                     {/* From + To */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                             <label className="font-medium">From (Location)</label>
//                             <input
//                                 type="text"
//                                 className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary-content bg-base-100"
//                                 placeholder="Dhaka"
//                             />
//                         </div>

//                         <div>
//                             <label className="font-medium">To (Location)</label>
//                             <input
//                                 type="text"
//                                 className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary-content bg-base-100"
//                                 placeholder="Chittagong"
//                             />
//                         </div>
//                     </div>

//                     {/* Transport Type */}
//                     <div>
//                         <label className="font-medium">Transport Type</label>
//                         <input
//                             type="text"
//                             className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary-content bg-base-100"
//                             placeholder="Bus / Train / Air / Launch"
//                         />
//                     </div>

//                     {/* Price + Quantity */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                             <label className="font-medium">Price (per unit)</label>
//                             <input
//                                 type="number"
//                                 className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary-content bg-base-100"
//                                 placeholder="1200"
//                             />
//                         </div>

//                         <div>
//                             <label className="font-medium">Ticket Quantity</label>
//                             <input
//                                 type="number"
//                                 className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary-content bg-base-100"
//                                 placeholder="30"
//                             />
//                         </div>
//                     </div>

//                     {/* Departure */}
//                     <div>
//                         <label className="font-medium">Departure Date & Time</label>
//                         <input
//                             type="datetime-local"
//                             className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary-content bg-base-100"
//                         />
//                     </div>

//                     {/* Perks */}
//                     <div>
//                         <label className="font-medium">Perks</label>

//                         <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3 text-sm">
//                             <label className="flex gap-2 items-center">
//                                 <input type="checkbox" className="checkbox checkbox-sm" /> AC
//                             </label>

//                             <label className="flex gap-2 items-center">
//                                 <input type="checkbox" className="checkbox checkbox-sm" /> Breakfast
//                             </label>

//                             <label className="flex gap-2 items-center">
//                                 <input type="checkbox" className="checkbox checkbox-sm" /> WiFi
//                             </label>
//                         </div>
//                     </div>

//                     {/* Image Upload */}
//                     <div>
//                         <label className="font-medium">Upload Image</label>
//                         <input
//                             type="file"
//                             className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary-content bg-base-100 file-input file-input-bordered"
//                         />
//                     </div>

//                     {/* Vendor Info */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                             <label className="font-medium">Vendor Name</label>
//                             <input
//                                 readOnly
//                                 className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary-content bg-base-100"
//                                 value="Your Name"
//                             />
//                         </div>

//                         <div>
//                             <label className="font-medium">Vendor Email</label>
//                             <input
//                                 readOnly
//                                 className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary-content bg-base-100"
//                                 value="vendor@email.com"
//                             />
//                         </div>
//                     </div>

//                     {/* Submit Button */}
//                     <button className="btn button w-full mt-4 py-3 text-lg">
//                         Add Ticket
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AddTickets;

import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const AddTickets = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    // const handleAddTickets = (data) => {
    //     const uploadPhoto = data.image[0];
    //     const formData = new FormData();
    //     formData.append("image", uploadPhoto);
    //     const photo_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_photo_host}`
    //     axios.post(photo_API_URL, formData)
    //         .then(res => {
    //             const imageURL = res.data.data.url;
    //             const ticket = {
    //                 ...data,
    //                 image: imageURL,
    //                 status: "pending",
    //             }
    //             // console.log("final data : ", ticket)
    //             axiosSecure.post("/tickets", ticket)
    //                 .then(res => {
    //                     console.log("to Database: ", res.data)
    //                 })
    //         })
    //     reset()
    // };

    const handleAddTickets = (data) => {

        // ⭐ ADD THIS (1)
        const convertToAMPM = new Date(data.departure).toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
            hour12: true
        });

        data.departure = convertToAMPM; // ⭐ ADD THIS (2)

        const uploadPhoto = data.image[0];
        const formData = new FormData();
        formData.append("image", uploadPhoto);
        const photo_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_photo_host}`
        axios.post(photo_API_URL, formData)
            .then(res => {
                const imageURL = res.data.data.url;
                const ticket = {
                    ...data,
                    image: imageURL,
                    status: "pending",
                }

                // ⭐ This now saves AM/PM format
                axiosSecure.post("/tickets", ticket)
                    .then(res => {
                        console.log("to Database: ", res.data)
                    })
            })
        reset()
    };

    return (
        <div className='p-6 mx-auto'>
            <div className="w-full bg-base-100">
                <h2 className="text-2xl font-bold mb-6">Add New Ticket</h2>

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
                        {
                            errors.title?.type === "required" && <p className='text-xs text-red-500 mt-2'>Ticket Title is required</p>
                        }
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

                            {
                                errors.from?.type === "required" && <p className='text-xs text-red-500 mt-2'>From (Location) is required</p>
                            }
                        </div>

                        <div>
                            <label className="font-medium">To (Location)</label>
                            <input
                                type="text"
                                {...register("to", { required: true })}
                                className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary-content bg-base-100"
                                placeholder="Chittagong"
                            />
                            {
                                errors.to?.type === "required" && <p className='text-xs text-red-500 mt-2'>To (Location) is required</p>
                            }
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
                        {
                            errors.transport?.type === "required" && <p className='text-xs text-red-500 mt-2'>Transport Type is required</p>
                        }
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
                            {
                                errors.price?.type === "required" && <p className='text-xs text-red-500 mt-2'>Price is required</p>
                            }
                        </div>

                        <div>
                            <label className="font-medium">Ticket Quantity</label>
                            <input
                                type="number"
                                {...register("quantity", { required: true })}
                                className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary-content bg-base-100"
                                placeholder="30"
                            />
                            {
                                errors.quantity?.type === "required" && <p className='text-xs text-red-500 mt-2'>Ticket Quantity is required</p>
                            }
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
                        {
                            errors.departure?.type === "required" && <p className='text-xs text-red-500 mt-2'>Departure Date & Time is required</p>
                        }
                    </div>

                    {/* Perks */}
                    <div>
                        <label className="font-medium">Perks</label>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3 text-sm">
                            <label className="flex gap-2 items-center">
                                <input type="checkbox" {...register("perks")} value="AC" className="checkbox checkbox-sm" /> AC
                            </label>

                            <label className="flex gap-2 items-center">
                                <input type="checkbox" {...register("perks")} value="Breakfast" className="checkbox checkbox-sm" /> Breakfast
                            </label>

                            <label className="flex gap-2 items-center">
                                <input type="checkbox" {...register("perks")} value="WiFi" className="checkbox checkbox-sm" /> WiFi
                            </label>
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
                        {
                            errors.image?.type === "required" && <p className='text-xs text-red-500 mt-2'>Upload Image is required</p>
                        }
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
                                placeholder="Your Name"
                            />
                        </div>

                        <div>
                            <label className="font-medium">Vendor Email</label>
                            <input
                                readOnly
                                {...register("vendorEmail")}
                                className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary-content bg-base-100"
                                defaultValue={user?.email}
                                placeholder="Your email"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn button w-full mt-4 py-3 text-lg">
                        Add Ticket
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTickets;
