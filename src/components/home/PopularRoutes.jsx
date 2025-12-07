import React from 'react';

const popularRoutes = [
    { from: "Dhaka", to: "Chittagong", transport: "Train" },
    { from: "Dhaka", to: "Sylhet", transport: "Bus" },
    { from: "Dhaka", to: "Barishal", transport: "Launch" },
    { from: "Dhaka", to: "Chittagong", transport: "Flight" },
];

const PopularRoutes = () => {
    return (
        <div>
            <section className="py-12 bg-base-200">
                <div className="max-w-[1200px] mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 text-secondary-content">Popular Routes</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {popularRoutes.map((route, index) => (
                            <div
                                key={index}
                                className="p-6 bg-base-100 rounded-xl shadow hover:shadow-lg transition-shadow text-center">
                                <h3 className="text-xl font-semibold mb-2">{route.from} → {route.to}</h3>
                                <p className="text-gray-500">{route.transport}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PopularRoutes;