import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FloatingHeroIcons } from "./floating-hero-icons";

const Hero = () => {
  return (
    <>
      <section id="hero" className="relative">
        <div className="flex lg:flex-row flex-col text-center lg:text-left items-center gap-14 lg:gap-9 justify-between container pt-20 lg:pt-9">
          <div className="max-w-lg xl:max-w-xl flex items-center lg:items-start flex-col gap-5 md:gap-7">
            <h3 className="uppercase text-xs lg:text-sm tracking-wider text-warning font-medium">
              Association of computer engineering students🔥
            </h3>
            <h1 className="text-3xl xs:text-4xl md:text-5xl xl:text-7xl font-bold font-body">
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

              <Button variant="secondary" disabled>
                Register Now
              </Button>
            </div>
          </div>
          <div className="flex-grow flex items-center justify-end relative p-4 lg:min-h-[472px] xl:min-h-0 ">
            <Image
              src={"/hero-image.png"}
              alt=""
              height={600}
              width={600}
              className="object-contain object-right z-20 animate-in-from-right delay-200"
              fetchPriority="low"
              priority={false}
            />
            <FloatingHeroIcons />
          </div>
        </div>

        {/* hero blob */}

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
