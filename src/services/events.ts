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

export const handleGetEventsService = async (): Promise<
  IEventsSchemaResponse[]
> => {
  return new Promise((resolve, reject) => {
    axios
      .get(API.events)
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
