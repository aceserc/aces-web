import { Image } from "@/components/ui/image";
import { Notice } from "@/lib/db/types";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const NoticeCard = ({
  ...props
}: Notice) => {
  return (
    <div
      className={cn(
        "flex flex-col rounded-md border-muted-foreground/20 border relative shadow-lg overflow-hidden group sm:max-w-[350px]",
      )}
    >
      <div className="w-full sm:min-w-[350px] max-w-full sm:w-[350px] h-[200px] xs:h-[280px] overflow-hidden shadow-inner flex items-center justify-center">
        <Image
          src={props.cover_image || ""}
          alt={props.title}
          className="rounded-t-md w-full h-full object-top object-cover"
        />
      </div>
      {/* title */}
      <div className="px-4 pt-5 pb-5 flex flex-col gap-3 relative bg-background">
        <h3 className="text-lg font-semibold truncate">{props.title}</h3>
        <div className="flex justify-between text-muted-foreground">
          <div className="flex gap-4 items-center">
            {/* show month and day  */}
            {/* 
                One year passed: 2020 Dec
                Old Date: 12 Dec, 2020
                Else: 12 Dec
                */}
            <span>
              {new Date(props.created_date).toLocaleDateString([], {
                month: "short",
                day: "numeric",
              })}
            </span>

            <hr className="h-4 w-px bg-muted-foreground/40" />
            {/* time format : 12:03 AM */}
            <span className="uppercase">
              {new Date(props.created_date).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
        <Link
          className="absolute h-12 w-12 -top-6 right-2 bg-muted shadow-lg rounded-full p-3.5 hover:scale-105 group-hover:bg-destructive group-hover:text-foreground transition-all"
          href={`/notices/${props.slug}`}
        >
          <ArrowRight className="w-full h-full" />
        </Link>
      </div>
    </div>
  );
};
export { NoticeCard };