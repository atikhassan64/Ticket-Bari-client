import React from 'react';
import { useNavigate } from 'react-router';

const advertisementTickets = [
    {
        id: 1,
        image: "https://i.ibb.co/MxyYFgQw/locomotive-2810421-640.jpg",
        title: "Dhaka → Chittagong Train",
        price: 1200,
        quantity: 50,
        transportType: "Train",
        perks: ["AC", "Breakfast"]
    },
    {
        id: 2,
        image: "https://i.ibb.co/bggbBz5Q/istockphoto-1154164634-612x612.jpg",
        title: "Dhaka → Sylhet Bus",
        price: 800,
        quantity: 40,
        transportType: "Bus",
        perks: ["WiFi", "Snack"]
    },
    {
        id: 3,
        image: "https://i.ibb.co/ymSt6zFJ/Ships-Landing-Prestige-Desktop.jpg",
        title: "Dhaka → Barishal Launch",
        price: 1500,
        quantity: 60,
        transportType: "Launch",
        perks: ["Cabin", "Life Jacket"]
    },
    {
        id: 4,
        image: "https://i.ibb.co/fY8rLCQX/flight-1600x900.webp",
        title: "Dhaka → Chittagong Flight",
        price: 5000,
        quantity: 30,
        transportType: "Flight",
        perks: ["Snack", "Extra Baggage"]
    },
    {
        id: 5,
        image: "https://i.ibb.co/MxyYFgQw/locomotive-2810421-640.jpg",
        title: "Chittagong → Dhaka Train",
        price: 1200,
        quantity: 50,
        transportType: "Train",
        perks: ["AC", "Snack"]
    },
    {
        id: 6,
        image: "https://i.ibb.co/bggbBz5Q/istockphoto-1154164634-612x612.jpg",
        title: "Sylhet → Dhaka Bus",
        price: 800,
        quantity: 40,
        transportType: "Bus",
        perks: ["WiFi", "AC"]
    }
];


const Advertisement = () => {
    const navigate = useNavigate();
    return (
        <div>
            <section className="py-12 bg-base-200">
                <div className="max-w-[1200px] mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 text-secondary-content">Advertisement Tickets</h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        {advertisementTickets.map(ticket => (
                            <div
                                key={ticket.id}
                                className="bg-base-100 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">

                                <img src={ticket.image} alt={ticket.title} className="w-full h-48 object-cover" />

                                <div className="p-4">
                                    <h3 className="text-xl font-semibold mb-2">{ticket.title}</h3>

                                    <p className="text-gray-500 mb-1"><span className="font-semibold">Price:</span> ৳{ticket.price}</p>
                                    <p className="text-gray-500 mb-1"><span className="font-semibold">Quantity:</span> {ticket.quantity}</p>
                                    <p className="text-gray-500 mb-1"><span className="font-semibold">Transport:</span> {ticket.transportType}</p>

                                    <p className="text-gray-500 mb-2">
                                        <span className="font-semibold">Perks:</span> {ticket.perks.join(", ")}
                                    </p>

                                    <button
                                        onClick={() => navigate(`/ticket/${ticket.id}`)}
                                        className=" button btn cursor-pointer w-full bg-secondary-content text-base-100 py-2 rounded hover:bg-primary-content transition"
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

export default Advertisement;