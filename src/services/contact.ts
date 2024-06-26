import axios from "axios";
import API from ".";
import { ICreatedUpdatedAt } from "@/types/created-update";
import { IContactSchema } from "@/zod/contact.schema";

export type IContactSchemaResponse = IContactSchema & ICreatedUpdatedAt;

export type IHandleGetContactServiceResponse = {
  contact: IContactSchemaResponse[];
  pageNo: number;
  results: number;
  total: number;
  remainingResults: number;
  totalPages: number;
  resultsOnNextPage: number;
};

export const handleGetAllContactService = async (
  query?: object
): Promise<IHandleGetContactServiceResponse> => {
  return new Promise((resolve, reject) => {
    axios
      .get(API.contact, {
        withCredentials: true,
        params: query,
      })
      .then((res) => {
        resolve(res.data?.data);
      })
      .catch((err) => {
        reject(
          err?.response?.data?.message ??
            "Failed to fetch notices. Please try again later."
        );
      });
  });
};

export const handleDeleteContactService = async (
  id: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${API.contact}?id=${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data?.message ?? "Contact deleted successfully!");
      })
      .catch((err) => {
        reject(
          err?.response?.data?.message ??
            "Failed to delete the contact. Please try again later."
        );
      });
  });
};

export const handleCreateContactService = async (
  data: IContactSchema
): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .post(API.contact, data, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(
          res.data?.message ??
            "Thank you for contacting us, we will get back to you soon!"
        );
      })
      .catch((err) => {
        reject(
          err?.response?.data?.message ??
            "Failed to send message. Please try again later."
        );
      });
  });
};
