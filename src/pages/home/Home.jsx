import React from 'react';
import Hero from '../../components/home/Hero';
import Advertisement from '../../components/home/Advertisement';
import LatestTickets from '../../components/home/LatestTickets';
import PopularRoutes from '../../components/home/PopularRoutes';
import WhyChooseUs from '../../components/home/WhyChooseUs';
import CustomerReviews from '../../components/home/CustomerReviews';
import TravelStats from '../../components/home/TravelStats';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <Advertisement></Advertisement>
            <LatestTickets></LatestTickets>
            <PopularRoutes></PopularRoutes>
            <WhyChooseUs></WhyChooseUs>
            <CustomerReviews></CustomerReviews>
            <TravelStats></TravelStats>
        </div>
    );
};

export default Home;