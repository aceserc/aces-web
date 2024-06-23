import { IResponse } from "@/middlewares/send-response";

interface IStatus {
  [key: number]: IResponse;
}

export const STATUS: IStatus = {
  200: {
    message: "Operation successful!",
    status: 200,
    statusText: "OK",
  },

  400: {
    message: "The request is invalid!",
    status: 400,
    statusText: "Bad Request",
  },
  401: {
    message: "You are not authorized for this action!",
    status: 401,
    statusText: "Unauthorized Access",
  },

  422: {
    message: "The request body is invalid!",
    status: 422,
    statusText: "Unprocessable Entity",
  },

  500: {
    message: "Something went wrong!",
    status: 500,
    statusText: "Internal Server Error",
  },
};
