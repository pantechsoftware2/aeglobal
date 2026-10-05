import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Compass, FileSearch, GraduationCap, MapPinned, Plane } from "lucide-react";
import LeadEnquiry from "../components/LeadEnquiry";
import SiteHeader from "../components/SiteHeader";
import { destinations, type StudyDestination } from "../data/destinations";
import { brandName, defaultDescription, defaultOpenGraph } from "../lib/seo";

export const metadata: Metadata = {
  title: `Study Destinations | ${brandName}`,
  description: "Compare study destinations by course fit, budget, intakes, visa pathway and long-term plans before you commit.",
  alternates: {
    canonical: "/study-destinations"
  },
  openGraph: {
    ...defaultOpenGraph,
    title: `Study Destinations | ${brandName}`,
    description: defaultDescription,
    url: "/study-destinations",
    images: [
      {
        url: "/images/study-destinations-ai-hero.webp",
        width: 1200,
        height: 630,
        alt: "Study abroad destination planning background"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `Study Destinations | ${brandName}`,
    description: defaultDescription,
    images: ["/images/study-destinations-ai-hero.webp"]
  }
};

const destinationBySlug = new Map(destinations.map((destination) => [destination.slug, destination]));

const categorySections = [
  {
    title: "Big decision destinations",
    copy: "Popular study routes where the right shortlist matters more than following the crowd.",
    slugs: ["united-states-of-america", "canada", "australia", "new-zealand", "united-kingdom", "ireland"]
  },
  {
    title: "Fast-growing routes",
    copy: "Options students compare when they want practical campuses, flexible entry points and clear cost planning.",
    slugs: ["united-arab-emirates", "malta", "malaysia", "singapore", "cyprus", "georgia"]
  },
  {
    title: "Europe study routes",
    copy: "Country choices for students comparing affordability, English-taught programs and long-term plans.",
    slugs: ["germany", "france", "spain", "poland", "italy", "netherlands", "finland", "sweden", "lithuania", "denmark", "austria", "belgium", "hungary", "switzerland", "greece"]
  },
  {
    title: "Asia and specialist options",
    copy: "Focused routes for students who want region-specific programs, career links or a different academic culture.",
    slugs: ["japan"]
  }
].map((section) => ({
  ...section,
  destinations: section.slugs.map((slug) => destinationBySlug.get(slug)).filter(Boolean) as StudyDestination[]
}));

const heroDestinations = ["united-kingdom", "united-arab-emirates", "malta", "spain"]
  .map((slug) => destinationBySlug.get(slug))
  .filter(Boolean) as StudyDestination[];

const planningPoints = [
  {
    title: "Course fit",
    copy: "Start with the subject, entry requirements and teaching style, then compare countries."
  },
  {
    title: "Budget reality",
    copy: "Look at fees, living costs, deposits and what needs to be ready before the visa stage."
  },
  {
    title: "Timing",
    copy: "Match intakes, documents and decision dates before you fall in love with one option."
  },
  {
    title: "After arrival",
    copy: "Think about accommodation, travel, support and what the first month actually looks like."
  }
];

const routeSteps = [
  { title: "Profile", copy: "We review academics, budget, English level and timing.", icon: FileSearch },
  { title: "Compare", copy: "You see country routes through fit, requirements and cost.", icon: Compass },
  { title: "Shortlist", copy: "We narrow the options before applications begin.", icon: MapPinned },
  { title: "Apply", copy: "Documents, forms and next steps are handled in order.", icon: Plane }
];

export default function StudyDestinationsPage() {
  const totalInstitutions = destinations.reduce((count, destination) => count + destination.institutions.length, 0);

  return (
    <div className="destinations-landing">
      <SiteHeader activePage="destinations" />
      <main>
        <section className="destination-landing-hero">
          <div className="destination-landing-copy">
            <nav className="contact-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Study Destinations</span>
            </nav>
            <p className="eyebrow">Study destinations</p>
            <h1>Choose a country<br />with clarity.<br /><span>Not pressure.</span></h1>
            <p>
              Compare destination fit using course availability, budget, intakes,
              visa path, lifestyle and long-term plans before you commit.
            </p>
            <div className="button-row">
              <LeadEnquiry className="primary-button">Start my plan <ArrowRight size={16} /></LeadEnquiry>
              <a className="study-advisor-link" href="#destination-categories">Explore countries <ArrowRight size={16} /></a>
            </div>
          </div>
          <div className="destination-landing-visual">
            <div className="destination-hero-stat">
              <strong>{destinations.length}+</strong>
              <span>destinations compared by fit</span>
            </div>
            <div className="destination-hero-panel" aria-label="Destination comparison factors">
              <span>Compare by</span>
              <ul>
                <li>Course fit</li>
                <li>Budget range</li>
                <li>Intake timing</li>
                <li>Visa pathway</li>
              </ul>
            </div>
            <div className="destination-hero-microstats" aria-label="Destination planning summary">
              <span>
                <strong>{totalInstitutions}+</strong>
                institution options
              </span>
              <span>
                <strong>4</strong>
                planning stages
              </span>
            </div>
          </div>
        </section>

        <section className="destination-featured-routes" aria-labelledby="featured-routes-title">
          <div className="destination-section-heading">
            <p className="eyebrow">Start with the route</p>
            <h2 id="featured-routes-title">Not every popular country is the right country.</h2>
            <p>Begin with a few strong options, then compare them against your profile instead of chasing every possibility.</p>
          </div>
          <div className="destination-route-grid">
            {heroDestinations.map((destination) => (
              <Link className="destination-route-card" href={`/destinations/${destination.slug}`} key={destination.slug}>
                <Image src={destination.flag} alt="" width={38} height={38} unoptimized />
                <span>{destination.label}</span>
                <small>{destination.meta}</small>
                <ArrowRight className="destination-route-card-arrow" size={17} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>

        <section className="destination-category-section" id="destination-categories" aria-labelledby="destination-categories-title">
          <div className="destination-category-intro">
            <p className="eyebrow">Destination categories</p>
            <h2 id="destination-categories-title">Choose by pathway, not just by place.</h2>
            <p>These groups make the search easier: classic choices, faster-growing routes, Europe, and specialist options.</p>
          </div>
          <div className="destination-category-stack">
            {categorySections.map((section) => (
              <article className="destination-category-band" key={section.title}>
                <div>
                  <h3>{section.title}</h3>
                  <p>{section.copy}</p>
                </div>
                <div className="destination-chip-grid">
                  {section.destinations.map((destination) => (
                    <Link href={`/destinations/${destination.slug}`} key={destination.slug}>
                      <Image src={destination.flag} alt="" width={24} height={24} unoptimized />
                      <span>{destination.label}</span>
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="destination-planning-panel">
          <div className="destination-section-heading">
            <p className="eyebrow">What we compare</p>
            <h2>A destination should make sense on paper.</h2>
          </div>
          <div className="destination-planning-grid">
            {planningPoints.map((point) => (
              <article key={point.title}>
                <Check size={18} aria-hidden="true" />
                <h3>{point.title}</h3>
                <p>{point.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="destination-process-strip">
          <div>
            <p className="eyebrow">How the decision gets clearer</p>
            <h2>From where should I go to a shortlist you can act on.</h2>
          </div>
          <ol>
            {routeSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <li key={step.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <Icon size={22} aria-hidden="true" />
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </li>
              );
            })}
          </ol>
        </section>

        <section className="destination-final-cta">
          <div>
            <p className="eyebrow">Ready to compare properly?</p>
            <h2>Tell us what you want to study. We&apos;ll help map the countries worth your time.</h2>
          </div>
          <LeadEnquiry className="teal-button">
            Build my destination plan <GraduationCap size={16} aria-hidden="true" />
          </LeadEnquiry>
        </section>
      </main>
    </div>
  );
}
