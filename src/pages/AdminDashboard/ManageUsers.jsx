import { useQuery } from "@tanstack/react-query";
import { FaUserShield, FaStore, FaBan } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();

    // 🔹 Load all users
    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });

    // 🔹 Make Admin
    const handleMakeAdmin = async (user) => {
        const res = await axiosSecure.patch(`/users/admin/${user._id}`);
        if (res.data.modifiedCount > 0) {
            toast.success(`${user.name} is now Admin`);
            refetch();
        }
    };

    // 🔹 Make Vendor
    const handleMakeVendor = async (user) => {
        const res = await axiosSecure.patch(`/users/vendor/${user._id}`);
        if (res.data.modifiedCount > 0) {
            toast.success(`${user.name} is now Vendor`);
            refetch();
        }
    };

    // 🔹 Mark Vendor as Fraud
    const handleFraud = async (user) => {
        const res = await axiosSecure.patch(`/users/fraud/${user._id}`);
        if (res.data.modifiedCount > 0) {
            toast.error(`${user.name} marked as Fraud`);
            refetch();
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

            <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
                <table className="table w-full">
                    <thead className="bg-base-200">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td className="font-semibold">{user.displayName}</td>
                                <td>{user.email}</td>
                                <td>
                                    <span className={`badge ${user.role === "admin"
                                            ? "badge-success"
                                            : user.role === "vendor"
                                                ? "badge-info"
                                                : "badge-ghost"
                                        }`}>
                                        {user.role}
                                    </span>
                                </td>

                                <td className="flex flex-wrap gap-2">
                                    {/* Make Admin */}
                                    <button
                                        onClick={() => handleMakeAdmin(user)}
                                        disabled={user.role === "admin"}
                                        className="btn btn-xs btn-success flex gap-1"
                                    >
                                        <FaUserShield /> Admin
                                    </button>

                                    {/* Make Vendor */}
                                    <button
                                        onClick={() => handleMakeVendor(user)}
                                        disabled={user.role === "vendor"}
                                        className="btn btn-xs btn-info flex gap-1"
                                    >
                                        <FaStore /> Vendor
                                    </button>

                                    {/* Mark as Fraud (only for vendor) */}
                                    {user.role === "vendor" && (
                                        <button
                                            onClick={() => handleFraud(user)}
                                            className="btn btn-xs btn-error flex gap-1"
                                        >
                                            <FaBan /> Fraud
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;