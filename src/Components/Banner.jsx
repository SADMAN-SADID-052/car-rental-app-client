import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div>

<section
      className="relative w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('https://img.freepik.com/free-vector/internet-things-iot-smart-connection-control-device-network-industry-resident-anywhere-anytime-anybody-any-business-with-internet-it-technology-futuristic-world_1150-61178.jpg?ga=GA1.1.687432857.1714536364&semt=ais_authors_boost')",
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
          className="bg-[#690B22] text-white font-semibold text-xl p-4 rounded-xl bg-opacity-60 hover:bg-[#690b2357]"
        >
          View Available Cars
        </Link>
      </div>
    </section>
            
        </div>
    );
};

export default Banner;