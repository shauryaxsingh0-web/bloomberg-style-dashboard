import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Apex Markets Terminal",
  description:
    "A production-ready Bloomberg-style market dashboard built with Next.js, TypeScript, Tailwind CSS, Recharts, and shadcn-inspired components.",
  applicationName: "Apex Markets Terminal",
  authors: [{ name: "Apex Markets" }],
  keywords: [
    "market dashboard",
    "Bloomberg terminal",
    "Next.js",
    "finance",
    "portfolio project"
  ],
  metadataBase: new URL("https://example.com")
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#050609"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
