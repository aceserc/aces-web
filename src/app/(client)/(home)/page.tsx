"use server";

import React from "react";
import Hero from "./_components/Hero";
import Sponsors from "./_components/Sponsors";
import WhoAreWe from "./_components/WhoAreWe";
import { fetchData } from "@/services/fetch";
import { ISponsorSchema } from "@/zod/sponsor.schema";
import API from "@/services";

export const getData = async () => {
  const sponsors = await fetchData<ISponsorSchema[]>(
    `${API.sponsor}?isActive=false`
  );
  console.log("sponsors: ", sponsors);
  return {
    sponsors,
  };
};

const Home = async () => {
  const { sponsors } = await getData();
  return (
    <div className="flex flex-col gap-24 xl:gap-32">
      <div className="flex flex-col gap-4">
        <Hero />
        <Sponsors sponsors={sponsors} />
      </div>
      <WhoAreWe />
    </div>
  );
};

export default Home;
