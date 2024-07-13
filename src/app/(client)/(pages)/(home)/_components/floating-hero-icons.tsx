import { ICONS } from "@/assets/icons/svg-repo";
import { cn } from "@/helpers/cn";
import generateUniqueRandomNumbers from "@/helpers/generate-unique-random-numbers";
import Image from "next/image";
import React from "react";

const FloatingHeroIcons = () => {
  const HERO_ICONS = [
    ICONS.figma,
    ICONS.flutter,
    ICONS.gitlab,
    ICONS.java,
    ICONS.kali,
    ICONS.react,
    ICONS.typescript,
    ICONS.vscode,
    ICONS.github,
  ];

  const iconsToShow = generateUniqueRandomNumbers(
    [0, HERO_ICONS.length - 1],
    5
  ).map((i) => HERO_ICONS[i]);
  return (
    <>
      {[
        {
          top: "12%",
          left: "23%",
        },
        {
          top: "32%",
          right: "2%",
        },
        {
          top: "-2%",
          left: "67%",
        },
        {
          bottom: "12%",
          left: "4%",
        },
        {
          bottom: "12%",
          right: "1%",
        },
      ].map((style, i) => (
        <Image
          src={iconsToShow[i]}
          key={i}
          height={40}
          width={40}
          quality={100}
          alt=""
          style={style}
          className={cn(
            "object-contain animate-in delay-300 animate-fade-in zoom-in  object-center select-none absolute z-20 h-6 w-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
          )}
        />
      ))}
    </>
  );
};

export default FloatingHeroIcons;
