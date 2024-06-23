import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
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
} from "@/components/ui/alert-dialog";
import {
  ITestimonialSchemaResponse,
  handleDeleteTestimonialService,
} from "@/services/testimonials";
type Props = ITestimonialSchemaResponse;

const ViewTestimonialModal = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: handleDeleteTestimonialService,
    onError: (err: string) => {
      toast.error(err);
    },
    onSuccess: (msg) => {
      toast.success(msg);
      queryClient.invalidateQueries({
        queryKey: ["testimonials"],
      });
      setIsOpen(false);
    },
  });
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary" size="sm">
            View
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>By: {props.endorserName}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-1 p-2">
            {props.endorserPosition && (
              <div className="flex gap-2">
                <span className="font-medium">Position:</span>
                <span>{props.endorserPosition}</span>
              </div>
            )}
            {props.endorserContactUrl && (
              <div className="flex gap-2">
                <span className="font-medium">Contact:</span>
                <a
                  href={props.endorserContactUrl}
                  target="_blank"
                  className="truncate text-blue-600 hover:underline"
                >
                  {props.endorserContactUrl.substring(0, 40)}
                  {props.endorserContactUrl.length > 40 ? "..." : ""}
                </a>
              </div>
            )}
            <div className="flex gap-2">
              <span className="font-medium">Sent At:</span>
              <span>{new Date(props.createdAt).toLocaleString()}</span>
            </div>
            <div className="flex gap-2 flex-col">
              <span className="font-medium">Message:</span>
              <p className="text-muted-foreground ml-2">{props.body}</p>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild onClick={() => setIsOpen(true)}>
              <Button variant="destructive" size="sm">
                Delete
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AlertDialog
        open={isOpen}
        onOpenChange={(val: boolean) => setIsOpen(val)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              <span className="font-bold">{props.endorserName}</span>&apos;s{" "}
              testimonial! list.
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
    </>
  );
};

export default ViewTestimonialModal;
