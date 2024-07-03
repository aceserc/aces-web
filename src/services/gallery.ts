import { IApiResponse } from "@/types/response";
import { IFile } from "@/zod/file.schema";
import axios from "axios";
import API from ".";

export type IHandleGetGalleryImagesService = {
  pageNo: number;
  results: number;
  total: number;
  remainingResults: number;
  totalPages: number;
  resultsOnNextPage: number;
  images: Array<{
    tag: string;
    image: IFile;
    _id: string;
  }>;
};

export const handleGetGalleryImagesService = async (
  query?: object
): Promise<IHandleGetGalleryImagesService> => {
  return new Promise((resolve, reject) => {
    axios
      .get(API.gallery, {
        withCredentials: true,
        params: query,
      })
      .then((res) => {
        resolve(res.data?.data);
      })
      .catch((err) => {
        reject(
          err?.response?.data?.message ??
            "Failed to fetch images. Please try again later."
        );
      });
  });
};

export const handleAddGalleryImageService = async (
  formData: FormData
): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .post(API.gallery, formData, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data?.message ?? "Image uploaded successfully!");
      })
      .catch((err) => {
        reject(
          err?.response?.data?.message ??
            "Failed to upload the image. Please try again later."
        );
      });
  });
};

export const handleDeleteGalleryImageService = async (
  id: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${API.gallery}?id=${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data?.message ?? "Image deleted successfully!");
      })
      .catch((err) => {
        reject(
          err?.response?.data?.message ??
            "Failed to delete the image. Please try again later."
        );
      });
  });
};
