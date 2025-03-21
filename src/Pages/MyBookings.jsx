import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [booklist, setBooklist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null); // For modals
  const [modifiedDate, setModifiedDate] = useState(null); // Store the updated date

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://carento-ststem.vercel.app/bookinglist?email=${user.email}`
      )
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
        fetch(
          `https://carento-ststem.vercel.app/bookinglist/${id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              setBooklist((prev) =>
                prev.map((item) =>
                  item._id === id ? { ...item, status: "Canceled" } : item
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
    setModifiedDate(booking.addedAt ? new Date(booking.addedAt) : new Date()); // Initialize DatePicker with current booking   {new Date(booking.addedAt).toLocaleString("en-GB")}
  };

  const handleSaveModifiedDate = () => {
    if (!modifiedDate) {
      return Swal.fire("Error", "Please select a valid date.", "error");
    }
    fetch(
      `https://carento-ststem.vercel.app/bookinglist/${selectedBooking._id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: modifiedDate }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBooklist((prev) =>
            prev.map((item) =>
              item._id === id ? { ...item, date: modifiedDate } : item
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

  // Prepare data for the chart
  const chartData = booklist.map((booking) => ({
    name: booking.carModel,
    price: booking.rentalPrice,
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md rounded border border-gray-300">
          <p className="text-gray-700 font-semibold">
            {payload[0].payload.name}
          </p>
          <p className="text-blue-500 font-bold">${payload[0].value} per day</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <header>
        <Navbar />
      </header>

      <div className="max-w-6xl mx-auto">
        <main className="">
          <h1 className="text-3xl font-bold text-center">My Bookings</h1>

          {loading ? (
            <p className="text-center text-gray-500">
              Loading your bookings...
            </p>
          ) : booklist.length > 0 ? (
            <div className="overflow-x-auto mt-20">
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
                      className="dark:text-[#EFF3EA] transition-all"
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

        {/* Recharts Bar Chart */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-center mb-4 text-gray-700">
            🚗 Car Rental Price Chart
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              {/* Background Grid */}
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />

              {/* X and Y Axes */}
              <XAxis dataKey="name" tick={{ fill: "#555", fontSize: 14 }} />
              <YAxis tick={{ fill: "#555", fontSize: 14 }} />

              {/* Custom Tooltip */}
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: "14px" }} />

              {/* Gradient Bar Colors */}
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34D399" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.9} />
                </linearGradient>
              </defs>

              {/* Bars with Animation */}
              <Bar
                dataKey="price"
                fill="url(#colorPrice)"
                name="Daily Rental Price"
                barSize={50}
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MyBookings;
