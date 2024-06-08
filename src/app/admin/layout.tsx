import AdminProvider from "@/providers/admin-providers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | ACES",
};

const AdminRootLayout = ({ children }: { children: React.ReactNode }) => {
  return <AdminProvider>{children}</AdminProvider>;
};
export default AdminRootLayout;
