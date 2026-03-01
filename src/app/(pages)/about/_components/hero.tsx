import Image from "next/image";
import Link from "next/link";
import { titleCase } from "scule";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { H2, Paragraph } from "@/components/ui/typography";
import { CONTACT_LINKS } from "@/constants/contact-links";

const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-10 xl:gap-16 max-w-6xl mx-auto items-center lg:items-start">
      {/* Left: Identity column */}
      <div className="flex flex-col items-center lg:items-start gap-3 lg:min-w-[220px] xl:min-w-[260px] shrink-0">
        <Image
          src="/logo.png"
          alt="aces"
          width={192}
          height={192}
          quality={100}
          className="h-28 w-28 md:h-36 md:w-36 rounded-full object-contain object-center bg-transparent"
        />
        <div className="flex flex-col items-center lg:items-start gap-1">
          <H2 className="leading-none">ACES</H2>
          <Paragraph className="text-center lg:text-left text-muted-foreground text-sm leading-relaxed">
            Association of Computer Engineering Students, <br />
            IOE Purwanchal Campus, Dharan
          </Paragraph>
        </div>

        <div className="flex items-center justify-center lg:justify-start gap-2 pt-1">
          {Object.keys(CONTACT_LINKS).map((key, i) => {
            const contact = CONTACT_LINKS[key as keyof typeof CONTACT_LINKS];
            return (
              <Tooltip key={i}>
                <TooltipTrigger asChild>
                  <Link
                    href={contact.href}
                    target="_blank"
                    className="p-1.5 rounded-lg border border-border bg-background hover:border-primary/30 hover:bg-accent transition-all duration-200"
                  >
                    <Image
                      src={contact.icon}
                      alt={key}
                      width={18}
                      height={18}
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

      {/* Right: Content column */}
      <div className="flex flex-col gap-4 text-center lg:text-left">
        {[
          "ACES, a community of Computer Engineering students established in 2070 B.S at IOE Purwanchal Campus, Dharan, is dedicated to the all-round development of students. Our mission is to build a strong foundation for their careers by providing various opportunities for growth and learning.",
          "We offer comprehensive training programs for students from the 1st to the 4th year of their Bachelor's in Computer Engineering. These programs cover a wide range of topics and are designed to enhance both technical and soft skills.",
          "Additionally, we organize various competitions to encourage skill development and knowledge enhancement. Our events, such as national-level software hackathons and annual Techfest, provide platforms for students to showcase their talents and gain valuable experience.",
        ].map((paragraph, index) => (
          <Paragraph
            key={index}
            className="text-muted-foreground leading-relaxed"
          >
            {paragraph}
          </Paragraph>
        ))}
      </div>
    </div>
  );
};

export { Hero };
