import Error404 from "@/components/screens/404";
import { Metadata } from "next";

const Page = () => <Error404 />;

export default Page;

export const metadata: Metadata = {
  title: "404 | Page Not Found",
  description: "The page you are looking for does not exist.",
  authors: [
    {
      name: "Tilak Thapa",
    },
  ],
  category: "Personal Website",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "404 | Page Not Found",
    description: "The page you are looking for does not exist.",
  },
};
