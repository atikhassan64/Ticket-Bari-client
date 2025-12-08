import React, { useEffect, useState } from "react";
import { FaFacebook, FaPhone, FaEnvelope } from "react-icons/fa";
import { SiStripe } from "react-icons/si";
import logoWhite from '../../../assets/logo-white.png'
import logo from '../../../assets/logo.png'

const Footer = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        const interval = setInterval(() => {
            const currentTheme = localStorage.getItem("theme");
            if (currentTheme !== theme) {
                setTheme(currentTheme);
            }
        }, 300);

        return () => clearInterval(interval);
    }, [theme]);
    return (
        <footer className="bg-base-200 text-gray-500 pt-12">
            <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

                {/* Column 1 - Logo + Description */}
                <div className="-mt-2">
                    {/* <h2 className="text-2xl font-bold text-white mb-3">TicketBari</h2> */}

                    <div className="-ml-3">
                        {
                            theme === "dark" ?
                                <a href="/" className='w-30'><img src={logoWhite} alt="" /></a>
                                :
                                <a href="/" className='w-30'><img src={logo} alt="" /></a>
                        }
                    </div>

                    <p className="text-gray-400">
                        Book bus, train, launch & flight tickets easily.
                    </p>
                </div>

                {/* Column 2 - Quick Links */}
                <div>
                    <h3 className="text-xl font-semibold text-secondary-content mb-3">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><a href="/" className="hover:text-primary-content">Home</a></li>
                        <li><a href="/tickets" className="hover:text-primary-content">All Tickets</a></li>
                        <li><a href="/contact" className="hover:text-primary-content">Contact Us</a></li>
                        <li><a href="/about" className="hover:text-primary-content">About</a></li>
                    </ul>
                </div>

                {/* Column 3 - Contact Info */}
                <div>
                    <h3 className="text-xl font-semibold text-secondary-content mb-3">Contact Info</h3>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                            <FaEnvelope /> support@ticketbari.com
                        </li>
                        <li className="flex items-center gap-2">
                            <FaPhone /> +880 1234-567890
                        </li>
                        <li className="flex items-center gap-2">
                            <FaFacebook /> facebook.com/ticketbari
                        </li>
                    </ul>
                </div>

                {/* Column 4 - Payment Methods */}
                <div>
                    <h3 className="text-xl font-semibold text-secondary-content mb-3">Payment Methods</h3>
                    <div className="flex items-center gap-3 text-4xl">
                        <SiStripe className="text-blue-400" />
                    </div>
                    <p className="text-gray-400 text-sm mt-2">
                        Secure payments with Stripe
                    </p>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-700 mt-10 py-4 text-center text-gray-500 text-sm">
                © 2025 TicketBari. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
