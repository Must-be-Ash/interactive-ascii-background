import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ASCII Landing Page",
  description: "A beautiful landing page with ASCII background effect",
  metadataBase: new URL("https://ascii-background.vercel.app"),
  openGraph: {
    title: "ASCII Landing Page",
    description: "A beautiful landing page with ASCII background effect",
    url: "https://ascii-background.vercel.app",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "ASCII Landing Page Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ASCII Landing Page",
    description: "A beautiful landing page with ASCII background effect",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
