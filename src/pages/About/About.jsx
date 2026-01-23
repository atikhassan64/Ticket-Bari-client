import React from 'react';

const About = () => {
    return (
        <div className="min-h-screen bg-base-100">
            <div className="max-w-[1200px] mx-auto px-4 py-12">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-secondary-content mb-6">
                        About TicketBari
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Your trusted partner for seamless travel booking across Bangladesh. 
                        We connect you with reliable transportation services for buses, trains, launches, and flights.
                    </p>
                </div>

                {/* Mission & Vision */}
                <div className="grid md:grid-cols-2 gap-12 mb-16">
                    <div className="bg-base-200 p-8 rounded-xl">
                        <h2 className="text-2xl font-bold text-secondary-content mb-4">Our Mission</h2>
                        <p className="text-gray-600 leading-relaxed">
                            To revolutionize travel booking in Bangladesh by providing a secure, 
                            user-friendly platform that connects travelers with verified transport operators, 
                            ensuring safe and comfortable journeys for everyone.
                        </p>
                    </div>
                    <div className="bg-base-200 p-8 rounded-xl">
                        <h2 className="text-2xl font-bold text-secondary-content mb-4">Our Vision</h2>
                        <p className="text-gray-600 leading-relaxed">
                            To become Bangladesh's leading digital travel platform, 
                            making transportation booking as simple as a few clicks while 
                            maintaining the highest standards of safety and customer satisfaction.
                        </p>
                    </div>
                </div>

                {/* Features */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-center text-secondary-content mb-12">
                        Why Choose TicketBari?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="text-4xl mb-4">🚀</div>
                            <h3 className="text-xl font-semibold mb-3">Fast Booking</h3>
                            <p className="text-gray-600">
                                Book your tickets instantly with our streamlined booking process
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl mb-4">🔒</div>
                            <h3 className="text-xl font-semibold mb-3">Secure Payments</h3>
                            <p className="text-gray-600">
                                Your payment information is protected with SSL encryption
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl mb-4">✅</div>
                            <h3 className="text-xl font-semibold mb-3">Verified Operators</h3>
                            <p className="text-gray-600">
                                All transport operators are thoroughly verified for your safety
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="bg-secondary-content text-white rounded-xl p-8 text-center">
                    <h2 className="text-3xl font-bold mb-8">Our Impact</h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="text-3xl font-bold">50K+</div>
                            <div className="text-sm opacity-90">Happy Customers</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold">200+</div>
                            <div className="text-sm opacity-90">Transport Partners</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold">100K+</div>
                            <div className="text-sm opacity-90">Tickets Booked</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold">24/7</div>
                            <div className="text-sm opacity-90">Customer Support</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;