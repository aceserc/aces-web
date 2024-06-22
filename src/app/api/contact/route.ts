import { RESPONSES } from "@/constants/response.constant";
import dbConnect from "@/db/connect";
import { isAdmin } from "@/helpers/is-admin";
import { fromError } from "zod-validation-error";
import { NextRequest, NextResponse } from "next/server";
import { ContactSchema } from "@/zod/contact.schema";
import contactModel from "@/models/contact.model";

// handle POST request for adding a contact
export const POST = async (req: NextRequest) => {
  try {
    // connect to database and parse request body
    await dbConnect();

    let body = await req.json();

    try {
      body = ContactSchema.parse(body);
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

    const contact = await contactModel.create(body);
    await contact.save();

    return NextResponse.json(
      {
        ...RESPONSES.CREATED,
        message: "Thank you for contacting us! We will get back to you soon.",
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
 * Handles the GET request for fetching all contacts.
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

    if (!(await isAdmin())) {
      return NextResponse.json(RESPONSES.UNAUTHORIZED_ACCESS, {
        status: RESPONSES.UNAUTHORIZED_ACCESS.status,
      });
    }

    const pageNo = parseInt(req.nextUrl.searchParams.get("page") || "1");
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "9");
    const sortBy = req.nextUrl.searchParams.get("sortBy") || "startDate";
    const order = req.nextUrl.searchParams.get("order") || "desc";
    const search = req.nextUrl.searchParams.get("search") || ""; // search by title case insensitive

    // find  relevant contacts
    const contacts = await contactModel
      .find({
        body: { $regex: new RegExp(search, "i") },
      })
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .skip((pageNo - 1) * limit)
      .limit(limit);

    const totalContacts = await contactModel.countDocuments({
      title: { $regex: new RegExp(search, "i") },
    });

    const remainingResults = Math.max(0, totalContacts - pageNo * limit);
    const totalPages = Math.ceil(totalContacts / limit);

    return NextResponse.json({
      data: contacts || [],
      pageNo: pageNo,
      results: contacts.length,
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

/**
 *  Handles the DELETE request for deleting a contact.
 *
 * @query id - The id of the contact to delete.
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

    const contact = await contactModel.findByIdAndDelete(id);

    if (!contact) {
      return NextResponse.json(
        { ...RESPONSES.NOT_FOUND, message: "Contact not found!" },
        {
          status: RESPONSES.NOT_FOUND.status,
        }
      );
    }

    return NextResponse.json(
      {
        ...RESPONSES.SUCCESS,
        message: "Contact deleted successfully!",
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
