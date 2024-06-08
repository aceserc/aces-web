import { handleGoogleLogin } from "@/services/auth";
import { useGoogleLogin } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import { PulseLoader } from "react-spinners";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PRIMARY_SPINNER_COLOR } from "@/constants/colors.constants";
import Image from "next/image";

const GoogleLoginButton = () => {
  const startGoogleLogin = useGoogleLogin({
    onSuccess: (response) => {
      if (response["code"]) {
        mutateGoogleLogin(response["code"]);
      } else {
        toast.error("Google login failed, Please try again!");
      }
    },
    onError: () => {
      toast.error("Google login failed, Please try again!");
    },

    flow: "auth-code",
  });

  // request for google login mutation
  const { mutate: mutateGoogleLogin, isPending: isGoogleLoginPending } =
    useMutation({
      mutationFn: handleGoogleLogin,
      onSuccess: (msg) => {
        toast.success(msg);
      },
      onError: (err: string) => {
        toast.error(err);
      },
    });
  return (
    <Button
      onClick={startGoogleLogin}
      className="flex gap-3 items-center justify-center"
      role="button"
      type="button"
      variant="secondary"
    >
      {isGoogleLoginPending ? (
        <PulseLoader size={8} color={PRIMARY_SPINNER_COLOR} />
      ) : (
        <>
          <Image
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
            height={20}
            width={20}
            quality={100}
          />
          <span>Login with Google</span>
        </>
      )}
    </Button>
  );
};
export default GoogleLoginButton;
