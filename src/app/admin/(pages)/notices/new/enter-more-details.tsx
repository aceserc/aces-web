"use client";
import TextareaWithErrorField from "@/components/reusable/TextareaWithErrorField";
import InputWithErrorField from "@/components/reusable/input-with-error-field";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { handleAddNoticeService } from "@/services/notice";
import { BasicNoticeSchema, IBasicNoticeSchema } from "@/zod/notice.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
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
  const queryClient = useQueryClient();
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const imageInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IBasicNoticeSchema>({
    resolver: zodResolver(BasicNoticeSchema),
  });

  const onSubmit: SubmitHandler<IBasicNoticeSchema> = (data) => {
    if (!thumbnail) {
      toast.error("Please upload a thumbnail");
      return;
    }
    if (!body) {
      toast.error("Please enter some content for the notice!");
      return;
    }
    mutate({ ...data, thumbnail, body, images });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: handleAddNoticeService,
    onError: (err: string) => {
      toast.error(err);
    },
    onSuccess: (data) => {
      toast.success(data);
      router.push("/admin/notices");
      queryClient.invalidateQueries({
        queryKey: ["sponsors"],
      });
    },
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          disabled={disableTrigger}
          className="fixed bottom-8 right-8 min-w-14"
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
            onClick={() => imageInputRef.current?.click()}
            className="w-full h-36 border cursor-pointer border-dashed flex border-muted-foreground/40 rounded-lg hover:border-muted-foreground flex-col items-center justify-center bg-cover bg-center bg-no-repeat text-muted-foreground"
            style={{
              backgroundImage: thumbnail
                ? `url(${URL.createObjectURL(thumbnail)})`
                : "",
            }}
          >
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              className="hidden sr-only"
              onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
            />
            <FiUploadCloud className="h-9 w-9" />
            <p>
              {thumbnail
                ? "Click to change the thumbnail"
                : "Click to upload a thumbnail"}
            </p>
          </div>
          <InputWithErrorField
            inputKey="title"
            label="Title"
            register={register}
            error={errors.title?.message}
          />
          <TextareaWithErrorField
            inputKey="metaDescription"
            label="Meta Description (SEO)"
            register={register}
            error={errors.metaDescription?.message}
          />
          <Button
            isLoading={isPending}
            disabled={!thumbnail}
            type="submit"
            className="ml-auto"
          >
            Publish
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default EnterMoreDetails;
