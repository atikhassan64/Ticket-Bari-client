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
            className="w-full"
        >
            {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                    <div className="hero min-h-[300px] sm:min-h-[350px] md:min-h-[350px] lg:min-h-[400px] xl:min-h-[450px] relative overflow-hidden cursor-pointer">

                        <motion.div
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                            style={{ backgroundImage: `url(${slide.img})`, filter: 'brightness(45%)' }}
                            initial={{ scale: 1.2, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        ></motion.div>

                        <div className="relative hero-content text-white text-center z-10 px-4 sm:px-6 lg:px-8">
                            <div className="max-w-[1200px] mx-auto w-full">

                                <motion.h1
                                    className="mb-4 sm:mb-5 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold w-11/12 sm:w-10/12 md:w-9/12 mx-auto leading-tight"
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 1, delay: 0.4 }}
                                >
                                    {slide.title}
                                </motion.h1>

                                <motion.p
                                    className="mb-4 sm:mb-5 text-sm sm:text-base md:text-lg lg:text-xl w-10/12 sm:w-9/12 md:w-8/12 lg:w-7/12 mx-auto leading-relaxed"
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
