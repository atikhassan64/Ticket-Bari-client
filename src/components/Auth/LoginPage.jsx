import React from 'react';
import { Link } from 'react-router';

const LoginPage = () => {
    return (
        <div>
            This is login page
            <Link to={`/register`}>Register</Link>
        </div>
    );
};

export default LoginPage;