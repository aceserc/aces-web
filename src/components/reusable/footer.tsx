"use client";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center text-xs px-4 py-2 sm:py-4 bg-muted xl:text-sm">
      <span>&copy; {new Date().getFullYear()} - ACES</span>
    </footer>
  );
};

export default Footer;
