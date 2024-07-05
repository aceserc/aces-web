import React from "react";
import Hero from "./_components/hero";
import Sponsors from "./_components/sponsors";
import { fetchData } from "@/services/fetch";
import { ISponsorSchema } from "@/zod/sponsor.schema";
import API from "@/services";
import UpcomingEvents from "./_components/upcoming-events";
import PopupDialog from "./_components/popup-dialog";
import About from "./_components/about";
import Gallery from "./_components/gallery";
import RecentBlogs from "./_components/recent-blogs";
import Testimonials from "@/components/reusable/testimonials";

const Home = async () => {
  const { sponsors } = await getData();
  return (
    <div className="flex flex-col gap-5 sm:gap-7 md:gap-9 xl:gap-12">
      <section id="hero" className="flex flex-col gap-24 xl:gap-32">
        <div className="flex flex-col gap-4">
          <Hero />
          <Sponsors sponsors={sponsors?.data!} />
        </div>
      </section>
      <About />
      <UpcomingEvents />
      <Gallery />
      <RecentBlogs />
      <Testimonials />
      <PopupDialog />
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
