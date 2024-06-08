import dbConnect from "@/db/connect";
import { LoginSchema } from "@/zod/auth.schema";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { createToken } from "@/helpers/create-token";
import { cookies } from "next/headers";
import UsersSchema from "@/models/users.model";
import { ADMIN_AUTH_TOKEN } from "@/constants/keys.constants";

export const POST = async (req: Request, res: Response) => {
  try {
    // connect to database and parse request body
    await dbConnect();
    let body = await req.json();

    // validate request body
    try {
      body = LoginSchema.parse(body);
    } catch (error) {
      const res = {
        status: 422,
        message: "Unprocessable Entity",
      };
      return NextResponse.json(res, { status: res.status });
    }

    // find user by email
    const user = await UsersSchema.findOne({ email: body.email });

    // check if user exists
    if (!user) {
      const res = {
        status: 404,
        message: "User not found, Please signup instead!",
      };
      return NextResponse.json(res, { status: res.status });
    }

    if (user.loginMethod === "oauth") {
      const res = {
        status: 401,
        message: "You signed up with google, Please continue with google!",
      };
      return NextResponse.json(res, { status: res.status });
    }

    // compare password
    const isPasswordValid = await bcrypt.compare(body.password, user.password!);

    // check if password is valid

    if (!isPasswordValid) {
      const res = {
        status: 401,
        message: "Invalid credentials, Please try again!",
      };
      return NextResponse.json(res, { status: res.status });
    }

    const token = createToken(body.email);
    const cookieStore = cookies();
    cookieStore.set(ADMIN_AUTH_TOKEN, token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      domain: process.env.FRONTEND_DOMAIN,
    });

    return NextResponse.json({
      status: 200,
      message: `Welcome back ${user.firstName}!`,
    });
  } catch (e) {
    const res = {
      status: 500,
      message: "Unexpected error occurred. Please try again later.",
    };
    NextResponse.json(res, { status: res.status });
  }
};
