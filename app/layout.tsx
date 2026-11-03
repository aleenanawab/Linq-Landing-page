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
  description: "Linq turns event registration and organization onboarding into a single step. Share one link and every attendee leaves with a scannable card.",
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
