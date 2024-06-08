import { ADMIN_AUTH_TOKEN } from "@/constants/keys.constants";
import dbConnect from "@/db/connect";
import { verifyToken } from "@/helpers/verify-token";
import UserSchema from "@/models/users.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: Response) => {
  try {
    // connect to database and parse request body
    await dbConnect();

    const cookie = req.cookies.get(ADMIN_AUTH_TOKEN);
    let body = await req.json();
    const appointAdmin = body.isAdmin ?? true;

    if (!body.email) {
      const response = {
        status: 422,
        message: "Unprocessable Entity",
      };
      return NextResponse.json(response, { status: response.status });
    }

    const email = await verifyToken(cookie?.value!);

    if (!email) {
      const response = {
        status: 401,
        message: "Unauthorized",
      };
      return NextResponse.json(response, { status: response.status });
    }

    const user = await UserSchema.findOne({
      email,
    });

    if (!user) {
      const response = {
        status: 404,
        message: "User not found",
      };
      return NextResponse.json(response, { status: response.status });
    }

    if (!user.isAdmin) {
      const response = {
        status: 401,
        message: "Unauthorized",
      };
      return NextResponse.json(response, { status: response.status });
    }

    // set the user as admin
    await UserSchema.updateOne(
      { email: body.email },
      { isAdmin: appointAdmin }
    );

    return NextResponse.json({
      status: 200,
      message: appointAdmin
        ? `${body.email} is now an admin`
        : `${body.email} is no longer an admin!`,
    });
  } catch (e) {
    console.error(e);
    const response = {
      status: 500,
      message: "Unknown error occurred, Please try again later!",
    };
    return NextResponse.json(response, { status: response.status });
  }
};
