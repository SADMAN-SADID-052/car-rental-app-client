import React from 'react';

const TopBanner = () => {
    return (
        <div className="bg-gray-100 py-3 px-6 flex justify-between items-center text-sm">
            <span>Welcome to iReca - Rent Anything</span>
            <div className="flex space-x-3">
                <i className="fab fa-facebook-f text-gray-600"></i>
                <i className="fab fa-twitter text-gray-600"></i>
                <i className="fab fa-pinterest text-gray-600"></i>
                <i className="fab fa-google-plus-g text-gray-600"></i>
                <i className="fab fa-youtube text-gray-600"></i>
                <i className="fab fa-dribbble text-gray-600"></i>
            </div>
            <div className="space-x-2">
                <a href="#" className="text-gray-600 hover:text-black">LOGIN</a>
                <span>|</span>
                <a href="#" className="text-gray-600 hover:text-black">REGISTER</a>
            </div>
        </div>
    );
};

export default TopBanner;
