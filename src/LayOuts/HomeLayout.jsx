import React from 'react';
import Navbar from '../Components/Navbar';
import Banner from '../Components/Banner';
import WhyChooseUs from '../Components/WhyChooseUs';
import RecentListings from '../Components/RecentListings';
import FeaturedCars from '../Components/FeaturedCars';

const HomeLayout = () => {
    return (
        <div>

            <div className='max-w-6xl mx-auto'>
                <header>
                    <Navbar></Navbar>
                </header>

                <main>
                       
                       <section>
                       <Banner></Banner>

                       </section>

                       <section>
                        <WhyChooseUs></WhyChooseUs>
                       </section>

                       <section>
                        <RecentListings></RecentListings>
                       </section>

                       <section>
                        <FeaturedCars></FeaturedCars>
                       </section>
                    

                </main>
            </div>

            <footer>

            </footer>
            
        </div>
    );
};

export default HomeLayout;