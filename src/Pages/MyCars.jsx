import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const MyCars = () => {
    return (
        <div>

        <div className='max-w-6xl mx-auto'>
         <header>
             <Navbar></Navbar>
         </header>


        </div>

        <footer>

            <Footer></Footer>

        </footer>
         
     </div>
    );
};

export default MyCars;