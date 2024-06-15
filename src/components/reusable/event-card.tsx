import getEventStatus from "@/helpers/get-event-status";
import { IEventsSchemaResponse } from "@/services/events";
import Link from "next/link";
import { CiLocationOn } from "react-icons/ci";
import { IoIosArrowRoundForward } from "react-icons/io";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { resolveDate } from "@/helpers/date-fns";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/helpers/cn";

const EventCard = ({
  className,
  ...props
}: IEventsSchemaResponse & {
  className?: string;
}) => {
  const resoledDate = resolveDate(props.startDate);
  return (
    <Link href={`/events/${props._id}`}>
      <div
        className={cn(
          "flex flex-col rounded-md border-muted-foreground/20 border relative shadow-xl",
          className
        )}
      >
        {/* tooltip location */}
        {props.location && (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger className="absolute top-2 right-2 shadow-inner bg-muted/40 rounded-full p-1">
                <CiLocationOn className="text-primary h-5 w-5" />
              </TooltipTrigger>
              <TooltipContent>{props.location}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {/* badge */}
        <Badge
          className="absolute top-0 left-0 rounded-tl-md rounded-br-md rounded-tr-none rounded-bl-none"
          variant={
            resoledDate.isToday
              ? "destructive"
              : resoledDate.isOldDate
              ? "secondary"
              : "default"
          }
        >
          {resoledDate.isToday
            ? "It's Today"
            : resoledDate.isTomorrow
            ? "Tomorrow"
            : resoledDate.isUpcoming
            ? "Upcoming"
            : "completed"}
        </Badge>
        <div className="w-full sm:min-w-[400px] md:min-w-[500px] sm:w-[400px] md:w-[500px] h-[250px] sm:h-[300px] overflow-hidden">
          <img
            src={props.thumbnail}
            alt={props.title}
            className="rounded-t-md w-full h-full object-top object-cover"
          />
        </div>
        {/* title */}
        <div className="px-4 pt-2 pb-5 flex flex-col gap-4">
          <h3 className="text-lg font-bold truncate">{props.title}</h3>
          <div className="flex justify-between text-muted-foreground">
            <button className="flex gap-1 group">
              <span>Know More</span>
              <IoIosArrowRoundForward className="h-5 w-5 relative group-hover:left-2 transition-transform" />
            </button>
            <div className="flex gap-4 items-center">
              {/* show month and day  */}
              {/* 
            One year passed: 2020 Dec
            Old Date: 12 Dec, 2020
            Else: 12 Dec
            */}
              <span>
                {resoledDate.isOneYearPassed
                  ? `${resoledDate.mm} ${resoledDate.yyyy}`
                  : resoledDate.isOldDate
                  ? `${resoledDate.dd} ${resoledDate.mm}, ${resoledDate.yyyy}`
                  : `${resoledDate.dd} ${resoledDate.mm}`}
              </span>
              {!resoledDate.isOldDate && props.startTime && (
                <>
                  <hr className="h-4 w-px bg-muted-foreground/40" />
                  {/* time format : 12:03 AM */}
                  <span className="uppercase">{props.startTime}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default EventCard;
