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
    })

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <section className="py-12 bg-base-100">
                <div className='max-w-[1200px] mx-auto px-4'>
                    <h2 className="text-3xl font-bold mb-8 text-secondary-content">Latest Tickets</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {tickets.map(ticket => (
                            <AdminApprovedCard key={ticket._id} ticket={ticket} />
                        ))}
                    </div>
                </div>
            </section>
        </div>

    );
};

export default LatestTickets;