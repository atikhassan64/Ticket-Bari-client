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
import MyAddedTickets from "../pages/VendorDashboard/MyAddedTickets";
import UserProfile from "../pages/UserDashboard/UserProfile";

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
    // {
    //     path: "dashboard",
    //     element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    //     children: [
    //         // for vendor
    //         {
    //             path: "add-tickets",
    //             element: <PrivateRoute><AddTickets></AddTickets></PrivateRoute>
    //         },
    //         {
    //             path: "vendor-profile",
    //             element: <VendorProfile></VendorProfile>
    //         },
    //         {
    //             path: "my-added-tickets",
    //             element: <MyAddedTickets></MyAddedTickets>
    //         },
    //         // for User 
    //         {
    //             path: "user-profile",
    //             element: <UserProfile></UserProfile>
    //         }
    //     ]
    // }

     {
        path: "dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            // User routes
            {
                path: "user-profile",
                element: <UserProfile />
            },
            // Vendor routes
            {
                path: "vendor-profile",
                element: <VendorProfile />
            },
            {
                path: "add-tickets",
                element: <AddTickets />
            },
            {
                path: "my-added-tickets",
                element: <MyAddedTickets />
            },
        ]
    }
]);