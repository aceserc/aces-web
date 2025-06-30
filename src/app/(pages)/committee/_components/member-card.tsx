import { Avatar } from "@/components/ui/avatar";
import { Committee } from "@/lib/db/types";
import { cn } from "@/lib/utils";
import { ExternalLink, FacebookIcon, LinkedinIcon, MailIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = Committee

const MemberCard = (props: Props) => {

  const hasTopCommitteePost = props.role.toLowerCase() === "president" || props.role.toLowerCase() === "adviser";
  return (
    <div
      className={cn(
        "border border-gray-3 max-sm:w-full hover:drop-shadow-1 hover:-translate-y-0.5 transition-all flex items-center h-full",
        hasTopCommitteePost
          ? "px-5 xs:px-6 py-2 sm:py-3 rounded-xl md:min-w-[340px] shadow-sm"
          : "px-4 xs:px-5 py-2 sm:py-3 rounded-lg",
      )}
    >
      <div className="flex items-center gap-8">
        <div
          className={cn(
            "rounded-full overflow-hidden shadow-inner border border-accent",
            hasTopCommitteePost ? "w-20 h-20 sm:w-28 sm:h-28" : "w-20 h-20"
          )}
        >
          <Avatar
            src={props.avatar || "/404.png"}
            alt="user"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div>
          <p
            className={cn(
              "opacity-70",
              hasTopCommitteePost ? "text-sm xs:text-base" : "text-sm"
            )}
          >
            {props.name}
          </p>
          <h4
            className={cn(
              "font-semibold  mb-1",
              hasTopCommitteePost ? "text-lg xs:text-xl" : "xs:text-lg"
            )}
          >
            {props.role}
          </h4>
          <div
            className={cn(
              "flex items-center gap-3 opacity-80",
            )}
          >
            {
              props.mail && (
                <Link
                  href={`mailto:${props.mail}`}
                  className="group"
                >
                  <MailIcon className="size-5 text-muted-foreground" />
                </Link>
              )
            }

            {
              props.linkedin && (
                <Link
                  href={props.linkedin}
                  className="group"
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkedinIcon className="size-5 text-muted-foreground" />
                </Link>
              )
            }

            {
              props.facebook && (
                <Link
                  href={props.facebook}
                  className="group"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FacebookIcon className="size-5 text-muted-foreground" />
                </Link>
              )
            }
            {
              props.external_link && (
                <Link
                  href={props.external_link}
                  className="group"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink className="size-5 text-muted-foreground" />
                </Link>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export { MemberCard };