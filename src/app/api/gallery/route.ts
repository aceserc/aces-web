import { deleteFiles, uploadFile } from "@/helpers/upload-file";
import { applyMiddleware } from "@/middlewares/apply.middleware";
import { isAdminMiddleware } from "@/middlewares/auth.middleware";
import { connectToDBMiddleware } from "@/middlewares/db.middleware";
import catchAsyncError from "@/middlewares/error-handler.middleware";
import { sendNextResponse } from "@/middlewares/send-response";
import galleryModel from "@/models/gallery.model";
import tagsModel from "@/models/tags.model";
import { IFile } from "@/zod/file.schema";
import { NextRequest } from "next/server";

export const GET = applyMiddleware(
  connectToDBMiddleware,
  catchAsyncError(async (req: NextRequest) => {
    // get by tag
    const tag = req.nextUrl.searchParams.get("tag");
    const pageNo = parseInt(req.nextUrl.searchParams.get("page") || "1");
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "9");
    const sortBy = req.nextUrl.searchParams.get("sortBy") || "createdAt";
    const order = req.nextUrl.searchParams.get("order") || "desc";
    const search = req.nextUrl.searchParams.get("search") || ""; // search by title case insensitive

    // find  relevant images
    const images = await galleryModel
      .find({
        tag: { $regex: new RegExp(tag ?? search, "i") },
      })
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .skip((pageNo - 1) * limit)
      .limit(limit);

    const totalImages = await galleryModel.countDocuments({
      tag: { $regex: new RegExp(search, "i") },
    });

    const remainingResults = Math.max(0, totalImages - pageNo * limit);
    const totalPages = Math.ceil(totalImages / limit);

    return sendNextResponse({
      status: 200,
      data: {
        images: images || [],
        pageNo: pageNo,
        results: images.length,
        total: totalImages,
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
  catchAsyncError(async (req: NextRequest) => {
    const formData = await req.formData();
    const files = formData.getAll("images") as File[];
    const tag = formData.get("tag") as string;

    const res = (await Promise.all(
      files.map((file) => uploadFile(file, "gallery"))
    )) as IFile[];

    for (const file of res) {
      const newImage = new galleryModel({
        tag,
        image: {
          url: file.url,
          thumbnailUrl: file.thumbnailUrl,
          fileId: file.fileId,
          name: file.name,
        },
      });
      await newImage.save();
    }

    await tagsModel.findOneAndUpdate(
      { name: "gallery" },
      { $addToSet: { tags: { $each: [tag] } } }, // Use $addToSet with $each to add tags uniquely
      { upsert: true }
    );

    return sendNextResponse({
      status: 201,
      message: "Images uploaded successfully!",
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
        message: "Please provide image id",
      });
    }

    const img = await galleryModel.findByIdAndDelete(id as string);
    deleteFiles([img.image.fileId]);

    return sendNextResponse({
      status: 200,
      message: "Image deleted successfully!",
    });
  })
);
