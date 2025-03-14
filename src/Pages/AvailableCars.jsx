import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);
  const [isGridView, setIsGridView] = useState(true);
  const [sortOption, setSortOption] = useState("dateNewest");

  useEffect(() => {
    fetch("https://car-rental-system-opal-seven.vercel.app/carRental")
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
        setFilteredCars(data);
      })
      .catch((err) => console.error("Error fetching cars:", err));
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = cars.filter((car) => {
      const carModel = car.carModel?.toLowerCase() || "";
      const brand = car.brand?.toLowerCase() || "";
      const location = car.location?.toLowerCase() || "";
      return (
        carModel.includes(term) ||
        brand.includes(term) ||
        location.includes(term)
      );
    });
    setFilteredCars(filtered);
  };

  const handleSort = (e) => {
    const option = e.target.value;
    setSortOption(option);

    const sortedCars = [...filteredCars];
    if (option === "dateNewest") {
      sortedCars.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    } else if (option === "dateOldest") {
      sortedCars.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
    } else if (option === "priceLowest") {
      sortedCars.sort((a, b) => a.rentalPrice - b.rentalPrice);
    } else if (option === "priceHighest") {
      sortedCars.sort((a, b) => b.rentalPrice - a.rentalPrice);
    }
    setFilteredCars(sortedCars);
  };

  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  return (
    <div>
      <header>
        <Navbar />
      </header>
      <div className="max-w-6xl mx-auto">
        <main className="py-10 px-5">
          <h1 className="text-4xl font-bold text-center mb-10">
            Available Cars
          </h1>

          <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-10 gap-4">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search by model, brand, or location..."
              className="input input-bordered w-full sm:max-w-lg"
            />

            <select
              value={sortOption}
              onChange={handleSort}
              className="select select-bordered w-full sm:w-auto"
            >
              <option value="dateNewest">Date Added: Newest First</option>
              <option value="dateOldest">Date Added: Oldest First</option>
              <option value="priceLowest">Price: Lowest First</option>
              <option value="priceHighest">Price: Highest First</option>
            </select>

            <button
              onClick={toggleView}
              className="btn btn-secondary w-full sm:w-auto"
            >
              {isGridView ? "Switch to List View" : "Switch to Grid View"}
            </button>
          </div>

          {filteredCars.length === 0 ? (
            <p className="text-center text-gray-500">
              No cars found matching your search.
            </p>
          ) : isGridView ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <div
                  key={car.id}
                  className="card bg-white shadow-lg rounded-lg overflow-hidden"
                >
                  {/* <img
                    src={car.carImage}
                    alt={car.carModel}
                    className="h-48 w-full object-cover"
                  /> */}

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
                  <div className="p-4  bg-[#F8F3D9]">
                  <h3 className="text-lg font-semibold text-[#626F47]">
                {car.carModel}
              </h3>

                    <p className="text-gray-600 mb-1">
                      Location: {car.location}
                    </p>
                
                    <p className="text-gray-600 mb-3">
                      {/* Availability:{' '} */}
                      <span
                        className={`font-bold ${
                          car.availability === "Available"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {car.availability}
                      </span>
                    </p>
                    <Link
                      to={`/carRental/${car._id}`}
                      className="btn btn-info text-white w-full"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredCars.map((car) => (
                <div
                  key={car.regNo}
                  className="card bg-white shadow-lg flex items-center p-5 space-x-5"
                >
                  <img
                    src={car.carImage}
                    alt={car.carModel}
                    className="h-32 w-48 object-cover rounded-lg"
                  />
                  <div>
                    <h2 className="text-2xl font-semibold mb-2 text-[#626F47]">
                      {car.carModel}
                    </h2>
                    <p className="text-gray-600 mb-1">
                      Brand: {car.brand || "N/A"}
                    </p>
                    <p className="text-gray-600 mb-1">
                      Location: {car.location}
                    </p>
                    <p className="text-gray-600 mb-1">
                      Daily Price: ${car.rentalPrice}
                    </p>
                    <p className="text-gray-600 mb-3">
                      Availability:{" "}
                      <span
                        className={`font-bold ${
                          car.availability === "Available"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {car.availability}
                      </span>
                    </p>
                    <Link
                      to={`/carRental/${car._id}`}
                      className="btn btn-info text-white w-full"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default AvailableCars;
