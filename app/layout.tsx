import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Linq — One Link. Every Connection.",
  description:
    "Linq is a B2B event registration and attendee management platform. Share one event link, issue digital QR attendee passes, and verify check-ins in real time.",
  icons: {
    icon: "/linq-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} font-sans antialiased text-slate-900 bg-white`}>{children}</body>
    </html>
  );
}
