import { IAuthor } from "@/types/author";
import Link from "next/link";
import React from "react";
import readingTime from "reading-time";
import MdRender from "../reusable/md-renderer";

type Props = {
  type: "blogs";
  tags?: Array<string>;
  title: string;
  metaDescription?: string;
  author?: IAuthor;
  createdAt: string;
  body: string;
  thumbnail: string;
};
const DetailPage = (props: Props) => {
  const rTime = readingTime(props.body);
  return (
    <section className="flex flex-col wrapper items-center justify-center max-w-5xl">
      <div className="flex gap-3 flex-col items-center justify-center text-center">
        <div className="flex gap-3 items-center">
          {props.tags &&
            props.tags.map((tag, index) => (
              <Link
                key={index}
                href={`/${props.type}/tag/${tag}`}
                className="text-purple-500 bg-purple-400/[0.08] font-medium text-sm py-1 px-3 rounded-full"
              >
                {tag}
              </Link>
            ))}
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-bold mt-1">
          {props.title}
        </h1>
        {props.metaDescription && (
          <p className="text-sm md:text-base max-w-3xl">
            {props.metaDescription}
          </p>
        )}
        {props.author && props.type === "blogs" && (
          <div className="flex items-center justify-center gap-4 mt-4">
            <Link
              href={`/${props.author.contact || "#"}`}
              target="_blank"
              className="flex w-10 h-10 rounded-full overflow-hidden"
            >
              <img
                src={props.author.avatar}
                alt="user"
                className="w-full h-full rounded-full object-center object-cover"
              />
            </Link>
            <div className="text-left">
              <Link
                href={`/${props.author.contact || "#"}`}
                target="_blank"
                className="font-medium text-base hover:underline mb-1"
              >
                {props.author.firstName} {props.author.lastName}
              </Link>
              <div className="flex items-center gap-1.5 text-gray-600">
                <p>
                  {new Date(props.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <span className="flex w-[3px] h-[3px] rounded-full bg-gray-300" />
                <p>{rTime.text}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <img
        src={props.thumbnail}
        alt="thumbnail"
        className="w-full h-auto object-cover object-center rounded-xl mt-6 max-h-[550px] shadow-md"
      />
      <div className="mt-12 w-full overflow-x-auto max-w-3xl m-auto">
        <MdRender md={props.body} />
      </div>
    </section>
  );
};

export default DetailPage;
