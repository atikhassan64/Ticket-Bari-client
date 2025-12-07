import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import Marquee from "react-fast-marquee";
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';


const images = [
    {
        img: "https://i.ibb.co.com/MxyYFgQw/locomotive-2810421-640.jpg"
    },
    {
        img: "https://i.ibb.co.com/bggbBz5Q/istockphoto-1154164634-612x612.jpg"
    },
    {
        img: "https://i.ibb.co.com/ymSt6zFJ/Ships-Landing-Prestige-Desktop.jpg"
    },
    {
        img: "https://i.ibb.co.com/fY8rLCQX/flight-1600x900.webp"
    }
];

const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const { createUser, logInWithGoogle } = useAuth();

    const handleRegister = (data) => {
        createUser(data.email, data.password)
            .then(result => {
                console.log(result.user)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleGoogleRegister = () => {
        logInWithGoogle()
            .then(result => {
                console.log(result.user)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div>
            <div className="min-h-screen bg-base-300 flex items-center justify-center px-4 py-10">
                <div className="max-w-[1100px] mx-auto w-full bg-base-100 shadow-xl rounded-2xl grid md:grid-cols-2 gap-6 p-6">

                    {/* Left Side */}
                    <div className="p-6 md:p-10">
                        <h2 className="text-3xl font-bold mb-2">✦ Create Your Account</h2>
                        <p className="text-gray-500 mb-6">
                            Book bus, train, launch & flight tickets instantly.
                        </p>

                        <form onSubmit={handleSubmit(handleRegister)}>
                            <fieldset className="fieldset">

                                {/* Google */}
                                <button
                                    type='button'
                                    onClick={handleGoogleRegister}
                                    className="w-full flex items-center justify-center gap-2 border rounded-lg py-3 hover:bg-base-200 transition cursor-pointer">
                                    <FcGoogle size={22} /> Sign up with Google
                                </button>

                                {/* Divider */}
                                <div className="flex items-center gap-2 my-6">
                                    <div className="h-0.5 bg-gray-300 w-full"></div>
                                    <span className="text-gray-400">OR</span>
                                    <div className="h-0.5 bg-gray-300 w-full"></div>
                                </div>

                                {/* Name */}
                                <label className="text-sm font-medium">Full Name</label>
                                <input
                                    type="text"
                                    {...register("name", { required: true })}
                                    placeholder="Enter your full name"
                                    className="w-full mt-1 mb-4 border rounded-lg px-4 py-2 focus:outline-primary-content"
                                />
                                {
                                    errors.name?.type === "required" && <p className='text-xs text-red-500 -mt-4'>Name is required</p>
                                }

                                {/* Photo URL */}
                                <label className="text-sm font-medium">Photo URL</label>
                                <input
                                    type="text"
                                    {...register("photoURL", { required: true })}
                                    placeholder="Enter your Photo URL"
                                    className="w-full mt-1 mb-4 border rounded-lg px-4 py-2 focus:outline-primary-content"
                                />
                                {
                                    errors.photoURL?.type === "required" && <p className='text-xs text-red-500 -mt-4'>PhotoURL is required</p>
                                }

                                {/* Email */}
                                <label className="text-sm font-medium">Email Address</label>
                                <input
                                    type="email"
                                    {...register("email", { required: true })}
                                    placeholder="Enter your email"
                                    className="w-full mt-1 mb-4 border rounded-lg px-4 py-2 focus:outline-primary-content"
                                />
                                {
                                    errors.email?.type === "required" && <p className='text-xs text-red-500 -mt-4'>Email is required</p>
                                }

                                {/* Password */}
                                <label className="text-sm font-medium">Password</label>
                                <input
                                    type="password"
                                    {...register("password", { required: true, minLength: 6, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/~`]).+$/ })}
                                    placeholder="At least 6 characters"
                                    className="w-full mt-1 mb-4 border rounded-lg px-4 py-2 focus:outline-primary-content"
                                />
                                {
                                    errors.password?.type === "required" && <p className='text-xs text-red-500 -mt-4'>Password is required</p>
                                }
                                {
                                    errors.password?.type === "minLength" && <p className='text-xs text-red-500 -mt-4'>Password must be 6 characters or longer</p>
                                }
                                {
                                    errors.password?.type === "pattern" && <p className='text-xs text-red-500 -mt-4'>Password must include uppercase, lowercase, special character.</p>
                                }

                                {/* Agree */}
                                <label className="flex items-center gap-2 text-sm mt-2 mb-4">
                                    <input
                                        type="checkbox"
                                        {...register("box", { required: true })}
                                    />
                                    I agree to the{" "}
                                    <span className="text-primary-content font-semibold">Terms</span>,{" "}
                                    <span className="text-primary-content font-semibold">Privacy Policy</span>{" "}
                                    and <span className="text-primary-content font-semibold">Fees</span>.
                                </label>

                                {/* Submit Button */}
                                <button className="button btn w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition flex items-center justify-center mb-3">
                                    Create Account →
                                </button>
                            </fieldset>
                        </form>

                        <Link to={`/login`} className="text-sm text-gray-500">
                            Already have an account? <span className="text-primary-content cursor-pointer font-medium">Login</span>
                        </Link>
                    </div>

                    {/* Right Side */}
                    <div className="p-6 md:p-10 flex flex-col items-center justify-center text-center border rounded-xl bg-base-200">

                        <div>
                            <Marquee>
                                {
                                    images.map((img, index) => <div key={index} className='flex mx-2 overflow-hidden'>
                                        <img
                                            src={img.img}
                                            alt="Ticket stats"
                                            className="w-full h-64 max-w-sm rounded-xl shadow-lg mb-6 object-cover hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>)
                                }
                            </Marquee>
                        </div>


                        <h3 className="text-xl font-bold mb-2">
                            Fast & Easy Ticket Booking
                        </h3>
                        <p className="text-gray-500 max-w-sm">
                            Get instant access to bus, train, launch and flight tickets.
                            Track your bookings, compare prices and travel smarter with TicketBari.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;