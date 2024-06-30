import React from "react";
import Image from "next/image";
import MailLayout from "@/components/layouts/main-layout";
import { CONTACT_LINKS } from "@/constants/contacts.constants";
import Link from "next/link";
import SectionLayout from "@/components/layouts/section-layout";
import { ACHIEVEMENTS, WHAT_WE_DO } from "@/constants/about.constants";
import { MdHexagon } from "react-icons/md";
import achievements from "@/assets/images/achievements.jpg";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const AboutPage = () => {
  return (
    <div className="flex flex-col gap-8 md:gap-12">
      <MailLayout title="About">
        <div className="mt-12 sm:mt-20 flex flex-col gap-12">
          <div className="flex flex-col lg:flex-row gap-12 max-w-6xl m-auto">
            <div className="flex flex-col items-center space-x-2 lg:min-w-[400px]">
              <Image
                src="/logo.png"
                alt="aces"
                width={192}
                height={192}
                quality={100}
                className="h-36 w-36 md:h-48 md:w-48 rounded-full object-contain object-center"
              />
              <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">
                ACES
              </h3>
              <div className="text-gray-500 text-center">
                Association of Computer <br className="xs:hidden" />
                Engineering Students
              </div>
              <div className="text-gray-500 text-center">
                IOE Purwanchal Campus, Dharan
              </div>
              <div className="flex items-center gap-3 pt-6">
                {Object.keys(CONTACT_LINKS).map((key) => {
                  // @ts-ignore
                  const contact: (typeof CONTACT_LINKS)[0] = CONTACT_LINKS[key];
                  return (
                    <Link href={contact.href} key={contact.type}>
                      <Image
                        src={contact.icon}
                        alt={contact.type}
                        width={42}
                        height={42}
                        className="h-8 w-8 lg:w-10 lg:h-10"
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="flex-grow opacity-80 text-sm xs:text-base lg:text-lg flex flex-col gap-4 sm:gap-6">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Architecto qui corrupti praesentium magni dolorem, vel ex amet
                saepe voluptates vitae alias dolore repudiandae necessitatibus
                eaque earum velit, aspernatur fugiat dignissimos.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Architecto qui corrupti praesentium magni dolorem, vel ex amet
                saepe voluptates vitae alias dolore repudiandae necessitatibus
                eaque earum velit, aspernatur fugiat dignissimos.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Architecto qui corrupti praesentium magni dolorem, vel ex amet
                saepe voluptates vitae alias dolore repudiandae necessitatibus
                eaque earum velit, aspernatur fugiat dignissimos.
              </p>
            </div>
          </div>
        </div>
      </MailLayout>
      <hr className="wrapper my-5" />
      <SectionLayout title="What we do?">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {WHAT_WE_DO.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center gap-2 sm:gap-4 border border-muted-foreground/30 border-dashed rounded-md px-5 py-3 cursor-pointer hover:border-primary transition-all hover:border-dotted hover:shadow-xl"
              >
                <div className="relative h-20 w-20 flex items-center justify-center">
                  <MdHexagon className="h-full w-full text-red-500 opacity-10" />
                  <Icon className="h-9 w-9 text-primary z-10 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-gray-500 text-center text-sm md:text-base">
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
        image={achievements}
        sectionClassName="max-w-6xl"
      >
        <div className="flex flex-col gap-5 xl:gap-8">
          <p className="text-gray-500 max-w-3xl">{ACHIEVEMENTS.desc}</p>
          <div className="flex flex-col gap-2 max-w-3xl">
            {ACHIEVEMENTS.data.map((item, index) => (
              <div className="flex gap-2" key={index}>
                <IoCheckmarkCircleOutline className="min-w-5 min-h-5 h-6 w-6 text-primary" />
                <p className="text-gray-500 xl:text-lg">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionLayout>
    </div>
  );
};

export default AboutPage;
