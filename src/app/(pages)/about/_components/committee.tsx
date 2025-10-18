import { getCollection } from "@/db";
import { Committee as CommitteeType } from "@/db/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { H2, H4, Paragraph } from "@/components/ui/typography";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  MailIcon,
  LinkedinIcon,
  FacebookIcon,
  ExternalLink,
} from "lucide-react";
const Committee = () => {
  const members = getCollection("committee") as CommitteeType[];
  const latestCommitteeNumber = Number(
    members.sort((a, b) => {
      return Number(b.committee) - Number(a.committee);
    })[0].committee
  );

  const latestCommitteeMembers = members
    .filter((member) => Number(member.committee) === latestCommitteeNumber)
    .sort((a, b) => {
      return Number(a.weight) - Number(b.weight);
    });

  return (
    <section className="flex flex-col gap-6 sm:gap-10 container bg-muted rounded-md p-4">
      <H2 className="text-center">ACES {latestCommitteeNumber}th Committee</H2>
      <Carousel>
        <CarouselContent className="-ml-4">
          {latestCommitteeMembers.map((member) => (
            <CarouselItem
              className="pl-4 max-w-[80%] sm:max-w-[50%] md:max-w-[30%] lg:max-w-[20%] hover:z-10 rounded-md group select-none"
              key={member.id}
            >
              <div className="relative aspect-[4/5] rounded-md">
                <Image
                  objectFit="cover"
                  src={member.avatar || "/avatar.png"}
                  alt={member.name}
                  className="object-cover w-full h-full bg-muted rounded-md"
                  fill
                />
                <div className="absolute left-0 right-0 bg-background/80 backdrop-blur-md bottom-0 transition-transform p-4 rounded-b-md text-foreground translate-y-0 lg:translate-y-40 group-hover:translate-y-0">
                  <H4>{member.role}</H4>
                  <Paragraph>({member.name})</Paragraph>
                  <div className={cn("flex items-center justify-end gap-3 ")}>
                    {member.mail && (
                      <Link href={`mailto:${member.mail}`} className="group">
                        <MailIcon className="size-4 hover:text-foreground text-muted-foreground" />
                      </Link>
                    )}

                    {member.linkedin && (
                      <Link
                        href={member.linkedin}
                        className="group"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <LinkedinIcon className="size-4 hover:text-foreground text-muted-foreground" />
                      </Link>
                    )}

                    {member.facebook && (
                      <Link
                        href={member.facebook}
                        className="group"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FacebookIcon className="size-4 hover:text-foreground text-muted-foreground" />
                      </Link>
                    )}
                    {member.external_link && (
                      <Link
                        href={member.external_link}
                        className="group"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ExternalLink className="size-4 hover:text-foreground text-muted-foreground" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex gap-4 items-center mt-10 justify-center">
          <CarouselPrevious className="static" />
          <CarouselNext className="static" />
        </div>
      </Carousel>
    </section>
  );
};

export { Committee };
