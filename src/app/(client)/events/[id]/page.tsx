import ImageViewer from "@/components/reusable/image-viewer";
import NotFound from "@/components/reusable/not-found";
import { IEventsSchemaResponse } from "@/services/events";
import { fetchData } from "@/services/fetch";
import React from "react";
import { marked } from "marked";
import DetailPage from "@/components/pages/detail-page";

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
  return (
    <div className="mt-12">
      <DetailPage
        type="events"
        title={data.title}
        body={data.body}
        createdAt={data.createdAt}
        thumbnail={data.thumbnail}
        startTime={data.startTime}
        endDate={data.endDate}
        endTime={data.endTime}
        location={data.location}
        startDate={data.startDate}
        registrationLink={data.registrationLink}
      />
    </div>
  );
};

export default EventDetailPage;
