import React, { useEffect } from 'react';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import VendorDashboard from './VendorDashboard';


const Dashboard = () => {

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.querySelector("html").setAttribute("data-theme", savedTheme);
    }, []);


    const userRole = "vendor";
    return (
        <div>
            {
                userRole === "admin"
                    ? <AdminDashboard></AdminDashboard>
                    : userRole === "vendor"
                        ? <VendorDashboard></VendorDashboard>
                        : <UserDashboard></UserDashboard>
            }
        </div>
    );
};

export default Dashboard;