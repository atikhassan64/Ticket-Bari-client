import { useQuery } from "@tanstack/react-query";
import { FaUserShield, FaStore, FaBan } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });

    const handleMakeAdmin = async (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This user will get full admin access to the system.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#2563eb",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, Make Admin",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/users/admin/${user._id}`);

                if (res.data.modifiedCount > 0) {
                    toast.success(`${user.displayName} is now an Admin`);
                    refetch();

                    Swal.fire({
                        title: "Success!",
                        text: "User has been promoted to Admin.",
                        icon: "success",
                    });
                }
            }
        });
    };

    const handleMakeVendor = async (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This user will be promoted to Vendor and can add tickets.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#16a34a",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, Make Vendor",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/users/vendor/${user._id}`);

                if (res.data.modifiedCount > 0) {
                    toast.success(`${user.displayName} is now a Vendor`);
                    refetch();

                    Swal.fire({
                        title: "Success!",
                        text: "User role has been updated to Vendor.",
                        icon: "success",
                    });
                }
            }
        });
    };

    const handleFraud = async (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This vendor will be marked as fraud and cannot add tickets anymore!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Mark as Fraud",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/users/fraud/${user._id}`);

                if (res.data?.success) {
                    toast.error(`${user.displayName} marked as Fraud`);
                    refetch();

                    Swal.fire({
                        title: "Marked as Fraud!",
                        text: "This vendor is now blocked from adding tickets.",
                        icon: "success",
                    });
                }
            }
        });
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl text-secondary-content font-bold mb-6">Manage Users</h2>

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
                                    <div className="flex gap-2 items-center">
                                        <span className={`badge ${user.role === "admin"
                                            ? "badge-success"
                                            : user.role === "vendor"
                                                ? "badge-info"
                                                : "badge-ghost"
                                            }`}>
                                            {user.role}
                                        </span>

                                        {user.isFraud && (
                                            <span className="badge badge-error">Fraud</span>
                                        )}
                                    </div>
                                </td>

                                <td className="flex flex-wrap gap-2">
                                    {/* Make Admin */}
                                    <button
                                        onClick={() => handleMakeAdmin(user)}
                                        disabled={user.role === "admin" || user.isFraud}
                                        className="btn btn-xs btn-success flex gap-1"
                                    >
                                        <FaUserShield /> Admin
                                    </button>

                                    {/* Make Vendor */}
                                    <button
                                        onClick={() => handleMakeVendor(user)}
                                        disabled={user.role === "vendor" || user.isFraud}
                                        className="btn btn-xs btn-info flex gap-1"
                                    >
                                        <FaStore /> Vendor
                                    </button>

                                    {/* Mark as Fraud (only for vendor) */}
                                    {user.role === "vendor" && (
                                        <button
                                            onClick={() => handleFraud(user)}
                                            disabled={user.isFraud}
                                            className={`btn btn-xs flex gap-1 ${user.isFraud ? "btn-disabled" : "btn-error"
                                                }`}
                                        >
                                            <FaBan /> {user.isFraud ? "Fraud" : "Mark Fraud"}
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