"use client";

import { CONTACT_LINKS, DEVS_CONTACT_LINKS } from "@/constants/contact-links";
import Image from "next/image";
import { H3, H4, Paragraph } from "./ui/typography";
import Link from "next/link";
import { Hr } from "./ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { titleCase } from "scule";
import { Client } from "./ui/client";
const Footer = () => {
  return (
    <footer className="relative py-8 border-t border bg-muted/20 rounded-t-md">
      <div className="container mx-auto px-4 flex flex-col gap-4">
        <div className="flex justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Image
                src={"/logo.png"}
                height={40}
                width={40}
                alt=""
                className="object-contain object-center"
              />
              <H3>ACES</H3>
            </div>
            <Paragraph>
              Association of Computer Engineering Students, <br />
              IOE Purwanchal Campus Dharan
            </Paragraph>
            <div className="flex gap-2">
              {Object.keys(CONTACT_LINKS).map((key, i) => {
                const item = CONTACT_LINKS[key as keyof typeof CONTACT_LINKS];
                return (
                  <Tooltip key={i}>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        target="_blank"
                        className="hover:scale-105 transition-transform opacity-80"
                      >
                        <Image
                          src={item.icon}
                          alt={key}
                          width={24}
                          height={24}
                        />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{titleCase(item.type)}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </div>
          <div>
            <H4>Features</H4>
            <ul>
              {[
                {
                  label: "Home",
                  href: "/",
                },
                {
                  label: "About",
                  href: "/about",
                },
                {
                  label: "Notices",
                  href: "/notices",
                },
                {
                  label: "Blgs",
                  href: "/blogs",
                },
                {
                  label: "Committee",
                  href: "/committee",
                },
              ].map((item, i) => {
                return (
                  <li key={i}>
                    <Link
                      className="text-muted-foreground ml-2 hover:underline"
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <Hr />
        <div className="flex justify-between gap-4">
          <Client>
            <Paragraph>
              &copy; {new Date().getFullYear()} ACES. All rights reserved.
            </Paragraph>
          </Client>
          <Paragraph>
            Crafted By{" "}
            {Object.keys(DEVS_CONTACT_LINKS).map((key, i) => {
              const item =
                DEVS_CONTACT_LINKS[key as keyof typeof DEVS_CONTACT_LINKS];
              return (
                <Link
                  key={i}
                  href={item}
                  target="_blank"
                  className="hover:underline text-primary mr-1"
                >
                  {key}
                </Link>
              );
            })}
          </Paragraph>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
