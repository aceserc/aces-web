"use client";
import SelectImage from "@/app/admin/_components/select-image";
import ElevatedInput from "@/components/reusable/elevated-input";
import InputWithErrorField from "@/components/reusable/input-with-error-field";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
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
  const [logo, setLogo] = useState<File | string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSelectImageOpen, setIsSelectImageOpen] = useState(false);
  const queryClient = useQueryClient();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
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
      reset();
      setLogo(null);
    },
  });

  const onSubmit: SubmitHandler<ISponsorSchema> = (data) => {
    if (!logo) return toast.error("Please upload a logo");
    console.log(data);
    mutate({ ...data, logo });
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(val) => {
          if (!val) {
            setLogo(null);
            setIsOpen(val);
          } else {
            setIsOpen(val);
          }
        }}
      >
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
              <button
                type="button"
                onClick={() => {
                  setIsSelectImageOpen(true);
                  setIsOpen(false);
                }}
                style={{
                  backgroundImage: `url(${
                    logo
                      ? logo instanceof File
                        ? URL.createObjectURL(logo)
                        : logo
                      : ""
                  })`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className="w-full h-32 border flex-col rounded-md cursor-pointer border-dashed border-muted-foreground/50 hover:border-muted-foreground flex items-center justify-center text-muted-foreground"
              >
                <IoCloudUploadOutline className="w-12 h-12" />
                <span className="text-xs">
                  {logo ? "Change logo" : "Upload sponsor's logo"}
                </span>
              </button>
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
            <DialogFooter className="flex sm:justify-between w-full">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <input
                  type="checkbox"
                  id="isActive"
                  onChange={(e) => {
                    setValue("isActive", e.target.checked);
                  }}
                />
                <label
                  htmlFor="isActive"
                  className="text-sm select-none font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Current Sponsor
                </label>
              </div>
              <Button
                type="submit"
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
      <SelectImage
        isOpen={isSelectImageOpen}
        onClose={() => {
          setIsSelectImageOpen(false);
          setIsOpen(true);
        }}
        onSelect={(url) => {
          setLogo(url);
          setIsSelectImageOpen(false);
          setIsOpen(true);
        }}
      />
    </>
  );
};

export default AddSponsor;
