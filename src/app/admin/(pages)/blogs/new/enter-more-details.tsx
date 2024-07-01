"use client";
import SelectImage from "@/app/admin/_components/select-image";
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
import { handleGetTags } from "@/services/tags";
import { BlogSchema, IBlogSchema } from "@/zod/blog.schema.";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FiUploadCloud } from "react-icons/fi";
import { toast } from "sonner";

type Props = {
  disableTrigger?: boolean;
  images: string[];
  body: string;
};

const EnterMoreDetails = ({ disableTrigger = false, body, images }: Props) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const [thumbnail, setThumbnail] = useState<File | string | null>(null);
  const [isThumbnailUploadOpen, setIsThumbnailUploadOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const { data: suggestedTags, isLoading: isSuggestedTagsLoading } = useQuery({
    queryKey: ["tags", "blogs"],
    queryFn: () => handleGetTags("blogs"),
  });

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<IBlogSchema>({
    resolver: zodResolver(BlogSchema),
  });

  const onSubmit: SubmitHandler<IBlogSchema> = (data) => {
    if (!thumbnail) {
      toast.error("Please upload a thumbnail");
      return;
    }
    if (!body) {
      toast.error("Please enter some content for the blog!");
      return;
    }
    if (selectedTags.length < 1) {
      toast.error("Please add some tags!");
      return;
    }
    if (selectedTags.length > 3) {
      toast.error("You can only add upto 3 tags!");
      return;
    }
    console.log(data);
    mutate({ ...data, thumbnail, body, images, tags: selectedTags });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: handleAddBlogsService,
    onError: (err: string) => {
      toast.error(err);
    },
    onSuccess: (data) => {
      toast.success(data);
      router.push("/admin/blogs");
      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });
    },
  });

  return (
    <>
      <SelectImage
        isOpen={isThumbnailUploadOpen}
        onClose={() => {
          setIsThumbnailUploadOpen(false);
          setIsOpen(true);
        }}
        onSelect={(file) => {
          setThumbnail(file);
        }}
      />
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 mt-6 h-full"
          >
            <div
              role="button"
              onClick={() => {
                setIsThumbnailUploadOpen(true);
                setIsOpen(false);
              }}
              className="w-full h-36 border cursor-pointer border-dashed flex border-muted-foreground/40 rounded-lg hover:border-muted-foreground flex-col items-center justify-center bg-cover bg-center bg-no-repeat text-muted-foreground"
              style={{
                backgroundImage: thumbnail
                  ? thumbnail instanceof File
                    ? `url(${URL.createObjectURL(thumbnail)})`
                    : `url(${thumbnail})`
                  : "",
              }}
            >
              <FiUploadCloud className="h-9 w-9" />
              <p>
                {thumbnail
                  ? "Click to change the thumbnail"
                  : "Click to upload a thumbnail"}
              </p>
            </div>
            <InputWithErrorField
              inputKey="title"
              label="Title*"
              register={register}
              error={errors.title?.message}
            />
            <TextareaWithErrorField
              inputKey="metaDescription"
              label="Meta Description*"
              register={register}
              error={errors.metaDescription?.message}
            />
            {isSuggestedTagsLoading ? (
              <Skeleton className="w-full h-8" />
            ) : (
              <AddTags
                selectedTags={selectedTags}
                onChange={(tags) => setSelectedTags(tags)}
                suggestions={suggestedTags?.tags || []}
              />
            )}
            <hr className="my-2 w-1/2 mx-auto" />
            <Button
              isLoading={isPending}
              disabled={
                !thumbnail || selectedTags.length < 1 || isSuggestedTagsLoading
              }
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
