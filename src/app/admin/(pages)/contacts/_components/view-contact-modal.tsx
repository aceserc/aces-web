import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  IContactSchemaResponse,
  handleDeleteContactService,
} from "@/services/contact";
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
type Props = IContactSchemaResponse;

const ViewContactModal = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: handleDeleteContactService,
    onError: (err: string) => {
      toast.error(err);
    },
    onSuccess: (msg) => {
      toast.success(msg);
      queryClient.invalidateQueries({
        queryKey: ["contacts"],
      });
      setIsOpen(false);
    },
  });
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            View
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="break-words">
              Subject: {props.subject}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-1 p-2">
            <div className="flex gap-2">
              <span className="font-medium">Name:</span>
              <span>{props.name ?? "Anonymous"}</span>
            </div>
            {props.email && (
              <div className="flex gap-2">
                <span className="font-medium">Email:</span>
                <span>{props.email ?? "Anonymous"}</span>
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
              This action cannot be undone. This will permanently delete
              <span className="font-bold"> {props.subject} </span> from contact!
              list.
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

export default ViewContactModal;
