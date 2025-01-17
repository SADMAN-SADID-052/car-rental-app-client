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

const router = createBrowserRouter([
  {
    path: "/",
    element:<HomeLayout></HomeLayout>
  },
  {

    path:"/availableCars",
    element:<AvailableCars></AvailableCars>
},
{
path:"/myCars",
element:<MyCars></MyCars>
},

{
  path:"/addCar",
  element:<AddCar></AddCar>

},

{

  path:"/myBookings",
  element:<MyBookings></MyBookings>
}

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>,
)
