import { ADMIN_ROLES, EDITOR_ROLES } from "@/constants/roles.constants";
import { currentUser } from "@clerk/nextjs/server";

export const isAdmin = async () => {
  const user = await currentUser();
  if (
    !user ||
    !user.id ||
    !user.publicMetadata.isAuthorized ||
    !ADMIN_ROLES.includes(user.publicMetadata.role as string)
  ) {
    return false;
  } else {
    return true;
  }
};

export const isEditor = async () => {
  const user = await currentUser();
  if (
    !user ||
    !user.id ||
    !user.publicMetadata.isAuthorized ||
    !EDITOR_ROLES.includes(user.publicMetadata.role as string)
  ) {
    return false;
  } else {
    return true;
  }
};
