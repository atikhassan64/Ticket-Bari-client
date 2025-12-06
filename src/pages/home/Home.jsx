import React from 'react';
import Hero from '../../components/home/Hero';
import Advertisement from '../../components/home/Advertisement';
import LatestTickets from '../../components/home/LatestTickets';
import PopularRoutes from '../../components/home/PopularRoutes';
import WhyChooseUs from '../../components/home/WhyChooseUs';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <Advertisement></Advertisement>
            <LatestTickets></LatestTickets>
            <PopularRoutes></PopularRoutes>
            <WhyChooseUs></WhyChooseUs>
        </div>
    );
};

export default Home;