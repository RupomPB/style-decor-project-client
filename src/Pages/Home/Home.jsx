import React from "react";
import HeroSection from "./HeroSection";
import Services from "./Services";
import TopDecoratorsSection from "./TopDecoratorsSection";
import ServiceMap from "./Coverage";

const Home = () => {
  return (
    <div className="min-h-screen bg-base-200 sand">
      <HeroSection></HeroSection>
      <Services></Services>
      <TopDecoratorsSection></TopDecoratorsSection>
      <ServiceMap></ServiceMap>
    </div>
  );
};

export default Home;
