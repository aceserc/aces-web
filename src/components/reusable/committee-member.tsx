import { ICONS } from "@/assets/icons/svg-repo";
import identifyUrl from "@/helpers/indentify-url";
import { ICommitteeSchemaWithAvatar } from "@/zod/committee.schema";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = ICommitteeSchemaWithAvatar;

const CommitteeMember = ({ avatar, name, post, socialLinks }: Props) => {
  return (
    <div className="flex flex-col gap-3 items-center shadow-[rgba(7,_65,_210,_0.1)_0px_9px_10px] justify-center bg-background py-6 px-12 rounded-md h-full">
      <img
        src={avatar.url}
        alt="avatar"
        className="rounded-full object-cover object-center h-24 w-24"
      />
      <div className="text-center">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-muted-foreground">{post}</p>
      </div>
      <div className="flex gap-4 items-center justify-center min-h-8">
        {socialLinks && socialLinks?.length < 1 ? (
          <span className="text-muted-foreground">No social links</span>
        ) : (
          socialLinks
            ?.map((link) => identifyUrl(link))
            .sort((a, b) => a.type.localeCompare(b.type))
            ?.map((link, index) => {
              return (
                <Link key={index} href={link.href} target="_blank">
                  <Image
                    // @ts-ignore
                    src={ICONS[link.type]}
                    alt="social"
                    width={30}
                    height={30}
                    className="cursor-pointer"
                    quality={100}
                    onError={(e) => {
                      e.currentTarget.src = ICONS.external;
                    }}
                  />
                </Link>
              );
            })
        )}
      </div>
    </div>
  );
};

export default CommitteeMember;
