import React from "react";
import HeroSection from "./HeroSection";
import Services from "./Services";

const Home = () => {
  return (
    <div className="min-h-screen bg-base-200 sand">
      <HeroSection></HeroSection>
      <Services></Services>
    </div>
  );
};

export default Home;
