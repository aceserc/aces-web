import { Testimonials } from "@/components/common/testimonails";
import { About } from "./_components/about";
import { Hero } from "./_components/hero";
import { Sponsors } from "./_components/sponsors";
import { UpcomingEvents } from "./_components/upcoming-events";


const Home = () => {
  return (
    <div className="flex flex-col gap-5 sm:gap-7 md:gap-9 xl:gap-12">
      <section id="hero" className="flex flex-col gap-24 xl:gap-32">
        <div className="flex flex-col gap-4">
          <Hero />
          <Sponsors />
        </div>
      </section>
      <About />
      <UpcomingEvents />
      <Testimonials />
    </div>
  );
};

export default Home;