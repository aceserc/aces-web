export const RESPONSES = {
  UNAUTHORIZED_ACCESS: {
    status: 401,
    message: "You are not authorized to access this resource!",
    error: "Unauthorized Access!",
  },
  INSUFFICIENT_REQUEST_BODY: {
    status: 400,
    message: "The request body has missing the required fields!",
    error: "Invalid request body",
  },
  SUCCESS: {
    status: 200,
    message: "Operation successful",
  },
  INTERNAL_SERVER_ERROR: {
    status: 500,
    message: "Unknown error occurred! Please try again later.",
    error: "Internal server error",
  },
  SOMETHING_WENT_WRONG: {
    status: 500,
    message: "Something went wrong! Please try again later.",
    error: "Unknown error occurred",
  },
};
