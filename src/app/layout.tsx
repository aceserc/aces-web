import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ClerkProvider } from "@clerk/nextjs";
import TopLoader from "@/components/reusable/top-loader";
import { Toaster } from "sonner";
import ReactQueryProvider from "@/providers/react-query-providers";
import { DEVS_CONTACT_LINKS } from "@/constants/contacts.constants";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <ReactQueryProvider>
          <ClerkProvider
            appearance={{
              elements: {
                footer: "hidden",
              },
            }}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <TopLoader />
              <GoogleAnalytics
                gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID as string}
              />
            </ThemeProvider>
            <Toaster richColors position="top-right" />
          </ClerkProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}

// web metadata for SEO
export const metadata: Metadata = {
  title: "ACES - Association of Computer Engineering Students",
  description:
    "ACES is a Community of Computer Engineering Students established in 2070 B.S with an aim of all round development of students and build a better foundation for their carrier.",
  icons: [
    {
      url: "/logo.png",
    },
  ],
  keywords: [
    "ACES",
    "Association of Computer Engineering Students",
    "Computer Engineering",
    "Engineering",
    "Computer",
    "ACES Nepal",
    "ACES Dharan",
    "ACES Dharan Nepal",
    "ACES IOE",
    "IOE",
    "Institute of Engineering",
    "IOE Purwanchal Campus",
    "Purwanchal Campus",
    "ACES Purwanchal Campus",
    "Computer Engineering Students",
    "Engineering Students",
    "Computer Students",
    "ACES Community",
    "ACES Community Nepal",
    "ACES Community Dharan",
    "ACES Community Dharan Nepal",
    "ACES Community IOE",
    "ACES Community IOE Purwanchal Campus",
    "ACES Community Purwanchal Campus",
  ],

  // developers contact links
  authors: Object.keys(DEVS_CONTACT_LINKS).map((key) => {
    return {
      name: key,
      // @ts-ignore
      url: DEVS_CONTACT_LINKS[key],
    };
  }),
  category: "Engineering",

  // social media preview
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aces.ioepc.edu.np/",
    images: [
      {
        url: "/preview.png",
        alt: "ACES - Association of Computer Engineering Students",
      },
    ],
    countryName: "Nepal",
    title: "ACES - Association of Computer Engineering Students",
    emails: ["aces@ioepc.edu.np"],
    description:
      "ACES is a Community of Computer Engineering Students established in 2070 B.S with an aim of all round development of students and build a better foundation for their carrier.",
  },

  // robots.txt
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "standard",
      "max-snippet": -1,
    },
  },
};
