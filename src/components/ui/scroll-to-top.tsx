"use client";
import { useIsScrolled } from "@/hooks/use-is-scrolled";
import { ArrowUp } from "lucide-react";
import React from "react";
const ScrollToTop = () => {
  const isScrolled = useIsScrolled(400);
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <button
      onClick={handleScrollToTop}
      style={{
        scale: isScrolled ? 1 : 0,
      }}
      className="fixed bottom-4 right-4 p-2 bg-primary text-primary-foreground cursor-pointer z-40 rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-110"
    >
      <ArrowUp className="h-6 w-6" />
    </button>
  );
};

export { ScrollToTop };