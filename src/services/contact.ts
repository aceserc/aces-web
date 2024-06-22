import axios from "axios";
import API from ".";
import { ICreatedUpdatedAt } from "@/types/created-update";
import { IContactSchema } from "@/zod/contact.schema";

export type IContactSchemaResponse = IContactSchema & ICreatedUpdatedAt;

export type IHandleGetContactServiceResponse = {
  data: IContactSchemaResponse[];
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
        resolve(res.data);
      })
      .catch((err) => {
        reject(
          err?.response?.data?.message ??
            "Failed to fetch notices. Please try again later."
        );
      });
  });
};
