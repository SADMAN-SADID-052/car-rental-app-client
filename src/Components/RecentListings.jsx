import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RecentListings = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentCars = async () => {
      try {
        const response = await axios.get(
          "https://car-rental-system-opal-seven.vercel.app/carRental"
        ); // Updated endpoint
        setCars(response.data);
      } catch (err) {
        console.error("Error fetching recent listings:", err);
        setError("Failed to fetch recent listings. Please try again later.");
      }
    };

    fetchRecentCars();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mt-6 text-[#ADB2D4] mb-4">
        Recent Cars
      </h2>
      <p className="mb-10 text-center">
        Carento is a full-fledged car rental management system that allows{" "}
        <br />
        users to browse, book, and manage car rentals seamlessly.
      </p>
      {!error && cars.length === 0 && (
        <p className="text-gray-500">No recent listings found.</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5  p-4">
        {cars.map((car) => (
          <div
            key={car._id}
            className="bg-white shadow-lg  overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative">
              <img
                className="w-full h-48 object-cover"
                src={car.carImage}
                alt="Car"
              />
              <span className="absolute top-40  bg-blue-500 text-white text-sm font-bold px-3 py-1 ">
                ${car.rentalPrice}/day
              </span>
            </div>
            <div className="p-4 bg-[#F8F3D9]">
              <h3 className="text-lg font-semibold text-[#626F47]">
                {car.carModel}
              </h3>

              <p>Registration Number : {car.regNo}</p>

              <p className="text-sm text-gray-500">
                Date :{" "}
                {new Date(car.addedAt).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
            </div>

            <Link to="/availableCars">
              <button className="text-sm py-2 px-3 rounded-md ml-3 mb-4 mt-4 border-2 border-black bg-[#F8F3D9] text-[#504B38] font-semibold">
                Booking Now
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentListings;
