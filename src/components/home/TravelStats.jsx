import React from 'react';

const stats = [
    {
        icon: "🎫",
        number: "50,000+",
        label: "Tickets Booked",
        description: "Successfully processed bookings"
    },
    {
        icon: "😊",
        number: "25,000+",
        label: "Happy Customers",
        description: "Satisfied travelers worldwide"
    },
    {
        icon: "🚌",
        number: "500+",
        label: "Verified Operators",
        description: "Trusted transport partners"
    },
    {
        icon: "🏙️",
        number: "100+",
        label: "Cities Connected",
        description: "Routes across the country"
    },
    {
        icon: "⭐",
        number: "4.8/5",
        label: "Customer Rating",
        description: "Based on user reviews"
    },
    {
        icon: "🔒",
        number: "100%",
        label: "Secure Payments",
        description: "SSL encrypted transactions"
    }
];

const TravelStats = () => {
    return (
        <div>
            <section className="py-16 lg:py-20 bg-base-100 dark:bg-slate-900">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 lg:mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary-content dark:text-gray-100 mb-4">
                            Our Journey in Numbers
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
                            These numbers represent our commitment to providing the best travel booking experience for our customers.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="group text-center p-6 lg:p-8 bg-base-200 dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-base-300/30 dark:hover:border-slate-600/40 transform hover:-translate-y-2"
                            >
                                {/* Icon */}
                                <div className="mb-6">
                                    <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto bg-base-300/20 dark:bg-slate-700/30 rounded-2xl flex items-center justify-center group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                                        <span className="text-3xl lg:text-4xl filter drop-shadow-sm transition-transform duration-300 group-hover:scale-110">
                                            {stat.icon}
                                        </span>
                                    </div>
                                </div>

                                {/* Number */}
                                <div className="mb-4">
                                    <h3 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-base-content dark:text-gray-100 mb-2 group-hover:text-base-content dark:group-hover:text-gray-100 transition-colors duration-300">
                                        {stat.number}
                                    </h3>
                                    <h4 className="text-xl lg:text-2xl font-semibold text-base-content dark:text-gray-100 mb-2">
                                        {stat.label}
                                    </h4>
                                </div>

                                {/* Description */}
                                <p className="text-gray-600 dark:text-gray-300 text-sm lg:text-base leading-relaxed">
                                    {stat.description}
                                </p>

                                {/* Hover effect overlay */}
                                <div className="absolute inset-0 bg-base-300/5 dark:bg-slate-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Message */}
                    <div className="text-center mt-12 lg:mt-16">
                        <div className="inline-flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                            <div className="w-8 h-px bg-base-300 dark:bg-slate-600"></div>
                            <span className="text-sm font-medium">Growing every day with your trust</span>
                            <div className="w-8 h-px bg-base-300 dark:bg-slate-600"></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TravelStats;