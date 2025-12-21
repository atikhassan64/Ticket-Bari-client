import React from 'react';

const Loading = () => {
    return (
        <div>
            <div className='min-h-screen flex justify-center items-center'>
                <span className="loading loading-spinner text-primary-content"></span>
            </div>
        </div>
    );
};

export default Loading;