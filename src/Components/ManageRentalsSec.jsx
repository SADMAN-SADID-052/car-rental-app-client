import React from "react";
import { motion } from "framer-motion";
import { FaMobileAlt, FaCarSide, FaTools } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { BsFuelPump } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { keyframes } from "@emotion/react";
import { Reveal } from "react-awesome-reveal";
import { Fade, Zoom, Bounce } from "react-awesome-reveal";


const ManageRentalsSec = () => {
  const features = [
    { id: 1, icon: <FaMobileAlt className="text-4xl text-red-500" />, title: "Mobile App" },
    { id: 2, icon: <BsFuelPump className="text-4xl text-gray-700" />, title: "Fuel Plans" },
    { id: 3, icon: <FaCarSide className="text-4xl text-gray-700" />, title: "Long Car Rental" },
    { id: 4, icon: <FaTools className="text-4xl text-gray-700" />, title: "One-Way Car Rental" },
    { id: 5, icon: <MdGroups className="text-4xl text-gray-700" />, title: "Meetings and Groups" },
    { id: 6, icon: <AiOutlineUser className="text-4xl text-gray-700" />, title: "Student Car Rental" },
  ];

  const customAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

  return (
    <div className="bg-gray-50 py-12">
    
    <Bounce>

    <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section */}
        <motion.div
          className="grid grid-cols-2 gap-6"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${
                feature.id === 1 ? "bg-red-100 border-red-500" : "bg-white"
              }`}
            >
            <Zoom>

            <div className="flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3
                className={`text-center font-semibold ${
                  feature.id === 1 ? "text-red-500" : "text-gray-700"
                }`}
              >
                {feature.title}
              </h3>
            </Zoom>
            </div>
          ))}
        </motion.div>

        {/* Right Section */}
        <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
         
       


          <Reveal keyframes={customAnimation} duration={1500}>

          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Manage <span className="text-red-500">Rentals</span>
          </h2>
     
         </Reveal>
          <p className="text-gray-600 mb-6">
            That light replenish very all good face brought over. His likeness
            fruitful and female morning life great lesser man. Signs abundantly.
            Life. Their be seed their, without great made every. Multiply that dry
            there, don’t upon winged also, were place our make.
          </p>
          <img
            src="https://img.freepik.com/free-photo/close-up-hand-using-smartphone-with-white-display-screen-sitting-car_23-2148041553.jpg?ga=GA1.1.94081497.1723952170&semt=ais_hybrid"
            alt="Manage Rentals"
            className="rounded-lg shadow-lg"
          />
        </motion.div>
      </div>
    </Bounce>
    </div>
  );
};

export default ManageRentalsSec;