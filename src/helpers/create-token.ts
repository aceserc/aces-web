import jwt from "jsonwebtoken";

export const createToken = (email: string, expiresIn: string = "7d") => {
  const payload = { email };
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn,
  });
  return token;
};
