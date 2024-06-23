import React from "react";
import Link from "next/link";
import { PiBatteryLowFill } from "react-icons/pi";

const DeviceNotSupported = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-dvh px-4 py-12 md:px-6 lg:px-8">
        <div className="max-w-md text-center space-y-4">
          <PiBatteryLowFill className="mx-auto h-16 w-16 text-gray-500 dark:text-gray-400" />
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Device Not Supported
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            We apologize, but your current device is not compatible with our
            application. Please access our service from a supported device to
            continue.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
            <Link
              href="/"
              className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              prefetch={false}
            >
              Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200  bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
              prefetch={false}
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeviceNotSupported;
