"use client";
import ElevatedInput from "@/components/reusable/elevated-input";
import InputWithErrorField from "@/components/reusable/input-with-error-field";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { handleAddSponsorService } from "@/services/sponsors";
import { ISponsorSchema, SponsorSchema } from "@/zod/sponsor.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { GoPlus } from "react-icons/go";
import { IoCloudUploadOutline } from "react-icons/io5";
import { toast } from "sonner";

const AddSponsor = () => {
  const [logo, setLogo] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ISponsorSchema>({
    resolver: zodResolver(
      SponsorSchema.omit({
        logo: true,
      })
    ),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: handleAddSponsorService,
    onError: (err: string) => {
      toast.error(err);
    },
    onSuccess: (data) => {
      toast.success(data);
      setIsOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["sponsors"],
      });
    },
  });

  const onSubmit: SubmitHandler<ISponsorSchema> = (data) => {
    if (!logo) return toast.error("Please upload a logo");
    mutate({ ...data, logo });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(val) => setIsOpen(val)}>
      <DialogTrigger asChild>
        <Button className="flex items-center justify-center gap-2">
          <span>Add Sponsor</span>
          <GoPlus className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add Sponsor</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 my-6">
            <label
              htmlFor="logo"
              style={{
                backgroundImage: `url(${
                  logo ? URL.createObjectURL(logo) : ""
                })`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              className="w-full h-32 border flex-col rounded-md cursor-pointer border-dashed border-muted-foreground/50 hover:border-muted-foreground flex items-center justify-center text-muted-foreground"
            >
              <input
                type="file"
                id="logo"
                className="hidden sr-only"
                onChange={(e) => {
                  if (e.target.files) setLogo(e.target.files[0]);
                }}
              />
              <IoCloudUploadOutline className="w-12 h-12" />
              <span className="text-xs">
                {logo ? logo.name : "Upload sponsor's logo"}
              </span>
            </label>
            <InputWithErrorField
              label="Name*"
              inputKey="name"
              error={errors.name?.message}
              register={register}
            />
            <InputWithErrorField
              label="Website*"
              inputKey="website"
              error={errors.website?.message}
              register={register}
            />
          </div>
          <DialogFooter className="sm:justify-end">
            <Button
              isLoading={isPending}
              className="min-w-24"
              variant="secondary"
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSponsor;
