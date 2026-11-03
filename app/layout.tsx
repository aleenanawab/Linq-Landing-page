import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Linq — One link. Every connection.",
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
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
