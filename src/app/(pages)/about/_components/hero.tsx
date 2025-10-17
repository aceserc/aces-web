import Link from "next/link";
import Image from "next/image";
import { CONTACT_LINKS } from "@/constants/contact-links";
import { H2, Paragraph } from "@/components/ui/typography";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { titleCase } from "scule";

const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-12 max-w-6xl m-auto items-center border-b pb-2">
      <div className="flex flex-col items-center space-x-2 lg:min-w-[400px]">
        <Image
          src="/logo.png"
          alt="aces"
          width={192}
          height={192}
          quality={100}
          className="h-36 w-36 md:h-48 md:w-48 rounded-full object-contain object-center bg-transparent"
        />
        <H2>ACES</H2>
        <Paragraph className="text-center">
          Association of Computer Engineering Students, <br />
          IOE Purwanchal Campus, Dharan
        </Paragraph>
        <div className="flex items-center gap-3 pt-3">
          {Object.keys(CONTACT_LINKS).map((key, i) => {
            const contact = CONTACT_LINKS[key as keyof typeof CONTACT_LINKS];
            return (
              <Tooltip key={i}>
                <TooltipTrigger asChild>
                  <Link
                    href={contact.href}
                    target="_blank"
                    className="hover:scale-105 transition-transform opacity-80"
                  >
                    <Image
                      src={contact.icon}
                      alt={key}
                      width={30}
                      height={30}
                    />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{titleCase(contact.type)}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
      <div className="flex-grow  flex flex-col gap-2">
        {[
          "ACES, a community of Computer Engineering students established in 2070 B.S at IOE Purwanchal Campus, Dharan, is dedicated to the all-round development of students. Our mission is to build a strong foundation for their careers by providing various opportunities for growth and learning.",
          "We offer comprehensive training programs for students from the 1st to the 4th year of their Bachelor's in Computer Engineering. These programs cover a wide range of topics and are designed to enhance both technical and soft skills.",
          "Additionally, we organize various competitions to encourage skill development and knowledge enhancement. Our events, such as national-level software hackathons and annual Techfest, provide platforms for students to showcase their talents and gain valuable experience.",
        ].map((paragraph, index) => (
          <Paragraph key={index}>{paragraph}</Paragraph>
        ))}
      </div>
    </div>
  );
};

export { Hero };
