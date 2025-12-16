import { MdConfirmationNumber } from "react-icons/md";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageTickets = () => {
    const axiosSecure = useAxiosSecure();

    const { data: tickets = [], refetch } = useQuery({
        queryKey: ["tickets"],
        queryFn: async () => {
            const res = await axiosSecure.get("/tickets/admin")
            return res.data
        }
    })


    const handleApprove = async (ticket) => {
        await axiosSecure.patch(`/tickets/approved/${ticket._id}`, {
            adminStatus: "approved",
        });
        refetch();
    };

    const handleReject = async (ticket) => {
        await axiosSecure.patch(`/tickets/rejected/${ticket._id}`, {
            adminStatus: "rejected"
        });
        refetch();
    };


    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                Manage Tickets
            </h2>

            <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
                <table className="table w-full">
                    <thead className="bg-base-200">
                        <tr>
                            <th>#</th>
                            <th>Ticket Title</th>
                            <th>Route</th>
                            <th>Departure</th>
                            <th>Price</th>
                            <th>Vendor</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map((ticket, index) => (
                            <tr key={ticket._id}>
                                <td>{index + 1}</td>
                                <td className="font-semibold">{ticket.title}</td>
                                <td>{ticket.from} → {ticket.to}</td>
                                <td>{ticket.departure}</td>
                                <td>৳ {ticket.price}</td>
                                <td>{ticket.vendorEmail}</td>
                                <td>
                                    <span className={ticket.adminStatus === "approved" 
                                    ? "badge badge-success"
                                    : ticket.adminStatus === "rejected"
                                    ? "badge badge-error"
                                    : "badge badge-warning"}>{ticket.adminStatus}</span>
                                </td>
                                {/* <td className="flex gap-2">
                                    <button
                                    disabled={ticket.status === "approved"}
                                        onClick={() => handleApprove(ticket)}
                                        className="btn btn-xs btn-success flex gap-1">
                                        <FaCheck /> Approve
                                    </button>
                                    <button
                                    disabled={ticket.status==="rejected"}
                                        onClick={() => handleReject(ticket)}
                                        className="btn btn-xs btn-error flex gap-1">
                                        <FaTimes /> Reject
                                    </button>
                                </td> */}
                                <td>
                                    <div className="flex gap-2">
                                        <button
                                            disabled={ticket.adminStatus === "approved"}
                                            onClick={() => handleApprove(ticket)}
                                            className="btn btn-xs btn-success flex gap-1 disabled:opacity-50"
                                        >
                                            <FaCheck /> Approve
                                        </button>

                                        <button
                                            disabled={ticket.adminStatus === "rejected"}
                                            onClick={() => handleReject(ticket)}
                                            className="btn btn-xs btn-error flex gap-1 disabled:opacity-50"
                                        >
                                            <FaTimes /> Reject
                                        </button>
                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageTickets;
