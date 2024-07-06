"use client";
import Link from "next/link";
import React, { useState } from "react";
type Props = {
  data: {
    label: string;
    href: string;
  }[];
  title: string;
};

const AllTagsAuthors = ({ data, title }: Props) => {
  const [showAll, setShowAll] = useState(false);
  return (
    <>
      <h3 className="text-xl font-bold">{title}</h3>
      <div className="hidden lg:flex gap-2 lg:flex-col max-h-72 overflow-y-auto flex-wrap">
        {data.map((tag) => (
          <Link
            key={tag.href}
            href={tag.href}
            className="inline-flex hover:text-purple-500 bg-purple-500/10 lg:bg-transparent w-fit font-medium text-sm px-3 rounded-md opacity-70"
          >
            {tag.label}
          </Link>
        ))}
      </div>
      <div className="lg:hidden flex gap-2 lg:flex-col max-h-72 overflow-y-auto flex-wrap">
        {data.map((tag, i) => {
          if (!showAll && i > 3) return null;
          return (
            <Link
              key={tag.href}
              href={tag.href}
              className="inline-flex hover:text-purple-500 bg-purple-500/10 lg:bg-none w-fit font-medium text-sm px-3 rounded-md opacity-70"
            >
              {tag.label}
            </Link>
          );
        })}
        {data.length > 4 && (
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="text-purple-500 font-medium text-sm"
          >
            {showAll ? "Show less" : `Show all `}
          </button>
        )}
      </div>
    </>
  );
};

export default AllTagsAuthors;
