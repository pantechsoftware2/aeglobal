import type { Metadata } from "next";
import "./globals.css";
import ChatBot from "./components/ChatBot";
import SocialMediaDock from "./components/SocialMediaDock";
import SiteFooter from "./components/SiteFooter";
import {
  brandName,
  defaultDescription,
  defaultOpenGraph,
  jsonLd,
  organizationSchema,
  siteUrl,
  websiteSchema
} from "./lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${brandName} | Study Abroad Guidance`,
    template: `%s | ${brandName}`
  },
  description: defaultDescription,
  applicationName: brandName,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    ...defaultOpenGraph,
    title: `${brandName} | Study Abroad Guidance`,
    description: defaultDescription,
    url: "/"
  },
  twitter: {
    card: "summary_large_image",
    title: `${brandName} | Study Abroad Guidance`,
    description: defaultDescription,
    images: ["/images/generated-destinations-landmarks-v2.webp"]
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd([organizationSchema, websiteSchema])}
        />
        {children}
        <SiteFooter />
        <SocialMediaDock />
        <ChatBot />
      </body>
    </html>
  );
}
