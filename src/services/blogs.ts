import { handleUploadFileService } from "./file";
import axios from "axios";
import API from ".";
import { ICreatedUpdatedAt } from "@/types/created-update";
import { IBlogSchemaExtended } from "@/zod/blog.schema.";
import { IAuthor } from "@/types/author";

export const handleAddBlogsService = async (
  data: Omit<IBlogSchemaExtended, "thumbnail"> & { thumbnail: File | string }
): Promise<string> => {
  return new Promise((resolve, reject) => {
    handleUploadFileService(data.thumbnail, "blogs")
      .then((res) => {
        const { url } = res;
        axios
          .post(
            API.blogs,
            { ...data, thumbnail: url },
            { withCredentials: true }
          )
          .then((res) => {
            resolve(res.data?.message ?? "Blogs published successfully!");
          })
          .catch((err) => {
            reject(
              err?.response?.data?.message ??
                "Failed to publish the blogs. Please try again later."
            );
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export type IBlogsSchemaResponse = Omit<
  IBlogSchemaExtended & ICreatedUpdatedAt,
  "body" | "images"
>;

export type IHandleGetBlogsServiceResponse = {
  blogs: Array<
    IBlogsSchemaResponse & {
      author: IAuthor;
    }
  >;
  pageNo: number;
  results: number;
  total: number;
  remainingResults: number;
  totalPages: number;
  resultsOnNextPage: number;
};

export const handleGetBlogsService = async (
  query?: object
): Promise<IHandleGetBlogsServiceResponse> => {
  return new Promise((resolve, reject) => {
    axios
      .get(API.blogs, {
        withCredentials: true,
        params: query,
      })
      .then((res) => {
        resolve(res.data?.data);
      })
      .catch((err) => {
        reject(
          err?.response?.data?.message ??
            "Failed to fetch blogs. Please try again later."
        );
      });
  });
};

export const handleDeleteBlogService = async (id: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${API.blogs}?id=${id}`, { withCredentials: true })
      .then((res) => {
        resolve(res.data?.message ?? "Blogs deleted successfully!");
      })
      .catch((err) => {
        reject(
          err?.response?.data?.message ??
            "Failed to delete the blogs. Please try again later."
        );
      });
  });
};
