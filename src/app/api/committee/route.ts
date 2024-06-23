import { applyMiddleware } from "@/middlewares/apply.middleware";
import { isAdminMiddleware } from "@/middlewares/auth.middleware";
import { connectToDBMiddleware } from "@/middlewares/db.middleware";
import catchAsyncError from "@/middlewares/error-handler.middleware";
import { sendNextResponse } from "@/middlewares/send-response";
import { zodValidator } from "@/middlewares/zod.middleware";
import committeesModel from "@/models/committees.model";
import { CommitteeMemberSchemaWithAvatar } from "@/zod/committee.schema";
import { NextRequest } from "next/server";

export const GET = applyMiddleware(
  connectToDBMiddleware,
  catchAsyncError(async (req: NextRequest) => {
    const committees = await committeesModel.find();

    return sendNextResponse({
      status: 200,
      data: committees,
    });
  })
);

export const POST = applyMiddleware(
  isAdminMiddleware,
  connectToDBMiddleware,
  zodValidator(CommitteeMemberSchemaWithAvatar),
  catchAsyncError(async (req: NextRequest) => {
    // @ts-ignore
    let body = req.data.body;

    const committees = await committeesModel.create(body);
    await committees.save();

    return sendNextResponse({
      status: 201,
      message: `${committees.name} added to committees successfully!`,
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

    await committeesModel.findByIdAndDelete(id);

    return sendNextResponse({
      status: 200,
      message: "Committee deleted successfully!",
    });
  })
);
