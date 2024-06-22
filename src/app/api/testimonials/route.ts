import { RESPONSES } from "@/constants/response.constant";
import dbConnect from "@/db/connect";
import { isAdmin } from "@/helpers/is-admin";
import { fromError } from "zod-validation-error";
import { NextRequest, NextResponse } from "next/server";
import { TestimonialSchema } from "@/zod/testimonial";
import testimonialModel from "@/models/testimonial.model";

// handle POST request for adding a contact
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
      body = TestimonialSchema.parse(body);
    } catch (e) {
      const message = fromError(e).toString();
      return NextResponse.json(
        {
          ...RESPONSES.UNPROCESSABLE_ENTITY,
          errors: JSON.stringify(e),
          message,
        },
        {
          status: RESPONSES.UNPROCESSABLE_ENTITY.status,
        }
      );
    }

    const contact = await testimonialModel.create(body);
    await contact.save();

    return NextResponse.json(
      {
        ...RESPONSES.CREATED,
        message: "Thank you for your feedback!",
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
 * Handles the GET request for fetching all testimonial.
 * sortBy: startDate, endDate, createdAt, updatedAt, title
 * order: asc, desc
 * limit: number
 * page: number
 * search: string // search by title
 * onlyIds: boolean // return only ids
 */
export const GET = async (req: NextRequest) => {
  try {
    await dbConnect();

    const getAll = req.nextUrl.searchParams.get("all");
    const pageNo = parseInt(req.nextUrl.searchParams.get("page") || "1");
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "9");
    const sortBy = req.nextUrl.searchParams.get("sortBy") || "startDate";
    const order = req.nextUrl.searchParams.get("order") || "desc";
    const search = req.nextUrl.searchParams.get("search") || ""; // search by title case insensitive

    // find  relevant testimonial

    if (getAll === "true") {
      const testimonial = await testimonialModel
        .find({})
        .sort({ createdAt: -1 });

      return NextResponse.json({
        data: testimonial || [],
        total: testimonial.length,
      });
    }

    const testimonial = await testimonialModel
      .find({
        endorserName: { $regex: new RegExp(search, "i") },
      })
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .skip((pageNo - 1) * limit)
      .limit(limit);

    const totalContacts = await testimonialModel.countDocuments({
      name: { $regex: new RegExp(search, "i") },
    });

    const remainingResults = Math.max(0, totalContacts - pageNo * limit);
    const totalPages = Math.ceil(totalContacts / limit);

    return NextResponse.json({
      data: testimonial || [],
      pageNo: pageNo,
      results: testimonial.length,
      total: totalContacts,
      remainingResults,
      totalPages,
      resultsOnNextPage:
        remainingResults > 0 ? Math.min(remainingResults, limit) : 0,
    });
  } catch (e) {
    return NextResponse.json(RESPONSES.INTERNAL_SERVER_ERROR, {
      status: RESPONSES.INTERNAL_SERVER_ERROR.status,
    });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    await dbConnect();

    if (!(await isAdmin())) {
      return NextResponse.json(RESPONSES.UNAUTHORIZED_ACCESS, {
        status: RESPONSES.UNAUTHORIZED_ACCESS.status,
      });
    }

    const id = req.nextUrl.searchParams.get("id");

    await testimonialModel.findByIdAndDelete(id);

    return NextResponse.json(
      {
        ...RESPONSES.SUCCESS,
        message: "Testimonial deleted successfully",
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
