import React, { useState } from "react";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  return (
    <div>
      <div
        className="navbar mb-10 text-white dark:bg-gray-900 dark:text-gray-100"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/premium-photo/blue-stapler-navy-blue-background_36682-191240.jpg?ga=GA1.1.94081497.1723952170&semt=ais_authors_boost')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 dark:bg-gray-800 dark:text-gray-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/availableCars">Available Cars</NavLink>
              </li>
              <li>
                <NavLink to="/addCar">Add Car</NavLink>
              </li>
              <li>
                <NavLink to="/myCars">My Cars</NavLink>
              </li>
              <li>
                <NavLink to="/myBookings">My Bookings</NavLink>
              </li>
            </ul>
          </div>

          <div className="flex items-center">
            <img
              className="w-16"
              src="https://cdn-icons-png.freepik.com/256/13533/13533490.png?ga=GA1.1.94081497.1723952170&semt=ais_hybrid"
              alt="car Rental"
            />
            <p className="btn btn-ghost text-2xl font-bold hidden md:block">
              Carento
            </p>
          </div>
        </div>

        {/* Navbar Center (Desktop view) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li className="font-bold">
              <NavLink
                className={({ isActive }) =>
                  `flex items-center btn btn-outline ${
                    isActive ? "bg-[#41644A] text-white" : " text-white"
                  }`
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="font-bold">
              <NavLink
                className={({ isActive }) =>
                  `flex items-center btn btn-outline ml-2 ${
                    isActive ? "bg-[#41644A] text-white" : "text-white"
                  }`
                }
                to="/availableCars"
              >
                Available Cars
              </NavLink>
            </li>
            <li className="font-bold">
              <NavLink
                className={({ isActive }) =>
                  `flex items-center btn btn-outline ml-2 ${
                    isActive ? "bg-[#41644A] text-white" : "text-white"
                  }`
                }
                to="/addCar"
              >
                Add Car
              </NavLink>
            </li>
            <li className="font-bold">
              <NavLink
                className={({ isActive }) =>
                  `flex items-center btn btn-outline ml-2 ${
                    isActive ? "bg-[#41644A] text-white" : "text-white"
                  }`
                }
                to="/myCars"
              >
                My Cars
              </NavLink>
            </li>
            <li className="font-bold">
              <NavLink
                className={({ isActive }) =>
                  `flex items-center btn btn-outline ml-2 ${
                    isActive ? "bg-[#41644A] text-white" : "text-white"
                  }`
                }
                to="/myBookings"
              >
                My Bookings
              </NavLink>
            </li>
          </ul>
        </div>

        {/* User Profile */}
        {user && (
          <div
            className="relative inline-block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              className="w-16 rounded-full border-2 border-[#80AF81] cursor-pointer ml-4"
              src={user?.photoURL}
              alt="User Avatar"
            />
            {isHovered && (
              <div className="absolute top-14 left-1 bg-gray-800 text-white text-xs w-24 p-2 rounded-2xl">
                {user?.displayName || user?.email}
              </div>
            )}
          </div>
        )}

        {/* Navbar End (Login/Logout Button) */}
        <div className="navbar-end">
          {user && user?.email ? (
            <div
              onClick={logOut}
              className="btn btn-success  font-bold text-white  flex items-center"
            >
              <img className="w-10" src="https://cdn-icons-png.freepik.com/256/6650/6650476.png?ga=GA1.1.94081497.1723952170&semt=ais_hybrid" alt="" />
               <p className="text-xl">LogOut</p>
            </div>
          ) : (
            <Link
              to="/auth/login"
              // className="btn btn-accent font-bold text-white"
            >
               <img className="w-20 border-2 p-1 rounded-lg" src="https://cdn-icons-png.freepik.com/256/5800/5800052.png?ga=GA1.1.94081497.1723952170&semt=ais_hybrid" alt="" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
