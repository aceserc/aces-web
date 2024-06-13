"use client";
import { ISponsorSchema } from "@/zod/sponsor.schema";
import Link from "next/link";
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
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleDeleteSponsorService } from "@/services/sponsors";
import { toast } from "sonner";
type Props = ISponsorSchema;

const SponsorCard = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: handleDeleteSponsorService,
    onError: (err: string) => {
      toast.error(err);
    },
    onSuccess: (msg) => {
      toast.success(msg);
      queryClient.invalidateQueries({
        queryKey: ["sponsors"],
      });
      setIsOpen(false);
    },
  });

  return (
    <div className="bg-background shadow-md rounded-md p-3 transition-transform relative group">
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
              <span className="font-bold">{props.name}</span> from sponsors
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

      <Link
        href={props.website ?? "#"}
        target="_blank"
        className="flex items-center justify-center w-full h-full"
      >
        <img
          src={props.logo}
          alt={props.name}
          width={80}
          height={80}
          className="object-center object-contain"
        />
      </Link>
    </div>
  );
};

export default SponsorCard;
