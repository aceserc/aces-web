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
import { CommitteeSchema, ICommitteeSchema } from "@/zod/committee.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { GoPlus } from "react-icons/go";
import { IoCloudUploadOutline } from "react-icons/io5";
import { toast } from "sonner";
import SelectPost from "./select-post";
import FormErrorLine from "@/components/reusable/form-error-line";
import { Input } from "@/components/ui/input";
import { MdDeleteOutline } from "react-icons/md";
import { handleAddCommitteeService } from "@/services/committee";

const AddMember = () => {
  const [avatar, setLogo] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [socialLinks, setSocialLinks] = useState<string[]>([]);
  const [socialLinkValue, setSocialLinkValue] = useState<string>("");
  const queryClient = useQueryClient();
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    reset,
  } = useForm<ICommitteeSchema>({
    resolver: zodResolver(CommitteeSchema.omit({ socialLinks: true })),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: handleAddCommitteeService,
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
      setSocialLinks([]);
    },
  });

  const onSubmit: SubmitHandler<ICommitteeSchema> = (data) => {
    if (!avatar) return toast.error("Please upload a avatar");
    if (socialLinks.length === 0) return toast.error("Please add social links");
    mutate({ ...data, avatar, socialLinks });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(val) => setIsOpen(val)}>
      <DialogTrigger asChild>
        <Button className="flex items-center justify-center gap-2">
          <span>Add Member</span>
          <GoPlus className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add Member</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 my-6">
            <label
              htmlFor="avatar"
              style={{
                backgroundImage: `url(${
                  avatar ? URL.createObjectURL(avatar) : ""
                })`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              className="w-full h-32 border flex-col rounded-md cursor-pointer border-dashed border-muted-foreground/50 hover:border-muted-foreground flex items-center justify-center text-muted-foreground"
            >
              <input
                type="file"
                id="avatar"
                className="hidden sr-only"
                onChange={(e) => {
                  if (e.target.files) setLogo(e.target.files[0]);
                }}
              />
              <IoCloudUploadOutline className="w-12 h-12" />
              <span className="text-xs">
                {avatar ? avatar.name : "Upload avatar"}
              </span>
            </label>
            <InputWithErrorField
              label="Name*"
              inputKey="name"
              error={errors.name?.message}
              register={register}
            />
            <div className="flex flex-col">
              <SelectPost
                occupiedPosts={["Advisor"]}
                setPost={(post) => {
                  setValue("post", post);
                }}
              />
              {errors.post && <FormErrorLine error={errors.post.message} />}
            </div>
            <div className="w-full group">
              <label htmlFor="contact" className="text-xs font-semibold px-1">
                Contact
              </label>
              <input
                value={socialLinkValue}
                onChange={(e) => setSocialLinkValue(e.currentTarget.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (socialLinks.length === 3) {
                      toast.error("You can only add 3 social links");
                      return;
                    }
                    setSocialLinks((prev) => [...prev, socialLinkValue]);
                    setSocialLinkValue("");
                  }
                }}
                className="w-full px-3 py-1.5 text-sm rounded-sm outline-none border focus:border-indigo-500 group-hover:scale-[1.01] transition-transform"
              />
            </div>
            <div className="flex flex-col text-sm gap-1 max-h-24 overflow-y-auto">
              {socialLinks?.length === 0 ? (
                <span className="text-red-500">No social links added</span>
              ) : (
                socialLinks?.map((link, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <input
                      className="w-full px-3 py-1.5 text-sm rounded-sm outline-none border focus:border-indigo-500"
                      value={link}
                      disabled
                    />
                    <button
                      onClick={() => {
                        setSocialLinks((prev) =>
                          prev.filter((_, i) => i !== index)
                        );
                      }}
                      className="text-base text-red-500"
                    >
                      <MdDeleteOutline />
                    </button>
                  </div>
                ))
              )}
            </div>
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

export default AddMember;
