import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../components/sheard/home/NavBar';
import Footer from '../components/sheard/home/Footer';

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
        </div>
    );
};

export default MainLayout;