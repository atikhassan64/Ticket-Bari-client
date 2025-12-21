import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/sheard/loading/Loading';
import useAuth from '../../hooks/useAuth';

const TicketsDetailsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookingQty, setBookingQty] = useState(1);
    const { user } = useAuth();
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: ticket = [], isLoading } = useQuery({
        queryKey: ["ticket", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tickets/${id}`);
            return res.data;
        }
    });

    const { data: dbUser = {} } = useQuery({
        queryKey: ["user", user?.email],
        queryFn: async () => {
            if (!user?.email) return {};
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });

    const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

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

    const isExpired = new Date(ticket.departure) - new Date() <= 0;
    const isOutOfStock = ticket.quantity === 0;

    const handleConfirm = () => {
        const bookedTicket = {
            ticketId: ticket._id,
            title: ticket.title,
            image: ticket.image,
            from: ticket.from,
            to: ticket.to,
            departure: ticket.departure,
            unitPrice: ticket.price,
            bookingQty: bookingQty,
            totalPrice: ticket.price * bookingQty,
            userEmail: user.email,
            userName: user.displayName,
            vendorEmail: ticket.vendorEmail
        };

        axiosSecure.post("/ticket-booked", bookedTicket)
            .then(res => {
                console.log("booked data goes to database : ", res.data);
                setIsModalOpen(false);
            })
    }

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className='py-12 px-4 sm:px-6 md:px-8 bg-base-300'>
            {isModalOpen && (
                <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center px-4 z-50">
                    <div className="bg-base-100 p-6 sm:p-8 rounded-lg shadow-2xl w-full max-w-md">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4">Book Ticket</h2>
                        <label className="block mb-2 font-medium text-sm sm:text-base">Booking Quantity</label>
                        <input
                            type="number"
                            min={1}
                            max={ticket.quantity}
                            value={bookingQty}
                            onChange={(e) => setBookingQty(Number(e.target.value))}
                            className="w-full mb-3 border rounded-lg px-4 py-2 focus:outline-primary-content"
                        />
                        {bookingQty > ticket.quantity && (
                            <p className="text-red-500 text-sm mb-2">
                                Quantity cannot be greater than available tickets
                            </p>
                        )}
                        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
                            <button
                                className="btn btn-ghost w-full sm:w-auto"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <Link
                                to={`/dashboard/my-booked-tickets`}
                                className="btn button w-full sm:w-auto"
                                disabled={bookingQty > ticket.quantity}
                                onClick={handleConfirm}
                            >
                                Confirm Booking
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-4xl mx-auto p-6 sm:p-8 bg-base-100 shadow-lg rounded-lg">
                <div className="w-full h-64 sm:h-72 md:h-80 overflow-hidden rounded-lg mb-6">
                    <img
                        src={ticket.image}
                        alt={ticket.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">{ticket.title}</h1>

                <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-4">
                    <div className="text-base sm:text-lg md:text-xl">
                        <span className="font-semibold">From:</span> {ticket.from}
                        <span className="mx-2">→</span>
                        <span className="font-semibold">To:</span> {ticket.to}
                    </div>
                    <div className="text-base sm:text-lg md:text-xl mt-2 md:mt-0">
                        <span className="font-semibold">Transport Type:</span> {ticket.transport}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-4">
                    <div className="text-base sm:text-lg md:text-xl">
                        <span className="font-semibold">Price:</span> ${ticket.price}
                    </div>
                    <div className="text-base sm:text-lg md:text-xl mt-2 md:mt-0">
                        <span className="font-semibold">Available Tickets:</span> {ticket.quantity}
                    </div>
                </div>

                <div className="mb-4">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">Perks:</h2>
                    <ul className="list-disc list-inside text-gray-500 text-sm sm:text-base">
                        {ticket.perks && ticket.perks.map((perk, index) => (
                            <li key={index}>{perk}</li>
                        ))}
                    </ul>
                </div>

                <div className="mb-6">
                    <div className="text-base sm:text-lg md:text-xl font-semibold mb-2">Departure:</div>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <span className="text-base-800">{ticket.departure}</span>
                        <div className="flex gap-2 flex-wrap">
                            {["days", "hours", "minutes", "seconds"].map((unit, idx) => (
                                <div
                                    key={idx}
                                    className="flex flex-col border border-gray-400 p-2 sm:p-3 rounded-lg hover:bg-base-300 items-center min-w-[60px]"
                                >
                                    <span className="text-lg font-bold">
                                        {countdown[unit]}
                                    </span>
                                    <span className="text-xs capitalize">{unit}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full md:w-auto btn button px-6 py-3 rounded-lg disabled:bg-gray-400"
                    disabled={isExpired || isOutOfStock || dbUser?.role === "vendor" || dbUser?.role === "admin"}
                >
                    Book Now
                </button>
            </div>
        </div>
    );
};

export default TicketsDetailsPage;
