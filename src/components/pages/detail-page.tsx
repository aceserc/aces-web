import { IAuthor } from "@/types/author";
import Link from "next/link";
import React from "react";
import readingTime from "reading-time";
import MdRender from "../reusable/md-renderer";
import { PiClockLight } from "react-icons/pi";
import { CiCalendarDate, CiLocationOn } from "react-icons/ci";
import { resolveDuration } from "@/helpers/date-fns";
import { IoIosTimer } from "react-icons/io";
import { cn } from "@/helpers/cn";
import { IFile } from "@/zod/file.schema";
import ViewImage from "../reusable/view-image";

type Props = {
  type: "blogs" | "notices" | "events";
  tags?: Array<string>;
  title: string;
  metaDescription?: string;
  author?: IAuthor;
  createdAt: string;
  body: string;
  thumbnail: IFile;
  startTime?: string;
  endDate?: string;
  endTime?: string;
  location?: string;
  startDate?: string;
  registrationLink?: string;
};
const DetailPage = (props: Props) => {
  const rTime = readingTime(props.body);
  const duration = resolveDuration(
    props.startDate!,
    props.startTime,
    props.endDate,
    props.endTime
  );
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
              href={`/blogs/author/${props.author.id}`}
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
                href={`/blogs/author/${props.author.id}`}
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
                    weekday: "short",
                  })}
                </p>
                <span className="flex w-[3px] h-[3px] rounded-full bg-gray-300" />
                <p>{rTime.text}</p>
              </div>
            </div>
          </div>
        )}
        {props.createdAt && props.type === "notices" && (
          <div className="flex items-center gap-1.5 text-gray-600">
            <p>
              Published on{" "}
              {new Date(props.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <span className="flex w-[3px] h-[3px] rounded-full bg-gray-300" />
            <p>{rTime.text}</p>
          </div>
        )}
        {props.type === "events" && (
          <div className="flex gap-x-12 gap-y-4 flex-wrap">
            <div className="flex flex-col items-start lg:pt-5">
              <h3 className="text-base sm:text-lg font-medium">Starts At</h3>
              <div className="text-sm">
                <CiCalendarDate className="inline-block w-4 h-4 mr-2" />
                {new Date(props.startDate!).toDateString()}
              </div>
              {props.startTime && (
                <div className="text-sm">
                  <PiClockLight className="inline-block w-4 h-4 mr-2" />
                  {new Date(`1970-01-01T${props.startTime}`).toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </div>
              )}
            </div>
            {/* event end date time */}
            {props.endDate && (
              <div className="flex flex-col items-start lg:pt-5">
                <h3 className="text-base sm:text-lg font-medium">Ends At</h3>
                <div className="text-sm">
                  <CiCalendarDate className="inline-block w-4 h-4 mr-2" />
                  {new Date(props.endDate).toDateString()}
                </div>
                {props.endTime && (
                  <div className="text-sm">
                    <PiClockLight className="inline-block w-4 h-4 mr-2" />
                    {new Date(`1970-01-01T${props.endTime}`).toLocaleTimeString(
                      [],
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </div>
                )}
              </div>
            )}
            {
              // event duration
              duration && (
                <div className="flex flex-col items-start lg:pt-5">
                  <h3 className="text-base sm:text-lg font-medium">Duration</h3>
                  <div className="text-sm">
                    <IoIosTimer className="inline-block w-4 h-4 mr-2" />
                    {duration}
                  </div>
                </div>
              )
            }

            {
              // event location
              props.location && (
                <div
                  className={cn(
                    "flex flex-col items-start lg:pt-5",
                    !duration && "col-span-2"
                  )}
                >
                  <h3 className="text-base sm:text-lg font-medium">Location</h3>
                  <div className="text-sm">
                    <CiLocationOn className="inline-block w-4 h-4 mr-2" />
                    {props.location}
                  </div>
                </div>
              )
            }
          </div>
        )}
      </div>
      <ViewImage
        role="button"
        src={props.thumbnail.url}
        alt="thumbnail"
        className={cn(
          "w-full border border-gray-300 h-auto object-center rounded-xl mt-6 max-h-[550px] shadow-md",
          props.type === "blogs"
            ? " object-cover"
            : "object-cover sm:object-contain"
        )}
      />
      {
        // registration link
        props.registrationLink && (
          <div className="text-sm md:text-base mt-4">
            Register here:{" "}
            <Link
              href={props.registrationLink}
              className="underline text-blue-400"
            >
              {props.registrationLink}
            </Link>
          </div>
        )
      }
      <div className="mt-12 w-full overflow-x-auto max-w-3xl m-auto">
        <MdRender md={props.body} />
      </div>
    </section>
  );
};

export default DetailPage;
