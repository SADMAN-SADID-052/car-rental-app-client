import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div>

<section
      className="relative w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('https://img.freepik.com/premium-vector/rental-car-service-concept_107173-16794.jpg?ga=GA1.1.94081497.1723952170&semt=ais_hybrid')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center h-full text-center text-white px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 shadow-md">
          Drive Your Dreams Today!
        </h1>
        <p className="text-lg md:text-xl mb-8 shadow-sm">
          Find your perfect ride and embark on an unforgettable journey.
        </p>
        <Link
          to="/availableCars"
          className="btn btn-info text-white font-bold text-xl"
        >
          View Available Cars
        </Link>
      </div>
    </section>
            
        </div>
    );
};

export default Banner;