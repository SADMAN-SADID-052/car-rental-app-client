import React, { useContext } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";

const AddCar = () => {
  const { user } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;

    const availability = e.target.availability.value;
    const regNo = e.target.regNo.value;
    const carModel = e.target.carModel.value;
    const carImage = e.target.carImage.value;
    const bookings = e.target.bookings.value;
    const rentalPrice = e.target.rentalPrice.value;
    const features = e.target.features.value;
    const location = e.target.location.value;
    const booking = e.target.booking.value;

    const description = e.target.description.value;

    const newCar = {
      name,
      email,
      availability,
      regNo,
      carModel,
      carImage,
      bookings,
      rentalPrice,
      features,
      description,
      location,
      booking,
    };
    // console.log(newCar)

    // send data to the server

    fetch("https://car-rental-system-opal-seven.vercel.app/carRental", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },

      body: JSON.stringify(newCar),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);

        Swal.fire({
          title: "Success!",
          text: "Review Added Successfully!!",
          icon: "success",
          confirmButtonText: "Cool",
        });
      })
      .catch((err) => {
        console.error("Error submitting car:", err);
      });
  };
  return (
    <div>
      <header>
        <Navbar></Navbar>
      </header>

      <div className="max-w-6xl mx-auto">
        <main>
          <div className="lg:w-3/4 mx-auto">
            <div className="text-center p-10">
              <h1 className="text-5xl font-bold">Add Car</h1>
              <p className="py-6">
                A car rental system is a software that helps manage the process
                of renting cars.
              </p>
            </div>
            <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
              <form onSubmit={handleSubmit} className="card-body">
                {/* User Info Row */}
                <div className="flex flex-col lg:flex-row gap-5">
                  <div className="form-control flex-1">
                    <label className="label">
                      <span className="label-text">User Name</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={user?.displayName}
                      readOnly
                      className="input input-bordered bg-gray-100"
                    />
                  </div>
                  <div className="form-control flex-1">
                    <label className="label">
                      <span className="label-text">User Email</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={user?.email}
                      readOnly
                      className="input input-bordered bg-gray-100"
                    />
                  </div>
                </div>

                {/* Form first row */}
                <div className="flex flex-col lg:flex-row gap-5">
                  <div className="form-control flex-1">
                    <label className="label">
                      <span className="label-text">Car Model</span>
                    </label>
                    <input
                      type="text"
                      name="carModel"
                      placeholder="Enter game title"
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control flex-1">
                    <label className="label">
                      <span className="label-text">Car Image</span>
                    </label>
                    <input
                      type="text"
                      name="carImage"
                      placeholder="Enter image URL"
                      className="input input-bordered"
                      required
                    />
                  </div>
                </div>

                {/* Availablity and reg number */}

                <div className="flex flex-col lg:flex-row gap-5">
                  <div className="form-control flex-1">
                    <label className="label">
                      <span className="label-text">Availability</span>
                    </label>
                    <input
                      type="text"
                      name="availability"
                      className="input input-bordered bg-gray-100"
                    />
                  </div>
                  <div className="form-control flex-1">
                    <label className="label">
                      <span className="label-text">Reg No.</span>
                    </label>
                    <input
                      type="number"
                      name="regNo"
                      className="input input-bordered bg-gray-100"
                    />
                  </div>
                </div>

                {/* Form second row */}
                <div className="flex flex-col lg:flex-row gap-5">
                  <div className="form-control flex-1">
                    <label className="label">
                      <span className="label-text">Number of Bookings</span>
                    </label>
                    <input
                      type="number"
                      name="bookings"
                      placeholder="Number of Bookings"
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control flex-1">
                    <label className="label">
                      <span className="label-text">Daily Rental Price</span>
                    </label>
                    <input
                      type="number"
                      name="rentalPrice"
                      placeholder="Enter Daily Rental Price"
                      className="input input-bordered"
                      required
                    />
                  </div>
                </div>

                {/* New Row */}
                <div className="flex flex-col lg:flex-row gap-5">
                  <div className="form-control flex-1">
                    <label className="label">
                      <span className="label-text">Location</span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      placeholder="Enter Your location"
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control flex-1">
                    <label className="label">
                      <span className="label-text">Booking Count</span>
                    </label>
                    <input
                      type="text"
                      name="booking"
                      placeholder="Booking Count"
                      className="input input-bordered"
                      Value={0}
                    />
                  </div>
                </div>

                {/* Form third row */}
                <div className="flex flex-col lg:flex-row gap-5">
                  <div className="form-control flex-1">
                    <label className="label">
                      <span className="label-text">Car Features</span>
                    </label>
                    <select
                      name="features"
                      className="select select-bordered w-full"
                      required
                    >
                      <option value="">Select a Feature</option>
                      <option value="GPS">GPS</option>
                      <option value="AC">AC</option>
                      <option value="Non AC">Non Ac</option>
                    </select>
                  </div>
                </div>

                {/* Review Description */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <textarea
                    name="description"
                    placeholder="Write your review here"
                    rows="4"
                    className="textarea textarea-bordered"
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="form-control mt-6">
                  <button
                    type="submit"
                    className="btn btn-primary text-2xl font-bold text-white"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>

      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default AddCar;
