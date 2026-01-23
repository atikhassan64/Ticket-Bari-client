import React from 'react';

const reviews = [
    {
        id: 1,
        name: "Sarah Johnson",
        location: "Dhaka",
        rating: 5,
        comment: "Amazing service! Booked my bus ticket in just 2 minutes. The payment process was smooth and secure.",
        avatar: "👩‍💼",
        transport: "Bus"
    },
    {
        id: 2,
        name: "Ahmed Rahman",
        location: "Chittagong",
        rating: 5,
        comment: "Best platform for train bookings. Got confirmed seats instantly and the operators were very reliable.",
        avatar: "👨‍💻",
        transport: "Train"
    },
    {
        id: 3,
        name: "Maria Khan",
        location: "Sylhet",
        rating: 4,
        comment: "Great experience with launch booking. The interface is user-friendly and customer support is excellent.",
        avatar: "👩‍🎓",
        transport: "Launch"
    },
    {
        id: 4,
        name: "Rafiq Ahmed",
        location: "Rajshahi",
        rating: 5,
        comment: "Hassle-free flight booking experience. Competitive prices and instant confirmation. Highly recommended!",
        avatar: "👨‍🏫",
        transport: "Flight"
    }
];

const CustomerReviews = () => {
    return (
        <div>
            <section className="py-16 lg:py-20 bg-base-200 dark:bg-slate-800">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 lg:mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary-content dark:text-gray-100 mb-4">
                            What Our Customers Say
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
                            Thousands of travelers trust us for their journey. Here's what they have to say about our service.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {reviews.map((review) => (
                            <div
                                key={review.id}
                                className="group bg-base-100 dark:bg-slate-900 p-6 lg:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-base-300/30 dark:hover:border-slate-600/40 transform hover:-translate-y-1"
                            >
                                {/* Rating Stars */}
                                <div className="flex items-center mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <span
                                            key={i}
                                            className={`text-lg ${
                                                i < review.rating
                                                    ? 'text-yellow-400'
                                                    : 'text-gray-300 dark:text-gray-600'
                                            }`}
                                        >
                                            ⭐
                                        </span>
                                    ))}
                                </div>

                                {/* Review Comment */}
                                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-sm lg:text-base">
                                    "{review.comment}"
                                </p>

                                {/* Customer Info */}
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-base-200 dark:bg-slate-700 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                                        <span className="text-2xl">{review.avatar}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-base-content dark:text-gray-100 text-sm lg:text-base">
                                            {review.name}
                                        </h4>
                                        <p className="text-gray-500 dark:text-gray-400 text-xs lg:text-sm">
                                            {review.location} • {review.transport} Traveler
                                        </p>
                                    </div>
                                </div>

                                {/* Transport Badge */}
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="bg-base-300/20 dark:bg-slate-700/30 text-xs px-2 py-1 rounded-full text-gray-600 dark:text-gray-300">
                                        {review.transport}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <div className="text-center mt-12 lg:mt-16">
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            Join thousands of satisfied customers
                        </p>
                        <button className="bg-base-content dark:bg-gray-100 text-base-100 dark:text-slate-900 px-8 py-3 rounded-xl font-semibold hover:bg-base-content/90 dark:hover:bg-gray-200 transition-colors duration-300 shadow-lg hover:shadow-xl">
                            Book Your Ticket Now
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CustomerReviews;