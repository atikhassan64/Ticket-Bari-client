import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../components/sheard/home/NavBar';
import Footer from '../components/sheard/home/Footer';
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <div className='z-10'>
                <NavBar></NavBar>
            </div>
            <div className='flex-1'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>

            {/* Enhanced Toast Notifications */}
            <Toaster
                position="top-right"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toasterId="default"
                toastOptions={{
                    className: 'backdrop-blur-md',
                    duration: 4000,
                    style: {
                        background: 'rgba(255, 255, 255, 0.9)',
                        color: '#374151',
                        border: '1px solid rgba(229, 231, 235, 0.5)',
                        borderRadius: '12px',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    },
                    success: {
                        duration: 3000,
                        style: {
                            background: 'rgba(34, 197, 94, 0.1)',
                            color: '#15803d',
                            border: '1px solid rgba(34, 197, 94, 0.2)',
                        },
                        iconTheme: {
                            primary: '#22c55e',
                            secondary: '#ffffff',
                        },
                    },
                    error: {
                        style: {
                            background: 'rgba(239, 68, 68, 0.1)',
                            color: '#dc2626',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                        },
                        iconTheme: {
                            primary: '#ef4444',
                            secondary: '#ffffff',
                        },
                    },
                }}
            />
        </div>
    );
};

export default MainLayout;