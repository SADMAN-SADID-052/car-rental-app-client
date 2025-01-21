import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomeLayout from './LayOuts/HomeLayout';
import MyCars from './Pages/MyCars';
import AddCar from './Pages/AddCar';
import AvailableCars from './Pages/AvailableCars';
import MyBookings from './Pages/MyBookings';
import Login from './Pages/Login';
import Register from './Pages/Register';
import AuthLayout from './LayOuts/AuthLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from './Provider/AuthProvider';
import PrivateRote from './Routes/PrivateRote';

const router = createBrowserRouter([
  {
    path: "/",
    element:<HomeLayout></HomeLayout>
  },

  {
    path:"auth",
    element:<AuthLayout></AuthLayout>,
    children:[
  
      {
        path:"/auth/login",
        element:<Login></Login>,
      },
      {
        path:"/auth/register",
        element: <Register></Register>,
      }
      
    ]
  },
  {

    path:"/availableCars",
    element:<AvailableCars></AvailableCars>
},
{
path:"/myCars",
element:(

  <PrivateRote>
    <MyCars></MyCars>
  </PrivateRote>
)
},

{
  path:"/addCar",
  element:(

    <PrivateRote>
      <AddCar></AddCar>
    </PrivateRote>
  )

},

{

  path:"/myBookings",
  element:(

    <PrivateRote>
      <MyBookings></MyBookings>
    </PrivateRote>
  )
},{


  path:"/auth/login",
  element:<Login></Login>
},{


  path:"/auth/register",
  element:<Register></Register>
}

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />

    <ToastContainer
position="top-center"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"

/>

    </AuthProvider>
  </StrictMode>,
)
