import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const FeaturedCars = () => {
  const [featuredCars, setFeaturedCars] = useState([]);

  useEffect(() => {
    // Simulate fetching featured cars
    const fetchFeaturedCars = async () => {
      const cars = [
        {
          id: 1,
          carModel: "Toyota Corolla",
          carImage:
            "https://img.freepik.com/free-vector/suv-car-concept-illustration_114360-13226.jpg?ga=GA1.1.94081497.1723952170&semt=ais_hybrid",
          rentalPrice: 50,
        },
        {
          id: 2,
          carModel: "Tesla Model 3",
          carImage:
            "https://via.placeholder.com/400x200?text=Tesla+Model+3",
          rentalPrice: 100,
        },
        {
          id: 3,
          carModel: "Ford Mustang",
          carImage:
            "https://via.placeholder.com/400x200?text=Ford+Mustang",
          rentalPrice: 150,
        },
      ];
      setFeaturedCars(cars);
    };

    fetchFeaturedCars();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">
        Featured Cars
      </h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, staggerChildren: 0.2 },
          },
        }}
      >
        {featuredCars.map((car) => (
          <motion.div
            key={car.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            <img
              src={car.carImage}
              alt={car.carModel}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">
                {car.carModel}
              </h3>
              <p className="text-gray-600 text-lg">
                ${car.rentalPrice}/day
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default FeaturedCars;
