import dbConnect from "@/db/connect";
import { ISignupSchema, SignupSchema } from "@/zod/auth.schema";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import { createToken } from "@/helpers/create-token";
import UserSchema from "@/models/users.model";
import { ADMIN_AUTH_TOKEN } from "@/constants/keys.constants";

export const POST = async (req: Request, res: Response) => {
  try {
    // connect to database and parse request body
    await dbConnect();
    let body: ISignupSchema = await req.json();

    // validate request body
    try {
      body = SignupSchema.parse(body);
    } catch (error) {
      const res = {
        status: 422,
        message: "Unprocessable Entity",
      };
      return NextResponse.json(res, { status: res.status });
    }

    const isUserExist = await UserSchema.findOne({ email: body.email });
    if (Boolean(isUserExist)) {
      const res = {
        status: 409,
        message: "User already exists, Please login!",
      };
      return NextResponse.json(res, { status: res.status });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(body.password!, 10);

    // create new user
    await UserSchema.create({
      ...body,
      password: hashedPassword,
    });

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
      status: 201,
      message: `Thank you ${body.firstName} for signing up!`,
    });
  } catch (e) {
    const res = {
      status: 500,
      message: "Unexpected error occurred. Please try again later.",
    };
    NextResponse.json(res, { status: res.status });
  }
};
