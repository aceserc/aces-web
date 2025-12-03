"use client";

import { ArrowUpFromLine } from "lucide-react";
import React from "react";
import { useIsScrolled } from "@/hooks/use-is-scrolled";
import { Button } from "./button";

const ScrollToTop = () => {
  const isScrolled = useIsScrolled(400);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Button
      onClick={handleScrollToTop}
      style={{
        scale: isScrolled ? 1 : 0,
      }}
      className="fixed bottom-4 right-4 rounded-full h-auto aspect-square"
      variant={"secondary"}
      size={"sm"}
    >
      <ArrowUpFromLine className="h-6 w-6" />
    </Button>
  );
};

export { ScrollToTop };
