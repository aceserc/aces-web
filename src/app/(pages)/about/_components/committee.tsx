import {
  ExternalLink,
  FacebookIcon,
  LinkedinIcon,
  MailIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { H2, H4, Paragraph } from "@/components/ui/typography";
import { getCollection } from "@/db";
import type { Committee as CommitteeType } from "@/db/types";
import { cn } from "@/lib/utils";

const Committee = () => {
  const members = getCollection("committee") as CommitteeType[];
  const latestCommitteeNumber = Number(
    members.sort((a, b) => Number(b.committee) - Number(a.committee))[0]
      .committee,
  );

  const latestCommitteeMembers = members
    .filter((member) => Number(member.committee) === latestCommitteeNumber)
    .sort((a, b) => Number(a.weight) - Number(b.weight));

  return (
    <section className="flex flex-col gap-8 container bg-muted/40 border border-border rounded-2xl p-6 sm:p-10">
      <div className="flex flex-col items-center gap-1.5">
        <span className="text-muted-foreground text-sm font-medium uppercase tracking-widest font-mono">
          Committee
        </span>
        <H2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
          ACES {latestCommitteeNumber}th Committee
        </H2>
      </div>

      <div className="relative">
        <Carousel>
          <CarouselContent className="-ml-3 sm:-ml-4">
            {latestCommitteeMembers.map((member) => (
              <CarouselItem
                className="pl-3 sm:pl-4 basis-[75%] sm:basis-1/2 md:basis-1/3 lg:basis-1/5 group select-none"
                key={member.id}
              >
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-border">
                  <Image
                    src={member.avatar || "/avatar.png"}
                    alt={member.name}
                    className="object-cover w-full h-full bg-muted"
                    fill
                  />

                  {/* Overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-background/85 backdrop-blur-md p-4 rounded-b-xl transition-transform duration-300 translate-y-0 lg:translate-y-[calc(100%-4.5rem)] group-hover:translate-y-0">
                    <H4 className="text-sm font-semibold leading-snug line-clamp-1">
                      {member.role}
                    </H4>
                    <Paragraph className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                      {member.name}
                    </Paragraph>

                    <div
                      className={cn(
                        "flex items-center gap-2 mt-3 pt-2.5 border-t border-border",
                      )}
                    >
                      {member.mail && (
                        <Link href={`mailto:${member.mail}`}>
                          <MailIcon className="size-3.5 text-muted-foreground hover:text-foreground transition-colors" />
                        </Link>
                      )}
                      {member.linkedin && (
                        <Link
                          href={member.linkedin}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <LinkedinIcon className="size-3.5 text-muted-foreground hover:text-foreground transition-colors" />
                        </Link>
                      )}
                      {member.facebook && (
                        <Link
                          href={member.facebook}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FacebookIcon className="size-3.5 text-muted-foreground hover:text-foreground transition-colors" />
                        </Link>
                      )}
                      {member.external_link && (
                        <Link
                          href={member.external_link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <ExternalLink className="size-3.5 text-muted-foreground hover:text-foreground transition-colors" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="flex gap-3 items-center mt-8 justify-center">
            <CarouselPrevious className="static" />
            <CarouselNext className="static" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export { Committee };
