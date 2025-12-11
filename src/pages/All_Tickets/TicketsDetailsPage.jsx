import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/sheard/loading/Loading';

const TicketsDetailsPage = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: ticket = [], isLoading } = useQuery({
        queryKey: ["ticket", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tickets/${id}`);
            return res.data;
        }
    });

    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        if (!ticket.departure) return;

        const interval = setInterval(() => {
            const now = new Date();
            const departureTime = new Date(ticket.departure);
            const diff = departureTime - now;

            if (diff <= 0) {
                clearInterval(interval);
                setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((diff / 1000 / 60) % 60);
                const seconds = Math.floor((diff / 1000) % 60);
                setCountdown({ days, hours, minutes, seconds });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [ticket.departure]);

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='py-12 bg-base-300'>
            <div className="max-w-4xl mx-auto p-6 bg-base-100 shadow-lg rounded-lg">
                {/* Ticket Image */}
                <div className="w-full h-64 overflow-hidden rounded-lg mb-6">
                    <img
                        src={ticket.image}
                        alt={ticket.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Ticket Title */}
                <h1 className="text-3xl font-bold mb-4">{ticket.title}</h1>

                {/* Route & Transport Type */}
                <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-4">
                    <div className="text-lg">
                        <span className="font-semibold">From:</span> {ticket.from}
                        <span className="mx-2">→</span>
                        <span className="font-semibold">To:</span> {ticket.to}
                    </div>
                    <div className="text-lg mt-2 md:mt-0">
                        <span className="font-semibold">Transport Type:</span> {ticket.transport}
                    </div>
                </div>

                {/* Price & Ticket Quantity */}
                <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-4">
                    <div className="text-lg">
                        <span className="font-semibold">Price:</span> ${ticket.price}
                    </div>
                    <div className="text-lg mt-2 md:mt-0">
                        <span className="font-semibold">Available Tickets:</span> {ticket.quantity}
                    </div>
                </div>

                {/* Perks */}
                {/* <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Perks:</h2>
                    <ul className="list-disc list-inside text-gray-500">
                        <li>Free Wi-Fi</li>
                        <li>Snacks included</li>
                        <li>Comfortable reclining seats</li>
                    </ul>
                </div> */}

                {/* Perks */}
                <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Perks:</h2>
                    <ul className="list-disc list-inside text-gray-500">
                        {ticket.perks && ticket.perks.map((perk, index) => (
                            <li key={index}>{perk}</li>
                        ))}
                    </ul>
                </div>


                {/* Departure Date & Countdown */}
                <div className="mb-6">
                    <div>
                        <div className="text-lg font-semibold mb-2">Departure:</div>
                        <div className='border ml-26 -mt-4.5'></div>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                        <span className="text-base-800">{ticket.departure}</span>
                        <div className="flex gap-2 p-2 rounded-lg">
                            <div className="flex flex-col border border-gray-400 p-2 rounded-lg hover:bg-base-300 items-center px-2">
                                <span className="text-lg font-bold">{countdown.days}</span>
                                <span className="text-xs">Days</span>
                            </div>
                            <div className="border border-gray-400 p-2 rounded-lg hover:bg-base-300 flex flex-col items-center px-2">
                                <span className="text-lg font-bold">{countdown.hours}</span>
                                <span className="text-xs">Hours</span>
                            </div>
                            <div className="border border-gray-400 p-2 rounded-lg hover:bg-base-300 flex flex-col items-center px-2">
                                <span className="text-lg font-bold">{countdown.minutes}</span>
                                <span className="text-xs">Minutes</span>
                            </div>
                            <div className="border border-gray-400 p-2 rounded-lg hover:bg-base-300 flex flex-col items-center px-2">
                                <span className="text-lg font-bold">{countdown.seconds}</span>
                                <span className="text-xs">Seconds</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Book Now Button */}
                <button
                    className="w-full md:w-auto btn button px-6 py-3 rounded-lg disabled:bg-gray-400"
                    disabled={false}
                >
                    Book Now
                </button>
            </div>

        </div>
    );
};

export default TicketsDetailsPage;

// import React from 'react';
// import { useParams } from 'react-router';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
// import { useQuery } from '@tanstack/react-query';
// import Loading from '../../components/sheard/loading/Loading';

// const TicketsDetailsPage = () => {
//     const { id } = useParams();
//     const axiosSecure = useAxiosSecure();

//     const { data: ticket = {}, isLoading } = useQuery({
//         queryKey: ["ticket", id],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/tickets/${id}`);
//             return res.data;
//         }
//     });

//     if (isLoading) return <Loading />;

//     return (
//         <div className='py-12 bg-base-300'>
//             <div className="max-w-4xl mx-auto p-6 bg-base-100 shadow-lg rounded-lg">

//                 <div className="w-full h-64 overflow-hidden rounded-lg mb-6">
//                     <img src={ticket.image} className="w-full h-full object-cover" />
//                 </div>

//                 <h1 className="text-3xl font-bold mb-4">{ticket.title}</h1>

//                 <div className="text-lg mb-4">
//                     <span className="font-semibold">From:</span> {ticket.from} →
//                     <span className="font-semibold ml-2">To:</span> {ticket.to}
//                 </div>

//                 <p className="text-lg"><span className="font-semibold">Price:</span> ৳{ticket.price}</p>
//                 <p className="text-lg"><span className="font-semibold">Available Tickets:</span> {ticket.quantity}</p>

//                 <p className="text-lg mt-4">
//                     <span className="font-semibold">Departure:</span> {ticket.departure}
//                 </p>

//                 <button className="btn button w-full mt-6">Book Now</button>
//             </div>
//         </div>
//     );
// };

// export default TicketsDetailsPage;

