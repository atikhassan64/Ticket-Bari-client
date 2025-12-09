import React from 'react';

const TicketsDetailsPage = () => {
    return (
        <div className='py-12 bg-base-300'>
            <div className="max-w-4xl mx-auto p-6 bg-base-100 shadow-lg rounded-lg">
                {/* Ticket Image */}
                <div className="w-full h-64 overflow-hidden rounded-lg mb-6">
                    <img
                        src="https://i.ibb.co.com/MxyYFgQw/locomotive-2810421-640.jpg"
                        alt="Ticket Image"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Ticket Title */}
                <h1 className="text-3xl font-bold mb-4">Express Bus to Chittagong</h1>

                {/* Route & Transport Type */}
                <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-4">
                    <div className="text-lg">
                        <span className="font-semibold">From:</span> Dhaka
                        <span className="mx-2">→</span>
                        <span className="font-semibold">To:</span> Chittagong
                    </div>
                    <div className="text-lg mt-2 md:mt-0">
                        <span className="font-semibold">Transport Type:</span> Bus
                    </div>
                </div>

                {/* Price & Ticket Quantity */}
                <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-4">
                    <div className="text-lg">
                        <span className="font-semibold">Price:</span> $25 per ticket
                    </div>
                    <div className="text-lg mt-2 md:mt-0">
                        <span className="font-semibold">Available Tickets:</span> 10
                    </div>
                </div>

                {/* Perks */}
                <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Perks:</h2>
                    <ul className="list-disc list-inside text-gray-500">
                        <li>Free Wi-Fi</li>
                        <li>Snacks included</li>
                        <li>Comfortable reclining seats</li>
                    </ul>
                </div>

                {/* Departure Date & Countdown */}
                <div className="mb-6">
                    <div className="text-lg font-semibold mb-2">Departure:</div>
                    <div className="flex items-center gap-4">
                        <span className="text-base-800">2025-12-15 08:00 AM</span>
                        <span className="text-red-500 font-bold">2 days 3 hours left</span>
                    </div>
                </div>

                {/* Book Now Button */}
                <button
                    className="w-full md:w-auto btn button px-6 py-3 rounded-lg disabled:bg-gray-400"
                    disabled={false} // JS logic দিয়ে control করতে হবে
                >
                    Book Now
                </button>
            </div>

        </div>
    );
};

export default TicketsDetailsPage;