"use client";

import { CONTACT_LINKS, DEVS_CONTACT_LINKS } from "@/constants/contact";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";

const Footer = () => {
  return (
    <footer className="relative z-10 py-8 border-t border bg-muted/20">
      <div className="container mx-auto px-4 sm:px-8 xl:px-0">
        <div className="flex flex-wrap items-center justify-center flex-col gap-4 lg:gap-0 lg:flex-row lg:justify-between">
          <div>
            <div className="text-sm flex gap-1">
              <span>Developed by </span>
              <div className="flex gap-1 ">
                {Object.keys(DEVS_CONTACT_LINKS).map((key, i) => {
                  return (
                    <Fragment key={i}>
                      <Link
                        href={DEVS_CONTACT_LINKS[key as keyof typeof DEVS_CONTACT_LINKS]}
                        target="_blank"
                        className="text-purple-500 hover:underline"
                      >
                        {key}
                      </Link>
                      {i == 0 && "and"}
                    </Fragment>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="text-sm">&copy; {new Date().getFullYear()} ACES</div>
          <div>
            <div className="flex items-center gap-3">
              <p className="font-medium text-sm text-dark">Follow Us:</p>
              <div className="flex items-center gap-2">
                {Object.keys(CONTACT_LINKS).map((key, i) => {
                  const item = CONTACT_LINKS[
                    key as keyof typeof CONTACT_LINKS
                  ]
                  return (
                    <Link
                      key={i}
                      href={item.href}
                      target="_blank"
                      className="hover:scale-110 transition-transform"
                    >
                      <Image src={item.icon} alt={key} width={24} height={24} />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };