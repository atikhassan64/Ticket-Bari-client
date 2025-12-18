import React from 'react';
import AdminApprovedCard from '../sheard/AdminApprovedCard';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../sheard/loading/Loading';

const Advertisement = () => {
    const axiosSecure = useAxiosSecure();

    const { data: tickets = [], isLoading } = useQuery({
        queryKey: ["advertisedTickets"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tickets`);
            const advertisedTickets = res.data.filter(ticket => ticket.isAdvertised);
            return advertisedTickets.slice(0, 6);
        }
    });

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div>
            <section className="py-12 bg-base-200">
                <div className='max-w-[1200px] mx-auto px-4'>
                    <h2 className="text-3xl font-bold mb-8 text-secondary-content">Advertisement Tickets</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tickets.length > 0 ? (
                            tickets.map(ticket => (
                                <AdminApprovedCard key={ticket._id} ticket={ticket} />
                            ))
                        ) : (
                            <p className="col-span-3 text-center text-gray-500">
                                No advertised tickets available.
                            </p>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Advertisement;
