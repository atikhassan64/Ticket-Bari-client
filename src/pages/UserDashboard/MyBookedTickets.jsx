import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';

const MyBookedTickets = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: bookedTickets = [] } = useQuery({
        queryKey: ["ticketBooked", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`ticket-booked?email=${user.email}`);
            return res.data
        }
    });

    // 🔴 ADD Countdown state for all tickets without changing your code
    const [countdowns, setCountdowns] = useState({});

    useEffect(() => {
        const interval = setInterval(() => {
            const newCountdowns = {};
            bookedTickets.forEach(ticket => {
                const departureTime = new Date(ticket.departure);
                const now = new Date();
                const diff = departureTime - now;

                if (diff <= 0) {
                    newCountdowns[ticket._id] = { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
                } else {
                    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                    const minutes = Math.floor((diff / 1000 / 60) % 60);
                    const seconds = Math.floor((diff / 1000) % 60);
                    newCountdowns[ticket._id] = { days, hours, minutes, seconds, isExpired: false };
                }
            });
            setCountdowns(newCountdowns);
        }, 1000);

        return () => clearInterval(interval);
    }, [bookedTickets]);


    // payment 
    const handlePayment = async (ticket) => {
        const paymentInfo = {
            ticketId: ticket.ticketId || ticket._id,
            ticketTitle: ticket.title,
            bookingQty: ticket.bookingQty,
            totalPrice: ticket.totalPrice,
            userEmail: user.email
        };

        const res = await axiosSecure.post("/payment", paymentInfo);

        window.location.assign(res.data.url);
    }

    return (
        <div>
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">My Booked Tickets</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookedTickets.map(ticket => {
                        const countdown = countdowns[ticket._id] || { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false };

                        return (
                            <div
                                key={ticket._id}
                                className="bg-base-100 rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden border"
                            >
                                <div className="h-44 w-full overflow-hidden">
                                    <img
                                        src={ticket.image}
                                        alt={ticket.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="p-4 space-y-2">
                                    <h3 className="text-lg font-semibold">{ticket.title}</h3>
                                    <p className="text-sm text-gray-500">
                                        {ticket.from} → {ticket.to}
                                    </p>
                                    <p className="text-sm">
                                        <span className="font-medium">Departure:</span>{" "}
                                        {ticket.departure}
                                    </p>
                                    <div className="flex justify-between text-sm">
                                        <span>Qty: {ticket.bookingQty}</span>
                                        <span className="font-semibold">
                                            ${ticket.totalPrice}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between mt-2">
                                        <span
                                            className={`px-3 py-1 text-xs rounded-full font-semibold
                ${ticket.status === "pending" && "bg-yellow-100 text-yellow-700"}
                ${ticket.status === "accepted" && "bg-blue-100 text-blue-700"}
                ${ticket.status === "paid" && "bg-green-100 text-green-700"}
                ${ticket.status === "rejected" && "bg-red-100 text-red-700"}
              `}
                                        >
                                            {ticket.status.toUpperCase()}
                                        </span>

                                        {/* 🔴 Countdown like TicketsDetailsPage */}
                                        {ticket.status !== "rejected" && (
                                            <div className="flex gap-1 text-xs text-gray-500">
                                                <div className="flex flex-col items-center border border-gray-400 p-1 rounded-lg px-2">
                                                    <span className="text-sm font-bold">{countdown.days}</span>
                                                    <span className="text-xs">D</span>
                                                </div>
                                                <div className="flex flex-col items-center border border-gray-400 p-1 rounded-lg px-2">
                                                    <span className="text-sm font-bold">{countdown.hours}</span>
                                                    <span className="text-xs">H</span>
                                                </div>
                                                <div className="flex flex-col items-center border border-gray-400 p-1 rounded-lg px-2">
                                                    <span className="text-sm font-bold">{countdown.minutes}</span>
                                                    <span className="text-xs">M</span>
                                                </div>
                                                <div className="flex flex-col items-center border border-gray-400 p-1 rounded-lg px-2">
                                                    <span className="text-sm font-bold">{countdown.seconds}</span>
                                                    <span className="text-xs">S</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {ticket.status === "accepted" && !countdown.isExpired && (
                                        <button
                                            onClick={() => handlePayment(ticket)}
                                            className="w-full mt-3 btn button">
                                            Pay Now
                                        </button>
                                    )}

                                    {countdown.isExpired && (
                                        <p className="text-xs text-red-500 mt-2">
                                            Departure time passed. Payment unavailable.
                                        </p>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default MyBookedTickets;
