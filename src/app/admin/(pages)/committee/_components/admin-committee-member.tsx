"use client";

import CommitteeMember from "@/components/reusable/committee-member";
import { ICommitteeSchemaWithAvatar } from "@/zod/committee.schema";
import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleDeleteCommitteeService } from "@/services/committee";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type Props = ICommitteeSchemaWithAvatar;

const AdminCommitteeMember = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: handleDeleteCommitteeService,
    onError: (err: string) => {
      toast.error(err);
    },
    onSuccess: (msg) => {
      toast.success(msg);
      queryClient.invalidateQueries({
        queryKey: ["committees"],
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
              <span className="font-bold">{props.name}</span> from committee
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
      <CommitteeMember {...props} />
    </div>
  );
};

export default AdminCommitteeMember;
