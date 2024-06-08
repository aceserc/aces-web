import oauth2Client from "@/configs/oauth";
import dbConnect from "@/db/connect";
import { createToken } from "@/helpers/create-token";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import UserSchema from "@/models/users.model";
import { ADMIN_AUTH_TOKEN } from "@/constants/keys.constants";

export const POST = async (req: NextRequest, res: Response) => {
  try {
    // connect to database and parse request body
    await dbConnect();
    const token = req.nextUrl.searchParams.get("token") as string;

    return oauth2Client
      .getToken(token)
      .then(async (data: any) => {
        oauth2Client.setCredentials(data.tokens);
        const userRes = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${data.tokens.access_token}`
        );

        const userData = await userRes.json();

        // find user by email
        const user = await UserSchema.findOne({ email: userData.email });

        if (!user) {
          await UserSchema.create({
            email: userData.email,
            firstName: userData.given_name,
            lastName: userData.family_name,
            loginMethod: "oauth",
            avatar: userData.picture,
          });
          const token = createToken(user.email);
          const cookieStore = cookies();
          cookieStore.set(ADMIN_AUTH_TOKEN, token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
            domain: process.env.FRONTEND_DOMAIN,
          });
          const response = {
            status: 200,
            message: `Thank you ${userData.given_name} for signing up!`,
          };
          return NextResponse.json(response, { status: response.status });
        }

        if (user.loginMethod !== "oauth") {
          const response = {
            status: 401,
            message: "You signed up with email, Please use password!",
          };
          return NextResponse.json(response, { status: response.status });
        }

        const token = createToken(user.email);
        const cookieStore = cookies();
        cookieStore.set(ADMIN_AUTH_TOKEN, token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          path: "/",
          domain: process.env.FRONTEND_DOMAIN,
        });
        const response = {
          status: 200,
          message: `Welcome back ${userData.given_name}!`,
        };
        return NextResponse.json(response, { status: response.status });
      })
      .catch(() => {
        const response = {
          status: 500,
          message: "Google authentication failed! Please try again later.",
        };
        return NextResponse.json(response, { status: response.status });
      });
  } catch (e) {
    const res = {
      status: 500,
      message: "Unexpected error occurred. Please try again later.",
    };
    return NextResponse.json(res, { status: res.status });
  }
};
