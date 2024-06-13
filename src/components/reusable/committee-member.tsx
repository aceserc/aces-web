import { ICONS } from "@/assets/icons/svg-repo";
import identifyUrl from "@/helpers/indentify-url";
import { ICommitteeSchemaWithAvatar } from "@/zod/committee.schema";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = ICommitteeSchemaWithAvatar;

const CommitteeMember = ({ avatar, name, post, socialLinks }: Props) => {
  return (
    <div className="flex flex-col gap-3 items-center shadow-md justify-center bg-background py-6 px-12 rounded-md">
      <Image
        src={avatar}
        alt="avatar"
        width={100}
        height={100}
        className="rounded-full object-cover object-center h-24 w-24"
        quality={100}
      />
      <div className="text-center">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-muted-foreground">{post}</p>
      </div>
      <div className="flex gap-4 items-center justify-center">
        {socialLinks?.map((link, index) => {
          const type = identifyUrl(link);
          return (
            <Link key={index} href={type.href} target="_blank">
              <Image
                // @ts-ignore
                src={ICONS[type.type]}
                alt="social"
                width={20}
                height={20}
                className="cursor-pointer"
                quality={100}
                onError={(e) => {
                  e.currentTarget.src = ICONS.external;
                }}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CommitteeMember;