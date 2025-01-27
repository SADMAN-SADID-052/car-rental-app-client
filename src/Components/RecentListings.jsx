import React, { useEffect, useState } from "react";
import axios from "axios";

const RecentListings = () => {
    const [cars, setCars] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecentCars = async () => {
            try {
                const response = await axios.get("http://localhost:5000/carRental"); // Updated endpoint
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
            <h2 className="text-2xl font-bold mb-6">Recent Listings</h2>
            {error && <p className="text-red-500">{error}</p>}
            {!error && cars.length === 0 && <p className="text-gray-500">No recent listings found.</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map((car) => (
                    <div
                        key={car._id}
                        className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                        <img
                            src={car.carImage}
                            alt={car.carModel}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold">{car.carModel}</h3>
                            <p className="text-gray-600">${car.rentalPrice}/day</p>
                            <p
                                className={`mt-2 text-sm ${
                                    car.availability ? "text-green-500" : "text-red-500"
                                }`}
                            >
                                {car.availability ? "Available" : "Unavailable"}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                Bookings: {car.bookingCount || 0}
                            </p>
                            <p className="text-sm text-gray-500">
                                Added {car.addedAt ? new Date(car.addedAt).toLocaleDateString() : "N/A"}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentListings;
