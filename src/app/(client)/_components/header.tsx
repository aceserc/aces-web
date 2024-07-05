"use client";

import { Button } from "@/components/ui/button";
import { CONTACT_LINKS } from "@/constants/contacts.constants";
import { cn } from "@/helpers/cn";
import useScrollPosition from "@/hooks/use-scroll-position";
import Image from "next/image";
import Link from "next/link";
import { RxCross2 } from "react-icons/rx";
import { RiMenuFill } from "react-icons/ri";
import { useRef } from "react";
import { usePathname } from "next/navigation";

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
    label: "Notices",
    href: "/notices",
  },
  {
    label: "Events",
    href: "/events",
  },
  {
    label: "Blogs",
    href: "/blogs",
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
  const isScrolled = useScrollPosition();
  const mobileNavRef = useRef<HTMLDivElement>();
  const pathname = usePathname();

  return (
    <>
      <header
        className={cn(
          "flex z-50 mt-4 rounded-lg justify-between items-center fixed left-1/2 -translate-x-1/2 w-[95%] h-14 py-6 p-7 lg:px-12 xl:py-9 transition-colors",
          isScrolled && "bg-primary/5 backdrop-blur-md"
        )}
      >
        <Link href="/" className="font-sub-heading text-2xl font-bold">
          ACES
        </Link>
        <div className="flex gap-12 items-center text-foreground/80">
          <nav className="lg:flex gap-9 items-center hidden">
            {HEADER_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className={cn(
                  "underline-offset-4 hover:text-red-500 transition-colors",
                  pathname.split("/")[1] === href.split("/")[1] &&
                    "text-red-500 underline"
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
            <button
              onClick={() => {
                if (mobileNavRef.current) {
                  mobileNavRef.current.classList.remove("translate-x-full");
                }
              }}
              className="lg:hidden ml-4"
            >
              <RiMenuFill className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>
      {/* mobile nav */}
      <div
        //@ts-ignore
        ref={mobileNavRef}
        className="flex gap-12 z-50 justify-between flex-col text-foreground/80 bg-background shadow-lg backdrop-blur-sm fixed top-0 right-0 h-screen w-[245px] py-16 pt-20 px-7 translate-x-full transition-transform"
      >
        {/* close button */}
        <button
          onClick={() => {
            if (mobileNavRef.current) {
              mobileNavRef.current.classList.add("translate-x-full");
            }
          }}
          className="absolute top-5 right-5"
        >
          <RxCross2 className="h-6 w-6" />
        </button>

        <nav className="flex flex-col gap-5 ">
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
                "hover:text-foreground underline-offset-4",
                pathname.split("/")[1] === href.split("/")[1] &&
                  "text-red-500 underline"
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

export default Header;
