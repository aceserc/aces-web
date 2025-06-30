import React from "react";
import NotFound from "@/components/screens/not-found";
import { getEventBySlug, listAllEvents } from "@/server-actions/events";
import { DetailPage } from "@/components/screens/detail-page";
import { notionToMD } from "@/lib/notion";


type Props = {
  params: Promise<{
    id: string;
  }>
};

const EventDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const event = await getEventBySlug(id);

  if (!event) return <NotFound />;

  const body = await notionToMD(event.id);

  return (
    <div className="mt-12">
      <DetailPage
        type="events"
        title={event.title}
        body={body}
        createdAt={event.created_at}
        thumbnail={event.cover_image}
        location={event.location}
        registrationUrl={event.registration_url}
        duration={event.duration}
        date={event.event_date}
      />
    </div>
  );
};

export default EventDetailPage;


export async function generateStaticParams() {
  const data = await listAllEvents();

  return data.map((d) => ({
    id: d.slug,
  }));
}
