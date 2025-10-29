"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { ContactValidationSchema } from "@/validations/contact";
import { z } from "zod";
import { useState } from "react";
import { sendContactEmail } from "@/server-actions/contact";
import { Loader, SendHorizonal } from "lucide-react";

const FormSchema = ContactValidationSchema;
type FormSchemaType = z.infer<typeof FormSchema>;

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      body: "",
    },
  });

  const onSubmit = async (values: FormSchemaType) => {
    try {
      /** Handle form submission here */
      setIsLoading(true);
      await sendContactEmail(values);
      toast.success(
        "Thank you for your message. We will reply to you as soon as possible."
      );
      form.reset();
    } catch {
      toast.error("Failed to contact. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 animate-in-from-bottom delay-300"
      >
        <div className="flex gap-4 sm:gap-8 flex-col sm:flex-row items-center">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name*</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email*</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="hey@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject*</FormLabel>
              <FormControl>
                <Input
                  placeholder="I would like to..."
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message*</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Hi there!..."
                  className="min-h-28 resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 self-end ">
          <Button
            type="reset"
            variant={"outline"}
            onClick={() => {
              form.reset();
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="min-w-32"
            disabled={form.formState.isSubmitting}
          >
            {isLoading ? (
              <>
                <Loader className="animate-spin" />
              </>
            ) : (
              <>
                Submit <SendHorizonal />
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export { ContactForm };
