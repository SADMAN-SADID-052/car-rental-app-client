import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [booklist, setBooklist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null); // For modals
  const [modifiedDate, setModifiedDate] = useState(null); // Store the updated date

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/bookinglist?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setBooklist(data.data);
          } else {
            Swal.fire({
              icon: "error",
              title: "Failed to Load Booking List",
              text: data.message,
            });
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred while loading the booking list.",
          });
          setLoading(false);
        });
    }
  }, [user]);

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure you want to cancel this booking?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel it!",
      cancelButtonText: "No, Keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/bookinglist/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              setBooklist((prev) =>
                prev.map((item) =>
                  item._id === id
                    ? { ...item, status: "Canceled" }
                    : item
                )
              );
              Swal.fire(
                "Canceled!",
                "Your booking has been canceled.",
                "success"
              );
            } else {
              Swal.fire("Error", data.message, "error");
            }
          })
          .catch((error) => {
            console.error("Error canceling booking:", error);
            Swal.fire("Error", "An error occurred. Please try again.", "error");
          });
      }
    });
  };

  const handleModify = (booking) => {
    setSelectedBooking(booking);
    setModifiedDate(new Date(booking.addedAt)); // Initialize DatePicker with current booking   {new Date(booking.addedAt).toLocaleString("en-GB")}
  };

  const handleSaveModifiedDate = () => {

    if (!modifiedDate) {
      return Swal.fire("Error", "Please select a valid date.", "error");
    }
    fetch(`http://localhost:5000/bookinglist/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: modifiedDate }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBooklist((prev) =>
            prev.map((item) =>
              item._id === id
                ? { ...item, date: modifiedDate }
                : item
            )
          );
          Swal.fire(
            "Updated!",
            "Your booking date has been modified.",
            "success"
          );
          setSelectedBooking(null); // Close modal
        } else {
          Swal.fire("Error", data.message, "error");
        }
      })
      .catch((error) => {
        console.error("Error modifying booking:", error);
        Swal.fire("Error", "An error occurred. Please try again.", "error");
      });
  };

  return (
    <div>
      <div className="max-w-6xl mx-auto">
        <header>
          <Navbar />
        </header>

        <main className="my-10">
          <h1 className="text-3xl font-bold text-center mb-6">My Bookings</h1>

          {loading ? (
            <p className="text-center text-gray-500">
              Loading your bookings...
            </p>
          ) : booklist.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2">
                      Car Image
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Car Model
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Booking Date
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Total Price
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Booking Status
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {booklist.map((booking) => (
                    <tr
                      key={booking._id}
                      className="hover:bg-gray-100 transition-all"
                    >
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <img
                          src={booking.carImage}
                          alt="Car Thumbnail"
                          className="w-16 h-16 object-cover mx-auto"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {booking.carModel}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {new Date(booking.addedAt).toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true, 
                        })}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        ${booking.rentalPrice}
                      </td>
                      <td
                        className={`border border-gray-300 px-4 py-2 text-center ${
                          booking.status === "Confirmed"
                            ? "text-green-600"
                            : booking.status === "Pending"
                            ? "text-yellow-600"
                            : "text-red-600"
                        } font-semibold`}
                      >
                        {booking.status}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
                          onClick={() => handleModify(booking._id)}
                        >
                          Modify Date
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                          onClick={() => handleCancel(booking._id)}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500">No bookings found.</p>
          )}

          {/* Modify Date Modal */}
          {selectedBooking && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-lg font-bold mb-4">Modify Booking Date</h2>
                <DatePicker
                  selected={modifiedDate}
                  onChange={(date) => setModifiedDate(date)}
                  className="w-full border p-2 rounded"
                />
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-gray-300 px-4 py-2 rounded mr-2"
                    onClick={() => setSelectedBooking(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={handleSaveModifiedDate}
                  >
                    Save
                  </button>
                </div>
              </div>
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

export default MyBookings;
