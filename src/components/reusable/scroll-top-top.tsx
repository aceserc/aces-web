"use client";
import useScrollPosition from "@/hooks/use-scroll-position";
import React from "react";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
const ScrollTopTop = () => {
  const isScrolled = useScrollPosition(400);
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <button
      onClick={handleScrollToTop}
      style={{
        scale: isScrolled ? 1 : 0,
      }}
      className="fixed bottom-4 right-4 p-2 bg-primary text-white z-40 rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-110"
    >
      <MdKeyboardDoubleArrowUp className="h-6 w-6" />
    </button>
  );
};

export default ScrollTopTop;
