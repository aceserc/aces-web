import axios from "axios";
import API from ".";

export type IFileUploadResponse = {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  pages: number;
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  original_filename: string;
  api_key: string;
};

export const handleUploadFileService = async (
  file: File | string,
  folder: string
): Promise<Partial<IFileUploadResponse>> => {
  return new Promise((resolve, reject) => {
    if (!file || typeof file === "string") {
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
        resolve(res.data?.data);
      })
      .catch((err) => {
        reject(
          err?.response?.data?.message ?? "Upload failed, Please try again!"
        );
      });
  });
};
