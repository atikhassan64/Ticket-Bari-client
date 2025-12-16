import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import LoginPage from "../components/Auth/LoginPage";
import RegisterPage from "../components/Auth/RegisterPage";
import ForgetPassword from "../pages/ForgetPassword/ForgetPassword";
import PrivateRoute from "./PrivateRoute";
import AllTickets from "../pages/All_Tickets/AllTickets";
import TicketsDetailsPage from "../pages/All_Tickets/TicketsDetailsPage";
import AddTickets from "../pages/VendorDashboard/AddTickets";
import DashboardLayout from "../layouts/DashboardLayout";
import MyAddedTickets from "../pages/VendorDashboard/MyAddedTickets";
import ProfilePage from "../components/sheard/ProfilePage";
import MyBookedTickets from "../pages/UserDashboard/MyBookedTickets";
import TransactionHistory from "../pages/UserDashboard/TransactionHistory";
import RequestedBookings from "../pages/VendorDashboard/RequestedBookings";
import PaymentSuccess from "../components/payment/PaymentSuccess";
import PaymentCancelled from "../components/payment/PaymentCancelled";
import ManageTickets from "../pages/AdminDashboard/ManageTickets";
import ManageUsers from "../pages/AdminDashboard/ManageUsers";
import AdvertiseTickets from "../pages/AdminDashboard/AdvertiseTickets";

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
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            // User routes
            {
                path: "profile",
                element: <ProfilePage></ProfilePage>
            },
            {
                path: "my-booked-tickets",
                element: <MyBookedTickets></MyBookedTickets>
            },
            {
                path: "transaction-history",
                element: <TransactionHistory></TransactionHistory>
            },
            // vendor
            {
                path: "add-tickets",
                element: <AddTickets />
            },
            {
                path: "my-added-tickets",
                element: <MyAddedTickets />
            },
            {
                path: "requested-bookings",
                element: <RequestedBookings></RequestedBookings>
            },
            {
                path: "payment-success",
                element: <PaymentSuccess></PaymentSuccess>
            },
            {
                path: "payment-cancelled",
                element: <PaymentCancelled></PaymentCancelled>
            },
            // admin
            {
                path: "manage-tickets",
                element: <ManageTickets></ManageTickets>
            },
            {
                path: "manage-users",
                element: <ManageUsers></ManageUsers>
            },
            {
                path: "advertise-tickets",
                element: <AdvertiseTickets></AdvertiseTickets>
            }
        ]
    }
]);