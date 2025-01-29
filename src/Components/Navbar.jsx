import React, { useState } from 'react';
import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  return (
    <div>
      <div className="navbar bg-base-100">
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/availableCars">Available Cars</NavLink></li>
              <li><NavLink to="/addCar">Add Car</NavLink></li>
              <li><NavLink to="/myCars">My Cars</NavLink></li>
              <li><NavLink to="/myBookings">My Bookings</NavLink></li>
            </ul>
          </div>

          <div className="flex items-center">
            <img
              className="w-16"
              src="https://cdn-icons-png.freepik.com/256/13533/13533490.png?ga=GA1.1.94081497.1723952170&semt=ais_hybrid"
              alt="car Rental"
            />
            <p className="btn btn-ghost text-2xl font-bold hidden md:block">Carento</p>
          </div>
        </div>

        {/* Navbar Center (Desktop view) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/availableCars">Available Cars</NavLink></li>
            <li><NavLink to="/addCar">Add Car</NavLink></li>
            <li><NavLink to="/myCars">My Cars</NavLink></li>
            <li><NavLink to="/myBookings">My Bookings</NavLink></li>
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
              className="w-16 rounded-full border-2 border-red-500 cursor-pointer"
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
            <button
              onClick={logOut}
              className="btn btn-error font-bold text-white"
            >
              LogOut
            </button>
          ) : (
            <Link to="/auth/login" className="btn btn-accent font-bold text-white">
              LOGIN
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
