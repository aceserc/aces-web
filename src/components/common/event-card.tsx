import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { formatDistanceToNow } from "date-fns";
import { Image } from "../ui/image";
import { Event } from "@/lib/db/types";

const EventCard = ({
  ...props
}: Event) => {
  return (
    <Link href={`/events/${props.slug}`} className="min-w-full w-full">
      <div
        className={cn(
          "flex flex-col rounded-md border-muted-foreground/20 border relative shadow-md overflow-hidden",
        )}
      >
        {/* tooltip location */}
        {props.location && (
          <Badge className="absolute top-2 right-2 inline-flex items-center justify-center gap-2" variant={"secondary"}>
            <MapPin className="h-3 w-3" /> {props.location}
          </Badge>
        )}
        <div className="w-full sm:min-w-[400px] max-w-full  h-[200px] overflow-hidden">
          <Image
            src={props.cover_image || ""}
            alt={props.title}
            className="rounded-t-md w-full h-full object-top object-cover"
            fetchPriority="low"
            loading="lazy"
            width={400}
            height={200}
          />
        </div>
        {/* title */}
        <div className="px-4 pt-2 pb-5 flex flex-col gap-4">
          <h3 className="text-base md:text-lg font-semibold truncate ">
            {props.title}
          </h3>
          <div className="flex text-xs md:text-base xl:text-base justify-between text-muted-foreground">
            <Button className="group hover:bg-transparent" variant={"ghost"} size={"sm"}>
              <span>Know More</span>
              <ArrowRight className="h-3 w-3 md:h-5 md:w-5 relative group-hover:translate-x-2 transition-all" />
            </Button>
            <div>
              {formatDistanceToNow((props.event_date || ""), { addSuffix: true })}
            </div>
          </div>
        </div>
      </div>
    </Link >
  );
};
export { EventCard };