import type { Metadata } from "next";
import localFont from "next/font/local";
import { siteConfig } from "~/config/site";
import { cn } from "~/lib/utils";
import "./globals.css";

const pretendar = localFont({
  src: [
    {
      path: "../../public/assets/fonts/Pretendard-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/Pretendard-SemiBold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/Pretendard-Bold.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL(siteConfig.url),
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("bg-gray-50 font-sans antialiased", pretendar.variable)}
      >
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow px-3 sm:px-0">{children}</main>
        </div>
      </body>
    </html>
  );
}
