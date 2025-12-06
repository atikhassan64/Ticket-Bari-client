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
            <section className="py-12 bg-white">
                <div className="max-w-[1200px] mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Why Choose Us?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {reasons.map((reason, index) => (
                            <div key={index} className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition-shadow text-center">
                                <div className="text-4xl mb-3">{reason.icon}</div>
                                <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
                                <p className="text-gray-500">{reason.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WhyChooseUs;