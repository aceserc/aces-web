import { handleUploadFileService } from "./file";
import axios from "axios";
import API from ".";
import { ICreatedUpdatedAt } from "@/types/created-update";
import { ITrainingAndWorkshopsSchemaExtended } from "@/zod/training-and-workshops.schema";

export const handleAddTrainingsService = async (
  data: Omit<ITrainingAndWorkshopsSchemaExtended, "thumbnail"> & {
    thumbnail: File | string;
  }
): Promise<string> => {
  return new Promise((resolve, reject) => {
    handleUploadFileService(data.thumbnail, "training-and-workshops")
      .then((res) => {
        axios
          .post(
            API.trainingAndWorkshops,
            { ...data, thumbnail: res },
            { withCredentials: true }
          )
          .then((res) => {
            resolve(res.data?.message ?? "Training added successfully!");
          })
          .catch((err) => {
            reject(
              err?.response?.data?.message ??
                "Failed to add the training. Please try again later."
            );
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export type ITrainingSchemaResponse = Omit<
  ITrainingAndWorkshopsSchemaExtended & ICreatedUpdatedAt,
  "body" | "images"
>;

export type IHandleGetTrainingsServiceResponse = {
  trainings: Array<ITrainingSchemaResponse>;
  pageNo: number;
  results: number;
  total: number;
  remainingResults: number;
  totalPages: number;
  resultsOnNextPage: number;
};

export const handleGetTrainingsService = async (
  query?: object
): Promise<IHandleGetTrainingsServiceResponse> => {
  return new Promise((resolve, reject) => {
    axios
      .get(API.trainingAndWorkshops, {
        withCredentials: true,
        params: query,
      })
      .then((res) => {
        resolve(res.data?.data);
      })
      .catch((err) => {
        reject(
          err?.response?.data?.message ??
            "Failed to fetch trainings. Please try again later."
        );
      });
  });
};

export const handleDeleteTrainingService = async (
  id: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${API.trainingAndWorkshops}?id=${id}`, { withCredentials: true })
      .then((res) => {
        resolve(res.data?.message ?? "Trainings deleted successfully!");
      })
      .catch((err) => {
        reject(
          err?.response?.data?.message ??
            "Failed to delete the trainings. Please try again later."
        );
      });
  });
};
