import React from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/sheard/loading/Loading";

const UpdateTicket = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const { register, handleSubmit, formState: { errors } } = useForm();

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


    if (isLoading) {
        return <Loading />;
    }

    if (ticket.adminStatus === "rejected") {
        return (
            <div className="p-10 text-center text-red-500 font-semibold">
                This ticket was rejected. You cannot update it.
            </div>
        );
    }

    const handleUpdateTicket = (data) => {

        const convertToAMPM = new Date(data.departure).toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
            hour12: true
        });

        data.departure = convertToAMPM;

        if (data.image?.length > 0) {
            const formData = new FormData();
            formData.append("image", data.image[0]);

            const photo_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_photo_host}`;

            axios.post(photo_API_URL, formData)
                .then(res => {
                    const imageURL = res.data.data.url;
                    updateTicket({ ...data, image: imageURL });
                });

        } else {
            updateTicket({ ...data, image: ticket.image });
        }
    };

    const updateTicket = (updatedData) => {
        const updatedTicket = {
            ...updatedData,
            adminStatus: "pending",
            status: "pending"
        };

        axiosSecure.patch(`/tickets/${id}`, updatedTicket)
            .then(() => {
                toast.success("Ticket updated successfully. Waiting for admin approval.");
                navigate("/dashboard/my-added-tickets");
            });
    };

    return (
        <div className="p-6 mx-auto">
            <div className="w-full bg-base-100">
                <h2 className="text-2xl font-bold mb-6">Update Ticket</h2>

                <form
                    onSubmit={handleSubmit(handleUpdateTicket)}
                    className="bg-base-200 shadow-md rounded-2xl p-8 space-y-6 border"
                >

                    {/* Title */}
                    <div>
                        <label className="font-medium">Ticket Title</label>
                        <input
                            type="text"
                            defaultValue={ticket.title}
                            {...register("title", { required: true })}
                            className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary-content bg-base-100"
                        />
                        {errors.title && <p className="text-red-500 text-xs">Required</p>}
                    </div>

                    {/* From / To */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                            defaultValue={ticket.from}
                            {...register("from", { required: true })}
                            className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary-content bg-base-100"
                            placeholder="From"
                        />
                        <input
                            defaultValue={ticket.to}
                            {...register("to", { required: true })}
                            className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary-content bg-base-100"
                            placeholder="To"
                        />
                    </div>

                    {/* Transport */}
                    <input
                        defaultValue={ticket.transport}
                        {...register("transport", { required: true })}
                        className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary-content bg-base-100"
                        placeholder="Transport Type"
                    />

                    {/* Price / Quantity */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <input
                            type="number"
                            defaultValue={ticket.price}
                            {...register("price", { required: true })}
                            className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary-content bg-base-100"
                            placeholder="Price"
                        />
                        <input
                            type="number"
                            defaultValue={ticket.quantity}
                            {...register("quantity", { required: true })}
                            className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary-content bg-base-100"
                            placeholder="Quantity"
                        />
                    </div>

                    {/* Departure */}
                    <input
                        type="datetime-local"
                        defaultValue={formatDateForInput(ticket.departure)}
                        {...register("departure", { required: true })}
                        className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary-content bg-base-100"
                    />


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

                    {/* Image */}
                    <input
                        type="file"
                        {...register("image")}
                        className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-primary-content bg-base-100 file-input file-input-bordered"
                    />

                    <button type="submit" className="btn button w-full">
                        Update Ticket
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateTicket;