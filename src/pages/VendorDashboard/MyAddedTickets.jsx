import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/sheard/loading/Loading';
import { useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const MyAddedTickets = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: tickets = [], isLoading, refetch } = useQuery({
        queryKey: ["tickets", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tickets?email=${user.email}`);
            return res.data;
        }
    });

    const handleTicketDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want delete this ticket!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/tickets/${id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your ticket has been deleted.",
                                icon: "success"
                            });
                        }
                    })


            }
        });
    }

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">My Added Tickets</h2>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {tickets.map((ticket) => (
                    <div
                        key={ticket._id}
                        className="relative bg-base-200 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                        {/* IMAGE */}
                        <div className="h-56 w-full overflow-hidden">
                            <img
                                src={ticket.image}
                                alt={ticket.title}
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                            />
                        </div>

                        {/* CONTENT */}
                        <div className="p-4 space-y-1">

                            <h3 className="text-xl font-bold mb-2 text-gray-800-content">
                                {ticket.title}
                            </h3>

                            <div className='flex justify-between items-end'>
                                <p className="text-gray-500">
                                    <span className="font-semibold">Price:</span> ${ticket.price}
                                </p>

                                <p className="text-gray-500">
                                    <span className="font-semibold">Quantity:</span> {ticket.quantity}
                                </p>
                            </div>

                            <p className="text-gray-500">
                                <span className="font-semibold">Transport:</span> {ticket.transport}
                            </p>

                            <p className="text-gray-500">
                                <span className="font-semibold">From/To:</span> {ticket.from} → {ticket.to}
                            </p>

                            <p className="text-gray-500">
                                <span className="font-semibold">Departure:</span> {ticket.departure}
                            </p>

                            <div className='flex justify-between items-end'>
                                {/* Perks */}
                                {ticket?.perks?.length > 0 && (
                                    <p className="text-gray-500">
                                        <span className="font-medium">{ticket.perks.join(", ")}</span> 
                                    </p>
                                )}

                                {/* STATUS */}
                                <p
                                    className={`mt-2 font-semibold ${ticket.adminStatus === "pending"
                                        ? "text-yellow-600"
                                        : ticket.adminStatus === "approved"
                                            ? "text-secondary-content"
                                            : "text-red-600"
                                        }`}
                                >
                                    Status: {ticket.adminStatus}
                                </p>
                            </div>

                            {/* BUTTONS */}
                            <div className="flex gap-2 mt-4">
                                <button
                                    disabled={ticket.adminStatus === "rejected"}
                                    className="w-full py-2 rounded cursor-pointer bg-green-600 text-white font-semibold hover:bg-green-700 disabled:opacity-50"
                                    onClick={() => navigate(`/dashboard/update-ticket/${ticket._id}`)}
                                >
                                    Update
                                </button>

                                <button
                                    onClick={() => handleTicketDelete(ticket._id)}
                                    disabled={ticket.adminStatus === "rejected"}
                                    className="w-full py-2 rounded cursor-pointer bg-red-500 text-white font-semibold hover:bg-red-600 disabled:opacity-50"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyAddedTickets;
