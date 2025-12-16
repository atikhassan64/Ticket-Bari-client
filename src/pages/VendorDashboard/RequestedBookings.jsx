// import React from 'react';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
// import { useQuery } from '@tanstack/react-query';
// import Loading from '../../components/sheard/loading/Loading';
// import Swal from 'sweetalert2';
// import useAuth from '../../hooks/useAuth';

// const RequestedBookings = () => {
//     const axiosSecure = useAxiosSecure();
//     const { user } = useAuth();

//     // 🔴 Fetch all requested bookings
//     const { data: bookings = [], isLoading, refetch } = useQuery({
//         queryKey: ["requestedBookings", user?.email],
//         queryFn: async () => {
//             const res = await axiosSecure.get("/ticket-booked");
//             return res.data;
//         },
//         enabled: !!user?.email,
//     });

//     // 🔴 Accept handler
//     const handleAccept = (id) => {
//         Swal.fire({
//             title: "Accept Booking?",
//             icon: "question",
//             showCancelButton: true,
//             confirmButtonText: "Accept",
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 axiosSecure.patch(`/requested-bookings/${id}/accept`).then(() => {
//                     Swal.fire("Booking Accepted", "", "success");
//                     refetch();
//                 });
//             }
//         });
//     }

//     // 🔴 Reject handler
//     const handleReject = (id) => {
//         Swal.fire({
//             title: "Reject Booking?",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonText: "Reject",
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 axiosSecure.patch(`/requested-bookings/${id}/reject`).then(() => {
//                     Swal.fire("Booking Rejected", "", "success");
//                     refetch();
//                 });
//             }
//         });
//     }

//     if (isLoading) {
//         return <Loading />;
//     }

//     return (
//         <div className="p-6">
//             <h2 className="text-2xl font-bold mb-6">Requested Bookings</h2>

//             <div className="overflow-x-auto bg-base-100 rounded-lg shadow-md">
//                 <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-base-300">
//                         <tr>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name / Email</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket Title</th>
//                             <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
//                             <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
//                             <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                         </tr>
//                     </thead>

//                     <tbody className="bg-base-200 divide-y divide-gray-200">
//                         {bookings.map(booking => (
//                             <tr key={booking._id} className="">
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.userName} <br /> <span className="text-gray-400 text-xs">{booking.userEmail}</span></td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.title}</td>
//                                 <td className="px-6 py-4 text-center text-sm text-gray-500">{booking.bookingQty}</td>
//                                 <td className="px-6 py-4 text-center text-sm font-semibold text-gray-500">${booking.totalPrice}</td>
//                                 <td className="px-6 py-4 text-center space-x-2">
//                                     <button
//                                         disabled={booking.status === "accepted"}
//                                         onClick={() => handleAccept(booking._id)}
//                                         className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 cursor-pointer"
//                                     >
//                                         Accept
//                                     </button>
//                                     <button
//                                         disabled={booking.status === "rejected"}
//                                         onClick={() => handleReject(booking._id)}
//                                         className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 cursor-pointer"
//                                     >
//                                         Reject
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default RequestedBookings;


import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/sheard/loading/Loading';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';

const RequestedBookings = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    // 🔹 Fetch requested bookings for logged-in vendor
    const { data: bookings = [], isLoading, refetch } = useQuery({
        queryKey: ["requestedBookings", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get("/ticket-booked");
            return res.data;
        }
    });

    // Accept booking
    const handleAccept = (id) => {
        Swal.fire({
            title: "Accept Booking?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Accept",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/requested-bookings/${id}/accept`).then(() => {
                    Swal.fire("Booking Accepted", "", "success");
                    refetch();
                });
            }
        });
    }

    // Reject booking
    const handleReject = (id) => {
        Swal.fire({
            title: "Reject Booking?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Reject",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/requested-bookings/${id}/reject`).then(() => {
                    Swal.fire("Booking Rejected", "", "success");
                    refetch();
                });
            }
        });
    }

    if (isLoading) return <Loading />;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Requested Bookings</h2>

            <div className="overflow-x-auto bg-base-100 rounded-lg shadow-md">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-base-300">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name / Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket Title</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="bg-base-200 divide-y divide-gray-200">
                        {bookings.map(booking => (
                            <tr key={booking._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {booking.userName} <br />
                                    <span className="text-gray-400 text-xs">{booking.userEmail}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.title}</td>
                                <td className="px-6 py-4 text-center text-sm text-gray-500">{booking.bookingQty}</td>
                                <td className="px-6 py-4 text-center text-sm font-semibold text-gray-500">${booking.totalPrice}</td>
                                <td className="px-6 py-4 text-center space-x-2">
                                    <button
                                        onClick={() => handleAccept(booking._id)}
                                        className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 cursor-pointer"
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleReject(booking._id)}
                                        className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 cursor-pointer"
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RequestedBookings;
