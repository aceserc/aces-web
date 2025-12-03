import type { Metadata } from "next";
import { Committee } from "./_components/committee";
import { Hero } from "./_components/hero";
import { WhatWeDo } from "./_components/what-we-do";

const AboutPage = () => {
  return (
    <div className="mt-12 sm:mt-20 lg:mt-32">
      <div className="container flex flex-col gap-12 ">
        <Hero />
        <Committee />
        <WhatWeDo />
      </div>
    </div>
  );
};

export default AboutPage;

export const metadata: Metadata = {
  title: "About | ACES",
};
