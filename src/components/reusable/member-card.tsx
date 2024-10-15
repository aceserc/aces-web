import { ICONS } from "@/assets/icons/svg-repo";
import { TOP_COMMITTEE_POSTS } from "@/constants/committees-post.constant";
import { cn } from "@/helpers/cn";
import identifyUrl from "@/helpers/indentify-url";
import { ICommitteeSchemaWithAvatar } from "@/zod/committee.schema";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

type Props = Partial<ICommitteeSchemaWithAvatar> & {
  className?: string;
  style?: React.CSSProperties;
};

const MemberCard = (props: Props) => {
  const hasTopCommitteePost = TOP_COMMITTEE_POSTS.includes(
    props.post as string
  );
  return (
    <div
      className={twMerge(
        "border border-gray-3 max-sm:w-full hover:drop-shadow-1 hover:-translate-y-0.5 transition-all flex items-center h-full",
        hasTopCommitteePost
          ? "px-5 xs:px-6 py-2 sm:py-3 rounded-xl md:min-w-[340px] shadow-sm"
          : "px-4 xs:px-5 py-2 sm:py-3 rounded-lg",
        props.className
      )}
      style={props.style}
    >
      <div className="flex items-center gap-8">
        <div
          className={cn(
            "rounded-full overflow-hidden shadow-inner border border-accent",
            hasTopCommitteePost ? "w-20 h-20 sm:w-28 sm:h-28" : "w-20 h-20"
          )}
        >
          <img
            src={props.avatar?.url}
            alt="user"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div>
          <p
            className={twMerge(
              "opacity-70",
              hasTopCommitteePost ? "text-sm xs:text-base" : "text-sm"
            )}
          >
            {props.name}
          </p>
          <h4
            className={twMerge(
              "font-semibold  mb-1",
              hasTopCommitteePost ? "text-lg xs:text-xl" : "xs:text-lg"
            )}
          >
            {props.post}
          </h4>
          <div
            className={twMerge(
              "flex items-center",
              hasTopCommitteePost ? "gap-4" : "gap-2"
            )}
          >
            {props.socialLinks && props.socialLinks?.length < 1 ? (
              <span className="text-muted-foreground text-sm">
                No contact info!
              </span>
            ) : (
              props.socialLinks
                ?.map((link) => identifyUrl(link))
                .sort((a, b) => a.type.localeCompare(b.type))
                .map((link, index) => {
                  return (
                    <Link
                      key={index}
                      href={link.href}
                      target="_blank"
                      className="group"
                    >
                      <Image
                        // @ts-ignore
                        src={ICONS[link.type] || ICONS.external}
                        alt="social"
                        width={hasTopCommitteePost ? 28 : 24}
                        height={hasTopCommitteePost ? 28 : 24}
                        className="cursor-pointer opacity-80 group-hover:opacity-100 transition-opacity"
                        quality={100}
                      />
                    </Link>
                  );
                })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
