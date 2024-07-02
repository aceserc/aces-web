import { NextRequest } from "next/server";
import { NoticesSchemaExtended } from "@/zod/notices.schema";
import noticeModel from "@/models/notice.model";
import { applyMiddleware } from "@/middlewares/apply.middleware";
import { isAdminMiddleware } from "@/middlewares/auth.middleware";
import { connectToDBMiddleware } from "@/middlewares/db.middleware";
import { zodValidator } from "@/middlewares/zod.middleware";
import catchAsyncError from "@/middlewares/error-handler.middleware";
import { sendNextResponse } from "@/middlewares/send-response";
import { deleteFiles } from "@/helpers/upload-file";
import { IFile } from "@/zod/file.schema";

export const GET = applyMiddleware(
  connectToDBMiddleware,
  catchAsyncError(async (req: NextRequest) => {
    const noticeId = req.nextUrl.searchParams.get("id");
    if (noticeId) {
      const notice = await noticeModel.findById(noticeId);
      if (!notice) {
        return sendNextResponse({
          status: 404,
          message: "Notice not found!",
        });
      }

      return sendNextResponse({
        status: 200,
        data: notice.toJSON(),
      });
    }

    // return only ids if onlyIds is present
    const onlyIds = req.nextUrl.searchParams.get("onlyIds");
    if (onlyIds === "true") {
      const notices = await noticeModel.find().select("_id");
      return sendNextResponse({
        status: 200,
        data: notices.map((notice) => notice._id),
      });
    }

    const pageNo = parseInt(req.nextUrl.searchParams.get("page") || "1");
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "9");
    const sortBy = req.nextUrl.searchParams.get("sortBy") || "createdAt";
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

    return sendNextResponse({
      status: 200,
      data: {
        notices: notices || [],
        pageNo: pageNo,
        results: notices.length,
        total: totalNotices,
        remainingResults,
        totalPages,
        resultsOnNextPage:
          remainingResults > 0 ? Math.min(remainingResults, limit) : 0,
      },
    });
  })
);

export const POST = applyMiddleware(
  isAdminMiddleware,
  connectToDBMiddleware,
  zodValidator(NoticesSchemaExtended),
  catchAsyncError(async (req: NextRequest) => {
    // @ts-ignore
    const body = req.data.body;

    const notice = await noticeModel.create(body);
    await notice.save();

    return sendNextResponse({
      status: 201,
      message: "Notice published successfully!",
    });
  })
);

export const DELETE = applyMiddleware(
  isAdminMiddleware,
  connectToDBMiddleware,
  catchAsyncError(async (req: NextRequest) => {
    const noticeId = req.nextUrl.searchParams.get("id");
    if (!noticeId) {
      return sendNextResponse({
        status: 400,
        message: "Notice id is required!",
      });
    }

    const notice = await noticeModel.findByIdAndDelete(noticeId);
    deleteFiles([
      notice?.thumbnail?.fileId,
      ...notice?.images.map((image: IFile) => image.fileId),
    ]);

    return sendNextResponse({
      status: 200,
      message: "Notice deleted successfully!",
    });
  })
);
