export const RESPONSES = {
  UNAUTHORIZED_ACCESS: {
    status: 401,
    message: "You are not authorized for this action!",
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
  UNPROCESSABLE_ENTITY: {
    status: 422,
    message: "The request body is invalid!",
    error: "Unprocessable Entity",
  },
  CREATED: {
    status: 201,
    message: "Resource created successfully",
  },
  NOT_FOUND: {
    status: 404,
    message: "Resource not found",
    error: "Resource not found",
  },
};
