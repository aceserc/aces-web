import axios from "axios";
import API from ".";
import { ICreatedUpdatedAt } from "@/types/created-update";
import { ITestimonialSchema } from "@/zod/testimonial";
import { handleUploadFileService } from "./file";
import { fetchData } from "./fetch";

export type ITestimonialSchemaResponse = ITestimonialSchema & ICreatedUpdatedAt;

export type IHandleGetTestimonialServiceResponse = {
  testimonials: ITestimonialSchemaResponse[];
  pageNo: number;
  results: number;
  total: number;
  remainingResults: number;
  totalPages: number;
  resultsOnNextPage: number;
};

export const handleGetAllTestimonialService = async (
  query?: object
): Promise<IHandleGetTestimonialServiceResponse> => {
  return new Promise((resolve, reject) => {
    axios
      .get(API.testimonials, {
        withCredentials: true,
        params: query,
      })
      .then((res) => {
        resolve(res.data?.data);
      })
      .catch((err) => {
        reject(
          err?.response?.data?.message ??
            "Failed to fetch testimonials. Please try again later."
        );
      });
  });
};

export const handleCreateTestimonialService = async (
  data: Omit<ITestimonialSchema, "endorserAvatar"> & {
    endorserAvatar: File | string | null;
  }
): Promise<string> => {
  return new Promise((resolve, reject) => {
    handleUploadFileService(data.endorserAvatar, "testimonials").then((res) => {
      axios
        .post(
          API.testimonials,
          {
            ...data,
            endorserAvatar: res,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          resolve(res.data?.message ?? "Testimonial created successfully.");
        })
        .catch((err) => {
          reject(
            err?.response?.data?.message ??
              "Failed to create testimonial. Please try again later."
          );
        });
    });
  });
};

export const handleDeleteTestimonialService = async (
  id: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${API.testimonials}?id=${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res?.data?.message ?? "Testimonial deleted successfully.");
      })
      .catch((err) => {
        reject(
          err?.response?.data?.message ??
            "Failed to delete testimonial. Please try again later."
        );
      });
  });
};

export const getAllTestimonials = async () => {
  const data = await fetchData<{
    data: IHandleGetTestimonialServiceResponse;
  }>(`${API.testimonials}?limit=0`);
  return data?.data?.testimonials;
};
