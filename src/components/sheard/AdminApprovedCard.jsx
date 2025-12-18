import React from 'react';
import { useNavigate } from 'react-router';

const AdminApprovedCard = ({ ticket }) => {
    const navigate = useNavigate();

    if (!ticket) return null;

    return (
        <div>
            <section>
                <div>
                    <div>
                        <div className="relative bg-base-200 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            {/* Image */}
                            <div className="h-56 w-full overflow-hidden">
                                <img
                                    src={ticket.image}
                                    alt={ticket.title}
                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                />
                            </div>

                            {/* Ticket Info */}
                            <div className="p-4 space-y-1">
                                <h3 className="text-xl font-bold mb-2 text-gray-800-content">{ticket.title}</h3>

                                <div className='flex justify-between items-end'>
                                    <p className="text-gray-500">
                                        <span className="font-semibold">Price:</span> ${ticket.price}
                                    </p>

                                    <p className="text-gray-500">
                                        <span className="font-semibold">Quantity:</span> {ticket.quantity}
                                    </p>
                                </div>

                                <div className='flex justify-between items-end'>
                                    {/* Perks */}
                                    {ticket?.perks?.length > 0 && (
                                        <p className="text-gray-500">
                                            <span className="font-medium">{ticket.perks.join(", ")}</span>
                                        </p>
                                    )}

                                    <p className="text-gray-500">
                                        <span className="font-semibold">Transport:</span> {ticket.transport}
                                    </p>
                                </div>

                                <p className="text-gray-500">
                                    <span className="font-semibold mr-1">Departure:</span>
                                    {ticket.departure}
                                </p>

                                {/* See Details Button */}
                                <button
                                    onClick={() => navigate(`/ticket-details/${ticket._id}`)}
                                    className="btn button cursor-pointer w-full bg-secondary-content text-base-100 py-2 rounded hover:bg-primary-content transition"
                                >
                                    See Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdminApprovedCard;
