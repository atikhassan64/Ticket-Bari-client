import axios from 'axios';
import React from 'react';

const axiosPublic = axios.create({
    baseURL: "https://ticketbari-tau.vercel.app"
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;