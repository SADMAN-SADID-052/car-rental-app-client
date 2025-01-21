import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';
import { AuthContext } from '../Provider/AuthProvider';

const Register = () => {
const { createUser, setUser } = useContext(AuthContext);


  const handleSignUp = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;

    console.log(name, email, password, photo);


    // Password length validation
    if (password.length < 6) {
      toast.error('Password Should be 6 Characters or longer', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      return;
    }

    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{6,}$/;

    if (!passwordRegex.test(password)) {
      toast.error('Password must be one uppercase letter, one lowercase letter, one number, and one special character!!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      return;
    }

    // Firebase Authentication
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);

        toast.success('Registration Successful!', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });

        e.target.reset(); 
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log(errorCode, errorMessage);
      });
  };

  return (
    <div>
      <div className="contain py-16">
        <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
          <h2 className="text-2xl uppercase font-medium mb-1">Register</h2>
          <p className="text-gray-600 mb-6 text-sm">Welcome! So good to have you back!</p>
          <form onSubmit={handleSignUp}>
            <div className="space-y-2">
              <div>
                <label className="text-gray-600 mb-2 block">Name</label>
                <input
                  type="text"
                  name="name"
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-500 placeholder-gray-400"
                  placeholder="Enter your name"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <label className="text-gray-600 mb-2 block">Email address</label>
                <input
                  type="email"
                  name="email"
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-500 placeholder-gray-400"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <label className="text-gray-600 mb-2 block">Photo URL</label>
                <input
                  type="text"
                  name="photo"
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-500 placeholder-gray-400"
                  placeholder="Photo URL"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <label className="text-gray-600 mb-2 block">Password</label>
                <input
                  type="password"
                  name="password"
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-500 placeholder-gray-400"
                  placeholder="***********"
                  required
                />
              </div>
            </div>

         

            <div className="mt-4">
              <button
                type="submit"
                className="block w-full py-2 text-center text-white bg-teal-500 border border-teal-500 rounded hover:bg-transparent hover:text-teal-500 transition uppercase font-roboto font-medium"
              >
                Register
              </button>

             
              <div className="flex gap-2 pt-5">
                <p className="text-gray-600 text-sm">Already have an account?</p>
                <Link to="/auth/login" className="text-gray-600 text-sm underline">
                  Login Here
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
