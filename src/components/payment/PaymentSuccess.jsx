import React, { useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { Link, useSearchParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const axiosSecure = useAxiosSecure();

    console.log(sessionId)

    useEffect(() => {
        if(sessionId){
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
            .then(res=>{
                console.log(res.data)
            })
        }
    }, [sessionId, axiosSecure])

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
            <div className="bg-base-100 shadow-xl rounded-2xl p-8 max-w-md w-full text-center">

                {/* Icon */}
                <div className="flex justify-center mb-4">
                    <FaCheckCircle className="text-green-500 text-6xl" />
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-green-600 mb-2">
                    Payment Successful!
                </h2>

                {/* Message */}
                <p className="text-gray-600 mb-6">
                    Thank you for your payment. Your ticket has been successfully booked.
                </p>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                    <Link
                        to="/dashboard/my-booked-tickets"
                        className="btn button w-full"
                    >
                        View My Booked Tickets
                    </Link>

                    <Link
                        to="/"
                        className="btn btn-outline w-full"
                    >
                        Go to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;