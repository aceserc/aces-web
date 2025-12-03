"use client";

import { ChevronDownIcon, MenuIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { CONTACT_LINKS } from "@/constants/contact-links";
import { useIsScrolled } from "@/hooks/use-is-scrolled";
import { cn } from "@/lib/utils";
import { H3 } from "./ui/typography";

const HEADER_LINKS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },

  {
    label: "Committee",
    href: "/committee",
  },
  {
    label: "Gallery",
    href: "/gallery",
  },
];

const Header = () => {
  const isScrolled = true;
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  return (
    <>
      <div className="z-50 mt-4 fixed left-1/2 -translate-x-1/2 container transition-colors ">
        <header
          className={cn(
            "flex rounded-md justify-between items-center px-6 py-4",
            isScrolled && "bg-primary/5 backdrop-blur-md",
          )}
        >
          <Link href="/">
            <H3 className="tracking-wider">ACES</H3>
          </Link>
          {/* nav links for larger devices */}
          <nav className="lg:flex gap-6 items-center hidden text-lg">
            {HEADER_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className={cn(
                  "underline-offset-3 hover:text-destructive/80 transition-colors ",
                  pathname.split("/")[1] === href.split("/")[1] &&
                    "text-destructive underline",
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex gap-3 items-center">
            <Link href="/contact" className="hidden sm:block">
              <Button variant="outline" className="!py-1 h-[36px]">
                Contact
              </Button>
            </Link>
            <Link
              target="_blank"
              href={CONTACT_LINKS.discord.href}
              className="hidden sm:block"
            >
              <Image
                src={CONTACT_LINKS.discord.icon}
                alt="Discord"
                height={32}
                width={32}
                className="hover:scale-110 transition-transform"
              />
            </Link>

            {/* // hamburger menu */}
            <button
              onClick={() => {
                if (mobileNavRef.current) {
                  mobileNavRef.current.classList.remove("translate-x-full");
                }
              }}
              className="lg:hidden ml-4 cursor-pointer"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </header>
      </div>
      {/* mobile nav */}
      <div
        ref={mobileNavRef}
        className="flex gap-12 z-50 justify-between flex-col text-foreground/80 bg-background shadow-lg backdrop-blur-sm fixed top-0 right-0 h-screen w-[245px] py-16 pt-20 px-7 translate-x-full transition-transform"
      >
        {/* close button */}
        <Button
          onClick={() => {
            if (mobileNavRef.current) {
              mobileNavRef.current.classList.add("translate-x-full");
            }
          }}
          variant={"ghost"}
          className="absolute top-5 right-5 cursor-pointer"
        >
          <X />
        </Button>

        <nav className="flex flex-col gap-4">
          {HEADER_LINKS.map(({ label, href }) => (
            <Link
              onClick={() => {
                if (mobileNavRef.current) {
                  mobileNavRef.current.classList.add("translate-x-full");
                }
              }}
              key={label}
              href={href}
              className={cn(
                "hover:text-foreground underline-offset-3",
                pathname.split("/")[1] === href.split("/")[1] &&
                  "text-destructive underline",
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex gap-3 items-center w-full">
          <Link
            onClick={() => {
              if (mobileNavRef.current) {
                mobileNavRef.current.classList.add("translate-x-full");
              }
            }}
            href="/contact"
            className="flex-grow"
          >
            <Button variant="outline" className="!py-1 h-[36px] w-full">
              Contact
            </Button>
          </Link>
          <Link target="_blank" href={CONTACT_LINKS.discord.href}>
            <Image
              src={CONTACT_LINKS.discord.icon}
              alt="Discord"
              height={32}
              width={32}
              className="hover:scale-110 transition-transform"
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export { Header };
