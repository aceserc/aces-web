import { deleteFiles, uploadFile } from "@/helpers/upload-file";
import { NextRequest } from "next/server";
import { applyMiddleware } from "@/middlewares/apply.middleware";
import { isAdminMiddleware } from "@/middlewares/auth.middleware";
import { connectToDBMiddleware } from "@/middlewares/db.middleware";
import catchAsyncError from "@/middlewares/error-handler.middleware";
import { sendNextResponse } from "@/middlewares/send-response";

// uploads file to cloudinary
export const POST = applyMiddleware(
  isAdminMiddleware,
  connectToDBMiddleware,
  catchAsyncError(async (req: NextRequest) => {
    const formData = await req.formData();
    const file = formData.get("file") as unknown as File;
    const folder = formData.get("folder") as string;

    if (!file) {
      return sendNextResponse({
        status: 400,
        message: "Please provide a file to upload",
      });
    }

    if (!folder) {
      return sendNextResponse({
        status: 400,
        message: "Please provide a folder to upload the file",
      });
    }

    const data: any = await uploadFile(file, folder);

    return sendNextResponse({
      status: 201,
      message: "File uploaded successfully!",
      data,
    });
  })
);

// deletes files from cloudinary
export const DELETE = applyMiddleware(
  isAdminMiddleware,
  connectToDBMiddleware,
  catchAsyncError(async (req: NextRequest) => {
    const { publicId } = await req.json(); // publicId can be a string or an array of strings

    if (!publicId) {
      return sendNextResponse({
        status: 400,
        message: "Please provide a publicId to delete the file",
      });
    }

    try {
      await deleteFiles(publicId);
      return sendNextResponse({
        status: 200,
        message: "Files deleted successfully!",
      });
    } catch (error) {
      return sendNextResponse({
        status: 500,
        message: "Failed to delete files!",
      });
    }
  })
);
