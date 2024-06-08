import jwt from "jsonwebtoken";

export const verifyToken = async (token: string) => {
  let email: string | null = null;
  if (!token || token.trim() === "") {
    return email;
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, success: any) => {
    if (err) {
      email = null;
    } else {
      email = success.email;
    }
  });
  return email;
};
