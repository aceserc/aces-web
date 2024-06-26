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
    <div
      style={{
        filter: "drop-shadow(0px 17px 44px rgba(179, 179, 179, 0.25))",
      }}
      className="flex flex-col items-center justify-center gap-12 px-3 sm:px-6 py-9 xl:px-20 xl:py-20 bg-white rounded-xl max-w-4xl m-auto"
    >
      <h2 className="text-4xl md:text-5xl font-semibold text-center">
        Get in touch today!
      </h2>
      <div className="flex gap-4 items-center">
        {[
          {
            type: "email",
            value: "hi@example.com",
            icon: IoMailOpenOutline,
          },
          {
            type: "phone",
            value: "1234567890",
            icon: PiPhoneLight,
          },
        ].map((item, index) => (
          <a
            style={{
              boxShadow: "0px 8px 33px 0px rgba(181, 181, 181, 0.25)",
            }}
            key={index}
            href={
              item.type === "email"
                ? `mailto:${item.value}`
                : `tel:${item.value}`
            }
            className="flex gap-2 items-center justify-center px-4 py-3 rounded-xl border border-muted hover:scale-[1.005] transition-transform "
          >
            <item.icon className="text-xl" />
            <span>{item.value}</span>
          </a>
        ))}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex gap-8 items-center">
          <ContactInput
            register={register}
            inputKey="name"
            label="Name"
            error={errors.name?.message}
          />
          <ContactInput
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
    </div>
  );
};

export default ContactForm;
