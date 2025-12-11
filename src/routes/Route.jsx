import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import LoginPage from "../components/Auth/LoginPage";
import RegisterPage from "../components/Auth/RegisterPage";
import ForgetPassword from "../pages/ForgetPassword/ForgetPassword";
import PrivateRoute from "./PrivateRoute";
import AllTickets from "../pages/All_Tickets/AllTickets";
import Dashboard from "../pages/Dashboard/Dashboard";
import TicketsDetailsPage from "../pages/All_Tickets/TicketsDetailsPage";
import AddTickets from "../pages/VendorDashboard/AddTickets";
import DashboardLayout from "../layouts/DashboardLayout";
import VendorProfile from "../pages/VendorDashboard/VendorProfile";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: "login",
                Component: LoginPage
            },
            {
                path: "register",
                Component: RegisterPage
            },
            {
                path: "forget-password",
                Component: ForgetPassword
            },
            {
                path: "all-tickets",
                element: <PrivateRoute><AllTickets></AllTickets></PrivateRoute>
            },

            {
                path: "ticket-details/:id",
                element: <PrivateRoute><TicketsDetailsPage></TicketsDetailsPage></PrivateRoute>
            }
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: "add-tickets",
                element: <PrivateRoute><AddTickets></AddTickets></PrivateRoute>
            },
            {
                path: "vendor-profile",
                element: <VendorProfile></VendorProfile>
            }
        ]
    }
]);