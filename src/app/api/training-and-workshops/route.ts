import { applyMiddleware } from "@/middlewares/apply.middleware";
import {
  isAdminMiddleware,
  isEditorMiddleware,
} from "@/middlewares/auth.middleware";
import catchAsyncError from "@/middlewares/error-handler.middleware";
import { connectToDBMiddleware } from "@/middlewares/db.middleware";
import { sendNextResponse } from "@/middlewares/send-response";
import { zodValidator } from "@/middlewares/zod.middleware";
import { NextRequest } from "next/server";
import { deleteFiles } from "@/helpers/upload-file";
import { IFile } from "@/zod/file.schema";
import trainingAndWorkshopsModel from "@/models/training-and-workshops.model";
import { TrainingAndWorkshopsSchemaExtended } from "@/zod/training-and-workshops.schema";

export const GET = applyMiddleware(
  connectToDBMiddleware,
  catchAsyncError(async (req: NextRequest) => {
    const trainingId = req.nextUrl.searchParams.get("id");

    // return a single training if id is present in query
    if (trainingId) {
      const training = await trainingAndWorkshopsModel.findById(trainingId);

      if (!training) {
        return sendNextResponse({
          status: 404,
          message: "Training not found!",
        });
      }

      return sendNextResponse({
        status: 200,
        data: {
          training: training.toJSON(),
        },
      });
    }

    // return only ids if onlyIds is present in query
    const onlyIds = req.nextUrl.searchParams.get("onlyIds");
    if (onlyIds === "true") {
      const trainings = await trainingAndWorkshopsModel.find().select("_id");
      return sendNextResponse({
        status: 200,
        data: trainings || [],
      });
    }

    const pageNo = parseInt(req.nextUrl.searchParams.get("page") || "1");
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "9");
    const sortBy = req.nextUrl.searchParams.get("sortBy") || "createdAt";
    const order = req.nextUrl.searchParams.get("order") || "desc";
    // search by title case insensitive
    const search = req.nextUrl.searchParams.get("search") || "";

    // find  relevant trainings
    const trainings = await trainingAndWorkshopsModel
      .find({
        title: { $regex: new RegExp(search, "i") },
      })
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .skip((pageNo - 1) * limit)
      .limit(limit)
      .select("-body -__v -images");

    const totalTrainings = await trainingAndWorkshopsModel.countDocuments({
      title: { $regex: new RegExp(search, "i") },
    });

    const remainingResults = Math.max(0, totalTrainings - pageNo * limit);
    const totalPages = Math.ceil(totalTrainings / limit);

    return sendNextResponse({
      status: 200,
      data: {
        trainings: trainings.map((training, index) => {
          return {
            ...training.toJSON(),
          };
        }),
        pageNo: pageNo,
        results: trainings.length,
        total: totalTrainings,
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
  zodValidator(TrainingAndWorkshopsSchemaExtended),
  catchAsyncError(async (req: NextRequest) => {
    // @ts-ignore
    const { body, user } = req.data as any;
    const training = await trainingAndWorkshopsModel.create({
      ...body,
    });

    await training.save();
    return sendNextResponse({
      status: 201,
      message: "Training added successfully!",
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
        message: "Training id is required!",
      });
    }

    const training = await trainingAndWorkshopsModel.findByIdAndDelete(id);
    deleteFiles([
      training.thumbnail.fileId,
      ...training.images.map((i: IFile) => i.fileId),
    ]);

    return sendNextResponse({
      status: 200,
      message: "Training deleted successfully!",
    });
  })
);
