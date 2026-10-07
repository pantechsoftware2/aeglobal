import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Check, ClipboardList, GraduationCap, SlidersHorizontal } from "lucide-react";
import SiteHeader from "../components/SiteHeader";
import LeadEnquiry from "../components/LeadEnquiry";
import UniversityExplorer from "../components/UniversityExplorer";
import { destinations } from "../data/destinations";
import styles from "./universities.module.css";
import { marketingPages } from "../data/marketingPages";
import { brandName, defaultOpenGraph } from "../lib/seo";

const page = marketingPages.universities;
const heroImage = "/images/institutions/royal-holloway-campus.jpg";

export const metadata: Metadata = {
  title: page.navLabel,
  description: page.description,
  alternates: {
    canonical: "/universities"
  },
  openGraph: {
    ...defaultOpenGraph,
    title: page.navLabel + " | " + brandName,
    description: page.description,
    url: "/universities",
    images: [
      {
        url: heroImage,
        width: 1200,
        height: 630,
        alt: "Royal Holloway campus, United Kingdom"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: page.navLabel + " | " + brandName,
    description: page.description,
    images: [heroImage]
  }
};

export default function Page() {
  const countries = destinations.filter((destination) => destination.institutions.length > 0);
  const institutions = countries.flatMap((destination) => destination.institutions.map((institution, index) => ({
    ...institution,
    country: destination.name,
    countryLabel: destination.label,
    countrySlug: destination.slug,
    featured: index === 0,
  }))).sort((a, b) => Number(b.featured) - Number(a.featured));

  return (
    <div className={styles.page}>
      <SiteHeader activePage="universities" />
      <main>
        <section className={styles.hero} aria-labelledby="university-title">
          <Image className={styles.heroImage} src={heroImage} alt="The Founder's Building and gardens at Royal Holloway, University of London" fill sizes="100vw" preload />
          <div className={styles.heroShade} />
          <div className={`${styles.container} ${styles.heroInner}`}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Universities</span></nav>
            <p className={styles.eyebrow}>University guidance</p>
            <h1 id="university-title">Universities.<br /><span>Find your fit.</span></h1>
            <p className={styles.heroCopy}>Your ambitions, your budget, your next chapter. Explore institutions and build a shortlist around what matters to you.</p>
            <div className={styles.actions}>
              <a className="primary-button" href="#university-directory">Explore institutions <ArrowDown size={16} aria-hidden="true" /></a>
              <LeadEnquiry className={styles.textLink}>Build my shortlist <ArrowRight size={16} aria-hidden="true" /></LeadEnquiry>
            </div>
            <p className={styles.photoCaption}>Royal Holloway, University of London <span>United Kingdom</span></p>
          </div>
        </section>

        <div className={styles.principles}>
          <div className={styles.container}>
            <span><GraduationCap size={20} aria-hidden="true" /> Universities, colleges &amp; pathways</span>
            <span><SlidersHorizontal size={20} aria-hidden="true" /> Options matched to your profile</span>
            <span><ClipboardList size={20} aria-hidden="true" /> Support from shortlist to application</span>
          </div>
        </div>

        <UniversityExplorer institutions={institutions} countries={countries.map(({ name, label, slug }) => ({ name, label, slug }))} />

        <section className={styles.guidance} aria-labelledby="comparison-title">
          <div className={`${styles.container} ${styles.guidanceGrid}`}>
            <div>
              <p className={styles.eyebrow}>Beyond the university name</p>
              <h2 id="comparison-title">A shortlist with<br /><span>a reason behind it.</span></h2>
              <p>A familiar name is a starting point. We help you check whether the course, cost and study experience work for you.</p>
              <Link className={styles.textLink} href="/contact">Talk through your options <ArrowRight size={16} aria-hidden="true" /></Link>
            </div>
            <dl className={styles.criteria}>
              {[
                ["Course & curriculum", "Modules, teaching style and how the course relates to your goals."],
                ["Entry requirements", "Your qualifications, English language evidence and required documents."],
                ["Total study budget", "Tuition, living costs and the funding you need to plan for."],
                ["Location & intake", "Campus life, available start dates and time to prepare your application."],
              ].map(([title, copy]) => <div key={title}><dt><Check size={17} aria-hidden="true" />{title}</dt><dd>{copy}</dd></div>)}
            </dl>
          </div>
        </section>

        <section className={`${styles.container} ${styles.process}`} aria-labelledby="shortlist-title">
          <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Your next steps</p><h2 id="shortlist-title">From options to applications.</h2></div><p>A clear process, with an advisor alongside you.</p></div>
          <ol className={styles.steps}>
            {[
              ["Tell us about you", "Share your academic background, preferred subject, budget and intake."],
              ["Review your options", "Discuss suitable institutions and the reasons each one belongs on your list."],
              ["Prepare to apply", "Confirm requirements and organise your documents, deadlines and next actions."],
            ].map(([title, copy], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p></li>)}
          </ol>
        </section>

        <section className={styles.closing}>
          <div className={styles.container}><div><p className={styles.eyebrow}>Let&apos;s find your direction</p><h2>Your shortlist starts with you.</h2><p>Tell us what you want to study. We will help you work through the options.</p></div><LeadEnquiry className="primary-button">Build my shortlist <ArrowRight size={16} aria-hidden="true" /></LeadEnquiry></div>
        </section>
      </main>
    </div>
  );
}
