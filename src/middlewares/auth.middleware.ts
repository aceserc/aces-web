import { ADMIN_ROLES, EDITOR_ROLES } from "@/constants/roles.constants";
import { currentUser } from "@clerk/nextjs/server";
import { CALL_NEXT_FUNCTION } from "./apply.middleware";
import { sendNextResponse } from "./send-response";
import { NextRequest } from "next/server";

export const isAdminMiddleware = async (req: NextRequest) => {
  const user = await currentUser();
  // @ts-ignore
  req.user = user;

  if (
    !user ||
    !user.id ||
    !user.publicMetadata.isAuthorized ||
    !ADMIN_ROLES.includes(user.publicMetadata.role as string)
  ) {
    return sendNextResponse({
      status: 401,
    });
  } else {
    return CALL_NEXT_FUNCTION;
  }
};

export const isEditorMiddleware = async (req: NextRequest) => {
  const user = await currentUser();
  // @ts-ignore
  req.user = user;

  if (
    !user ||
    !user.id ||
    !user.publicMetadata.isAuthorized ||
    !EDITOR_ROLES.includes(user.publicMetadata.role as string)
  ) {
    return sendNextResponse({
      status: 401,
    });
  } else {
    return CALL_NEXT_FUNCTION;
  }
};
