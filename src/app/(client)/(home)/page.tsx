import React from "react";
import Hero from "./_components/Hero";
import Sponsors from "./_components/Sponsors";
import WhoAreWe from "./_components/WhoAreWe";

const Home = () => {
  return (
    <div className="flex flex-col gap-24 xl:gap-32">
      <div className="flex flex-col gap-4">
        <Hero />
        <Sponsors />
      </div>
      <WhoAreWe />
    </div>
  );
};

export default Home;
