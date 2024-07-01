import { applyMiddleware } from "@/middlewares/apply.middleware";
import { connectToDBMiddleware } from "@/middlewares/db.middleware";
import catchAsyncError from "@/middlewares/error-handler.middleware";
import { sendNextResponse } from "@/middlewares/send-response";
import blogsModel from "@/models/blogs.model";
import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export const GET = applyMiddleware(
  connectToDBMiddleware,
  catchAsyncError(async (req: NextRequest) => {
    let onlyTags = req.nextUrl.searchParams.get("onlyAuthors");
    if (onlyTags === "true") {
      let authors = await blogsModel.find().distinct("authorId");

      const allAuthorDetails = await Promise.all(
        authors.map(async (authorId) => {
          const author = await clerkClient.users.getUser(authorId);
          return {
            avatar: author.imageUrl,
            firstName: author.firstName,
            lastName: author.lastName,
            id: author.id,
            contact: author.publicMetadata.contact,
          };
        })
      );

      return sendNextResponse({
        status: 200,
        data: allAuthorDetails,
      });
    } else {
      return sendNextResponse({
        status: 400,
        message: "Invalid request",
      });
    }
  })
);
