import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
            <div className="bg-base-100 shadow-xl rounded-2xl p-8 max-w-md w-full text-center">

                {/* Icon */}
                <div className="flex justify-center mb-4">
                    <FaTimesCircle className="text-red-500 text-6xl" />
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-red-600 mb-2">
                    Payment Cancelled
                </h2>

                {/* Message */}
                <p className="text-gray-600 mb-6">
                    Your payment was not completed. You can try again anytime before the departure time.
                </p>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                    <Link
                        to="/dashboard/my-booked-tickets"
                        className="btn button w-full"
                    >
                        Go to My Booked Tickets
                    </Link>

                    <Link
                        to="/"
                        className="btn btn-outline w-full"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancelled;