import { IEventsSchema, IEventsSchemaExtended } from "@/zod/events.schema";
import { handleUploadFileService } from "./file";
import axios from "axios";
import API from ".";
import { ICreatedUpdatedAt } from "@/types/created-update";

export const handleAddEventsService = async (
  data: Omit<IEventsSchemaExtended, "thumbnail"> & { thumbnail: File | string }
): Promise<string> => {
  return new Promise((resolve, reject) => {
    handleUploadFileService(data.thumbnail, "events")
      .then((res) => {
        const { url } = res;
        axios
          .post(
            API.events,
            { ...data, thumbnail: url },
            { withCredentials: true }
          )
          .then((res) => {
            resolve(res.data?.message ?? "Events published successfully!");
          })
          .catch((err) => {
            reject(
              err?.response?.data?.message ??
                "Failed to publish the events. Please try again later."
            );
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export type IEventsSchemaResponse = Omit<
  IEventsSchemaExtended & ICreatedUpdatedAt,
  "body" | "images"
>;

export type IHandleGetEventsServiceResponse = {
  events: IEventsSchemaResponse[];
  pageNo: number;
  results: number;
  total: number;
  remainingResults: number;
  totalPages: number;
  resultsOnNextPage: number;
};

export const handleGetEventsService = async (
  query?: object
): Promise<IHandleGetEventsServiceResponse> => {
  return new Promise((resolve, reject) => {
    axios
      .get(API.events, {
        withCredentials: true,
        params: query,
      })
      .then((res) => {
        resolve(res.data?.data);
      })
      .catch((err) => {
        reject(
          err?.response?.data?.message ??
            "Failed to fetch events. Please try again later."
        );
      });
  });
};

export const handleDeleteEventService = async (id: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${API.events}?id=${id}`, { withCredentials: true })
      .then((res) => {
        resolve(res.data?.message ?? "Events deleted successfully!");
      })
      .catch((err) => {
        reject(
          err?.response?.data?.message ??
            "Failed to delete the events. Please try again later."
        );
      });
  });
};
