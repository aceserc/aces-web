"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FloatingHeroIcons } from "./floating-hero-icons";
import { H1, Paragraph } from "@/components/ui/typography";
import { useEffect } from "react";

const Hero = () => {
  // useEffect(() => {
  //   const id = "bricolage-font";
  //   if (!document.getElementById(id)) {
  //     const link = document.createElement("link");
  //     link.id = id;
  //     link.rel = "stylesheet";
  //     link.href =
  //       "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200;12..96,800&display=swap";
  //     document.head.appendChild(link);
  //   }
  // }, []);
  return (
    <>
      <section id="hero" className="relative overflow-hidden">
        {/* Subtle grid overlay */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]" />

        <div className="flex lg:flex-row flex-col text-center lg:text-left items-center gap-14 lg:gap-9 justify-between container pt-20 lg:pt-9">
          <div className="max-w-lg xl:max-w-xl flex items-center lg:items-start flex-col gap-6 md:gap-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-muted/60 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-chart-1 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-chart-1" />
              </span>
              <span className="uppercase text-[10px] lg:text-xs tracking-widest text-muted-foreground font-medium font-mono">
                Association of Computer Engineering Students
              </span>
            </div>

            <H1
              style={{ fontFamily: "Bricolage Grotesque" }}
              className="text-4xl xs:text-5xl md:text-6xl xl:text-7xl font-extrabold leading-[1.05] tracking-tight"
            >
              Transform Your{" "}
              <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Tech Journey
              </span>{" "}
              with ACES
            </H1>

            <Paragraph className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-md">
              Join the Association of Computer Engineering Students and embark
              on a journey that bridges the gap between academic learning and
              professional excellence.
            </Paragraph>

            <div className="flex items-center gap-6 py-2  w-full">
              {[
                { label: "Members", value: "800+" },
                { label: "Events/Year", value: "30+" },
                { label: "Partners", value: "40+" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span
                    className="text-xl font-bold text-foreground"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex gap-4 flex-wrap">
              <Link href="/about">
                <Button size="lg" className="group relative overflow-hidden">
                  <span className="relative z-10">Find Out More</span>
                </Button>
              </Link>

              <Button variant="secondary" size="lg" asChild>
                <Link
                  target="_blank"
                  href="https://www.facebook.com/photo?fbid=1170921231880471&set=a.399023259070276"
                >
                  Register Now →
                </Link>
              </Button>
            </div>
          </div>

          {/* Image area */}
          <div className="flex-grow flex items-center justify-end relative p-4 lg:min-h-[472px] xl:min-h-0">
            <Image
              src={"/hero-image.png"}
              alt="ACES Hero"
              height={600}
              width={600}
              className="object-contain object-right z-20 animate-in-from-right delay-200 drop-shadow-2xl"
              fetchPriority="low"
              priority={false}
            />
            <FloatingHeroIcons />
          </div>
        </div>

        {/* Blob decorations */}
        <Image
          src={"/hero-blob.svg"}
          quality={100}
          height={400}
          width={400}
          alt=""
          className="absolute h-[350px] w-[350px] xl:h-[500px] xl:w-[500px] top-0 right-0 -z-10 opacity-80"
          fetchPriority="low"
          priority={false}
        />
      </section>

      <Image
        src={"/hero-shade.svg"}
        quality={100}
        height={400}
        width={400}
        alt=""
        className="absolute top-0 left-0 -z-10"
        fetchPriority="low"
        priority={false}
      />
    </>
  );
};

export { Hero };
