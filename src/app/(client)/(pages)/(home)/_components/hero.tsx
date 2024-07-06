import React from "react";
import heroImage from "@/assets/images/hero-image.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import heroBlob from "@/assets/svg/hero-blob.svg";
import heroShade from "@/assets/svg/hero-shade.svg";
import FloatingHeroIcons from "./floating-hero-icons";
import Link from "next/link";

const Hero = () => {
  return (
    <>
      <section id="hero" className="relative">
        <div className="flex lg:flex-row flex-col text-center lg:text-left items-center gap-14 lg:gap-9 justify-between wrapper pt-20 lg:pt-9">
          <div className="max-w-lg xl:max-w-xl flex items-center lg:items-start flex-col gap-5 md:gap-7">
            <h3 className="uppercase text-xs lg:text-sm tracking-wider text-[#DF6951] font-medium">
              Association of computer engineering students🔥
            </h3>
            <h1 className="text-3xl xs:text-4xl md:text-5xl xl:text-7xl font-bold">
              Transform Your Tech Journey with ACES
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Join the Association of Computer Engineering Students (ACES) and
              embark on a journey that bridges the gap between academic learning
              and professional excellence.
            </p>
            <div className="flex gap-5 mt-3 lg:mt-0">
              <Link href="/about">
                <Button>Find Out More</Button>
              </Link>
              <Button
                variant="secondary"
                className="hover:shadow-[20px_20px_60px_#d9d9d9,-20px_-20px_60px_#ffffff] transition-colors"
              >
                Register Now
              </Button>
            </div>
          </div>
          <div className="flex-grow flex items-center justify-end relative p-4 lg:min-h-[472px] xl:min-h-0">
            <Image
              src={heroImage}
              alt=""
              height={600}
              quality={100}
              width={600}
              className="object-contain object-right z-20"
            />
            <FloatingHeroIcons />
          </div>
        </div>

        {/* hero blob */}

        <Image
          src={heroBlob}
          quality={100}
          height={400}
          width={400}
          alt=""
          className="absolute h-[350px] w-[350px] xl:h-[500px] xl:w-[500px] top-0 right-0 -z-10 opacity-80"
        />
      </section>
      <Image
        src={heroShade}
        quality={100}
        height={400}
        width={400}
        alt=""
        className="absolute top-0 left-0 -z-10"
      />
    </>
  );
};

export default Hero;
