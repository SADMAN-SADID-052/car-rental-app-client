import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { AuthContext } from '../Provider/AuthProvider';
import { toast } from 'react-toastify';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import auth from '../Firebase/firebase.login';

const Login = () => {
 

  const {userLogin,setUser} = useContext(AuthContext)
  const location = useLocation();
  // console.log(location)
  const navigate = useNavigate();

  // google log in
  const provider = new GoogleAuthProvider();

  const handleGoogleLogin = () =>{
    
    signInWithPopup(auth,provider)
    .then((result) => {
      navigate(location?.state  ? location.state : "/");
      // console.log(result)

      toast.success("Login Successful!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });


    })
    .catch(error =>{

      // console.log('error',error)
    })
  }
  // login user
  const handleLogin = (e) =>{
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log(email,password)
    
    userLogin(email,password)
    .then(result =>{

      const user = result.user;
      setUser(user);
      navigate(location?.state  ? location.state : "/");
      toast.success("Login Successful!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      
      
    })
    .catch((error)=>{

      toast.error("Email or Password does not match!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      
    })}


    return (
        <div>

           

<div>

          
<div className="contain py-16">
  <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden mt-16 border-2 border-teal-300">
    <h2 className="text-2xl uppercase font-medium mb-3 text-center">Login</h2>
   
    <form onSubmit={handleLogin}>
      <p className="text-red-500"></p>
      <div className="space-y-2">
        <div>
          <label className="text-gray-600 mb-2 block dark:text-white">
            Email address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="block w-full border border-gray-300 px-4 py-3 dark:text-[#BFBBA9] text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-500 dark:placeholder-white"
            placeholder="youremail.@gmail.com"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <div>
          <label  className="text-gray-600 mb-2 block dark:text-white">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              name="password"
              id="password"
              className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-500 placeholder-gray-400"
              placeholder="***********"
              required
            />
            <div className="cursor-pointer absolute inset-y-0 right-0 flex items-center px-8 text-gray-600 border-l border-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="block w-full py-2 text-center text-white bg-teal-500 border border-teal-500 rounded hover:bg-transparent hover:text-teal-500 transition uppercase font-roboto font-medium"
        >
          Login
        </button>

        <div className='text-center mt-6'>
        <button 
        onClick={handleGoogleLogin}
        className='btn btn-outline'>

          <div className='flex items-center gap-3'>
          <img className='w-7' src="https://cdn-icons-png.freepik.com/256/2504/2504914.png?ga=GA1.1.94081497.1723952170&semt=ais_hybrid" alt="" />
            <p className='text-xl font-semibold'>Login With Google</p>
          
          </div>
        </button>
        </div>
        <div className="flex gap-2 pt-5">
          <p className="text-gray-600 text-sm dark:text-teal-200">Don't have an account?</p>
          <Link className=" text-sm underline text-purple-500" to="/auth/register">
            Register here
          </Link>
        </div>
      </div>
    </form>
  </div>
</div>
</div>


        </div>
    );
};

export default Login;