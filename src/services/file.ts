import axios from "axios";
import API from ".";
import { IFile } from "@/zod/file.schema";

export const handleUploadFileService = async (
  file: File | string | null,
  folder: string
): Promise<Partial<IFile>> => {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve({
        url: "",
      });
      return;
    }
    if (typeof file === "string") {
      resolve({ url: file });
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);
    axios
      .post(API.file, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data?.data as IFile);
      })
      .catch((err) => {
        reject(
          err?.response?.data?.message ?? "Upload failed, Please try again!"
        );
      });
  });
};
