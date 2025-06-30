import React from "react";
import Link from "next/link";
import { MainLayout } from "@/components/layout/main-layout";
import { CONTACT_LINKS } from "@/constants/contact";
import { SectionLayout } from "@/components/layout/section-layout";
import { Image } from "@/components/ui/image";
import { ACHIEVEMENTS, WHAT_WE_DO } from "@/constants/about";
import { CheckCircle2, Hexagon } from "lucide-react";
import { Testimonials } from "@/components/common/testimonails";

const AboutPage = () => {
  return (
    <div className="flex flex-col gap-8 md:gap-12">
      <MainLayout title="About">
        <div className="mt-12 sm:mt-20 flex flex-col gap-12">
          <div className="flex flex-col lg:flex-row gap-12 max-w-6xl m-auto">
            <div className="flex flex-col items-center space-x-2 lg:min-w-[400px]">
              <Image
                src="/logo.png"
                alt="aces"
                width={192}
                height={192}
                quality={100}
                className="h-36 w-36 md:h-48 md:w-48 rounded-full object-contain object-center "
              />
              <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight ">
                ACES
              </h3>
              <div className="text-muted-foreground text-center ">
                Association of Computer <br className="xs:hidden" />
                Engineering Students
              </div>
              <div className="text-muted-foreground text-center ">
                IOE Purwanchal Campus, Dharan
              </div>
              <div className="flex items-center gap-3 pt-6">
                {Object.keys(CONTACT_LINKS).map((key, i) => {
                  const contact = CONTACT_LINKS[key as keyof typeof CONTACT_LINKS];
                  return (
                    <Link
                      href={contact.href}
                      key={contact.type}
                      style={{
                        animationDelay: `${i * 50 + 200}ms`,
                      }}
                    >
                      <Image
                        src={contact.icon}
                        alt={contact.type}
                        width={42}
                        height={42}
                        className="h-8 w-8 lg:w-10 lg:h-10 hover:scale-105 transition-transform bg-transparent"
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="flex-grow opacity-80 text-sm xs:text-base lg:text-lg flex flex-col gap-4 sm:gap-6 ">
              <p>
                ACES, a community of Computer Engineering students established
                in 2070 B.S at IOE Purwanchal Campus, Dharan, is dedicated to
                the all-round development of students. Our mission is to build a
                strong foundation for their careers by providing various
                opportunities for growth and learning.
              </p>
              <p>
                We offer comprehensive training programs for students from the
                1st to the 4th year of their Bachelor&apos;s in Computer
                Engineering. These programs cover a wide range of topics and are
                designed to enhance both technical and soft skills.
              </p>
              <p>
                Additionally, we organize various competitions to encourage
                skill development and knowledge enhancement. Our events, such as
                national-level software hackathons and the annual Techfest,
                provide platforms for students to showcase their talents and
                gain valuable experience.
              </p>
            </div>
          </div>
        </div>
      </MainLayout>
      <hr className="wrapper my-5" />
      <SectionLayout
        title="What we do?"
        headerClassName="delay-500"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {WHAT_WE_DO.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                style={{
                  animationDelay: `${index * 100 + 500}ms`,
                }}
                className="flex flex-col items-center gap-2 sm:gap-4 border border-muted-foreground/30 border-dashed rounded-md px-5 py-3 cursor-pointer hover:border-primary transition-all hover:border-dotted hover:shadow-xl "
              >
                <div className="relative h-20 w-20 flex items-center justify-center">
                  <Hexagon className="h-full w-full text-destructive opacity-10" />
                  <Icon className="h-9 w-9 text-primary z-10 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-muted-foreground text-center text-sm md:text-base">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </SectionLayout>
      <hr className="wrapper my-5" />
      <SectionLayout
        subTitle="Our Achievements"
        title="Your Goal is Our Achievement"
        withImage
        image={"/achievements.jpg"}
        sectionClassName="max-w-6xl"
      >
        <div className="flex flex-col gap-5 xl:gap-8">
          <p className="text-muted-foreground max-w-3xl">{ACHIEVEMENTS.desc}</p>
          <div className="flex flex-col gap-2 max-w-3xl">
            {ACHIEVEMENTS.data.map((item, index) => (
              <div className="grid grid-cols-[20px_1fr] gap-2 items-center" key={index}>
                <CheckCircle2 className="size-5 text-primary" />
                <p className="text-muted-foreground xl:text-lg">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionLayout>
      <Testimonials />
    </div>
  );
};

export default AboutPage;