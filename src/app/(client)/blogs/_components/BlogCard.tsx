import { IHandleGetBlogsServiceResponse } from "@/services/blogs";
import Link from "next/link";
import React from "react";

type Props = IHandleGetBlogsServiceResponse["blogs"][0];

const BlogCard = (props: Props) => {
  return (
    <div className="flex gap-6 w-full bg-white shadow-md px-4 py-2 rounded-md">
      <img
        className="hidden sm:block w-40 h-auto object-cover object-center rounded-md"
        src={props.thumbnail}
        alt="thumbnail"
      />
      <div className="flex-grow w-full">
        <div className="text-sm text-gray-500 flex justify-between items-center">
          <span>
            {new Date(props.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <Link
            href={`/blogs/author/${props.author.id}`}
            className="hover:underline"
          >
            By {props.author.firstName} {props.author.lastName}
          </Link>
        </div>
        <Link href={`/blogs/${props._id}`} className="hover:underline">
          <h2 className="font-semibold text-lg">{props.title}</h2>
        </Link>
        <div className="flex gap-2 flex-wrap">
          {props.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blogs/tag/${tag}`}
              className="inline-flex text-purple-500 bg-purple-400/[0.08] font-medium text-xs py-1 px-3 rounded-full mb-4 opacity-70"
            >
              {tag}
            </Link>
          ))}
        </div>
        <p className="text-sm text-gray-600">
          {props.metaDescription.substring(0, 150)}
          {props.metaDescription.length > 150 ? "..." : ""}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
