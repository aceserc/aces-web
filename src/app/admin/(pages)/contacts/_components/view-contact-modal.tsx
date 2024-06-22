import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IContactSchemaResponse } from "@/services/contact";
import { DialogClose } from "@radix-ui/react-dialog";

type Props = IContactSchemaResponse;

const ViewContactModal = (props: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          View
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Subject: {props.subject}</DialogTitle>
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
      </DialogContent>
    </Dialog>
  );
};

export default ViewContactModal;
