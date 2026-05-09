import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KAST Pengu Card Maker",
  description: "Create your fantasy KAST-style penguin card.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
