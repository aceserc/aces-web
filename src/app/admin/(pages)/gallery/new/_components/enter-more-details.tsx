"use client";
import SelectImage from "@/app/admin/_components/select-image";
import AddTag from "@/components/reusable/add-tag";
import AddTags from "@/components/reusable/add-tags";
import InputWithErrorField from "@/components/reusable/input-with-error-field";
import TextareaWithErrorField from "@/components/reusable/text-area-with-error-field";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { handleAddBlogsService } from "@/services/blogs";
import { handleAddGalleryImageService } from "@/services/gallery";
import { handleGetTags } from "@/services/tags";
import { BlogSchema, IBlogSchema } from "@/zod/blog.schema.";
import { IFile } from "@/zod/file.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FiUploadCloud } from "react-icons/fi";
import { toast } from "sonner";

type Props = {
  disableTrigger?: boolean;
  images: File[];
};

const EnterMoreDetails = ({ disableTrigger = false, images }: Props) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const [selectedTag, setSelectedTag] = useState<string>("");

  const { data: suggestedTags, isLoading: isSuggestedTagsLoading } = useQuery({
    queryKey: ["tags", "gallery"],
    queryFn: () => handleGetTags("gallery"),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: handleAddGalleryImageService,
    onError: (err: string) => {
      toast.error(err);
    },
    onSuccess: (data) => {
      toast.success(data);
      router.push("/admin/gallery");
      queryClient.invalidateQueries({
        queryKey: ["gallery"],
      });
    },
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedTag) return toast.error("Please select a tag.");
    const fd = new FormData();
    fd.append("tag", selectedTag);
    images.forEach((i) => {
      fd.append(`images`, i);
    });
    mutate(fd);
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <SheetTrigger asChild>
          <Button
            disabled={disableTrigger}
            className="fixed bottom-8 right-8 min-w-28"
          >
            Next
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Enter More Details</SheetTitle>
          </SheetHeader>
          <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-6 h-full">
            {isSuggestedTagsLoading ? (
              <Skeleton className="w-full h-8" />
            ) : (
              <AddTag
                value={selectedTag}
                setValue={(tag) => setSelectedTag(tag)}
                suggestions={suggestedTags?.tags || []}
              />
            )}
            <hr className="my-2 w-1/2 mx-auto" />
            <Button
              isLoading={isPending}
              disabled={isSuggestedTagsLoading || !selectedTag}
              type="submit"
              className="ml-auto mt-6 min-w-36"
            >
              Publish
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EnterMoreDetails;
