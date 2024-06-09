"use client";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import signupIllustration from "@/assets/svg/signup.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="min-w-screen min-h-screen flex items-center justify-center px-5 py-5 shadow-2xl shadow-blue-500/20">
      <div className="w-fit h-fit relative animate-scale-up">
        <div className="absolute top-0 left-0 w-full h-full bg-shade z-[-1] rounded-3xl -rotate-2" />
        <div className="rounded-3xl shadow-xl w-full flex flex-col items-center justify-center gap-4 p-9 overflow-hidden bg-shade">
          <div className="text-center mb-10">
            <h1 className="font-bold text-3xl text-black-800">LOGIN</h1>
            <p>Authorized personnel only!</p>
          </div>
          <div className="hidden md:block w-4/6">
            <Image src={signupIllustration} alt="signup" />
          </div>
          <SignedIn>
            <Button className="w-full">
              <Link href="/admin">Go to Admin Panel</Link>
            </Button>
          </SignedIn>
          <SignedOut>
            <SignInButton
              fallbackRedirectUrl={"/admin"}
              signUpFallbackRedirectUrl={"/admin"}
              mode="modal"
            >
              <Button className="mt-4 w-full" type="submit">
                Login!
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
