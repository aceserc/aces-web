import React from "react";
import NotFound from "@/components/screens/not-found";
import { DetailPage } from "@/components/screens/detail-page";
import { getCollection, getCollectionItemBySlug } from "@/lib/db";
import { Event } from "@/lib/db/types";


type Props = {
  params: Promise<{
    id: string;
  }>
};

const EventDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const event = getCollectionItemBySlug("events", id) as Event

  if (!event) return <NotFound />;


  return (
    <div className="mt-12">
      <DetailPage
        type="events"
        title={event.title}
        body={event.body}
        createdAt={event.created_at || ""}
        thumbnail={event.cover_image || ""}
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
  const data = getCollection("events") as Event[]

  return data.map((d) => ({
    id: d.slug,
  }));
}
