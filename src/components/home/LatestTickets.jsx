import React from 'react';
import AdminApprovedCard from '../sheard/AdminApprovedCard';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../sheard/loading/Loading';

const LatestTickets = () => {

    const axiosSecure = useAxiosSecure();

    const { data: tickets = [], isLoading } = useQuery({
        queryKey: ["tickets"],
        queryFn: async () => {
            const res = await axiosSecure.get("/tickets");
            return res.data;
        }
    });

    if (isLoading) {
        return <Loading></Loading>;
    }

    const latestTickets = [...tickets]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 8);

    return (
        <div>
            <section className="py-12 bg-base-100">
                <div className='max-w-[1200px] mx-auto px-4'>
                    <h2 className="text-3xl font-bold mb-8 text-secondary-content">
                        Latest Tickets
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {latestTickets.map(ticket => (
                            <AdminApprovedCard key={ticket._id} ticket={ticket} />
                        ))}
                    </div>
                    {tickets.length === 0 && (
                            <p colSpan="8" className="text-center py-4">
                                No latest tickets available.
                            </p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default LatestTickets;
