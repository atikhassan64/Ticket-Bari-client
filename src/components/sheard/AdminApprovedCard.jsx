import React from 'react';
import { useNavigate } from 'react-router';

const latestTickets = [
    {
        id: 1,
        image: "https://i.ibb.co/MxyYFgQw/locomotive-2810421-640.jpg",
        title: "Dhaka → Chittagong Train",
        price: 1200,
        quantity: 50,
        transportType: "Train",
        perks: ["AC", "Breakfast"],
        departure: "2025-01-15 07:30 AM"
    },
    {
        id: 2,
        image: "https://i.ibb.co/bggbBz5Q/istockphoto-1154164634-612x612.jpg",
        title: "Dhaka → Sylhet Bus",
        price: 800,
        quantity: 40,
        transportType: "Bus",
        perks: ["WiFi", "Snack"],
        departure: "2025-01-16 10:00 PM"
    },
    {
        id: 3,
        image: "https://i.ibb.co/ymSt6zFJ/Ships-Landing-Prestige-Desktop.jpg",
        title: "Dhaka → Barishal Launch",
        price: 1500,
        quantity: 60,
        transportType: "Launch",
        perks: ["Cabin", "Life Jacket"],
        departure: "2025-01-14 09:15 PM"
    },
    {
        id: 4,
        image: "https://i.ibb.co/fY8rLCQX/flight-1600x900.webp",
        title: "Dhaka → Chittagong Flight",
        price: 5000,
        quantity: 30,
        transportType: "Flight",
        perks: ["Snack", "Extra Baggage"],
        departure: "2025-01-20 06:45 AM"
    },
    {
        id: 5,
        image: "https://i.ibb.co/MxyYFgQw/locomotive-2810421-640.jpg",
        title: "Chittagong → Dhaka Train",
        price: 1200,
        quantity: 50,
        transportType: "Train",
        perks: ["AC", "Snack"],
        departure: "2025-01-22 03:00 PM"
    },
    {
        id: 6,
        image: "https://i.ibb.co/bggbBz5Q/istockphoto-1154164634-612x612.jpg",
        title: "Sylhet → Dhaka Bus",
        price: 800,
        quantity: 40,
        transportType: "Bus",
        perks: ["WiFi", "AC"],
        departure: "2025-01-18 09:30 PM"
    }
];

const AdminApprovedCard = () => {
    const navigate = useNavigate();

    return (
        <div>
            <section>
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {latestTickets.map(ticket => (
                            <div
                                key={ticket.id}
                                className="relative bg-base-200 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                            >
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

                                    <p className="text-gray-500">
                                        <span className="font-semibold">Price:</span> ৳{ticket.price}
                                    </p>

                                    <p className="text-gray-500">
                                        <span className="font-semibold">Quantity:</span> {ticket.quantity}
                                    </p>

                                    <p className="text-gray-500">
                                        <span className="font-semibold">Transport:</span> {ticket.transportType}
                                    </p>

                                    <p className="text-gray-500">
                                        <span className="font-semibold">Departure:</span> {ticket.departure}
                                    </p>

                                    <p className="text-gray-500 mb-3">
                                        <span className="font-semibold">Perks:</span> {ticket.perks.join(", ")}
                                    </p>

                                    {/* See Details Button */}
                                    <button
                                        onClick={() => navigate(`/ticket-details/${ticket.id}`)}
                                        className="btn button cursor-pointer w-full bg-secondary-content text-base-100 py-2 rounded hover:bg-primary-content transition"
                                    >
                                        See Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdminApprovedCard;
