import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LayoutShell } from "@/components/layout-shell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Back to Protocol",
  description:
    "Websites, technology support, and practical IT for people and small businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-slate-100 text-slate-950">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
