import React from "react";
import img from "@/assets/images/404.png";
import Image from "next/image";
import GoBackButton from "./go-back-button";
import Link from "next/link";
import { Button } from "../ui/button";
import { IoHomeOutline } from "react-icons/io5";

const NotFound = () => {
  return (
    <div className="wrapper max-width flex items-center justify-center h-screen">
      <div className="flex items-center flex-col justify-center lg:flex-row py-28 px-6 md:px-24 md:py-20 lg:py-32 gap-6 sm:gap-16 lg:gap-28">
        <div className="w-full lg:w-1/2">
          <Image
            src={img}
            alt=""
            height={400}
            width={400}
            className="w-auto object-contain object-center"
          />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col gap-2">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-800">
            Looks like you&apos;ve found the doorway to the great nothing
          </h1>
          <p className="text-base text-gray-800 opacity-70">
            The content you&apos;re looking for doesn&apos;t exist. Either it
            was removed, or you mistyped the link.
          </p>
          <p className="text-base text-gray-800 opacity-70">
            Sorry about that! Please visit our homepage to get where you need to
            go.
          </p>
          <div className="mt-6 flex gap-4">
            <GoBackButton />
            <Link href="/">
              <Button
                size="lg"
                variant="secondary"
                className="flex items-center gap-2"
              >
                <IoHomeOutline />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
