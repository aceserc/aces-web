import { RESPONSES } from "@/constants/response.constant";
import dbConnect from "@/db/connect";
import { isAdmin } from "@/helpers/is-admin";
import sponsorModel from "@/models/sponsor.model";
import { SponsorSchema as ZodSponsorSchema } from "@/zod/sponsor.schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

/**
 *  Handles the POST request for adding a sponsor.
 *
 * @body name - The name of the sponsor.
 * @body logo - The logo of the sponsor.
 * @body link - The link to the sponsor's website.
 */
export const POST = async (req: NextRequest) => {
  try {
    // connect to database and parse request body
    await dbConnect();

    if (!(await isAdmin())) {
      return NextResponse.json(RESPONSES.UNAUTHORIZED_ACCESS, {
        status: RESPONSES.UNAUTHORIZED_ACCESS.status,
      });
    }

    let body = await req.json();

    try {
      body = ZodSponsorSchema.parse(body);
    } catch (e) {
      return NextResponse.json(
        {
          ...RESPONSES.UNPROCESSABLE_ENTITY,
          errors: JSON.stringify(e),
        },
        {
          status: RESPONSES.UNPROCESSABLE_ENTITY.status,
        }
      );
    }

    const sponsor = await sponsorModel.create(body);
    await sponsor.save();

    return NextResponse.json(
      {
        ...RESPONSES.CREATED,
        message: "Sponsor added successfully",
      },
      {
        status: RESPONSES.CREATED.status,
      }
    );
  } catch (e) {
    return NextResponse.json(RESPONSES.INTERNAL_SERVER_ERROR, {
      status: RESPONSES.INTERNAL_SERVER_ERROR.status,
    });
  }
};

/**
 * Handles the GET request for fetching all sponsors.
 *
 * @returns data - The list of sponsors.
 *
 */
export const GET = async (req: NextRequest) => {
  try {
    await dbConnect();
    const isActive = req.nextUrl.searchParams.get("isActive");

    let sponsors: any;
    if (isActive === "true") {
      sponsors = await sponsorModel.find({ isActive: true });
    } else if (isActive === "false") {
      sponsors = await sponsorModel.find({ isActive: false });
    } else {
      sponsors = await sponsorModel.find();
    }

    return NextResponse.json({
      data: sponsors,
      isActive,
    });
  } catch (e) {
    return NextResponse.json(RESPONSES.INTERNAL_SERVER_ERROR, {
      status: RESPONSES.INTERNAL_SERVER_ERROR.status,
    });
  }
};

/**
 *  Handles the DELETE request for deleting a sponsor.
 *
 * @query id - The id of the sponsor to delete.
 */
export const DELETE = async (req: NextRequest) => {
  try {
    await dbConnect();

    if (!(await isAdmin())) {
      return NextResponse.json(RESPONSES.UNAUTHORIZED_ACCESS, {
        status: RESPONSES.UNAUTHORIZED_ACCESS.status,
      });
    }

    const id = req.nextUrl.searchParams.get("id");

    const sponsor = await sponsorModel.findByIdAndDelete(id);

    if (!sponsor) {
      return NextResponse.json(
        { ...RESPONSES.NOT_FOUND, message: "Sponsor not found" },
        {
          status: RESPONSES.NOT_FOUND.status,
        }
      );
    }

    return NextResponse.json(
      {
        ...RESPONSES.SUCCESS,
        message: "Sponsor deleted successfully",
      },
      {
        status: RESPONSES.SUCCESS.status,
      }
    );
  } catch (e) {
    return NextResponse.json(RESPONSES.INTERNAL_SERVER_ERROR, {
      status: RESPONSES.INTERNAL_SERVER_ERROR.status,
    });
  }
};
