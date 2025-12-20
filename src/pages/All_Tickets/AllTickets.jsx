// import React from 'react';
// import AdminApprovedCard from '../../components/sheard/AdminApprovedCard';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
// import { useQuery } from '@tanstack/react-query';
// import Loading from '../../components/sheard/loading/Loading';

// const AllTickets = () => {
//     const axiosSecure = useAxiosSecure();

//     const { data: tickets = [], isLoading } = useQuery({
//         queryKey: ["tickets"],
//         queryFn: async () => {
//             const res = await axiosSecure.get("/tickets");
//             return res.data;
//         }
//     })


//     if (isLoading) {
//         return <Loading></Loading>
//     }
//     return (
//         <div className='py-12 bg-base-300'>
//             <div className='max-w-[1200px] mx-auto px-4'>
//                 <h2 className="text-3xl font-bold mb-8 text-secondary-content">All Tickets</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {tickets.map(ticket => (
//                         <AdminApprovedCard key={ticket._id} ticket={ticket} />
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AllTickets;

import React, { useState } from 'react';
import AdminApprovedCard from '../../components/sheard/AdminApprovedCard';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/sheard/loading/Loading';

const AllTickets = () => {
    const axiosSecure = useAxiosSecure();

    // UI State
    const [search, setSearch] = useState("");
    const [transport, setTransport] = useState("");
    const [sortPrice, setSortPrice] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const { data: tickets = [], isLoading } = useQuery({
        queryKey: ["tickets"],
        queryFn: async () => {
            const res = await axiosSecure.get("/tickets");
            return res.data;
        }
    });

    if (isLoading) {
        return <Loading />;
    }

    // LOGIC ONLY (NO CARD STRUCTURE CHANGE)

    // Only admin approved
    let filteredTickets = tickets.filter(
        ticket => ticket.adminStatus === "approved"
    );

    // Search (From → To)
    filteredTickets = filteredTickets.filter(ticket =>
        `${ticket.from} ${ticket.to}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    // Filter by transport
    if (transport) {
        filteredTickets = filteredTickets.filter(
            ticket => ticket.transport === transport
        );
    }

    // Sort by price
    if (sortPrice === "low") {
        filteredTickets.sort((a, b) => a.price - b.price);
    }
    if (sortPrice === "high") {
        filteredTickets.sort((a, b) => b.price - a.price);
    }

    // Pagination
    const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedTickets = filteredTickets.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    return (
        <div className='py-12 bg-base-300'>
            <div className='max-w-[1200px] mx-auto px-4'>
                <h2 className="text-3xl font-bold mb-6 text-secondary-content">
                    All Tickets
                </h2>

                {/* 🔹 Search / Filter / Sort */}
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Search From → To"
                        className="input input-bordered w-full md:w-1/3 flex-1"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select
                        className="select select-bordered w-full md:w-1/4 flex-1"
                        value={transport}
                        onChange={(e) => setTransport(e.target.value)}
                    >
                        <option value="">All Transport</option>
                        <option value="Bus">Bus</option>
                        <option value="Train">Train</option>
                        <option value="Plane">Plane</option>
                    </select>

                    <select
                        className="select select-bordered w-full md:w-1/4 flex-1"
                        value={sortPrice}
                        onChange={(e) => setSortPrice(e.target.value)}
                    >
                        <option value="">Sort by Price</option>
                        <option value="low">Low → High</option>
                        <option value="high">High → Low</option>
                    </select>
                </div>

                {/* 🔹 Tickets Grid (UNCHANGED) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedTickets.map(ticket => (
                        <AdminApprovedCard
                            key={ticket._id}
                            ticket={ticket}
                        />
                    ))}
                </div>

                {/* 🔹 Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-8">
                        {[...Array(totalPages).keys()].map(num => (
                            <button
                                key={num}
                                onClick={() => setCurrentPage(num + 1)}
                                className={`btn btn-sm ${currentPage === num + 1
                                    ? " bg-secondary-content"
                                    : "btn-outline"
                                    }`}
                            >
                                {num + 1}
                            </button>
                        ))}
                    </div>
                )}

                {tickets.length === 0 && (
                    <p colSpan="8" className="text-center py-4">
                        No tickets available.
                    </p>
                )}
            </div>
        </div>
    );
};

export default AllTickets;
