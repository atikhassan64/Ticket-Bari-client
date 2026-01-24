import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import useAuth from '../../hooks/useAuth';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from 'react-icons/fa';
import Marquee from 'react-fast-marquee';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';

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

const LoginPage = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();
    const { logInUser, logInWithGoogle, setUser } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const emailRef = useRef("");
    const location = useLocation();

    const handleRegister = (data) => {
        logInUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                setUser(user);
                navigate(location?.state || '/');
                reset()
                toast.success("Login Successfully")
            })
            .catch(error => {
                toast.error(error.message);
            })
    }

    const handleGoogleLogIn = () => {
        logInWithGoogle()
            .then(result => {
                const user = result.user;
                toast.success("Login Successfully")
                setUser(user);

                const userInfo = {
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL
                }

                axiosSecure.post("/users", userInfo)
                    .then(res => {
                        console.log("google data is login to database:", res.data)
                        navigate(location?.state || '/');
                    })
            })
            .catch(error => {
                toast.error(error.message)
            })
    }

    const handleForgetPage = () => {
        const email = emailRef.current;
        navigate('/forget-password', { state: { email: email } });
    };

    return (
        <motion.div 
            className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-3 sm:p-4 lg:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <div className="max-w-6xl mx-auto w-full bg-white dark:bg-slate-900 shadow-2xl rounded-2xl sm:rounded-3xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden border border-gray-200 dark:border-gray-700">

                {/* Left Side - Form */}
                <motion.div 
                    className="p-4 sm:p-6 lg:p-8 xl:p-12 order-2 lg:order-1"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="max-w-md mx-auto lg:max-w-none">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                                ✦ Welcome Back
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">
                                Sign in to access your account and book tickets instantly.
                            </p>
                        </motion.div>

                        <form onSubmit={handleSubmit(handleRegister)} className="space-y-4 sm:space-y-6">
                            {/* Google Sign In */}
                            <motion.button
                                type='button'
                                onClick={handleGoogleLogIn}
                                className="w-full flex items-center justify-center gap-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl py-3 sm:py-4 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all duration-200 text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 hover:border-secondary-content"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                <FcGoogle size={20} className="sm:w-6 sm:h-6" />
                                Sign in with Google
                            </motion.button>

                            {/* Divider */}
                            <motion.div 
                                className="flex items-center gap-4 my-6 sm:my-8"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                            >
                                <div className="h-px bg-gray-300 dark:bg-gray-600 flex-1"></div>
                                <span className="text-gray-400 dark:text-gray-500 text-sm font-medium">OR</span>
                                <div className="h-px bg-gray-300 dark:bg-gray-600 flex-1"></div>
                            </motion.div>

                            {/* Email Field */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                <label className="block text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <FaEnvelope className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                                    <input
                                        type="email"
                                        {...register("email", { required: true })}
                                        placeholder="Enter your email address"
                                        onChange={(e) => (emailRef.current = e.target.value)}
                                        className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-slate-800 focus:ring-2 focus:ring-secondary-content/20 focus:border-secondary-content transition-all duration-200 text-sm sm:text-base text-gray-800 dark:text-gray-200 placeholder-gray-400"
                                    />
                                </div>
                                {errors.email?.type === "required" && (
                                    <p className='text-xs sm:text-sm text-red-500 mt-1 flex items-center gap-1'>
                                        <span>⚠</span> Email is required
                                    </p>
                                )}
                            </motion.div>

                            {/* Password Field */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.7 }}
                            >
                                <label className="block text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <FaLock className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        {...register("password", { 
                                            required: true, 
                                            minLength: 6, 
                                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/~`]).+$/ 
                                        })}
                                        placeholder="Enter your password"
                                        className="w-full pl-10 sm:pl-12 pr-12 sm:pr-14 py-3 sm:py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-slate-800 focus:ring-2 focus:ring-secondary-content/20 focus:border-secondary-content transition-all duration-200 text-sm sm:text-base text-gray-800 dark:text-gray-200 placeholder-gray-400"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                    >
                                        {showPassword ? <FaEyeSlash className="w-4 h-4 sm:w-5 sm:h-5" /> : <FaEye className="w-4 h-4 sm:w-5 sm:h-5" />}
                                    </button>
                                </div>
                                {errors.password?.type === "required" && (
                                    <p className='text-xs sm:text-sm text-red-500 mt-1 flex items-center gap-1'>
                                        <span>⚠</span> Password is required
                                    </p>
                                )}
                                {errors.password?.type === "minLength" && (
                                    <p className='text-xs sm:text-sm text-red-500 mt-1 flex items-center gap-1'>
                                        <span>⚠</span> Password must be at least 6 characters
                                    </p>
                                )}
                                {errors.password?.type === "pattern" && (
                                    <p className='text-xs sm:text-sm text-red-500 mt-1 flex items-center gap-1'>
                                        <span>⚠</span> Password must include uppercase, lowercase, and special character
                                    </p>
                                )}
                            </motion.div>

                            {/* Forgot Password */}
                            <motion.div 
                                className="text-right"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                            >
                                <button 
                                    type="button"
                                    onClick={handleForgetPage} 
                                    className="text-sm sm:text-base text-secondary-content hover:text-secondary-content/80 font-medium transition-colors"
                                >
                                    Forgot password?
                                </button>
                            </motion.div>

                            {/* Submit Button */}
                            <motion.button 
                                type="submit"
                                className="w-full bg-gradient-to-r from-secondary-content to-secondary-content/90 text-white py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base hover:from-secondary-content/90 hover:to-secondary-content shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.9 }}
                            >
                                Sign In
                                <span className="text-lg">→</span>
                            </motion.button>
                        </form>

                        {/* Register Link */}
                        <motion.div 
                            className="text-center mt-6 sm:mt-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 1.0 }}
                        >
                            <Link 
                                to={`/register`}
                                state={location?.state}
                                className="text-sm sm:text-base text-gray-500 dark:text-gray-400"
                            >
                                Don't have an account?{" "}
                                <span className="text-secondary-content hover:text-secondary-content/80 font-semibold transition-colors">
                                    Create Account
                                </span>
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Right Side - Visual */}
                <motion.div 
                    className="p-4 sm:p-6 lg:p-8 xl:p-12 flex flex-col items-center justify-center text-center bg-gradient-to-br from-secondary-content/5 to-secondary-content/10 dark:from-secondary-content/10 dark:to-secondary-content/5 order-1 lg:order-2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="w-full max-w-md lg:max-w-none">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <Marquee speed={30} gradient={false} className="mb-6 sm:mb-8">
                                {images.map((img, index) => (
                                    <div key={index} className='mx-2 sm:mx-3'>
                                        <img
                                            src={img.img}
                                            alt="Transportation"
                                            className="w-48 sm:w-64 lg:w-72 h-32 sm:h-40 lg:h-48 rounded-xl sm:rounded-2xl shadow-lg object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                ))}
                            </Marquee>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-gray-800 dark:text-gray-200">
                                Fast & Easy Ticket Booking
                            </h3>
                            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-md mx-auto">
                                Get instant access to bus, train, launch and flight tickets.
                                Track your bookings, compare prices and travel smarter with TicketBari.
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default LoginPage;