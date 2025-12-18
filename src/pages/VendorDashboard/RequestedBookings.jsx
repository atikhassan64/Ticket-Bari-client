import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/sheard/loading/Loading';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';

const RequestedBookings = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: bookings = [], isLoading, refetch } = useQuery({
        queryKey: ["requestedBookings", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get("/ticket-booked");
            return res.data;
        },
        enabled: !!user?.email,
    });

    const vendorBookings = bookings.filter(
        booking => booking.vendorEmail === user?.email
    );

    const handleAccept = (id) => {
        Swal.fire({
            title: "Accept Booking?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Accept",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/requested-bookings/${id}/accept`)
                    .then(() => {
                        Swal.fire("Booking Accepted", "", "success");
                        refetch();
                    });
            }
        });
    };

    const handleReject = (id) => {
        Swal.fire({
            title: "Reject Booking?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Reject",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/requested-bookings/${id}/reject`)
                    .then(() => {
                        Swal.fire("Booking Rejected", "", "success");
                        refetch();
                    });
            }
        });
    };

    if (isLoading) return <Loading />;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Requested Bookings</h2>

            <div className="overflow-x-auto bg-base-100 rounded-lg shadow-md">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-base-300">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                User Name / Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Ticket Title
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Quantity
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Total Price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="bg-base-200 divide-y divide-gray-200">
                        {vendorBookings.map(booking => (
                            <tr key={booking._id}>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {booking.userName} <br />
                                    <span className="text-xs text-gray-400">
                                        {booking.userEmail}
                                    </span>
                                </td>

                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {booking.title}
                                </td>

                                <td className="px-6 py-4 text-left text-sm text-gray-500">
                                    {booking.bookingQty}
                                </td>

                                <td className="px-6 py-4 text-left text-sm font-semibold text-gray-500">
                                    $
                                    {booking.totalPrice ||
                                        booking.price * booking.bookingQty}
                                </td>

                                <td className='px-6 py-4 text-sm font-semibold text-gray-500'>
                                    {/* Status */}
                                    <p className="text-xs mb-1 capitalize font-semibold">
                                        Status: {booking.status}
                                    </p>
                                </td>

                                <td className="px-6 py-4 text-left space-x-2">
                                    {/* Accept Button */}
                                    <button
                                        disabled={booking.status === "accepted"}
                                        onClick={() => handleAccept(booking._id)}
                                        className={`px-3 py-1 bg-green-600 text-white text-xs rounded
                                        ${booking.status === "accepted"
                                                ? "opacity-50 cursor-not-allowed"
                                                : "hover:bg-green-700"}`}
                                    >
                                        Accept
                                    </button>

                                    {/* Reject Button */}
                                    <button
                                        disabled={booking.status === "rejected"}
                                        onClick={() => handleReject(booking._id)}
                                        className={`px-3 py-1 bg-red-600 text-white text-xs rounded
                                        ${booking.status === "rejected"
                                                ? "opacity-50 cursor-not-allowed"
                                                : "hover:bg-red-700"}`}
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {vendorBookings.length === 0 && (
                    <p className="text-center text-sm text-gray-400 py-6">
                        No booking requests found
                    </p>
                )}
            </div>
        </div>
    );
};

export default RequestedBookings;