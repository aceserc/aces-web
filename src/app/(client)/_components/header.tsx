"use client";

import { Button } from "@/components/ui/button";
import { CONTACT_LINKS } from "@/constants/contacts.constants";
import { cn } from "@/helpers/cn";
import useScrollPosition from "@/hooks/use-scroll-position";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

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
    label: "News",
    href: "/news",
  },
  {
    label: "Blogs",
    href: "/blogs",
  },
  {
    label: "Events",
    href: "/events",
  },
  {
    label: "Committee",
    href: "/committee",
  },
];

const Header = () => {
  const isScrolled = useScrollPosition();

  return (
    <header
      className={cn(
        "flex z-50 mt-4 rounded-lg justify-between items-center fixed left-1/2 -translate-x-1/2 w-[95%] h-14 py-6 px-12 transition-colors",
        isScrolled && "bg-background/50 backdrop-blur-md"
      )}
    >
      <Link href="/" className="font-sub-heading text-2xl font-bold">
        ACES
      </Link>
      <div className="flex gap-12 items-center text-foreground/80">
        <nav className="flex gap-9 items-center">
          {HEADER_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="hover:text-foreground underline-offset-1"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex gap-3 items-center">
          <Link href="/contact">
            <Button variant="outline" className="!py-1 h-[36px]">
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
    </header>
  );
};

export default Header;
