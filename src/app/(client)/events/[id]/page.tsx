import ImageViewer from "@/components/reusable/image-viewer";
import NotFound from "@/components/reusable/not-found";
import { IEventsSchemaResponse } from "@/services/events";
import { fetchData } from "@/services/fetch";
import React from "react";
import { marked } from "marked";
import { CiCalendarDate } from "react-icons/ci";
import { PiClockLight } from "react-icons/pi";
import { resolveDuration } from "@/helpers/date-fns";
import { IoIosTimer } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import { PiKeyThin } from "react-icons/pi";
import Link from "next/link";

type IEvents = {
  data: IEventsSchemaResponse & {
    body: string;
  };
};
type Props = {
  params: {
    id: string;
  };
};

const EventDetailPage = async ({ params: { id } }: Props) => {
  const res = await fetchData<IEvents>(`/api/events?id=${id}`);

  if (!res) return <NotFound />;

  const { data } = res;
  const htmlContent = marked(data.body);
  return (
    <div className="max-w-7xl wrapper pt-7 md:pt-16">
      <ImageViewer
        src={data.thumbnail}
        alt={data.title}
        className="w-full shadow-lg object-contain object-left-bottom mx-6 max-w-fit max-h-fit md:max-h-80 rounded-md h-64 lg:h-96 z-20 select-none border-muted"
      />
      <div className="border border-muted-foreground/40 rounded-md -mt-20 pt-28 px-6 pb-6 flex gap-4">
        <div className="flex-grow flex flex-col gap-3">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium underline">
            {data.title}
          </h1>
          <div className="flex gap-6 flex-wrap lg:hidden mt-6">
            <MoreInfo {...data} />
          </div>
          <div className="prose prose-p:mb-0 prose-p:mt-0 prose-p:w-full w-full min-w-fit prose-thead:text-left prose-hr:mt-3 prose-hr:mb-3 prose-a:text-blue-600">
            <div
              className="w-full"
              dangerouslySetInnerHTML={{
                __html: htmlContent,
              }}
            />
          </div>
        </div>
        <div className="max-w-[250px] hidden lg:flex w-[250px] h-fit border-l border-muted-foreground/20 pl-5 flex-col gap-3 pb-5">
          <MoreInfo {...data} />
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;

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
