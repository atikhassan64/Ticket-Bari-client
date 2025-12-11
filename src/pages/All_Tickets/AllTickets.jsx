import React from 'react';
import AdminApprovedCard from '../../components/sheard/AdminApprovedCard';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/sheard/loading/Loading';

const AllTickets = () => {
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
        <div className='py-12 bg-base-300'>
            <div className='max-w-[1200px] mx-auto'>
                <h2 className="text-3xl font-bold mb-4">All Tickets</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {tickets.map(ticket => (
                            <AdminApprovedCard key={ticket._id} ticket={ticket} />
                        ))}
                    </div>
            </div>
        </div>
    );
};

export default AllTickets;