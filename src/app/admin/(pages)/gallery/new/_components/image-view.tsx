import {
  IHandleGetGalleryImagesService,
  handleDeleteGalleryImageService,
} from "@/services/gallery";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
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
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const ImageView = ({
  image,
  _id,
  tag,
}: IHandleGetGalleryImagesService["images"][0]) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: handleDeleteGalleryImageService,
    onError: (err: string) => {
      toast.error(err);
    },
    onSuccess: (msg) => {
      toast.success(msg);
      queryClient.invalidateQueries({
        queryKey: ["gallery"],
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
            <MdDeleteOutline className="text-white h-5 w-5" />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              image from the gallery. events list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button onClick={() => mutate(_id)} isLoading={isPending}>
              Continue
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Link href={image.url} target="_blank" className="relative">
        <Badge className="absolute top-2 left-2">{tag}</Badge>
        <img
          src={image.url}
          className="h-52 w-full object-cover object-center border border-gray-200 shadow-inner rounded-lg"
        />
      </Link>
    </div>
  );
};

export default ImageView;
