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
    let onlyTags = req.nextUrl.searchParams.get("onlyTags");
    const tag = req.nextUrl.searchParams.get("tag");

    if (onlyTags === "true") {
      let tags = await blogsModel.find().distinct("tags");
      return sendNextResponse({
        status: 200,
        data: tags,
      });
    } else {
      let blogs = await blogsModel
        .find({ tags: tag })
        .select("-body -__v -images");

      if (!blogs) {
        return sendNextResponse({
          status: 404,
          message: "No blogs found!",
        });
      }

      // get all the authors of the blogs
      const authorIds = blogs.map((blog) => blog.authorId);
      const authors = await Promise.all(
        authorIds.map((id) => clerkClient.users.getUser(id))
      );

      return sendNextResponse({
        status: 200,
        data: blogs.map((blog, index) => ({
          ...blog.toJSON(),
          author: {
            avatar: authors[index].imageUrl,
            firstName: authors[index].firstName,
            lastName: authors[index].lastName,
            username: authors[index].username,
            contact: authors[index].publicMetadata.contact,
            id: authors[index].id,
          },
        })),
      });
    }
  })
);
