import { Testimonials } from "@/components/common/testimonails";
import { About } from "./_components/about";
import { Hero } from "./_components/hero";
import { Sponsors } from "./_components/sponsors";

const Home = () => {
  return (
    <main className="flex flex-col">
      <section id="hero" className="flex flex-col gap-10 xl:gap-14">
        <Hero />
        <Sponsors />
      </section>

      <div className="flex flex-col lg:px-15 xl:px-20">
        <About />
        <Testimonials />
      </div>
    </main>
  );
};

export default Home;
