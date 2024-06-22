import { RESPONSES } from "@/constants/response.constant";
import dbConnect from "@/db/connect";
import { isAdmin } from "@/helpers/is-admin";
import { fromError } from "zod-validation-error";
import { NextRequest, NextResponse } from "next/server";
import { NoticesSchemaExtended } from "@/zod/notices.schema";
import noticeModel from "@/models/notice.model";

// handle POST request for adding a notice
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
      body = NoticesSchemaExtended.parse(body);
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

    const notice = await noticeModel.create(body);
    await notice.save();

    return NextResponse.json(
      {
        ...RESPONSES.CREATED,
        message: "Notice posted successfully!",
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
 * Handles the GET request for fetching all notices.
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

    // find by id if id is present in query
    const noticeId = req.nextUrl.searchParams.get("id");
    if (noticeId) {
      const notice = await noticeModel.findById(noticeId);
      if (!notice) {
        return NextResponse.json(
          { ...RESPONSES.NOT_FOUND, message: "Notice not found!" },
          {
            status: RESPONSES.NOT_FOUND.status,
          }
        );
      }

      return NextResponse.json({
        data: notice.toJSON(),
      });
    }

    // return only ids if onlyIds is present in query
    const onlyIds = req.nextUrl.searchParams.get("onlyIds");
    if (onlyIds === "true") {
      const notices = await noticeModel.find().select("_id");
      return NextResponse.json({
        data: notices.map((notice) => notice._id),
      });
    }

    const pageNo = parseInt(req.nextUrl.searchParams.get("page") || "1");
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "9");
    const sortBy = req.nextUrl.searchParams.get("sortBy") || "startDate";
    const order = req.nextUrl.searchParams.get("order") || "desc";
    const search = req.nextUrl.searchParams.get("search") || ""; // search by title case insensitive

    // find  relevant notices
    const notices = await noticeModel
      .find({
        title: { $regex: new RegExp(search, "i") },
      })
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .skip((pageNo - 1) * limit)
      .limit(limit)
      .select("-body -__v -images");

    const totalNotices = await noticeModel.countDocuments({
      title: { $regex: new RegExp(search, "i") },
    });

    const remainingResults = Math.max(0, totalNotices - pageNo * limit);
    const totalPages = Math.ceil(totalNotices / limit);

    return NextResponse.json({
      data: notices || [],
      pageNo: pageNo,
      results: notices.length,
      total: totalNotices,
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
 *  Handles the DELETE request for deleting a notice.
 *
 * @query id - The id of the notice to delete.
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

    const notice = await noticeModel.findByIdAndDelete(id);

    if (!notice) {
      return NextResponse.json(
        { ...RESPONSES.NOT_FOUND, message: "Notices not found!" },
        {
          status: RESPONSES.NOT_FOUND.status,
        }
      );
    }

    return NextResponse.json(
      {
        ...RESPONSES.SUCCESS,
        message: "Notice deleted successfully!",
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
