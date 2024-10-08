import { cn } from "@/helpers/cn";
import { IHandleGetBlogsServiceResponse } from "@/services/blogs";
import Link from "next/link";
import React from "react";

type Props = IHandleGetBlogsServiceResponse["blogs"][0] & {
  lessDescription?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

const BlogCard = (props: Props) => {
  const descriptionLength = props.lessDescription ? 80 : 150;
  return (
    <div
      className={cn(
        "w-full flex h-full flex-col sm:flex-row sm:items-center gap-6 bg-white shadow-md rounded-xl px-3.5 py-3 sm:px-5 sm:py-5",
        props.className
      )}
      style={props.style}
    >
      <div className="lg:max-w-[238px] lg:max-h-[160px] w-full overflow-hidden flex items-center justify-center">
        <Link href={`/blogs/${props._id}`} className="w-full h-full">
          <img
            className="w-full rounded-md object-cover object-center h-full"
            src={props?.thumbnail?.url}
            alt="hero"
            fetchPriority="low"
            loading="lazy"
          />
        </Link>
      </div>
      <div className="w-full">
        <div className="flex gap-2">
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
        <Link href={`/blogs/${props._id}`} className="hover:underline">
          <h2 className="font-semibold text-base mb-3">{props.title}</h2>
        </Link>
        <p className="text-sm text-gray-600">
          {props.metaDescription?.substring(0, descriptionLength)}
          {props.metaDescription?.length > descriptionLength ? "..." : ""}
        </p>
        <div className="flex items-center gap-2.5 mt-2">
          <p className="text-sm">
            <Link
              href={`/blogs/author/${props.author?.id}`}
              className="hover:underline"
            >
              By {props.author?.firstName} {props.author?.lastName}
            </Link>
          </p>
          <span className="flex w-[3px] h-[3px] rounded-full bg-gray-300" />
          <p className="text-sm">
            {new Date(props.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
