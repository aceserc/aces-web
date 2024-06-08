"use client";

import Loading from "@/components/reusable/loading";
import NotFound from "@/components/reusable/not-found";
import { handleGetUserDetails } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import Sidebar from "../_components/sidebar";
import UserNav from "../_components/user-nav";
import ToggleTheme from "@/components/reusable/theme-toggle";
import { useInnerSize } from "@/hooks/use-inner-size";
import DeviceNotSupported from "@/components/reusable/device-not-supported";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { width, height } = useInnerSize();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: handleGetUserDetails,
    staleTime: Infinity,
    retry: 0,
  });

  if (isLoading) return <Loading className="h-screen" />;

  if (width < 800 || height < 600) {
    return <DeviceNotSupported />;
  }

  if (pathname === "/admin/login" || pathname === "/admin/signup") {
    return <div>{children}</div>;
  }
  if (isError || !data || !data.isAdmin) return <NotFound />;
  return (
    <div className="flex h-screen overflow-hidden bg-secondary">
      <Sidebar />
      <div className="flex w-0 flex-1 flex-col overflow-hidden">
        <div className="relative z-10 flex h-20 flex-shrink-0  shadow">
          <div className="flex flex-1 items-center justify-between bg-accent/10 px-4">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-primary sm:text-3xl capitalize ml-4">
                {pathname.split("/")[2] ?? "Dashboard"}
              </h2>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <UserNav />
              {/* <ToggleTheme /> */}
            </div>
          </div>
        </div>
        <main className="relative flex-1 overflow-y-auto bg-background focus:outline-none p-6 py-12">
          {children}
        </main>
      </div>
    </div>
  );
};
export default AdminLayout;
