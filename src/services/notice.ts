import { INoticeSchema } from "@/zod/notice.schema";
import { handleUploadFileService } from "./file";
import axios from "axios";
import API from ".";

export const handleAddNoticeService = async (
  data: Omit<INoticeSchema, "thumbnail"> & { thumbnail: File }
): Promise<string> => {
  return new Promise((resolve, reject) => {
    handleUploadFileService(data.thumbnail, "notices")
      .then((res) => {
        const { url } = res;
        axios
          .post(
            API.notice,
            { ...data, thumbnail: url },
            { withCredentials: true }
          )
          .then((res) => {
            resolve(res.data?.message ?? "Notice published successfully!");
          })
          .catch((err) => {
            reject(
              err?.response?.data?.message ??
                "Failed to publish the notice. Please try again later."
            );
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};
