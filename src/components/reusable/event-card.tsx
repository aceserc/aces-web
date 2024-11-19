import { IEventsSchemaResponse } from "@/services/events";
import placeholder from "@/assets/images/placeholder.png";
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
  style?: React.CSSProperties;
}) => {
  const resoledDate = resolveDate(props.startDate, props.endDate);
  console.log(resoledDate);
  return (
    <Link href={`/events/${props._id}`} className="min-w-full w-full">
      <div
        className={cn(
          "flex flex-col rounded-md border-muted-foreground/20 border relative shadow-md overflow-hidden",
          className
        )}
        style={props.style}
      >
        {/* tooltip location */}
        {props.location && (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger className="absolute top-2 right-2 shadow-inner bg-muted/40 rounded-full p-1.5">
                <CiLocationOn className="text-primary h-5 w-5" />
              </TooltipTrigger>
              <TooltipContent>{props.location}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {/* badge */}
        <Badge
          className="absolute top-0 uppercase left-0 rounded-tl-md rounded-br-md rounded-tr-none rounded-bl-none"
          variant={
            resoledDate.isOngoing
              ? "default"
              : resoledDate.isToday
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
                : resoledDate.isOngoing
                  ? "Ongoing"
                  : "completed"
          }
        </Badge>
        <div className="w-full sm:min-w-[400px] max-w-full sm:w-[400px] h-[200px] overflow-hidden">
          <img
            src={props.thumbnail?.url ?? placeholder}
            onError={(e) => {
              e.currentTarget.src = "placeholder.png";
            }}
            alt={props.title}
            className="rounded-t-md w-full h-full object-top object-cover"
            fetchPriority="low"
            loading="lazy"
          />
        </div>
        {/* title */}
        <div className="px-4 pt-2 pb-5 flex flex-col gap-4">
          <h3 className="text-base md:text-lg font-bold truncate">
            {props.title}
          </h3>
          <div className="flex text-xs md:text-base xl:text-base justify-between text-muted-foreground">
            <button className="flex gap-1 group">
              <span>Know More</span>
              <IoIosArrowRoundForward className="h-3 w-3 md:h-5 md:w-5 relative group-hover:left-2 transition-transform" />
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
                  <span className="uppercase">
                    {/* // the extra date is added to convert the time to date otherwise it will not work */}
                    {new Date(
                      `1970-01-01T${props.startTime}`
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
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
