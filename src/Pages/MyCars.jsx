import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { AuthContext } from '../Provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyCars = () => {

    const {user} = useContext(AuthContext);
    const [cars,setCars] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.email) {
          fetch(`http://localhost:5000/carRental?email=${user.email}`)
            .then((res) => res.json())
            .then((data) => {
              setCars(data);
            })
            .catch((error) => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while loading your Cars',
              });
            });
        }
      }, [user?.email]);


      
  // Delete a review
  const handleDeleteReview = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This review will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/carRental/${id}`, {
          method: 'DELETE',
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              Swal.fire('Deleted!', 'Your Car has been deleted.', 'success');
              setCars((prev) => prev.filter((cars) => cars._id !== id));
            } else {
              Swal.fire('Failed!', 'Unable to delete the  Cars.', 'error');
            }
          })
          .catch((error) => {
            Swal.fire('Error!', 'An error occurred. Please try again.', 'error');
          });
      }
    });
  };

    

    return (
        <div>

        <div className='max-w-6xl mx-auto'>
         <header>
             <Navbar></Navbar>
         </header>

         <main className="mt-6 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-2xl p-4">
          <h1 className="text-3xl font-bold text-center">My Cars</h1>

          {cars.length === 0 ? (
            <p className="text-center mt-6">No reviews found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table-auto w-full mt-6 bg-white rounded-lg shadow-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 text-sm sm:text-base">Car Image</th>
                    <th className="px-4 py-2 text-sm sm:text-base">Car Model</th>
                    <th className="px-4 py-2 text-sm sm:text-base">Daily Rental Price</th>
                    <th className="px-4 py-2 text-sm sm:text-base">bookingCount</th>
                    <th className="px-4 py-2 text-sm sm:text-base">Availability</th>
                    <th className="px-4 py-2 text-sm sm:text-base">Action</th>

                   
                  </tr>
                </thead>
                <tbody>
                  {cars.map((cars) => (
                    <tr key={cars._id} className="text-center border-b">
                      <td className="px-4 py-2 text-sm sm:text-base"><img className='w-16' src={cars.carImage} alt="" /></td>
                      <td className="px-4 py-2 text-sm sm:text-base">{cars.carModel}</td>
                      <td className="px-4 py-2 text-sm sm:text-base">{cars.rentalPrice}</td>
                      <td className="px-4 py-2 text-sm sm:text-base">{cars.booking}</td>
                      <td className="px-4 py-2 text-sm sm:text-base">{cars.availability}</td>
                      <td className="px-4 py-2 flex flex-col sm:flex-row justify-center items-center gap-2">
                        <button
                          className="btn btn-outline btn-info text-sm sm:text-base"
                        //   onClick={() => handleUpdateReview(review._id)}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-outline btn-error text-sm sm:text-base"
                          onClick={() => handleDeleteReview(cars._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>


        </div>

        <footer>

            <Footer></Footer>

        </footer>
         
     </div>
    );
};

export default MyCars;