"use client";

import Loading from "@/components/reusable/loading";
import NotFound from "@/components/reusable/not-found";
import { usePathname } from "next/navigation";
import Sidebar, { ADMIN_SIDEBAR_ITEMS } from "../_components/sidebar";
import { useInnerSize } from "@/hooks/use-inner-size";
import DeviceNotSupported from "@/components/reusable/device-not-supported";
import { ClerkLoaded, ClerkLoading, UserButton, useUser } from "@clerk/nextjs";
import { ADMIN_ROLES } from "@/constants/roles.constants";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { width, height } = useInnerSize();
  const { user } = useUser();

  return (
    <>
      <ClerkLoading>
        <Loading className="h-screen" />
      </ClerkLoading>
      <ClerkLoaded>
        {width < 800 || height < 600 ? (
          <DeviceNotSupported />
        ) : !user?.publicMetadata.isAuthorized ||
          (ADMIN_SIDEBAR_ITEMS.find((i) => i.href === pathname)?.adminOnly &&
            !ADMIN_ROLES.includes(user.publicMetadata.role as string)) ? (
          <NotFound />
        ) : (
          <div className="flex h-screen overflow-hidden bg-secondary">
            <Sidebar />
            <div className="flex w-0 flex-1 flex-col overflow-hidden">
              <div className="relative z-10 flex h-20 flex-shrink-0  shadow">
                <div className="flex flex-1 items-center justify-between bg-accent/10 px-4">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-primary sm:text-3xl capitalize ml-4">
                      {pathname.replaceAll("-", " ").split("/")[2] ??
                        "Dashboard"}
                    </h2>
                  </div>
                  <div className="ml-4 flex items-center md:ml-6">
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox: {
                            height: 36,
                            width: 36,
                          },
                          userButtonTrigger: {
                            outline: "none",
                          },
                        },
                      }}
                    />
                    {/* <ToggleTheme /> */}
                  </div>
                </div>
              </div>
              <div className="bg-background w-full h-full overflow-scroll">
                <main className="relative flex-1 overflow-y-auto focus:outline-none wrapper py-12">
                  {children}
                </main>
              </div>
            </div>
          </div>
        )}
      </ClerkLoaded>
    </>
  );
};
export default AdminLayout;
