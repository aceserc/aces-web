"use client";

import { useForm } from "react-hook-form";
import ContactInput from "./contact-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactSchema, IContactSchema } from "@/zod/contact.schema";
import FormErrorLine from "@/components/reusable/form-error-line";
import { Button } from "@/components/ui/button";
import { IoMailOpenOutline } from "react-icons/io5";
import { PiPhoneLight } from "react-icons/pi";
import useFetch from "@/hooks/use-fetch";
import API from "@/services";
import { useState } from "react";
import { handleCreateContactService } from "@/services/contact";
import { toast } from "sonner";

const ContactForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IContactSchema>({
    resolver: zodResolver(ContactSchema),
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data: IContactSchema) => {
    setIsLoading(true);
    handleCreateContactService(data)
      .then((res) => {
        toast.success(res);
        reset();
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex gap-4 sm:gap-8 flex-col sm:flex-row items-center">
        <ContactInput
          register={register}
          inputKey="name"
          label="Name"
          placeholder="John Doe"
          error={errors.name?.message}
        />
        <ContactInput
          placeholder="hey@gmail.com"
          register={register}
          inputKey="email"
          label="Email"
          type="email"
          error={errors.email?.message}
        />
      </div>
      <ContactInput
        register={register}
        inputKey="subject"
        label="Subject*"
        error={errors.subject?.message}
        placeholder="I would like to..."
        autoComplete="off"
      />
      <div className="w-full group">
        <label htmlFor="body" className="text-base font-medium px-1">
          Message*
        </label>
        <textarea
          {...register("body")}
          placeholder="Hi there!..."
          className="w-full px-3 py-1.5 text-base min-h-28 rounded-md outline-none border focus:border-indigo-500 group-hover:scale-[1.005] transition-transform"
        />
        {errors.body && <FormErrorLine error={errors.body.message} />}
      </div>
      <Button
        isLoading={isLoading}
        type="submit"
        className="self-end hover:scale-[1.005] min-w-44 text-lg"
        size="lg"
      >
        Submit
      </Button>
    </form>
  );
};

export default ContactForm;
