import { Image } from "@/components/ui/image";
import { Training } from "@/lib/db/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = Training

const TrainingCard = (props: Props) => {
  const descriptionLength = props.description ? 80 : 150;
  return (
    <div
      className={cn(
        "w-full flex h-full flex-col sm:flex-row sm:items-center gap-6 bg-background shadow-md rounded-xl px-3.5 py-3 sm:px-5 sm:py-5 ",
      )}
    >
      <div className="lg:max-w-[238px] max-h-[160px] w-full overflow-hidden flex items-center justify-center h-full">
        <Link href={`/blogs/${props.slug}`} className="w-full h-full relative">
          <Image
            className="w-full rounded-md object-cover object-center h-full "
            src={props?.cover_image || ""}
            alt={props.title}
            fetchPriority="low"
            loading="lazy"
            fill
          />
        </Link>
      </div>
      <div className="w-full">
        <Link
          href={`/training-and-workshops/${props.slug}`}
          className="hover:underline"
        >
          <h2 className="font-semibold text-base mb-3">{props.title}</h2>
        </Link>
        <p className="text-sm text-muted-foreground">
          {props.description?.substring(0, descriptionLength)}
          {(props.description?.length || 0) > descriptionLength ? "..." : ""}
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

export { TrainingCard };