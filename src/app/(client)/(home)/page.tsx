import React from "react";
import Hero from "./_components/Hero";
import Sponsors from "./_components/Sponsors";

const Home = () => {
  return (
    <div className="flex flex-col gap-4">
      <Hero />
      <Sponsors />
    </div>
  );
};

export default Home;
