import React from 'react';
import AdminApprovedCard from '../../components/sheard/AdminApprovedCard';

const AllTickets = () => {
    return (
        <div className='py-12 bg-base-300'>
            <div className='max-w-[1200px] mx-auto'>
                <h2 className="text-3xl font-bold mb-4">All Tickets</h2>
                <AdminApprovedCard></AdminApprovedCard>
            </div>
        </div>
    );
};

export default AllTickets;