import { WHAT_WE_DO } from "@/constants/about";
import React from "react";
const About = () => {
  return (
    <section
      id="about"
      className="container flex flex-col  py-8 sm:py-12 items-center gap-4 justify-center"
    >
      <span className="text-center text-muted-foreground text-xl font-medium">
        About
      </span>
      <h3 className="text-center text-xl sm:text-2xl lg:text-4xl font-bold">
        What we do?
      </h3>
      <p className="text-center text-sm sm:text-base max-w-2xl text-muted-foreground">
        At ACES, IOE Purwanchal Campus, Dharan, we provide training, organize
        competitions, host podcasts, and conduct an annual Techfest to support
        the development of Computer Engineering students.
      </p>
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-6 xl:gap-9">
        {WHAT_WE_DO.map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center bg-background h-full justify-center shadow group-hover:shadow-xl transition-all p-4 rounded-lg z-20 border border-transparent hover:border-border"
          >
            <item.icon className="h-9 w-9 text-primary relative z-20" />
            <h4 className="text-xl font-bold mt-4 relative z-20">
              {item.title}
            </h4>
            <p className="text-center text-muted-foreground max-w-xs mt-2 text-sm md:text-base relative z-20">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export { About };
