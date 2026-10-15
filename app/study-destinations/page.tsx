import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  Compass,
  FileSearch,
  GraduationCap,
  MapPinned,
  Plane,
  WalletCards
} from "lucide-react";
import LeadEnquiry from "../components/LeadEnquiry";
import SiteHeader from "../components/SiteHeader";
import { destinations, type StudyDestination } from "../data/destinations";
import { brandName, defaultDescription, defaultOpenGraph } from "../lib/seo";
import styles from "./study-destinations.module.css";

export const metadata: Metadata = {
  title: `Study Destinations | ${brandName}`,
  description: "Compare study destinations by course fit, budget, intakes, visa pathway and long-term plans before you commit.",
  alternates: { canonical: "/study-destinations" },
  openGraph: {
    ...defaultOpenGraph,
    title: `Study Destinations | ${brandName}`,
    description: defaultDescription,
    url: "/study-destinations",
    images: [{
      url: "/images/study-destinations-ai-hero.webp",
      width: 2048,
      height: 768,
      alt: "A study abroad planning desk with an illustrated international skyline"
    }]
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
    title: "Major English-speaking routes",
    kicker: "High-choice destinations",
    copy: "Popular routes where program depth, city choice and the total study budget need careful comparison.",
    slugs: ["united-states-of-america", "canada", "australia", "new-zealand", "united-kingdom", "ireland"]
  },
  {
    title: "Fast-growing & specialist routes",
    kicker: "Focused alternatives",
    copy: "Practical options for students comparing branch campuses, flexible intakes, value or a distinct academic culture.",
    slugs: ["united-arab-emirates", "malta", "malaysia", "singapore", "cyprus", "georgia", "japan"]
  },
  {
    title: "European study routes",
    kicker: "Course and value range",
    copy: "Compare language, deadlines, public and private routes, city costs and English-taught availability across Europe.",
    slugs: ["germany", "france", "spain", "poland", "italy", "netherlands", "finland", "sweden", "lithuania", "denmark", "austria", "belgium", "hungary", "switzerland", "greece"]
  }
].map((section) => ({
  ...section,
  destinations: section.slugs.map((slug) => destinationBySlug.get(slug)).filter(Boolean) as StudyDestination[]
}));

const featuredDestinations = ["united-kingdom", "united-arab-emirates", "malta", "spain"]
  .map((slug) => destinationBySlug.get(slug))
  .filter(Boolean) as StudyDestination[];

const comparisonFactors = [
  { title: "Course fit", copy: "Start with subject depth, entry requirements and how the course supports your next move.", icon: GraduationCap },
  { title: "Budget reality", copy: "Compare tuition, deposits, living costs and the funds needed before the visa stage.", icon: WalletCards },
  { title: "Intake timing", copy: "Align deadlines, documents and decision windows before committing to one route.", icon: CalendarClock },
  { title: "Life after arrival", copy: "Plan housing, travel, local support and what the first weeks will realistically involve.", icon: MapPinned }
];

const journeySteps = [
  { title: "Profile", copy: "Academics, budget, English level and timing.", icon: FileSearch },
  { title: "Compare", copy: "Countries reviewed through course, cost and requirements.", icon: Compass },
  { title: "Shortlist", copy: "A focused set of routes you can defend and afford.", icon: MapPinned },
  { title: "Apply", copy: "Documents, applications and next steps handled in order.", icon: Plane }
];

export default function StudyDestinationsPage() {
  const totalInstitutions = destinations.reduce((count, destination) => count + destination.institutions.length, 0);

  return (
    <div className={styles.page}>
      <SiteHeader activePage="destinations" />
      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <nav className={styles.breadcrumb} aria-label="Breadcrumb">
                <Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Study Destinations</span>
              </nav>
              <p className={styles.eyebrow}>Study destinations</p>
              <h1>Choose a country with clarity. <span>Not pressure.</span></h1>
              <p className={styles.heroText}>Compare course fit, total cost, intake timing, visa preparation and everyday student life before you commit.</p>
              <div className={styles.heroActions}>
                <LeadEnquiry className="primary-button">Start my plan <ArrowRight size={16} aria-hidden="true" /></LeadEnquiry>
                <a href="#all-destinations">Explore every destination <ArrowRight size={15} aria-hidden="true" /></a>
              </div>
              <p className={styles.heroAssurance}><BadgeCheck size={16} aria-hidden="true" /> Profile-led guidance—not a popularity ranking.</p>
            </div>

          </div>
        </section>

        <section className={styles.proofBar} aria-label="Destination planning overview">
          <div><MapPinned size={20} aria-hidden="true" /><span><strong>{destinations.length}+</strong> destination guides</span></div>
          <div><GraduationCap size={20} aria-hidden="true" /><span><strong>{totalInstitutions}+</strong> institution options</span></div>
          <div><Compass size={20} aria-hidden="true" /><span><strong>1:1</strong> profile-led shortlisting</span></div>
        </section>

        <section className={`${styles.section} ${styles.featured}`} aria-labelledby="featured-destinations-title">
          <div className={styles.sectionHeading}>
            <div><p className={styles.eyebrow}>Popular starting points</p><h2 id="featured-destinations-title">Start focused. Expand only when it helps.</h2></div>
            <p>These are common comparison routes—not automatic recommendations. Open a guide to understand who each destination may suit.</p>
          </div>
          <div className={styles.featuredGrid}>
            {featuredDestinations.map((destination, index) => (
              <Link className={styles.featuredCard} href={`/destinations/${destination.slug}`} key={destination.slug}>
                <div className={styles.featuredCardTop}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <Image src={destination.flag} alt="" width={44} height={32} />
                </div>
                <div><h3>{destination.label}</h3><p>{destination.meta}</p></div>
                <span className={styles.cardAction}>View destination <ArrowRight size={15} aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.directory}`} id="all-destinations" aria-labelledby="all-destinations-title">
          <div className={styles.directoryIntro}>
            <p className={styles.eyebrow}>Explore all routes</p>
            <h2 id="all-destinations-title">Find the region that fits the plan.</h2>
            <p>Use these groups as a starting point, then compare individual country guides by course, cost and timing.</p>
            <div className={styles.directoryCount}><strong>{destinations.length}</strong><span>country guides<br />in one place</span></div>
          </div>

          <div className={styles.categoryGrid}>
            {categorySections.map((section) => (
              <article className={styles.categoryCard} key={section.title}>
                <div className={styles.categoryHeader}>
                  <div><span>{section.kicker}</span><h3>{section.title}</h3></div>
                  <small>{section.destinations.length} destinations</small>
                </div>
                <p>{section.copy}</p>
                <div className={styles.destinationLinks}>
                  {section.destinations.map((destination) => (
                    <Link href={`/destinations/${destination.slug}`} key={destination.slug}>
                      <Image src={destination.flag} alt="" width={22} height={16} />
                      <span>{destination.label}</span>
                      <ArrowRight size={13} aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.framework}`} aria-labelledby="comparison-framework-title">
          <div className={styles.frameworkHeading}>
            <div><p className={styles.eyebrow}>A practical comparison</p><h2 id="comparison-framework-title">A destination should work on paper—and in real life.</h2></div>
            <p>Good decisions come from comparing the details that change your application, budget and arrival experience.</p>
          </div>
          <div className={styles.factorGrid}>
            {comparisonFactors.map(({ title, copy, icon: Icon }, index) => (
              <article key={title}>
                <div><Icon size={20} aria-hidden="true" /><span>{String(index + 1).padStart(2, "0")}</span></div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>

          <div className={styles.processPanel}>
            <div className={styles.processIntro}>
              <p className={styles.eyebrow}>Your route to a decision</p>
              <h2>Four steps. One shortlist you can act on.</h2>
              <p>We move from your profile to an application plan without skipping the practical checks in between.</p>
            </div>
            <ol>
              {journeySteps.map(({ title, copy, icon: Icon }, index) => (
                <li key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <Icon size={20} aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={`${styles.section} ${styles.cta}`}>
          <div><p className={styles.eyebrow}>Ready to compare properly?</p><h2>Tell us what you want to study. We&apos;ll map the countries worth your time.</h2></div>
          <div className={styles.ctaAction}>
            <p>Start with your course, budget and target intake.</p>
            <LeadEnquiry className="teal-button">Build my destination plan <GraduationCap size={16} aria-hidden="true" /></LeadEnquiry>
          </div>
        </section>
      </main>
    </div>
  );
}
