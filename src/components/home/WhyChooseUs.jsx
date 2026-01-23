import React from 'react';

const reasons = [
    { icon: "🚀", title: "Fast Booking", description: "Book your tickets instantly with our platform." },
    { icon: "💳", title: "Secure Payments", description: "Your payment is safe with SSL encryption & Stripe integration." },
    { icon: "🚌", title: "Verified Operators", description: "All bus/train/launch/flight operators are verified and trustworthy." },
    { icon: "📱", title: "Easy Access", description: "Book tickets anytime, anywhere using our responsive platform." },
];

const WhyChooseUs = () => {
    return (
        <div>
            <section className="py-16 lg:py-20 bg-base-100 dark:bg-slate-900">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 lg:mb-16 text-secondary-content dark:text-gray-100">
                        Why Choose Us?
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {reasons.map((reason, index) => (
                            <div
                                key={index}
                                className="group relative p-6 lg:p-8 bg-base-200 dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center border border-transparent hover:border-base-300/30 dark:hover:border-slate-600/40 transform hover:-translate-y-2"
                            >
                                {/* Icon with enhanced styling */}
                                <div className="mb-6 lg:mb-8">
                                    <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto bg-base-300/20 dark:bg-slate-700/30 rounded-2xl flex items-center justify-center mb-2 group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                                        <span className="text-3xl lg:text-4xl filter drop-shadow-sm transition-transform duration-300 group-hover:scale-110">
                                            {reason.icon}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="relative z-10">
                                    <h3 className="text-xl lg:text-2xl font-semibold mb-3 lg:mb-4 text-base-content dark:text-gray-100 transition-colors duration-300">
                                        {reason.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm lg:text-base">
                                        {reason.description}
                                    </p>
                                </div>

                                {/* Hover effect overlay */}
                                <div className="absolute inset-0 bg-base-300/5 dark:bg-slate-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WhyChooseUs;