import { resolveDuration } from "@/helpers/date-fns";
import { IEventsSchemaResponse } from "@/services/events";
import Link from "next/link";
import { CiCalendarDate, CiLocationOn } from "react-icons/ci";
import { IoIosTimer } from "react-icons/io";
import { PiClockLight, PiKeyThin } from "react-icons/pi";

const MoreInfo = (data: IEventsSchemaResponse) => {
  const duration = resolveDuration(
    data.startDate,
    data.startTime,
    data.endDate,
    data.endTime
  );
  return (
    <>
      {/* event start date time */}
      <div className="flex flex-col lg:border-t border-muted-foreground/20 lg:pt-5">
        <h3 className="text-lg font-medium">Starts At</h3>
        <div className="text-sm ml-1">
          <CiCalendarDate className="inline-block w-4 h-4 mr-2" />
          {new Date(data.startDate).toDateString()}
        </div>
        {data.startTime && (
          <div className="text-sm ml-1">
            <PiClockLight className="inline-block w-4 h-4 mr-2" />
            {new Date(`1970-01-01T${data.startTime}`).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        )}
      </div>
      {/* event end date time */}
      {data.endDate && (
        <div className="flex flex-col lg:border-t border-muted-foreground/20 lg:pt-5">
          <h3 className="text-lg font-medium">Ends At</h3>
          <div className="text-sm ml-1">
            <CiCalendarDate className="inline-block w-4 h-4 mr-2" />
            {new Date(data.endDate).toDateString()}
          </div>
          {data.endTime && (
            <div className="text-sm ml-1">
              <PiClockLight className="inline-block w-4 h-4 mr-2" />
              {new Date(`1970-01-01T${data.endTime}`).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          )}
        </div>
      )}
      {
        // event duration
        duration && (
          <div className="flex flex-col lg:border-t border-muted-foreground/20 lg:pt-5">
            <h3 className="text-lg font-medium">Duration</h3>
            <div className="text-sm ml-1">
              <IoIosTimer className="inline-block w-4 h-4 mr-2" />
              {duration}
            </div>
          </div>
        )
      }

      {
        // event location
        data.location && (
          <div className="flex flex-col lg:border-t border-muted-foreground/20 lg:pt-5">
            <h3 className="text-lg font-medium">Location</h3>
            <div className="text-sm ml-1">
              <CiLocationOn className="inline-block w-4 h-4 mr-2" />
              {data.location}
            </div>
          </div>
        )
      }
      {
        // event registration link
        data.registrationLink && (
          <div className="flex flex-col lg:border-t border-muted-foreground/20 lg:pt-5">
            <h3 className="text-lg font-medium">Registration Link</h3>
            <div className="text-sm ml-1">
              <PiKeyThin className="inline-block w-4 h-4 mr-2" />
              <Link
                href={data.registrationLink}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline truncate max-w-fit"
              >
                {data.registrationLink?.substring(0, 25)}
                {data.registrationLink.length > 25 ? "..." : ""}
              </Link>
            </div>
          </div>
        )
      }
    </>
  );
};

export default MoreInfo;
