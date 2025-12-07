


import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

const slides = [
    {
        title: "Your Journey Begins with Smarter Train Booking",
        description: "Plan your travel effortlessly. Choose your destination, pick your date, and book your train ticket with just a few clicks.",
        img: "https://i.ibb.co.com/MxyYFgQw/locomotive-2810421-640.jpg"
    },
    {
        title: "Book Your Bus Tickets Anytime, Anywhere",
        description: "Experience smooth and convenient bus ticket booking with verified operators, real-time availability, and instant confirmation.",
        img: "https://i.ibb.co.com/bggbBz5Q/istockphoto-1154164634-612x612.jpg"
    },
    {
        title: "Book Launch Tickets for Your River Journey",
        description: "Book launch tickets easily and enjoy a peaceful river journey with verified operators and secure online booking.",
        img: "https://i.ibb.co.com/ymSt6zFJ/Ships-Landing-Prestige-Desktop.jpg"
    },
    {
        title: "Fast & Secure Online Air Ticket Booking",
        description: "Find the best flight deals within seconds. Compare fares, check availability, and confirm your air ticket securely.",
        img: "https://i.ibb.co.com/fY8rLCQX/flight-1600x900.webp"
    }
];

const Hero = () => {
    return (
        <Swiper
            modules={[Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
        >
            {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                    <div className="hero md:min-h-[400px] relative overflow-hidden cursor-pointer">

                        <motion.div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${slide.img})`, filter: 'brightness(45%)' }}
                            initial={{ scale: 1.2, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        ></motion.div>

                        <div className="relative hero-content text-white text-center z-10">
                            <div className="max-w-[1200px] mx-auto">

                                <motion.h1
                                    className="mb-5 text-xl md:text-4xl font-bold w-11/12 mx-auto"
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 1, delay: 0.4 }}
                                >
                                    {slide.title}
                                </motion.h1>

                                <motion.p
                                    className="mb-5 md:text-lg w-9/12 mx-auto"
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 1, delay: 0.7 }}
                                >
                                    {slide.description}
                                </motion.p>

                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Hero;
