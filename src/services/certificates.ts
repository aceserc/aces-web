import { ICertificateSchemaForApi } from "@/zod/certificate.schema";
import axios from "axios";
import API from ".";

export const handleAddCertificatesService = async (
  data: ICertificateSchemaForApi
): Promise<
  {
    name: string;
    _id: string;
  }[]
> => {
  return new Promise((resolve, reject) => {
    axios
      .post(API.certificates, data, { withCredentials: true })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(
          err?.response?.data?.message ??
            "Failed to add the certificates. Please try again later."
        );
      });
  });
};

export type ICertificate = {
  _id: string;
  event: {
    _id: string;
    title: string;
    inShort: string;
    duration?: string;
  };
  issuedAt: string;
  recipient: {
    name: string;
    role: string;
    team?: string;
    position?: string;
  };
  createdAt: string;
  updatedAt: string;
};

export const handleGetCertificateByIdService = async (
  id: string
): Promise<ICertificate> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API.certificates}?id=${id}`, { withCredentials: true })
      .then((res) => {
        resolve(res.data.data);
      })
      .catch((err) => {
        reject(
          err?.response?.data?.message ??
            "Failed to get the certificate. Please try again later."
        );
      });
  });
};

export const handleGetCertificatesByEventIdService = async (
  eventId: string
): Promise<ICertificate[]> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API.certificates}?eventId=${eventId}`, { withCredentials: true })
      .then((res) => {
        resolve(res.data.data);
      })
      .catch((err) => {
        resolve([]);
      });
  });
};
