import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileSearch, Home, MapPinned } from "lucide-react";
import SiteHeader from "../components/SiteHeader";
import { destinations } from "../data/destinations";
import { brandName, defaultOpenGraph } from "../lib/seo";

export const metadata: Metadata = {
  title: "Sitemap",
  description: "Browse the AE Global Group website sitemap, including main pages, study destination pages and student support sections.",
  alternates: {
    canonical: "/sitemap"
  },
  openGraph: {
    ...defaultOpenGraph,
    title: `Sitemap | ${brandName}`,
    description: "Browse all key AE Global Group website pages and study destination links.",
    url: "/sitemap"
  },
  twitter: {
    card: "summary_large_image",
    title: `Sitemap | ${brandName}`,
    description: "Browse all key AE Global Group website pages and study destination links.",
    images: ["/images/generated-destinations-landmarks-v2.webp"]
  }
};

const mainPages = [
  { label: "Home", href: "/", copy: "Start from the main study abroad guidance page." },
  { label: "Study Destinations", href: "/study-destinations", copy: "Compare countries, intakes, costs and visa paths before you choose." },
  { label: "Universities", href: "/universities", copy: "Understand how AE Global Group builds a practical shortlist." },
  { label: "Courses", href: "/courses", copy: "Review course-fit planning before applications begin." },
  { label: "Scholarships", href: "/scholarships", copy: "Plan funding, aid and scholarship questions early." },
  { label: "Services", href: "/services", copy: "See the full support process from counselling to departure." },
  { label: "Blog", href: "/blog", copy: "Read practical study abroad guides and checklists." },
  { label: "FAQs", href: "/faq", copy: "Find answers about destinations, applications, visas and next steps." },
  { label: "Contact Us", href: "/contact", copy: "Find phone, email, office addresses and enquiry options." },
  { label: "XML Sitemap", href: "/sitemap.xml", copy: "Search engine sitemap generated for crawlers." }
];

const homeSections = [
  { label: "Study Destinations section", href: "/#destinations" },
  { label: "Universities section", href: "/#partners" },
  { label: "Courses section", href: "/#courses" },
  { label: "Services section", href: "/#services" },
  { label: "Contact section", href: "/#contact" }
];

export default function SitemapPage() {
  const priorityDestinations = destinations.filter((destination) => destination.institutions.length > 0);
  const moreDestinations = destinations.filter((destination) => destination.institutions.length === 0);

  return (
    <div className="sitemap-page">
      <SiteHeader />
      <main>
        <section className="sitemap-hero">
          <p className="eyebrow">Website Sitemap</p>
          <h1>Find every key page<br /><span>in one clear place.</span></h1>
          <p>
            Use this page to reach AE Global Group&apos;s main pages, student support sections,
            destination guides and the technical XML sitemap.
          </p>
        </section>

        <section className="sitemap-grid" aria-label="Website sitemap links">
          <article className="sitemap-card sitemap-card-featured">
            <span className="sitemap-icon"><Home size={23} aria-hidden="true" /></span>
            <h2>Main pages</h2>
            <div className="sitemap-link-list">
              {mainPages.map((page) => (
                <Link href={page.href} key={page.href}>
                  <span>
                    <strong>{page.label}</strong>
                    <small>{page.copy}</small>
                  </span>
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </article>

          <article className="sitemap-card">
            <span className="sitemap-icon"><FileSearch size={23} aria-hidden="true" /></span>
            <h2>Page sections</h2>
            <div className="sitemap-simple-list">
              {homeSections.map((section) => (
                <Link href={section.href} key={section.href}>{section.label}</Link>
              ))}
            </div>
          </article>

          <article className="sitemap-card sitemap-card-wide">
            <span className="sitemap-icon"><MapPinned size={23} aria-hidden="true" /></span>
            <h2>Study destinations</h2>
            <p>Priority destination pages are shown first, followed by the wider country list.</p>
            <div className="sitemap-destination-grid">
              {priorityDestinations.map((destination) => (
                <Link className="sitemap-destination" href={`/destinations/${destination.slug}`} key={destination.slug}>
                  <Image src={destination.flag} width={28} height={28} alt="" unoptimized />
                  <span>
                    <strong>{destination.label}</strong>
                    <small>{destination.meta}</small>
                  </span>
                </Link>
              ))}
            </div>
            <div className="sitemap-country-list" aria-label="More study destination pages">
              {moreDestinations.map((destination) => (
                <Link href={`/destinations/${destination.slug}`} key={destination.slug}>
                  <Image src={destination.flag} width={18} height={18} alt="" unoptimized />
                  {destination.label}
                </Link>
              ))}
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}
