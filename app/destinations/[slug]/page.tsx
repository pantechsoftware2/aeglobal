import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowRight, Check, Compass, GraduationCap } from "lucide-react";
import { destinations, featuredDestinations } from "../../data/destinations";
import SiteHeader from "../../components/SiteHeader";
import InstitutionDirectory from "../../components/InstitutionDirectory";
import LeadEnquiry from "../../components/LeadEnquiry";
import { brandName, defaultOpenGraph, jsonLd, siteUrl, toAbsoluteUrl } from "../../lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return destinations.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const destination = destinations.find((item) => item.slug === slug);
  if (!destination) return { title: "Destination not found | AE Global Group" };

  const description = `Explore study pathways in ${destination.name}. Get guidance on your shortlist, applications, documents and next steps with AE Global Group.`;
  const image = destination.institutions[0]?.image ?? "/images/generated-destinations-landmarks-v2.webp";

  return {
    title: `Study in ${destination.label}`,
    description,
    alternates: {
      canonical: `/destinations/${destination.slug}`
    },
    openGraph: {
      ...defaultOpenGraph,
      title: `Study in ${destination.label} | ${brandName}`,
      description,
      url: `/destinations/${destination.slug}`,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `Study in ${destination.label} with AE Global Group`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `Study in ${destination.label} | ${brandName}`,
      description,
      images: [image]
    }
  };
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const destination = destinations.find((item) => item.slug === slug);
  if (!destination) notFound();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Study destinations",
        item: `${siteUrl}/#destinations`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: destination.label,
        item: `${siteUrl}/destinations/${destination.slug}`
      }
    ]
  };
  const destinationSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteUrl}/destinations/${destination.slug}#page`,
    url: `${siteUrl}/destinations/${destination.slug}`,
    name: `Study in ${destination.label}`,
    description: `Study destination guidance for ${destination.name}, including shortlist, application and document planning support.`,
    about: {
      "@type": "Place",
      name: destination.name
    },
    publisher: { "@id": `${siteUrl}/#organization` },
    mainEntity: destination.institutions.length
      ? {
          "@type": "ItemList",
          name: `Priority institutions for ${destination.label}`,
          itemListElement: destination.institutions.map((institution, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "EducationalOrganization",
              name: institution.name,
              url: institution.website,
              image: toAbsoluteUrl(institution.image),
              address: {
                "@type": "PostalAddress",
                addressLocality: institution.location
              }
            }
          }))
        }
      : undefined
  };

  return (
    <div className="study-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd([breadcrumbSchema, destinationSchema])} />
      <SiteHeader destinationPage />
      <main>
        <section className="study-hero">
          <nav className="contact-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/#destinations">Study destinations</Link><span aria-hidden="true">/</span><span aria-current="page">{destination.label}</span></nav>
          <div className="study-hero-grid">
            <div><p className="eyebrow">Your destination. Your direction.</p><h1>Study in<br /><span>{destination.label}.</span></h1><p className="study-hero-copy">Find the right fit for your next chapter. Explore institutions in {destination.name} and get clear guidance on where to begin.</p><div className="button-row"><a className="primary-button" href="#institutions">{destination.institutions.length ? "Explore institutions" : "Explore your options"} <ArrowDown size={16} /></a><LeadEnquiry className="study-advisor-link" country={destination.name}>Talk to an advisor <ArrowRight size={16} /></LeadEnquiry></div></div>
            <aside className="study-destination-summary" aria-label={`${destination.label} at a glance`}>
              <div className="study-summary-top"><span>DESTINATION GUIDE</span><Compass size={20} aria-hidden="true" /></div>
              <Image className="study-country-flag" src={destination.flag} alt={`${destination.name} flag`} width={100} height={74} unoptimized />
              <h2>{destination.label}</h2><p>{destination.name === "United Arab Emirates" ? "Explore Dubai and the wider UAE" : "Your study plans start with a clear shortlist"}</p>
              <div className="study-summary-stat"><GraduationCap size={25} aria-hidden="true" /><div><strong>{destination.institutions.length ? "Priority options" : "Let’s talk"}</strong><span>{destination.institutions.length ? "featured institutions, with more available" : "about your institution options"}</span></div></div>
            </aside>
          </div>
        </section>
        <nav className="study-country-nav" aria-label="Featured study destinations">
          {featuredDestinations.map((item) => <Link key={item.slug} href={`/destinations/${item.slug}`} aria-current={item.slug === slug ? "page" : undefined}><Image src={item.flag} width={22} height={22} alt="" unoptimized />{item.label}</Link>)}
        </nav>
        <InstitutionDirectory key={destination.slug} institutions={destination.institutions} country={destination.name} />
        <section className="study-advice">
          <div><p className="eyebrow">Make your next step count</p><h2>Options are a start.<br /><span>A clear plan takes you further.</span></h2><p>Share your academic background, budget and preferred intake. We&apos;ll help you work out what fits.</p><LeadEnquiry className="teal-button" country={destination.name}>Help me build my shortlist <ArrowRight size={16} /></LeadEnquiry></div>
          <ul>{["Compare course and institution fit", "Understand entry requirements", "Plan documents and application timelines"].map((text) => <li key={text}><Check size={19} aria-hidden="true" />{text}</li>)}</ul>
        </section>
      </main>
      <footer className="study-footer"><Link href="/">AE Global Group</Link><p>Clear options. Careful preparation. No guesswork.</p><Link href="/sitemap">Sitemap <ArrowRight size={14} /></Link><Link href="/contact">Contact Us <ArrowRight size={14} /></Link></footer>
    </div>
  );
}
