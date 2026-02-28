"use client";

import Image from "next/image";
import Link from "next/link";
import { titleCase } from "scule";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CONTACT_LINKS, DEVS_CONTACT_LINKS } from "@/constants/contact-links";
import { Client } from "./ui/client";
import { Hr } from "./ui/separator";
import { H3, H4, Paragraph } from "./ui/typography";

const Footer = () => {
  return (
    <footer className="relative py-10 border-t border-border bg-muted/20 rounded-t-2xl">
      <div className="container flex flex-col gap-8 items-center sm:items-start">
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-8 w-full">
          {/* Brand column */}
          <div className="flex flex-col gap-3 items-center sm:items-start w-full sm:max-w-xs">
            <div className="flex items-center gap-2.5">
              <Image
                src={"/logo.png"}
                height={36}
                width={36}
                alt=""
                className="object-contain object-center"
              />
              <H3 className="leading-none">ACES</H3>
            </div>

            <Paragraph className="text-center sm:text-left text-muted-foreground text-sm leading-relaxed">
              Association of Computer Engineering Students, <br />
              IOE Purwanchal Campus Dharan
            </Paragraph>

            <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
              {Object.keys(CONTACT_LINKS).map((key, i) => {
                const item = CONTACT_LINKS[key as keyof typeof CONTACT_LINKS];
                return (
                  <Tooltip key={i}>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        target="_blank"
                        className="p-1.5 rounded-lg border border-border bg-background hover:border-primary/30 hover:bg-accent transition-all duration-200"
                      >
                        <Image
                          src={item.icon}
                          alt={key}
                          width={18}
                          height={18}
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

          {/* Links column */}
          <div className="hidden sm:flex flex-col gap-3">
            <H4 className="text-sm uppercase tracking-widest font-mono text-muted-foreground">
              Links
            </H4>
            <ul className="flex flex-col gap-1.5">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Committee", href: "/committee" },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Hr />

        <div className="flex justify-between flex-col sm:flex-row gap-2 text-center sm:text-left w-full">
          <Client>
            <Paragraph className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} ACES. All rights reserved.
            </Paragraph>
          </Client>
          <Paragraph className="text-xs text-muted-foreground">
            Crafted By{" "}
            {Object.keys(DEVS_CONTACT_LINKS).map((key, i) => {
              const item =
                DEVS_CONTACT_LINKS[key as keyof typeof DEVS_CONTACT_LINKS];
              return (
                <Link
                  key={i}
                  href={item}
                  target="_blank"
                  className="hover:underline text-primary mr-1 font-medium"
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
