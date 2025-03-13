import React from "react";
import Navbar from "../Components/Navbar";
import Banner from "../Components/Banner";
import WhyChooseUs from "../Components/WhyChooseUs";
import RecentListings from "../Components/RecentListings";
// import FeaturedCars from '../Components/FeaturedCars';
import ManageRentalsSec from "../Components/ManageRentalsSec";
import SpecialOffers from "../Components/SpecialOffers";
import Footer from "../Components/Footer";
import TopBanner from "../Components/TopBanner";

const HomeLayout = () => {
  return (
    <div>
      <header>
        {/* <TopBanner></TopBanner> */}
        <Navbar></Navbar>
      </header>

      <div className="max-w-6xl mx-auto">
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
            <ManageRentalsSec></ManageRentalsSec>
          </section>

          <section>
            <SpecialOffers></SpecialOffers>
          </section>
        </main>
      </div>

      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default HomeLayout;
