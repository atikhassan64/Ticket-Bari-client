import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-base-100 shadow-xl rounded-2xl p-8 max-w-md w-full text-center"
            >
                <h1 className="text-7xl font-extrabold text-error">404</h1>

                <h2 className="text-2xl font-bold mt-4 text-secondary-content">
                    Page Not Found
                </h2>

                <p className="text-gray-500 mt-3">
                    Sorry, the page you are looking for does not exist or the URL is incorrect.
                </p>

                <div className="mt-6">
                    <Link to="/">
                        <button className="btn button px-6">
                            Back to Home
                        </button>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default ErrorPage;