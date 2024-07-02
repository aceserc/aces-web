import { handleUploadFileService } from "./file";
import axios from "axios";
import API from ".";
import {
  ICommitteeSchema,
  ICommitteeSchemaWithAvatar,
} from "@/zod/committee.schema";

export const handleAddCommitteeService = async (
  data: ICommitteeSchema & { avatar: File | string }
): Promise<string> => {
  return new Promise((resolve, reject) => {
    handleUploadFileService(data.avatar, "committees")
      .then((res) => {
        axios
          .post(
            API.committee,
            { ...data, avatar: res },
            { withCredentials: true }
          )
          .then((res) => {
            resolve(res.data?.message ?? "Member added successfully");
          })
          .catch((err) => {
            reject(
              err?.response?.data?.message ?? "Failed to add, Please try again!"
            );
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleDeleteCommitteeService = async (
  id: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${API.committee}?id=${id}`, { withCredentials: true })
      .then((res) => {
        resolve(res.data?.message ?? "Member deleted successfully");
      })
      .catch((err) => {
        reject(
          err?.response?.data?.message ?? "Failed to delete, Please try again!"
        );
      });
  });
};

export const handleGetCommitteesService = async (): Promise<
  ICommitteeSchemaWithAvatar[]
> => {
  return new Promise((resolve, reject) => {
    axios
      .get(API.committee, { withCredentials: true })
      .then((res) => {
        resolve(res.data?.data);
      })
      .catch((err) => {
        reject(
          err?.response?.data?.message ??
            "Failed to fetch members, Please try again!"
        );
      });
  });
};
