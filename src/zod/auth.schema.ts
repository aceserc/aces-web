import { PASSWORD_REGEX } from "@/constants/regex.constants";
import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address").includes("gmail.com", {
    message: "Only gmail addresses are allowed!",
  }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(25, "Password must be at most 25 characters"),
});

export const SignupSchema = z.object({
  firstName: z.string().min(2, "Too short!").max(25, "Too long!"),
  lastName: z.string().min(2, "Too short!").max(25, "Too long!").optional(),
  email: z.string().email("Invalid email address").includes("gmail.com", {
    message: "Only gmail addresses are allowed!",
  }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(25, "Password must be at most 25 characters")
    .regex(
      PASSWORD_REGEX,
      "Password must contain at least one special character, one uppercase letter, one lowercase letter, and one number"
    ),
});

export type ISignupSchema = z.infer<typeof SignupSchema>;
export type ILoginSchema = z.infer<typeof LoginSchema>;

export type IUser = z.infer<typeof SignupSchema> & {
  isAdmin: boolean;
  avatar?: string;
};
