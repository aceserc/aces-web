"use client";

const ICONS = [
  {
    src: "https://api.iconify.design/logos:python.svg",
    style: { top: "12%", left: "23%" },
  },
  {
    src: "https://api.iconify.design/logos:react.svg",
    style: { top: "-2%", left: "67%" },
  },
  {
    src: "https://api.iconify.design/logos:nextjs-icon.svg",
    style: { top: "32%", right: "2%" },
  },
  {
    src: "https://api.iconify.design/logos:typescript-icon.svg",
    style: { bottom: "12%", right: "1%" },
  },
  {
    src: "https://api.iconify.design/logos:java.svg",
    style: { bottom: "5%", left: "30%" },
  },
];

export const FloatingHeroIcons = () => {
  return (
    <>
      {ICONS.map((icon, i) => (
        <img
          key={i}
          src={icon.src}
          height={40}
          width={40}
          alt=""
          style={icon.style}
          className="absolute object-contain animate-in delay-300 animate-fade-in zoom-in object-center"
          fetchPriority="low"
        />
      ))}
    </>
  );
};
