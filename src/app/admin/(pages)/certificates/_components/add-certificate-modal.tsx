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
import { PlusIcon } from "lucide-react";
import SelectEvent from "./select-event";

const AddCertificateModal = () => {

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button >
            <PlusIcon />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="break-words">
              Add a new certificate
            </DialogTitle>
          </DialogHeader>

          <div

          >
            <SelectEvent
              onSelect={(id) => {
                console.log(id);
              }}
            />

          </div>

          <DialogFooter>

          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddCertificateModal;
