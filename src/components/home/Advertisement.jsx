import React from 'react';
import AdminApprovedCard from '../sheard/AdminApprovedCard';

const Advertisement = () => {
    return (
        <div>
            <section className="py-12 bg-base-200">
                <div className='max-w-[1200px] mx-auto px-4'>
                    <h2 className="text-3xl font-bold mb-8 text-secondary-content">Advertisement Tickets</h2>
                    <AdminApprovedCard></AdminApprovedCard>
                </div>
            </section>
        </div>
    );
};

export default Advertisement;