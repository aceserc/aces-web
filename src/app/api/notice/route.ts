import { RESPONSES } from "@/constants/response.constant";
import dbConnect from "@/db/connect";
import { isAdmin } from "@/helpers/is-admin";
import omit from "@/helpers/omit";
import noticeModel from "@/models/notice.model";
import { NoticeSchema } from "@/zod/notice.schema";
import { NextRequest, NextResponse } from "next/server";

/**
 *  Handles the POST request for adding a notice.
 *
 * @body title - The title of the notice.
 * @body body - The body of the notice.
 * @body thumbnail - The thumbnail of the notice.
 * @body images - The images of the notice. @optional
 * @body metaDescription - The meta description of the notice.
 *
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
      body = NoticeSchema.parse(body);
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

    const notice = await noticeModel.create(body);
    await notice.save();

    return NextResponse.json(
      {
        ...RESPONSES.CREATED,
        message: "Notice published successfully!",
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
 *
 * @query id - The id of the notice to fetch. @optional
 *
 * @returns data - The list of notices or a notice.
 */
export const GET = async (req: NextRequest) => {
  try {
    await dbConnect();

    const notices = await noticeModel.find();

    const noticeId = req.nextUrl.searchParams.get("id");

    if (noticeId) {
      const notice = await noticeModel.findById(noticeId);

      if (!notice) {
        return NextResponse.json(
          { ...RESPONSES.NOT_FOUND, message: "Notice not found" },
          {
            status: RESPONSES.NOT_FOUND.status,
          }
        );
      }

      return NextResponse.json({
        data: notice.toJSON(),
      });
    }

    return NextResponse.json({
      data: notices.map((notice) => omit(notice.toJSON(), ["body", "images"])),
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
        { ...RESPONSES.NOT_FOUND, message: "Notice not found" },
        {
          status: RESPONSES.NOT_FOUND.status,
        }
      );
    }

    return NextResponse.json(
      {
        ...RESPONSES.SUCCESS,
        message: "Notice deleted successfully",
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
