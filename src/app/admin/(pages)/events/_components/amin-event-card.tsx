import EventCard from "@/components/reusable/event-card";
import { IEventsSchemaResponse } from "@/services/events";

const AdminEventCard = (
  props: IEventsSchemaResponse & {
    className?: string;
  }
) => {
  return <EventCard {...props} className="shadow-none" />;
};
export default AdminEventCard;
