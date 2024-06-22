import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ClerkProvider } from "@clerk/nextjs";
import TopLoader from "@/components/reusable/top-loader";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ACES - Association of Computer Engineering Students",
  description:
    "ACES is a Community of Computer Engineering Students established in 2070 B.S with an aim of all round development of students and build a better foundation for their carrier.",
  icons: [
    {
      url: "/logo.png",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
          </ThemeProvider>
          <Toaster richColors position="top-right" />
        </ClerkProvider>
      </body>
    </html>
  );
}
