import React from "react";
import whoAreWe from "@/assets/svg/who-are-we.svg";
import Image from "next/image";
import { STATS } from "@/mock-data/home";

const WhoAreWe = () => {
  return (
    <div id="who-are-we">
      <div className="wrapper flex flex-col gap-16">
        <div className="flex flex-row-reverse gap-16">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-destructive text-xs md:text-base font-medium uppercase tracking-widest">
                Who are we?
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl 3xl:text-6xl font-bold max-w-3xl">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Libero?
              </h2>
            </div>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              quam rerum iusto repudiandae quaerat aliquam ea repellendus
              laudantium veniam, quis reprehenderit mollitia natus amet qui, id,
              recusandae fugiat autem quas? Atque ea accusantium at dolorem
              natus, neque vel voluptas. Consequuntur, odio explicabo. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Ipsum tenetur
              maiores magnam dolores. Numquam soluta nulla temporibus vero
              asperiores dolor similique dicta assumenda!
            </p>
            <div className="xl:grid grid-cols-2 md:grid-cols-4 gap-4 grid lg:hidden mt-4">
              {STATS.map((stat, i) => (
                <StatsCard key={i} stat={stat} />
              ))}
            </div>
          </div>
          <div className="hidden lg:flex flex-col gap-9 items-center justify-center">
            <Image
              src={whoAreWe}
              alt=""
              height={600}
              width={600}
              className="object-contain object-center h-72 xl:h-auto"
            />
          </div>
        </div>
        <div className="hidden lg:grid grid-cols-4 gap-4 xl:hidden w-[800px] m-auto">
          {STATS.map((stat, i) => (
            <StatsCard key={i} stat={stat} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhoAreWe;

const StatsCard = ({ stat }: { stat: { value: string; label: string } }) => {
  return (
    <div className="flex flex-col gap-1 bg-background shadow px-5 py-6 rounded-md">
      <span className=" text-2xl xl:text-3xl font-bold text-foreground/70">
        {stat.value}
      </span>
      <span className="text-muted-foreground uppercase tracking-widest">
        {stat.label}
      </span>
    </div>
  );
};
