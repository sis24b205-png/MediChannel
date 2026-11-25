import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MediChannel",
  description: "MediChannel - Your Health, Our Priority",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}