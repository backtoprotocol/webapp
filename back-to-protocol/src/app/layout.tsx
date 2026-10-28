import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { LayoutShell } from "@/components/layout-shell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://backtoprotocol.com"),
  title: {
    default: "Treehouse | Your essentials, together.",
    template: "%s | Treehouse by Back to Protocol",
  },
  description:
    "Your essentials, together. Treehouse brings important documents, cards, accounts, and everyday details into one thoughtful place.",
  openGraph: {
    siteName: "Treehouse by Back to Protocol",
    title: "Treehouse | Your essentials, together.",
    description:
      "Your essentials, together. Bring documents, insurance, cards, notes, and important dates together in Treehouse.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#fcfdfb] text-[#1d2b22]">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
