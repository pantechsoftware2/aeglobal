import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AE Global Group | Study Abroad",
  description:
    "A responsive AbroadEdus-style landing page for international education guidance.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
