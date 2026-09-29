import type { Metadata } from "next";
import "./globals.css";
import ChatBot from "./components/ChatBot";
import SocialMediaDock from "./components/SocialMediaDock";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://aeglobal-teal.vercel.app"),
  title: "AE Global Group | Study Abroad",
  description:
    "Study abroad counseling for students who want clear options, careful preparation and no guesswork.",
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
      <body>
        {children}
        <SocialMediaDock />
        <ChatBot />
      </body>
    </html>
  );
}
