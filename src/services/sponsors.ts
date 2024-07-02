import { ISponsorSchema } from "@/zod/sponsor.schema";
import { handleUploadFileService } from "./file";
import axios from "axios";
import API from ".";

export const handleAddSponsorService = async (
  data: Omit<ISponsorSchema, "logo"> & { logo: File | string }
): Promise<string> => {
  return new Promise((resolve, reject) => {
    handleUploadFileService(data.logo, "sponsors")
      .then((res) => {
        axios
          .post(API.sponsor, { ...data, logo: res }, { withCredentials: true })
          .then((res) => {
            resolve(res.data?.message ?? "Sponsor added successfully");
          })
          .catch((err) => {
            reject(
              err?.response?.data?.message ??
                "Failed to add sponsor, Please try again!"
            );
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleDeleteSponsorService = async (
  id: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${API.sponsor}?id=${id}`, { withCredentials: true })
      .then((res) => {
        resolve(res.data?.message ?? "Sponsor deleted successfully");
      })
      .catch((err) => {
        reject(
          err?.response?.data?.message ??
            "Failed to delete sponsor, Please try again!"
        );
      });
  });
};

export const handleGetSponsorsService = async (): Promise<ISponsorSchema[]> => {
  return new Promise((resolve, reject) => {
    axios
      .get(API.sponsor, { withCredentials: true })
      .then((res) => {
        resolve(res.data?.data);
      })
      .catch((err) => {
        reject(
          err?.response?.data?.message ??
            "Failed to fetch sponsors, Please try again!"
        );
      });
  });
};
