import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../components/sheard/home/NavBar';
import Footer from '../components/sheard/home/Footer';

const MainLayout = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;