import type { Metadata } from "next";
import MarketingDetailPage from "../components/MarketingDetailPage";
import { marketingPages } from "../data/marketingPages";
import { brandName, defaultOpenGraph } from "../lib/seo";

const page = marketingPages.courses;

export const metadata: Metadata = {
  title: page.navLabel,
  description: page.description,
  alternates: {
    canonical: "/courses"
  },
  openGraph: {
    ...defaultOpenGraph,
    title: page.navLabel + " | " + brandName,
    description: page.description,
    url: "/courses",
    images: [
      {
        url: page.heroImage,
        width: 1200,
        height: 630,
        alt: page.heroAlt
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: page.navLabel + " | " + brandName,
    description: page.description,
    images: [page.heroImage]
  }
};

export default function Page() {
  return <MarketingDetailPage page={page} />;
}