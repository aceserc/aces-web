import { WHAT_WE_DO } from "@/constants/about.constants";
import React from "react";
import card from "@/assets/icons/card.svg";
import Image from "next/image";
const About = () => {
  return (
    <section
      id="about"
      className="wrapper flex flex-col  py-20 md:py-28 xl:py-36 items-center gap-4 justify-center"
    >
      <span className="font-600 text-center text-gray-500 text-xl font-medium">
        About
      </span>
      <h3 className="text-center text-xl sm:text-2xl lg:text-4xl font-bold">
        What we do?
      </h3>
      <p className="text-center text-sm sm:text-base max-w-2xl text-gray-600">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam ratione
        accusantium molestias animi omnis, ab tempore possimus velit a maxime
        eveniet esse tempora aperiam ipsum minus aliquam atque provident enim.
      </p>
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-6 xl:gap-9">
        {WHAT_WE_DO.map((item, i) => (
          <div key={i} className="relative h-full w-full group">
            <div className="flex flex-col items-center bg-white h-full justify-center shadow group-hover:shadow-xl transition-all p-4 rounded-xl z-20">
              <item.icon className="h-9 w-9 text-purple-600 relative z-20" />
              <h4 className="text-xl font-bold mt-4 relative z-20">
                {item.title}
              </h4>
              <p className="text-center text-gray-500 max-w-xs mt-2 text-sm md:text-base relative z-20">
                {item.description}
              </p>
            </div>
            <Image
              src={card}
              alt=""
              className="absolute -bottom-6 -left-10 -z-10 h-20 opacity-0 group-hover:opacity-100 transition-all"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
