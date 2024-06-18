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
import MoreInfo from "./_components/more-info";
import API from "@/services";

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

export async function generateStaticParams() {
  const response = await fetchData<{
    data: string[];
  }>(`${API.events}?onlyIds=true`);

  if (!response) return [];
  let params = response?.data.map((id) => ({ id }));
  return params;
}
