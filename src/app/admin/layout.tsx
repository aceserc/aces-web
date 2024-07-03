import { Metadata } from "next";
import "@mdxeditor/editor/style.css";

export const metadata: Metadata = {
  title: "Admin | ACES",
};

const AdminRootLayout = ({ children }: { children: React.ReactNode }) => {
  return children;
};
export default AdminRootLayout;
