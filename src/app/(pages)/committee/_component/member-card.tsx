import {
  ExternalLink,
  FacebookIcon,
  LinkedinIcon,
  MailIcon,
} from "lucide-react";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import type { Committee } from "@/db/types";
import { cn } from "@/lib/utils";

type Props = Committee;

const MemberCard = (props: Props) => {
  const hasTopCommitteePost =
    props.role.toLowerCase() === "president" ||
    props.role.toLowerCase() === "adviser";

  return (
    <div
      className={cn(
        "border border-border max-sm:w-full bg-card hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center h-full group",
        hasTopCommitteePost
          ? "px-5 xs:px-6 py-4 rounded-xl md:min-w-[340px]"
          : "px-4 xs:px-5 py-3 rounded-xl",
      )}
    >
      <div className="flex items-center gap-5">
        <div
          className={cn(
            "rounded-full overflow-hidden shrink-0 border-2 border-border group-hover:border-primary/30 transition-colors duration-300",
            hasTopCommitteePost ? "w-20 h-20 sm:w-28 sm:h-28" : "w-16 h-16",
          )}
        >
          <Avatar
            src={props.avatar || "/avatar.png"}
            alt={props.name}
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="flex flex-col gap-1.2">
          <p
            className={cn(
              "text-muted-foreground",
              hasTopCommitteePost ? "text-md xs:text-base" : "text-sm",
            )}
          >
            {props.name}
          </p>
          <h4
            className={cn(
              "font-semibold leading-snug",
              hasTopCommitteePost ? "text-lg xs:text-xl" : "text-base",
            )}
          >
            {props.role}
          </h4>

          <div className="flex items-center gap-2 mt-1.5 pt-1.5">
            {props.mail && (
              <Link href={`mailto:${props.mail}`}>
                <MailIcon className="size-4 text-muted-foreground hover:text-foreground transition-colors" />
              </Link>
            )}
            {props.linkedin && (
              <Link href={props.linkedin} target="_blank" rel="noreferrer">
                <LinkedinIcon className="size-4 text-muted-foreground hover:text-foreground transition-colors" />
              </Link>
            )}
            {props.facebook && (
              <Link href={props.facebook} target="_blank" rel="noreferrer">
                <FacebookIcon className="size-4 text-muted-foreground hover:text-foreground transition-colors" />
              </Link>
            )}
            {props.external_link && (
              <Link href={props.external_link} target="_blank" rel="noreferrer">
                <ExternalLink className="size-4 text-muted-foreground hover:text-foreground transition-colors" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { MemberCard };
