import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const TransactionHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ["payments", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`)
            return res.data
        }
    })

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Transaction History</h2>

            <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
                <table className="table table-zebra w-full">
                    <thead className="bg-base-200">
                        <tr>
                            <th>#</th>
                            <th>Transaction ID</th>
                            <th>Ticket Title</th>
                            <th>Amount</th>
                            <th>Payment Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {payments.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center py-6 text-gray-500">
                                    No transactions found
                                </td>
                            </tr>
                        )}

                        {payments.map((payment, index) => (
                            <tr key={payment._id}>
                                <td>{index + 1}</td>

                                <td className="font-mono text-sm">
                                    {payment.transactionId}
                                </td>

                                <td className="font-semibold">
                                    {payment.ticketTitle}
                                </td>

                                <td className="font-bold text-green-600">
                                    ${payment.amount}
                                </td>

                                <td className="text-sm">
                                    {new Date(payment.paidAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric"
                                    })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionHistory;