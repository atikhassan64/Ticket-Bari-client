import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import Loading from '../../components/sheard/loading/Loading';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const RevenueOverview = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    // 🔹 Fetch bookings
    const { data: bookings = [], isLoading: bookingLoading } = useQuery({
        queryKey: ['revenueBookings', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/ticket-booked');
            return res.data;
        },
        enabled: !!user?.email,
    });

    // 🔹 Fetch tickets added by vendor
    const { data: tickets = [], isLoading: ticketLoading } = useQuery({
        queryKey: ['vendorTickets', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/tickets');
            return res.data;
        },
        enabled: !!user?.email,
    });

    if (bookingLoading || ticketLoading) return <Loading />;

    // 🔹 Only vendor related & accepted bookings
    const acceptedBookings = bookings.filter(
        b => b.vendorEmail === user?.email && b.status === 'accepted'
    );

    // 🔹 Calculations
    const totalRevenue = acceptedBookings.reduce(
        (sum, b) => sum + (b.totalPrice || b.price * b.bookingQty),
        0
    );

    const totalTicketsSold = acceptedBookings.reduce(
        (sum, b) => sum + b.bookingQty,
        0
    );

    const totalTicketsAdded = tickets.filter(
        t => t.vendorEmail === user?.email
    ).length;

    // 🔹 Chart data
    const barData = [
        { name: 'Revenue', value: totalRevenue },
        { name: 'Sold', value: totalTicketsSold },
        { name: 'Added', value: totalTicketsAdded },
    ];

    const pieData = [
        { name: 'Tickets Sold', value: totalTicketsSold },
        { name: 'Tickets Added', value: totalTicketsAdded },
    ];

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Revenue Overview</h2>

            {/* 🔹 Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-base-200 p-6 rounded shadow text-center">
                    <p className="text-gray-500 text-sm">Total Revenue</p>
                    <h3 className="text-2xl font-bold">${totalRevenue}</h3>
                </div>
                <div className="bg-base-200 p-6 rounded shadow text-center">
                    <p className="text-gray-500 text-sm">Total Tickets Sold</p>
                    <h3 className="text-2xl font-bold">{totalTicketsSold}</h3>
                </div>
                <div className="bg-base-200 p-6 rounded shadow text-center">
                    <p className="text-gray-500 text-sm">Total Tickets Added</p>
                    <h3 className="text-2xl font-bold">{totalTicketsAdded}</h3>
                </div>
            </div>

            {/* 🔹 Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Bar Chart */}
                <div className="bg-base-200 p-6 rounded shadow">
                    <h3 className="font-semibold mb-4">Overview Bar Chart</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={barData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart */}
                <div className="bg-base-200 p-6 rounded shadow">
                    <h3 className="font-semibold mb-4">Tickets Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={100}
                                label
                            >
                                {pieData.map((_, index) => (
                                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default RevenueOverview;
