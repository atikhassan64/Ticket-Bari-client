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

            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toasterId="default"
                toastOptions={{
                    className: '',
                    duration: 2000,
                    removeDelay: 1000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },

                    success: {
                        duration: 3000,
                        iconTheme: {
                            primary: 'green',
                            secondary: 'black',
                        },
                    },
                }}
            />
        </div>
    );
};

export default MainLayout;