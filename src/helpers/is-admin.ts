import { currentUser } from "@clerk/nextjs/server";

export const isAdmin = async () => {
  const user = await currentUser();
  if (!user || !user.id || !(user.publicMetadata.role === "admin")) {
    return false;
  } else {
    return true;
  }
};
