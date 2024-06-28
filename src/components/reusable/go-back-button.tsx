"use client";
import React from "react";
import { Button } from "../ui/button";
import { IoChevronBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
const GoBackButton = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.back()}
      className="flex items-center gap-2"
      size="lg"
    >
      <IoChevronBack />
      Go Back
    </Button>
  );
};

export default GoBackButton;
