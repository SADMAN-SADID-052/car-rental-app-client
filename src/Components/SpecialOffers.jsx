import React from "react";
import { motion } from "framer-motion";
import { FaCarSide } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";

const SpecialOffers = () => {
  const offers = [
    {
      id: 1,
      title: "Get 15% off for weekend rentals!",
      description: "Plan your weekend getaway and save big on car rentals.",
      price: "15% OFF",
      buttonText: "Book Now",
    },
    {
      id: 2,
      title: "Luxury cars at $99/day this holiday season!",
      description: "Experience luxury for less. Offer valid for a limited time.",
      price: "$99/day",
      buttonText: "Learn More",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
    hover: { scale: 1.1, transition: { duration: 0.3 } },
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 py-12 px-4 text-white mt-6 rounded-tr-full rounded-bl-full mb-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">
          Special <span className="text-yellow-300">Offers</span>
        </h2>
        <Fade>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
            {offers.map((offer) => (
              <motion.div
                key={offer.id}
                className="relative bg-white text-gray-800 rounded-lg shadow-xl overflow-hidden p-6 hover:shadow-2xl transition-shadow duration-300"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
              >
                {/* Icon */}
                <div className="absolute -top-8 -right-8 bg-yellow-300 p-4 rounded-full shadow-lg">
                  <FaCarSide size={40} className="text-blue-900" />
                </div>
                {/* Content */}
                <h3 className="text-2xl font-bold mb-4">{offer.title}</h3>
                <p className="text-gray-600 mb-4">{offer.description}</p>
                <div className="text-blue-600 font-extrabold text-lg mb-6">
                  {offer.price}
                </div>
                {/* Button */}
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold shadow-md hover:bg-blue-700 transition">
                  {offer.buttonText}
                </button>
              </motion.div>
            ))}
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default SpecialOffers;
