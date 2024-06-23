import { IResponse } from "./send-response";

interface IStatus {
  [key: number]: IResponse;
}

export const STATUS: IStatus = {
  200: {
    message: "Operation successful!",
    status: 200,
    statusText: "OK",
  },

  500: {
    message: "Something went wrong!",
    status: 500,
    statusText: "Internal Server Error",
  },
};
