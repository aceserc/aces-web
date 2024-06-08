"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdAlternateEmail } from "react-icons/md";
import { GoLock } from "react-icons/go";
import { useState } from "react";
import { LuEyeOff, LuEye } from "react-icons/lu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PulseLoader } from "react-spinners";
import { LoginSchema } from "@/zod/auth.schema";
import { handleLogin } from "@/services/auth";
import { toast } from "sonner";
import GoogleLoginButton from "./google-login-button";
import signupIllustration from "@/assets/svg/signup.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import InputWithErrorField from "@/components/reusable/input-with-error-field";
import { Button } from "@/components/ui/button";
import { WHITE_COLOR } from "@/constants/colors.constants";

const AuthForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password"
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  // mutation to handle form submission
  const { mutate: mutateLogin, isPending: isLoginPending } = useMutation({
    mutationFn: handleLogin,
    onSuccess: (msg) => {
      toast.success(msg);
      queryClient
        .invalidateQueries({
          queryKey: ["user"],
        })
        .finally(() => {
          router.push("/admin/");
        });
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });

  const onSubmit = (data: any) => {
    mutateLogin(data);
  };

  return (
    <div className="min-w-screen min-h-screen flex items-center justify-center px-5 py-5 shadow-2xl shadow-blue-500/20">
      <div
        className="w-full h-fit relative animate-scale-up"
        style={{ maxWidth: "1000px" }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-shade z-[-1] rounded-3xl -rotate-2" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-3xl shadow-xl w-full overflow-hidden bg-shade"
        >
          <div className="md:flex w-full">
            <div className="hidden md:block w-1/2 bg-shade/80 py-10 px-10">
              <Image src={signupIllustration} alt="signup" />
            </div>
            <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
              <div className="text-center mb-10">
                <h1 className="font-bold text-3xl text-black-800">LOGIN</h1>
                <p>Authorized personnel only!</p>
              </div>
              <div className="flex flex-col gap-2.5">
                <InputWithErrorField
                  icon={MdAlternateEmail}
                  inputKey="email"
                  label="Email"
                  placeholder="you@mail.com"
                  register={register}
                  error={errors.email?.message}
                />
                <div className="relative">
                  <InputWithErrorField
                    icon={GoLock}
                    inputKey="password"
                    label="Password"
                    type={passwordType}
                    register={register}
                    error={errors.password?.message}
                  />
                  <button
                    type="button"
                    role="button"
                    className="absolute right-4 top-[38px]"
                    onClick={() => {
                      setPasswordType(
                        passwordType === "password" ? "text" : "password"
                      );
                    }}
                  >
                    {passwordType === "password" ? (
                      <LuEye className="w-4 h-4" />
                    ) : (
                      <LuEyeOff className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <Button
                  disabled={isLoginPending}
                  className="mt-4"
                  type="submit"
                >
                  {isLoginPending ? (
                    <PulseLoader color={WHITE_COLOR} size={8} />
                  ) : (
                    "Login!"
                  )}
                </Button>
                <div className="flex gap-2 items-center text-black-900">
                  <hr className="h-px w-1/2 " />
                  <span>OR</span>
                  <hr className="h-px w-1/2" />
                </div>

                {/* continue with google */}
                <GoogleLoginButton />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AuthForm;
