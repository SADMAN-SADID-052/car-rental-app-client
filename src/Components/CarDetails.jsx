import React, { useContext } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';

const CarDetails = () => {
    const details = useLoaderData();
    console.log(details)

    const {
        name,
        email,
        availability,
        regNo,
        carModel,
        carImage,
        rentalPrice,
        features,
        description,
        location,
    } = details;

    const {user} = useContext(AuthContext);

    const handleAddToMybookings = () =>{
     

        if (!user) {
            Swal.fire({
              icon: "warning",
              title: "Login Required",
              text: "You need to log in to add to the watchlist.",
            });
            return;
          }

          const bookingslistItem = {
           
        carModel,
        carImage,
        rentalPrice,
        name,
      email,
      addedBy: {
        username: user.displayName,
        email: user.email,

          },
        
    };

    fetch("http://localhost:5000/bookinglist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingslistItem ),
      })


      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire({
            icon: "success",
            title: "Added to BookingList",
            text: ` added to your Bookinglist!`,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed to Add",
            text: "Something went wrong. Please try again later.",
          });
        }
      })
      .catch((error) => {
        // console.log(error)
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred.",
        });
      });
    

}
    return (
       <div>

        <div className='max-w-6xl mx-auto'>
            <header>
                <Navbar></Navbar>
            </header>
        </div>
         <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-4xl font-bold text-center mb-8">Explore <span className=' text-blue-500 font-bold'>{carModel}</span></h1>
            <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Car Image */}
                <div className="flex  items-center p-4">
                    <img
                        src={carImage}
                        alt={carModel}
                        className="rounded-xl border-4 border-indigo-200 border-x-indigo-500"
                    />
                </div>

                {/* Car Details */}
                <div className="lg:w-1/2 p-6 space-y-4">
                    <h2 className="text-2xl font-bold">{carModel}</h2>
                    <p className="text-gray-600">{description}</p>
                    <p className="text-gray-700">
                        <span className="font-semibold">Rental Price:</span> ${rentalPrice} / day
                    </p>
                    <p className="text-gray-700">
                        <span className="font-semibold">Availability:</span>{' '}
                        <span
                            className={`font-bold ${
                                availability === 'Available' ? 'text-green-600' : 'text-red-600'
                            }`}
                        >
                            {availability}
                        </span>
                    </p>
                    <p className="text-gray-700">
                        <span className="font-semibold">Location:</span> {location}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-semibold">Registration No:</span> {regNo}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-semibold">Owner:</span> {name}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-semibold">Owner Email:</span> {email}
                    </p>
                    <div>
                        <h3 className="font-semibold mb-2">Features:{features}</h3>
                        <ul className="list-disc pl-5">
                          
                        </ul>
                    </div>

                    {/* Book Now Button */}
                    <button
                        disabled={availability !== 'Available'}
                        className={`btn w-full ${
                            availability === 'Available' ? 'btn-primary' : 'btn-disabled'
                        }`}
                    >
                        {availability === 'Available' ? <button onClick={handleAddToMybookings}>Book Now</button> : 'Not Available'}
                    </button>
                </div>
            </div>

            {/* Booking History Section */}
            {/* <div className="mt-10">
                <h3 className="text-2xl font-semibold mb-4">Booking History</h3>
                {bookings && bookings.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Booking Date</th>
                                    <th>User</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{booking.date}</td>
                                        <td>{booking.user}</td>
                                        <td
                                            className={`${
                                                booking.status === 'Completed'
                                                    ? 'text-green-600'
                                                    : 'text-yellow-600'
                                            } font-semibold`}
                                        >
                                            {booking.status}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-500">No booking history available for this car.</p>
                )}
            </div> */}
        </div>

        <div>
            <Footer></Footer>
        </div>
       </div>
    );
};

export default CarDetails;
