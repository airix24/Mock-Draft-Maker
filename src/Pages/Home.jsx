import React from "react";
import Footer from "../Components/Footer";
import ContestPromoHome from "../Components/ContestPromoHome";
import AboutHome from "../Components/AboutHome";
import "../Styles/Home.css";

function Home() {
  return <div className="home">
    <ContestPromoHome />
    <AboutHome />
    <Footer />
  </div>;
}

export default Home;
