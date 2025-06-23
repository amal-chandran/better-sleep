import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Footer } from "@/shared/layout/footer";
import { Navigation } from "@/shared/layout/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Better Sleep - Better Sleep Solutions",
  description:
    "Helping you achieve better sleep and improve your life through science-backed sleep solutions.",
};

import { getNavigationByPosition } from "@/shared/actions/get-navigation-by-position";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch both navigation data in parallel using Promise.all
  const [headerNavData, footerNavData] = await Promise.all([
    getNavigationByPosition("header"),
    getNavigationByPosition("footer"),
  ]);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Navigation navItems={headerNavData?.items || []} />
        <main className="flex-grow">{children}</main>
        <Footer footerNavItems={footerNavData?.items || []} />
      </body>
    </html>
  );
}
