"use client";
import SelectImage from "@/app/admin/_components/select-image";
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
import { handleCreateTestimonialService } from "@/services/testimonials";
import { ITestimonialSchema, TestimonialSchema } from "@/zod/testimonial";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FiUploadCloud } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { toast } from "sonner";

const AddTestimonial = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const [avatar, setAvatar] = useState<File | string | null>(null);
  const [isAvatarUploadOpen, setIsAvatarUploadOpen] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ITestimonialSchema>({
    resolver: zodResolver(TestimonialSchema),
  });

  const onSubmit: SubmitHandler<ITestimonialSchema> = (data) => {
    mutate({ ...data, endorserAvatar: avatar });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: handleCreateTestimonialService,
    onError: (err: string) => {
      toast.error(err);
    },
    onSuccess: (data) => {
      toast.success(data);
      router.push("/admin/testimonials");
      queryClient.invalidateQueries({
        queryKey: ["testimonials"],
      });
      setIsOpen(false);
      reset();
      setAvatar(null);
    },
  });

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <>
      <SelectImage
        isOpen={isAvatarUploadOpen}
        onClose={() => {
          setIsAvatarUploadOpen(false);
          setIsOpen(true);
        }}
        onSelect={(file) => {
          setAvatar(file);
        }}
      />
      <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <SheetTrigger asChild>
          <Button className="flex items-center justify-center gap-2">
            <span>Add Testimonial</span>
            <GoPlus className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add new testimonial</SheetTitle>
          </SheetHeader>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 mt-6 h-full"
          >
            <div
              role="button"
              onClick={() => {
                setIsAvatarUploadOpen(true);
                setIsOpen(false);
              }}
              className="w-full h-36 border cursor-pointer border-dashed flex border-muted-foreground/40 rounded-lg hover:border-muted-foreground flex-col items-center justify-center bg-cover bg-center bg-no-repeat text-muted-foreground"
              style={{
                backgroundImage: avatar
                  ? avatar instanceof File
                    ? `url(${URL.createObjectURL(avatar)})`
                    : `url(${avatar})`
                  : "",
              }}
            >
              <FiUploadCloud className="h-9 w-9" />
              <p>
                {avatar
                  ? "Click to change the avatar"
                  : "Click to upload a avatar"}
              </p>
            </div>
            <InputWithErrorField
              inputKey="endorserName"
              label="Name*"
              register={register}
              error={errors.endorserName?.message}
            />
            <InputWithErrorField
              inputKey="endorserPosition"
              label="Position*"
              register={register}
              error={errors.endorserPosition?.message}
            />
            <InputWithErrorField
              inputKey="endorserContactUrl"
              label="Contact URL"
              register={register}
              error={errors.endorserContactUrl?.message}
            />
            <TextareaWithErrorField
              inputKey="body"
              label="Body*"
              register={register}
              error={errors.body?.message}
              className="min-h-32"
            />
            <hr className="my-2 w-1/2 mx-auto" />
            <Button
              isLoading={isPending}
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

export default AddTestimonial;
