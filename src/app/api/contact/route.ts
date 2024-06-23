import { NextRequest } from "next/server";
import { ContactSchema } from "@/zod/contact.schema";
import contactModel from "@/models/contact.model";
import { applyMiddleware } from "@/middlewares/apply.middleware";
import { connectToDBMiddleware } from "@/middlewares/db.middleware";
import { isAdminMiddleware } from "@/middlewares/auth.middleware";
import catchAsyncError from "@/middlewares/error-handler.middleware";
import { sendNextResponse } from "@/middlewares/send-response";
import { zodValidator } from "@/middlewares/zod.middleware";

export const GET = applyMiddleware(
  isAdminMiddleware,
  connectToDBMiddleware,
  catchAsyncError(async (req: NextRequest) => {
    const pageNo = parseInt(req.nextUrl.searchParams.get("page") || "1");
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "9");
    const sortBy = req.nextUrl.searchParams.get("sortBy") || "createdAt";
    const order = req.nextUrl.searchParams.get("order") || "desc";
    // search by subject case insensitive
    const search = req.nextUrl.searchParams.get("search") || "";

    // find  relevant contact
    const contact = await contactModel
      .find({
        subject: { $regex: new RegExp(search, "i") },
      })
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .skip((pageNo - 1) * limit)
      .limit(limit)
      .select("-body -__v -images -authorId");

    const totalContact = await contactModel.countDocuments({
      subject: { $regex: new RegExp(search, "i") },
    });

    const remainingResults = Math.max(0, totalContact - pageNo * limit);
    const totalPages = Math.ceil(totalContact / limit);

    return sendNextResponse({
      status: 200,
      data: {
        contact: contact || [],
        pageNo: pageNo,
        results: contact.length,
        total: totalContact,
        remainingResults,
        totalPages,
        resultsOnNextPage:
          remainingResults > 0 ? Math.min(remainingResults, limit) : 0,
      },
    });
  })
);

export const POST = applyMiddleware(
  connectToDBMiddleware,
  zodValidator(ContactSchema),
  catchAsyncError(async (req: NextRequest) => {
    // @ts-ignore
    let body = req.data.body;

    const contact = await contactModel.create(body);
    await contact.save();

    return sendNextResponse({
      status: 201,
      message: "Thank you for contacting us! We will get back to you soon.",
    });
  })
);

export const DELETE = applyMiddleware(
  isAdminMiddleware,
  connectToDBMiddleware,
  catchAsyncError(async (req: NextRequest) => {
    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      return sendNextResponse({
        status: 400,
        message: "Please provide an id!",
      });
    }

    await contactModel.findByIdAndDelete(id);

    return sendNextResponse({
      status: 200,
      message: "Contact deleted successfully!",
    });
  })
);
