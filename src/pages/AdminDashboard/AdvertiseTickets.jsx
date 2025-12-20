import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const AdvertiseTickets = () => {
    const axiosSecure = useAxiosSecure();
    const [tickets, setTickets] = useState([]);
    const [advertisedCount, setAdvertisedCount] = useState(null);

    console.log(advertisedCount)

    // 🔹 Fetch all admin-approved tickets
    const fetchTickets = async () => {
        try {
            const res = await axiosSecure.get('/tickets');
            setTickets(res.data);

            const count = res.data.filter(
                ticket => ticket.isAdvertised
            ).length;

            setAdvertisedCount(count);
        } catch (err) {
            toast.error('Failed to fetch tickets');
            console.error(err);
        }
    };


    useEffect(() => {
        fetchTickets();
    }, []);

    

    const handleToggleAdvertise = async (ticket) => {
        if (!ticket.isAdvertised && advertisedCount >= 6) {
            toast.error('You can advertise maximum 6 tickets at a time');
            return;
        }

        try {
            const updatedStatus = !ticket.isAdvertised;

            const res = await axiosSecure.patch(
                `/tickets/advertise/${ticket._id}`,
                { isAdvertised: updatedStatus }
            );

            if (res.data.modifiedCount > 0) {
                toast.success(
                    `Ticket "${ticket.title}" ${updatedStatus ? 'Advertised' : 'Unadvertised'}`
                );

                // ✅ শুধু server থেকে আবার fetch করো
                fetchTickets();
            } else {
                toast.error('Failed to update ticket');
            }
        } catch (err) {
            toast.error('Something went wrong');
            console.error(err);
        }
    };



    return (
        <div className="p-6">
            <h2 className="text-2xl text-secondary-content font-bold mb-6">Advertise Tickets</h2>

            <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
                <table className="table w-full">
                    <thead className="bg-base-200">
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Departure</th>
                            <th>Advertise</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map((ticket, index) => (
                            <tr key={ticket._id}>
                                <td>{index + 1}</td>
                                <td className="font-semibold">{ticket.title}</td>
                                <td>{ticket.from}</td>
                                <td>{ticket.to}</td>
                                <td>{ticket.price}</td>
                                <td>{ticket.quantity}</td>
                                <td>{ticket.departure}</td>
                                <td>
                                    <button
                                        onClick={() => handleToggleAdvertise(ticket)}
                                        className={`btn btn-xs ${ticket.isAdvertised ? 'btn-success' : 'btn-outline'}`}
                                    >
                                        {ticket.isAdvertised ? 'Advertised' : 'Advertise'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {tickets.length === 0 && (
                            <tr>
                                <td colSpan="8" className="text-center py-4">
                                    No admin-approved tickets found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <p className="mt-4 text-sm text-gray-500">
                Currently advertised tickets: {advertisedCount} / 6
            </p>
        </div>
    );
};

export default AdvertiseTickets;
