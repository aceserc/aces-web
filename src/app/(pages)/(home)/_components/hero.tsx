"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FloatingHeroIcons } from "./floating-hero-icons";
import { H1, Paragraph } from "@/components/ui/typography";

const Hero = () => {
  return (
    <>
      <section id="hero" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]" />

        <div className="flex lg:flex-row flex-col text-center lg:text-left items-center gap-10 lg:gap-9 justify-between container mt-10 lg:mt-0">
          <div className="max-w-xl xl:max-w-2xl flex items-center lg:items-start flex-col gap-5 md:gap-7 px-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-muted/60 backdrop-blur-sm">
              <span className="uppercase text-[10px] lg:text-xs tracking-widest text-muted-foreground font-medium font-mono">
                Association of Computer Engineering Students
              </span>
            </div>

            <H1
              style={{ fontFamily: "Bricolage Grotesque" }}
              className="text-4xl xs:text-5xl md:text-6xl xl:text-7xl font-extrabold leading-[1.05] tracking-tight"
            >
              Transform Your Tech Journey with ACES
            </H1>

            <Paragraph className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-md">
              Join the Association of Computer Engineering Students (ACES) and
              embark on a journey that bridges the gap between academic learning
              and professional excellence.
            </Paragraph>

            {/* Stats */}
            <div className="flex items-center w-full max-w-xs">
              {[
                { label: "Members", value: "800+" },
                { label: "Events/Year", value: "30+" },
                { label: "Partners", value: "40+" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className={`flex flex-col flex-1 ${
                    i !== 0 ? "border-l border-border pl-4 ml-4" : ""
                  }`}
                >
                  <span
                    className="text-xl font-bold"
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
            <div className="flex gap-5 mt-3 lg:mt-0">
              <Link href="/about">
                <Button>Find Out More</Button>
              </Link>

              <Button variant="secondary" asChild>
                <Link
                  target="_blank"
                  href="https://www.facebook.com/photo?fbid=1170921231880471&set=a.399023259070276"
                >
                  Register Now
                </Link>
              </Button>
            </div>
          </div>

          {/* Image area */}
          <div className="flex-grow flex items-center justify-end relative p-4 lg:min-h-[472px] mt-10">
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
          className="absolute h-[350px] w-[350px] xl:h-[500px] xl:w-[500px] top-0 right-0 -z-10 opacity-0 sm:opacity-80  dark:opacity-0"
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
