import { Metadata } from "next";
import { Hero } from "./_components/hero";
import { Hr } from "@/components/ui/separator";
import { WhatWeDo } from "./_components/what-we-do";
import { Committee } from "./_components/committee";

const AboutPage = () => {
  return (
    <div className="mt-6 sm:mt-20">
      <div className="container flex flex-col gap-12 md:gap-20 lg:gap-32">
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
