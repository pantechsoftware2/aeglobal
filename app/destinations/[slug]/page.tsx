import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowRight, Check, Compass, GraduationCap } from "lucide-react";
import { destinations, getDestinationGuide, getDestinationHero } from "../../data/destinations";
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

  const guide = getDestinationGuide(destination);
  const hero = getDestinationHero(destination);
  const description = guide.intro;
  const image = hero.image;

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
  const guide = getDestinationGuide(destination);
  const hero = getDestinationHero(destination);
  const heroStyle = { "--destination-hero-image": `url("${hero.image}")` } as CSSProperties;

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
        item: `${siteUrl}/study-destinations`
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
    description: guide.intro,
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
        <section className="study-hero destination-study-hero" style={heroStyle}>
          <nav className="contact-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/study-destinations">Study destinations</Link><span aria-hidden="true">/</span><span aria-current="page">{destination.label}</span></nav>
          <div className="study-hero-grid">
            <div><p className="eyebrow">{hero.eyebrow}</p><h1>{hero.title}<br /><span>{hero.accent}</span></h1><p className="study-hero-copy">{hero.copy}</p><div className="button-row"><a className="primary-button" href="#destination-guide">{destination.institutions.length ? "Explore country guide" : "Explore your options"} <ArrowDown size={16} /></a><LeadEnquiry className="study-advisor-link" country={destination.name}>Talk to an advisor <ArrowRight size={16} /></LeadEnquiry></div></div>
            <aside className="study-destination-summary" aria-label={`${destination.label} study planning focus`}>
              <div className="study-summary-top"><span>{hero.focusLabel}</span><Compass size={20} aria-hidden="true" /></div>
              <h2>{hero.cardTitle}</h2><p>{guide.studentFit}</p>
              <div className="study-summary-stat"><GraduationCap size={25} aria-hidden="true" /><div><strong>{destination.institutions.length ? "Priority options" : "Let's talk"}</strong><span>{destination.institutions.length ? hero.cardStat : `about ${destination.label} institution options`}</span></div></div>
            </aside>
          </div>
        </section>
        <section className="destination-guide-section" id="destination-guide" aria-labelledby="destination-guide-title">
          <div className="destination-guide-intro">
            <p className="eyebrow">Country fit</p>
            <h2 id="destination-guide-title">{guide.headline}</h2>
            <p>{guide.studentFit}</p>
          </div>
          <div className="destination-guide-grid">
            <article>
              <h3>Best for</h3>
              <ul>{guide.bestFor.map((text) => <li key={text}><Check size={17} aria-hidden="true" />{text}</li>)}</ul>
            </article>
            <article>
              <h3>What to plan</h3>
              <ul>{guide.planningFocus.map((text) => <li key={text}><Check size={17} aria-hidden="true" />{text}</li>)}</ul>
            </article>
            <article>
              <h3>Application notes</h3>
              <ul>{guide.applicationNotes.map((text) => <li key={text}><Check size={17} aria-hidden="true" />{text}</li>)}</ul>
            </article>
          </div>
        </section>
        <section className="destination-life-panel" aria-label={`${destination.label} study lifestyle and next step`}>
          <article>
            <p className="eyebrow">City and lifestyle</p>
            <h2>Think beyond the country name.</h2>
            <p>{guide.cityAndLifestyle}</p>
          </article>
          <article>
            <p className="eyebrow">Next step</p>
            <h2>Shortlist with evidence.</h2>
            <p>{guide.nextStep}</p>
          </article>
        </section>
        <InstitutionDirectory key={destination.slug} institutions={destination.institutions} country={destination.name} />
        <section className="study-advice">
          <div><p className="eyebrow">Make your next step count</p><h2>{destination.label} can work.<br /><span>Only if the details fit.</span></h2><p>{guide.nextStep}</p><LeadEnquiry className="teal-button" country={destination.name}>Help me build my shortlist <ArrowRight size={16} /></LeadEnquiry></div>
          <ul>{guide.planningFocus.map((text) => <li key={text}><Check size={19} aria-hidden="true" />{text}</li>)}</ul>
        </section>
      </main>
    </div>
  );
}
