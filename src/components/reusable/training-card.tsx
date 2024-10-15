import { cn } from "@/helpers/cn";
import { IHandleGetTrainingsServiceResponse } from "@/services/training-and-workshops";
import Link from "next/link";
import React from "react";

type Props = IHandleGetTrainingsServiceResponse["trainings"][0] & {
  lessDescription?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

const TrainingCard = (props: Props) => {
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
        <Link
          href={`/training-and-workshops/${props._id}`}
          className="hover:underline"
        >
          <h2 className="font-semibold text-base mb-3">{props.title}</h2>
        </Link>
        <p className="text-sm text-gray-600">
          {props.inShort?.substring(0, descriptionLength)}
          {props.inShort?.length > descriptionLength ? "..." : ""}
        </p>
        <div className="flex items-center gap-2.5 mt-2">
          {props.duration && (
            <p className="text-sm text-muted-foreground">
              Duration: {props.duration}{" "}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainingCard;
