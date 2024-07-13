import { IContactSchema } from "@/zod/contact.schema";
import axios from "axios";
import API from ".";
import { ICreatedUpdatedAt } from "@/types/created-update";

export type IDashboardData = {
  totalBlogs: number;
  totalNotices: number;
  totalEvents: number;
  totalSponsors: number;
  totalCommitteeMembers: number;
  totalGalleryImages: number;
  totalTestimonials: number;
  totalContacts: number;
  latestContacts: Array<IContactSchema & ICreatedUpdatedAt>;
};
export const handleGetDashboardDataService =
  async (): Promise<IDashboardData> => {
    return new Promise((resolve, reject) => {
      axios
        .get(API.dashboard, {
          withCredentials: true,
        })
        .then((res) => {
          resolve(res.data?.data);
        })
        .catch((err) => {
          reject(
            err?.response?.data?.message ??
              "Failed to fetch data. Please try again later."
          );
        });
    });
  };
