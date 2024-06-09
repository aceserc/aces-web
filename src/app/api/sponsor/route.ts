import { ADMIN_AUTH_TOKEN } from "@/constants/keys.constants";
import dbConnect from "@/db/connect";
import sponsorModel from "@/models/sponsor.model";
import UserSchema from "@/models/users.model";
import { SponsorSchema as ZodSponsorSchema } from "@/zod/sponsor.schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: Response) => {
  try {
    // connect to database and parse request body
    await dbConnect();

    const authUser = await currentUser();

    if (!authUser || authUser.publicMetadata.role !== "admin") {
      const response = {
        status: 401,
        message: "Unauthorized",
      };
      return NextResponse.json(response, { status: response.status });
    }

    let body = await req.json();

    try {
      body = ZodSponsorSchema.parse(body);
    } catch (e) {
      const response = {
        status: 422,
        message: "Unprocessable Entity",
      };
      return NextResponse.json(response, { status: response.status });
    }

    const sponsor = await sponsorModel.create(body);
    await sponsor.save();

    return NextResponse.json({
      status: 200,
      message: "Sponsor created successfully",
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

export const GET = async (req: NextRequest, res: Response) => {
  try {
    await dbConnect();

    const sponsors = await sponsorModel.find();

    return NextResponse.json({
      status: 200,
      data: sponsors,
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

export const DELETE = async (req: NextRequest, res: Response) => {
  try {
    await dbConnect();

    const authUser = await currentUser();

    if (!authUser || authUser.publicMetadata.role !== "admin") {
      const response = {
        status: 401,
        message: "Unauthorized",
      };
      return NextResponse.json(response, { status: response.status });
    }

    const id = req.nextUrl.searchParams.get("id");

    const sponsor = await sponsorModel.findByIdAndDelete(id);

    if (!sponsor) {
      const response = {
        status: 404,
        message: "Sponsor not found",
      };
      return NextResponse.json(response, { status: response.status });
    }

    return NextResponse.json({
      status: 200,
      message: "Sponsor deleted successfully",
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
