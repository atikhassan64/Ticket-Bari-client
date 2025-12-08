import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import LoginPage from "../components/Auth/LoginPage";
import RegisterPage from "../components/Auth/RegisterPage";
import ForgetPassword from "../pages/ForgetPassword/ForgetPassword";
import PrivateRoute from "./PrivateRoute";
import AllTickets from "../pages/All_Tickets/AllTickets";
import Dashboard from "../pages/Dashboard/Dashboard";

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
                path: "dashboard",
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
            }
        ]
    }
])