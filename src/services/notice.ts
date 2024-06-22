import { handleUploadFileService } from "./file";
import axios from "axios";
import API from ".";
import { ICreatedUpdatedAt } from "@/types/created-update";
import { INoticesSchemaExtended } from "@/zod/notices.schema";

export const handleAddNoticesService = async (
  data: Omit<INoticesSchemaExtended, "thumbnail"> & { thumbnail: File | string }
): Promise<string> => {
  return new Promise((resolve, reject) => {
    handleUploadFileService(data.thumbnail, "notices")
      .then((res) => {
        const { url } = res;
        axios
          .post(
            API.notices,
            { ...data, thumbnail: url },
            { withCredentials: true }
          )
          .then((res) => {
            resolve(res.data?.message ?? "Notices published successfully!");
          })
          .catch((err) => {
            reject(
              err?.response?.data?.message ??
                "Failed to publish the notices. Please try again later."
            );
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export type INoticesSchemaResponse = Omit<
  INoticesSchemaExtended & ICreatedUpdatedAt,
  "body" | "images"
>;

export type IHandleGetNoticesServiceResponse = {
  data: INoticesSchemaResponse[];
  pageNo: number;
  results: number;
  total: number;
  remainingResults: number;
  totalPages: number;
  resultsOnNextPage: number;
};

export const handleGetNoticesService = async (
  query?: object
): Promise<IHandleGetNoticesServiceResponse> => {
  return new Promise((resolve, reject) => {
    axios
      .get(API.notices, {
        withCredentials: true,
        params: query,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(
          err?.response?.data?.message ??
            "Failed to fetch notices. Please try again later."
        );
      });
  });
};

export const handleDeleteNoticeService = async (id: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${API.notices}?id=${id}`, { withCredentials: true })
      .then((res) => {
        resolve(res.data?.message ?? "Notices deleted successfully!");
      })
      .catch((err) => {
        reject(
          err?.response?.data?.message ??
            "Failed to delete the notices. Please try again later."
        );
      });
  });
};
