import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const ForgetPassword = () => {
    const location = useLocation();
    const [email, setEmail] = useState(location.state?.email || "");
    const { forgetPassword } = useAuth();
    const [message, setMessage] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const handleSendMail = (data) => {
        const email = data.email;
        forgetPassword(email)
            .then(() => {
                toast.success("Please check your email for Forget Password");
                reset();
            })
            .catch((error) => {
                if (error.code === "auth/user-not-found") {
                    setMessage("No user found with this email");
                }
                else if (error.code === "auth/invalid-email") {
                    setMessage("Please provide valid email")

                }
                else {
                    toast.error(error.message);
                }
            })

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-300 px-6 py-10">
            <div className="w-full max-w-5xl bg-base-200 shadow-lg rounded-2xl grid md:grid-cols-2 p-10 gap-6">

                {/* LEFT SIDE */}
                <div className="flex flex-col justify-center">
                    <h1 className="text-3xl font-bold mb-2">Forgot Password</h1>
                    <p className="text-gray-500 mb-6">
                        Enter your e-mail address, and we’ll give you reset instruction.
                    </p>

                    <form onSubmit={handleSubmit(handleSendMail)}>
                        <label className="text-sm mb-1 block">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            {...register("email", { required: true })}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter E-mail Address"
                            className="w-full border rounded-lg px-4 py-2 mb-4 focus:outline-primary-content"
                        />

                        {
                            errors.email?.type === "required" && <p className='text-xs text-red-500 -mt-3 mb-2'>Email is required</p>
                        }


                        <button
                            type="submit"
                            className="w-full button btn py-2 rounded-lg transition font-medium"
                        >
                            Send New Password
                        </button>
                        <p className='text-red-500'><small>{message}</small></p>
                    </form>

                    <Link
                        to="/login"
                        className="mt-4 text-sm text-primary-content hover:underline"
                    >
                        ← Back to Login
                    </Link>
                </div>

                {/* RIGHT SIDE DESIGN */}
                <div className="flex items-center justify-center p-6">
                    <div className="w-64 h-64 border-2 border-gray-300 rounded-xl flex items-center justify-center relative">

                        {/* Envelope Icon */}
                        <div className="text-blue-600 text-6xl">✉️</div>

                        {/* Question Mark */}
                        <div className="absolute -top-4 -left-4 text-4xl font-bold">?</div>

                        {/* Paper Plane */}
                        <div className="absolute -bottom-4 -right-4 text-3xl">✈️</div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ForgetPassword;
