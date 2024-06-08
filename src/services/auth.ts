import { ILoginSchema, ISignupSchema, IUser } from "@/zod/auth.schema";
import API from ".";
import axios from "axios";

export const handleLogin = async (data: ILoginSchema): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .post(API.login, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data?.message ?? "Login successful!");
      })
      .catch((err) => {
        reject(
          err?.response?.data?.message ?? "Login failed, Please try again!"
        );
      });
  });
};

export const handleGoogleLogin = async (token: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${API.googleLogin}?token=${token}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        resolve(res.data?.message ?? "Login successful!");
      })
      .catch((err) => {
        reject(
          err?.response?.data?.message ??
            "Google login failed, Please try again!"
        );
      });
  });
};

export const handleGetUserDetails = async (): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    axios
      .get(API.user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data?.data);
      })
      .catch((err) => {
        reject(
          err?.response?.data?.message ??
            "Failed to get user details, Please try again!"
        );
      });
  });
};
