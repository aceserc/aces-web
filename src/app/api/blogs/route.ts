import { RESPONSES } from "@/constants/response.constant";
import dbConnect from "@/db/connect";
import { fromError } from "zod-validation-error";
import { NextRequest, NextResponse } from "next/server";
import { isAdmin, isEditor } from "@/helpers/is-admin";
import { BlogSchemaExtended } from "@/zod/blog.schema.";
import { currentUser } from "@clerk/nextjs/server";
import blogsModel from "@/models/blogs.model";
import { clerkClient } from "@clerk/nextjs/server";

// handle POST request for adding a blog
export const POST = async (req: NextRequest) => {
  const user = await currentUser();
  try {
    // connect to database and parse request body
    await dbConnect();

    if (!(await isEditor())) {
      return NextResponse.json(RESPONSES.UNAUTHORIZED_ACCESS, {
        status: RESPONSES.UNAUTHORIZED_ACCESS.status,
      });
    }

    let body = await req.json();

    try {
      body = BlogSchemaExtended.parse(body);
    } catch (e) {
      const message = fromError(e).toString();
      return NextResponse.json(
        {
          ...RESPONSES.UNPROCESSABLE_ENTITY,
          errors: JSON.stringify(e),
          message,
        },
        {
          status: RESPONSES.UNPROCESSABLE_ENTITY.status,
        }
      );
    }

    const blog = await blogsModel.create({
      ...body,
      authorId: user?.id,
    });

    await blog.save();

    return NextResponse.json(
      {
        ...RESPONSES.CREATED,
        message: "Blog posted successfully!",
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
 * Handles the GET request for fetching all blogs.
 * sortBy: startDate, endDate, createdAt, updatedAt, title
 * order: asc, desc
 * limit: number
 * page: number
 * search: string // search by title
 * onlyIds: boolean // return only ids
 */
export const GET = async (req: NextRequest) => {
  try {
    await dbConnect();

    // find by id if id is present in query
    const blogId = req.nextUrl.searchParams.get("id");
    if (blogId) {
      const blog = await blogsModel.findById(blogId);
      if (!blog) {
        return NextResponse.json(
          { ...RESPONSES.NOT_FOUND, message: "Blog not found!" },
          {
            status: RESPONSES.NOT_FOUND.status,
          }
        );
      }

      const author = await clerkClient.users.getUser(blog.authorId);
      return NextResponse.json({
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
      return NextResponse.json({
        data: blogs.map((blog) => blog._id),
      });
    }

    const pageNo = parseInt(req.nextUrl.searchParams.get("page") || "1");
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "9");
    const sortBy = req.nextUrl.searchParams.get("sortBy") || "startDate";
    const order = req.nextUrl.searchParams.get("order") || "desc";
    const search = req.nextUrl.searchParams.get("search") || ""; // search by title case insensitive

    // find  relevant blogs
    const blogs = await blogsModel
      .find({
        title: { $regex: new RegExp(search, "i") },
      })
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .skip((pageNo - 1) * limit)
      .limit(limit)
      .select("-body -__v -images -authorId");

    const Blogs = await blogsModel.countDocuments({
      title: { $regex: new RegExp(search, "i") },
    });

    const remainingResults = Math.max(0, Blogs - pageNo * limit);
    const totalPages = Math.ceil(Blogs / limit);

    return NextResponse.json({
      data: blogs || [],
      pageNo: pageNo,
      results: blogs.length,
      total: Blogs,
      remainingResults,
      totalPages,
      resultsOnNextPage:
        remainingResults > 0 ? Math.min(remainingResults, limit) : 0,
    });
  } catch (e) {
    return NextResponse.json(RESPONSES.INTERNAL_SERVER_ERROR, {
      status: RESPONSES.INTERNAL_SERVER_ERROR.status,
    });
  }
};

/**
 *  Handles the DELETE request for deleting a blog.
 *
 * @query id - The id of the blog to delete.
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

    const blog = await blogsModel.findByIdAndDelete(id);

    if (!blog) {
      return NextResponse.json(
        { ...RESPONSES.NOT_FOUND, message: "Blogs not found!" },
        {
          status: RESPONSES.NOT_FOUND.status,
        }
      );
    }

    return NextResponse.json(
      {
        ...RESPONSES.SUCCESS,
        message: "Blog deleted successfully!",
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
