import React from "react";
import readingTime from "reading-time";
import { Calendar, MapPin, Timer } from "lucide-react";
import { cn } from "@/lib/utils";
import ViewImage from "../common/view-image";
import { formatDistanceToNow, format } from "date-fns";
import { Link } from "../ui/link";
import { MDX } from "../ui/mdx";
// import { Avatar } from "../ui/avatar";

type Props = {
  type: "blogs" | "notices" | "events" | "training";
  tags?: Array<string>;
  title: string;
  metaDescription?: string;
  // author?: Author;
  createdAt: string;
  body: string;
  thumbnail: string;
  location?: string;
  registrationUrl?: string;
  duration?: string;
  date?: string;
};
const DetailPage = (props: Props) => {

  console.log(props);

  const rTime = readingTime(props.body);


  return (
    <section className="flex flex-col container items-center justify-center max-w-5xl">
      <div className="flex gap-3 flex-col items-center justify-center text-center">
        <div className="flex gap-3 items-center">
          {props.tags &&
            props.tags.map((tag, index) => (
              <Link
                key={index}
                href={`/${props.type}/tag/${tag}`}
                className="font-medium text-sm py-1 px-3 rounded-full"
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
        {/* {props.author && props.type === "blogs" && (
          <div className="flex items-center justify-center gap-4 mt-4">
            <Link
              href={props.author.contact}
              target="_blank"
              className="flex w-10 h-10 rounded-full overflow-hidden"
            >
              <Avatar
                src={props.author.avatar}
                alt={props.author.name}
                size={"xl"}
              />
            </Link>
            <div className="text-left">
              <Link
                href={props.author.contact}
                target="_blank"
                className="font-medium text-base hover:underline mb-1"
              >
                {props.author.name}
              </Link>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <p>
                  {new Date(props.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    weekday: "short",
                  })}
                </p>
                <span className="flex w-[3px] h-[3px] rounded-full bg-muted-foreground" />
                <p>{rTime.text}</p>
              </div>
            </div>
          </div>
        )} */}
        {props.createdAt && (
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <p>
              Published{" "}
              {formatDistanceToNow(new Date(props.createdAt), { addSuffix: true })}
            </p>
            <span className="flex w-[3px] h-[3px] rounded-full bg-muted-foreground" />
            <p>{rTime.text}</p>
          </div>
        )}
        {props.type === "events" && (
          <div className="flex gap-x-12 gap-y-4 flex-wrap shadow-xs border p-2 rounded-md px-12 border-muted">
            <div className="flex flex-col items-start ">
              <div className="text-sm">
                <Calendar className="inline-block w-4 h-4 mr-2" />
                {format(new Date(props.date!), "PP")}
              </div>
            </div>
            {
              // event duration
              props.duration && (
                <div className="flex flex-col items-start ">
                  <div className="text-sm">
                    <Timer className="inline-block w-4 h-4 mr-2" />
                    {props.duration}
                  </div>
                </div>
              )
            }

            {
              // event location
              props.location && (
                <div
                  className={cn(
                    "flex flex-col items-start ",
                  )}
                >
                  <div className="text-sm">
                    <MapPin className="inline-block w-4 h-4 mr-2" />
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
        src={props.thumbnail}
        alt={props.title.substring(0, 20) + "..."}
        className={cn(
          "w-full border border-muted h-auto object-center rounded-xl mt-6 min-h-40 sm:min-h-80 max-h-[550px] shadow-md max-w-7xl",
          props.type === "blogs"
            ? " object-cover"
            : "object-cover sm:object-contain"
        )}
      />
      {
        // registration link
        props.registrationUrl && (
          <div className="text-sm md:text-base mt-4">
            Register here:{" "}
            <Link
              href={props.registrationUrl}
            >
              {props.registrationUrl}
            </Link>
          </div>
        )
      }
      <div className="mt-12 w-full overflow-x-auto max-w-3xl m-auto">
        <MDX>
          {props.body}
        </MDX>
      </div>
    </section>
  );
};

export { DetailPage };