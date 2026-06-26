import type { Metadata } from "next";
import { AppChrome } from "@/components/layout/app-chrome";
import "./globals.css";

export const metadata: Metadata = {
  title: "German Grammar Quest",
  description: "MVP scaffold for a German grammar learning game.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <AppChrome />
        {children}
      </body>
    </html>
  );
}
