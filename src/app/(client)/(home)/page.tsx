import React from "react";
import Hero from "./_components/hero";
import Sponsors from "./_components/sponsors";
import WhoAreWe from "./_components/who-are-we";
import { fetchData } from "@/services/fetch";
import { ISponsorSchema } from "@/zod/sponsor.schema";
import API from "@/services";
import UpcomingEvents from "./_components/upcoming-events";

const Home = async () => {
  const { sponsors } = await getData();
  return (
    <div className="flex flex-col gap-24 xl:gap-32">
      <div className="flex flex-col gap-4">
        <Hero />
        <Sponsors sponsors={sponsors?.data!} />
      </div>
      <WhoAreWe />
      <UpcomingEvents />
    </div>
  );
};

const getData = async () => {
  const sponsors = await fetchData<{ data: ISponsorSchema[] }>(
    `${API.sponsor}?isActive=false`
  );

  return {
    sponsors,
  };
};

export default Home;
