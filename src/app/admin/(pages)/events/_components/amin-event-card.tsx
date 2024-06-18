import EventCard from "@/components/reusable/event-card";
import {
  IEventsSchemaResponse,
  handleDeleteEventService,
} from "@/services/events";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MdDeleteOutline } from "react-icons/md";
import { Button } from "@/components/ui/button";

const AdminEventCard = ({
  location,
  ...props
}: IEventsSchemaResponse & {
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: handleDeleteEventService,
    onError: (err: string) => {
      toast.error(err);
    },
    onSuccess: (msg) => {
      toast.success(msg);
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
      setIsOpen(false);
    },
  });
  return (
    <div className="relative group">
      {/* delete button */}
      <AlertDialog
        open={isOpen}
        onOpenChange={(val: boolean) => setIsOpen(val)}
      >
        <AlertDialogTrigger asChild>
          <button className="absolute -top-2 z-20 -right-2 p-1 bg-red-500 rounded-full scale-0 group-hover:scale-100 transition-transform">
            <MdDeleteOutline className="text-white" />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              <span className="font-bold">
                {props.title.substring(0, 20)}...
              </span>{" "}
              from events list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button onClick={() => mutate(props._id)} isLoading={isPending}>
              Continue
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <EventCard {...props} className="shadow-none" />
    </div>
  );
};
export default AdminEventCard;
