import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaSpinner } from "react-icons/fa";

const MyCars = () => {
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCar, setEditingCar] = useState(null);
  const [sortOption, setSortOption] = useState(""); // Tracks the selected sort option
  const navigate = useNavigate();

  useEffect(() => {
    fetchCars();
  }, [user?.email]);

  // Fetch cars from the backend
  const fetchCars = () => {
    setLoading(true);
    fetch(
      `https://carento-ststem.vercel.app/carRental?email=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
        setLoading(false);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while loading your cars.",
        });
        setLoading(false);
      });
  };

  // Handle sorting
  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    setSortOption(sortValue);

    const sortedCars = [...cars]; // Create a copy of the cars array
    if (sortValue === "price_asc") {
      sortedCars.sort((a, b) => a.rentalPrice - b.rentalPrice); // Ascending price
    } else if (sortValue === "price_desc") {
      sortedCars.sort((a, b) => b.rentalPrice - a.rentalPrice); // Descending price
    } else if (sortValue === "date_asc") {
      sortedCars.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); // Oldest first
    } else if (sortValue === "date_desc") {
      sortedCars.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Newest first
    }
    setCars(sortedCars); // Update the cars state with the sorted array
  };

  // Delete a car
  const handleDeleteCar = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This car will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://carento-ststem.vercel.app/carRental/${id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              Swal.fire("Deleted!", "Your car has been deleted.", "success");
              setCars((prev) => prev.filter((car) => car._id !== id));
            } else {
              Swal.fire("Failed!", "Unable to delete the car.", "error");
            }
          })
          .catch(() => {
            Swal.fire(
              "Error!",
              "An error occurred. Please try again.",
              "error"
            );
          });
      }
    });
  };

  // Handle form submission for updates
  const handleUpdateCar = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const updatedCar = Object.fromEntries(formData.entries());

    fetch(
      `https://carento-ststem.vercel.app/carRental/${editingCar._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCar),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire("Updated!", "Car details updated successfully.", "success");
          setCars((prev) =>
            prev.map((car) =>
              car._id === editingCar._id ? { ...car, ...updatedCar } : car
            )
          );
          setEditingCar(null); // Close the modal
        } else {
          Swal.fire("Failed!", "Unable to update the car.", "error");
        }
      })
      .catch(() => {
        Swal.fire("Error!", "An error occurred. Please try again.", "error");
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="animate-spin text-blue-500 text-4xl" />
      </div>
    );
  }

  return (
    <div>
    <div>
    <header className="">
        <Navbar />
      </header>
    </div>
      <div className="max-w-6xl mx-auto">
       <div>
       <main className="bg-gradient-to-r  rounded-2xl p-4 relative mb-10">
          <h1 className="text-3xl font-bold text-center mt-24">My Cars</h1>

          <div className="flex justify-between items-center mt-4">
            <select
              className="select select-bordered"
              value={sortOption}
              onChange={handleSortChange}
            >
              <option value="">Sort by</option>

              <option value="price_asc">Price (Lowest First)</option>
              <option value="price_desc">Price (Highest First)</option>
            </select>

            <button
              className="btn btn-outline"
              onClick={() => navigate("/addCar")}
            >
              <div className="flex gap-2 items-center">
                <img className="w-10" src="https://cdn-icons-png.freepik.com/256/10023/10023591.png?ga=GA1.1.94081497.1723952170&semt=ais_hybrid" alt="" />
                <p className="font-semibold text-sm">Add Car</p>
              </div>
            </button>
          </div>

          {cars.length === 0 ? (
            <div className="text-center mt-6">
              <p className="text-gray-600 text-lg">No cars found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto mt-6">
              <table className="table-auto w-full bg-white rounded-lg shadow-lg overflow-hidden">
                <thead className="font-bold text-lg">
                  <tr className="bg-gray-200 dark:text-black border-b">
                    <th className="px-4 py-3">Car Image</th>
                    <th className="px-4 py-3">Car Model</th>
                    <th className="px-4 py-3">Rental Price</th>
                    <th className="px-4 py-3">Bookings</th>
                    <th className="px-4 py-3">Availability</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cars.map((car) => (
                    <tr
                      key={car._id}
                      className="text-center border-b hover:bg-gray-100 dark:text-[#443627]"
                    >
                      <td className="px-4 py-4">
                        <img
                          className="w-20 h-14 border-2 p-2 rounded-2xl object-cover"
                          src={car.carImage}
                          alt={car.carModel}
                        />
                      </td>
                      <td>{car.carModel}</td>
                      <td>${car.rentalPrice}/day</td>
                      <td>{car.booking}</td>
                      <td>{car.availability}</td>
                      <td>
                        {new Date(car.addedAt).toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </td>
                      <td>
                        <button
                          className="btn btn-outline btn-info hover:bg-slate-400"
                          onClick={() => setEditingCar(car)}
                        >
                          <img className="w-10" src="https://cdn-icons-png.freepik.com/256/5334/5334827.png?ga=GA1.1.94081497.1723952170&semt=ais_hybrid" alt="Delete" />
                        </button>
                        <button
                          className="btn btn-outline  ml-4"
                          onClick={() => handleDeleteCar(car._id)}
                        >
                          <img className="w-10" src="https://cdn-icons-png.freepik.com/256/12319/12319558.png?ga=GA1.1.94081497.1723952170&semt=ais_hybrid" alt="Update" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
       </div>
      </div>

      {/* Update Modal */}
      {/* Update Modal */}
      {editingCar && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Update Car</h3>
            <form onSubmit={handleUpdateCar}>
              <div className="mt-2">
                <label>Car Model</label>
                <input
                  type="text"
                  name="carModel"
                  defaultValue={editingCar.carModel}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mt-2">
                <label>Rental Price</label>
                <input
                  type="number"
                  name="rentalPrice"
                  defaultValue={editingCar.rentalPrice}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mt-2">
                <label>Availability</label>
                <select
                  name="availability"
                  defaultValue={editingCar.availability}
                  className="select select-bordered w-full"
                >
                  <option value="true">Available</option>
                  <option value="false">Unavailable</option>
                </select>
              </div>
              <div className="mt-2">
                <label>Vehicle Registration</label>
                <input
                  type="text"
                  name="registration"
                  defaultValue={editingCar.regNo}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mt-2">
                <label>Features</label>
                <input
                  type="text"
                  name="features"
                  defaultValue={editingCar.features}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mt-2">
                <label>Description</label>
                <textarea
                  name="description"
                  defaultValue={editingCar.description}
                  className="textarea textarea-bordered w-full"
                ></textarea>
              </div>
              <div className="mt-2">
                <label>Image URL</label>
                <input
                  type="url"
                  name="carImage"
                  defaultValue={editingCar.carImage}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mt-2">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  defaultValue={editingCar.location}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => setEditingCar(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MyCars;
