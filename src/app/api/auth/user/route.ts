import { ADMIN_AUTH_TOKEN } from "@/constants/keys.constants";
import dbConnect from "@/db/connect";
import pick from "@/helpers/pick";
import { verifyToken } from "@/helpers/verify-token";
import UserSchema from "@/models/users.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: Response) => {
  try {
    // connect to database and parse request body
    await dbConnect();

    const cookie = req.cookies.get(ADMIN_AUTH_TOKEN);

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

    return NextResponse.json({
      status: 200,
      data: pick(user.toObject(), [
        "email",
        "firstName",
        "lastName",
        "avatar",
        "isAdmin",
      ]),
      message: `Welcome back ${user.firstName}!`,
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
