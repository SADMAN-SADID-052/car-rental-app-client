import React from "react";
import { Fade, Zoom } from "react-awesome-reveal";

const WhyChooseUs = () => {
  const features = [
    {
      image:
        "https://cdn-icons-png.freepik.com/256/698/698585.png?ga=GA1.1.94081497.1723952170&semt=ais_hybrid", // Replace with actual image URL
      title: "Wide Variety of Cars",
      description:
        "Choose from budget-friendly to luxury vehicles for every need.",
    },
    {
      image:
        "https://cdn-icons-png.freepik.com/256/9752/9752766.png?ga=GA1.1.94081497.1723952170&semt=ais_hybrid", // Replace with actual image URL
      title: "Affordable Prices",
      description: "Get competitive daily rates you can count on.",
    },
    {
      image:
        "https://cdn-icons-png.freepik.com/256/6556/6556135.png?ga=GA1.1.94081497.1723952170&semt=ais_hybrid", // Replace with actual image URL
      title: "Easy Booking Process",
      description: "Seamlessly book your ride in just a few clicks.",
    },
    {
      image:
        "https://cdn-icons-png.freepik.com/256/13636/13636514.png?ga=GA1.1.94081497.1723952170&semt=ais_hybrid", // Replace with actual image URL
      title: "24/7 Customer Support",
      description: "Always here to assist you with any queries or issues.",
    },
  ];

  return (
    <section className="py-16  mt-6">
      <div className="max-w-6xl mx-auto text-center px-6">
        <Zoom>
          {" "}
          <h2 className="text-3xl font-bold text-[#ADB2D4] mb-4">
            Why Choose Us?
          </h2>
        </Zoom>

        <Zoom>
          <p className="mb-10">
            Carento is a full-fledged car rental management system that allows{" "}
            <br />
            users to browse, book, and manage car rentals seamlessly.
          </p>
        </Zoom>

        <Fade direction="up" delay={100} duration={1000} cascade damping={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-3xl p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105"
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-20 h-20 mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mt-4">{feature.description}</p>
              </div>
            ))}
          </div>
        </Fade>
      </div>
    </section>
  );
};

export default WhyChooseUs;
