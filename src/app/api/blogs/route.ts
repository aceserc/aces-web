import { BlogSchemaExtended } from "@/zod/blog.schema.";
import blogsModel from "@/models/blogs.model";
import { clerkClient } from "@clerk/nextjs/server";
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

export const GET = applyMiddleware(
  connectToDBMiddleware,
  catchAsyncError(async (req: NextRequest) => {
    const blogId = req.nextUrl.searchParams.get("id");

    // return a single blog if id is present in query
    if (blogId) {
      const blog = await blogsModel.findById(blogId);

      if (!blog) {
        return sendNextResponse({
          status: 404,
          message: "Blog not found!",
        });
      }

      const author = await clerkClient.users.getUser(blog.authorId);
      return sendNextResponse({
        status: 200,
        data: {
          blog: blog.toJSON(),
          author: {
            avatar: author.imageUrl,
            firstName: author.firstName,
            lastName: author.lastName,
            username: author.username,
            contact: author.publicMetadata.contact,
          },
        },
      });
    }

    // return only ids if onlyIds is present in query
    const onlyIds = req.nextUrl.searchParams.get("onlyIds");
    if (onlyIds === "true") {
      const blogs = await blogsModel.find().select("_id");
      return sendNextResponse({
        status: 200,
        data: blogs || [],
      });
    }

    const pageNo = parseInt(req.nextUrl.searchParams.get("page") || "1");
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "9");
    const sortBy = req.nextUrl.searchParams.get("sortBy") || "startDate";
    const order = req.nextUrl.searchParams.get("order") || "desc";
    // search by title case insensitive
    const search = req.nextUrl.searchParams.get("search") || "";

    // find  relevant blogs
    const blogs = await blogsModel
      .find({
        title: { $regex: new RegExp(search, "i") },
      })
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .skip((pageNo - 1) * limit)
      .limit(limit)
      .select("-body -__v -images -authorId");

    const totalBlogs = await blogsModel.countDocuments({
      title: { $regex: new RegExp(search, "i") },
    });

    const remainingResults = Math.max(0, totalBlogs - pageNo * limit);
    const totalPages = Math.ceil(totalBlogs / limit);

    return sendNextResponse({
      status: 200,
      data: {
        blogs: blogs || [],
        pageNo: pageNo,
        results: blogs.length,
        total: totalBlogs,
        remainingResults,
        totalPages,
        resultsOnNextPage:
          remainingResults > 0 ? Math.min(remainingResults, limit) : 0,
      },
    });
  })
);

export const POST = applyMiddleware(
  isEditorMiddleware,
  connectToDBMiddleware,
  zodValidator(BlogSchemaExtended),
  catchAsyncError(async (req: NextRequest) => {
    // @ts-ignore
    const { body, user } = req.data as any;
    const blog = await blogsModel.create({
      ...body,
      authorId: user?.id,
    });

    await blog.save();
    return sendNextResponse({
      status: 201,
      message: "Blog created successfully!",
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
        message: "Blog id is required!",
      });
    }

    await blogsModel.findByIdAndDelete(id);

    return sendNextResponse({
      status: 200,
      message: "Blog deleted successfully!",
    });
  })
);
