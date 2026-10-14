import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, Award, BadgeCheck, Banknote, CalendarClock, Check, FileCheck2, Info, ShieldCheck } from "lucide-react";
import LeadEnquiry from "../components/LeadEnquiry";
import SiteHeader from "../components/SiteHeader";
import { marketingPages } from "../data/marketingPages";
import { brandName, defaultOpenGraph } from "../lib/seo";
import styles from "./scholarships.module.css";

const page = marketingPages.scholarships;

export const metadata: Metadata = {
  title: page.navLabel,
  description: "Plan scholarship applications with a realistic review of eligibility, deadlines, documents, total study costs and your remaining funding gap.",
  alternates: { canonical: "/scholarships" },
  openGraph: {
    ...defaultOpenGraph,
    title: page.navLabel + " | " + brandName,
    description: page.description,
    url: "/scholarships",
    images: [{ url: page.heroImage, width: 2048, height: 766, alt: page.heroAlt }]
  },
  twitter: { card: "summary_large_image", title: page.navLabel + " | " + brandName, description: page.description, images: [page.heroImage] }
};

const fundingRoutes = [
  { number: "01", title: "Merit-based awards", copy: "Usually assessed against academic performance, profile quality and competition for the intake." },
  { number: "02", title: "University scholarships", copy: "Institution-specific awards that can vary by course, study level, campus and application period." },
  { number: "03", title: "Subject or destination funding", copy: "Selected awards may focus on particular subjects, regions or applicant groups and have separate criteria." },
  { number: "04", title: "External funding routes", copy: "Government, professional and independent schemes may use their own process, evidence and deadlines." }
];

const processSteps = [
  { title: "Understand your profile", copy: "We review your academics, intended course, destination, intake and current budget." },
  { title: "Identify realistic routes", copy: "Potential options are checked against published eligibility and application timing." },
  { title: "Prepare the evidence", copy: "We organise the documents, statements and supporting information the route may require." },
  { title: "Plan beyond the award", copy: "You keep a practical funding plan for tuition, living costs and any remaining balance." }
];

const documentChecklist = [
  "Academic transcripts and certificates",
  "Passport and identification documents",
  "English-language evidence, where required",
  "CV, portfolio or experience evidence, if relevant",
  "Scholarship statement or written responses",
  "Financial documents for the wider study plan"
];

export default function Page() {
  const heroStyle = { "--scholarship-image": `url(${page.heroImage})` } as CSSProperties;

  return (
    <div className={styles.page}>
      <SiteHeader activePage="scholarships" />
      <main>
        <section className={styles.hero} style={heroStyle}>
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <nav className="contact-breadcrumb" aria-label="Breadcrumb">
                <Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Scholarships</span>
              </nav>
              <p className={styles.eyebrow}>Scholarship &amp; funding guidance</p>
              <h1>Make funding part of the plan.<br /><span>Not a last-minute hope.</span></h1>
              <p className={styles.heroText}>Understand possible scholarship routes, application timing and the full study budget before you make decisions.</p>
              <div className={styles.heroActions}>
                <LeadEnquiry className="primary-button">Start a funding review <ArrowRight size={16} aria-hidden="true" /></LeadEnquiry>
                <Link className={styles.textLink} href="/universities">Explore universities <ArrowRight size={15} aria-hidden="true" /></Link>
              </div>
              <p className={styles.heroNote}><ShieldCheck size={15} aria-hidden="true" /> Clear guidance based on published criteria—never a promise of an award.</p>
            </div>

          </div>
        </section>

        <section className={styles.principles} aria-label="Our scholarship guidance principles">
          <div><BadgeCheck size={18} aria-hidden="true" /><span><strong>Official criteria first</strong><small>Check the institution&apos;s current terms</small></span></div>
          <div><CalendarClock size={18} aria-hidden="true" /><span><strong>Deadline-aware planning</strong><small>Prepare before windows close</small></span></div>
          <div><Banknote size={18} aria-hidden="true" /><span><strong>Full-budget thinking</strong><small>Plan for costs beyond an award</small></span></div>
        </section>

        <section className={styles.intro}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Start with clarity</p>
            <h2>A scholarship is one part of your financial plan.</h2>
          </div>
          <div className={styles.introCopy}>
            <p>Strong scholarship planning connects your profile, chosen course, institution deadlines and total cost of study. AE Global Group helps you review those pieces together so you can apply with realistic expectations and a clearer backup plan.</p>
            <p>We focus on preparation and fit. Final eligibility, selection and award decisions always remain with the official scholarship provider.</p>
          </div>
        </section>

        <section className={styles.routes} aria-labelledby="funding-routes-title">
          <div className={styles.routesIntro}>
            <p className={styles.eyebrow}>Funding landscape</p>
            <h2 id="funding-routes-title">Not every funding route works the same way.</h2>
            <p>Different awards use different eligibility rules, evidence and timelines. The first task is understanding which type you are actually considering.</p>
          </div>
          <div className={styles.routeGrid}>
            {fundingRoutes.map((route) => (
              <article key={route.title}><span>{route.number}</span><h3>{route.title}</h3><p>{route.copy}</p></article>
            ))}
          </div>
        </section>

        <section className={styles.process} aria-labelledby="process-title">
          <div className={styles.processHeading}>
            <p className={styles.eyebrow}>Our planning process</p>
            <h2 id="process-title">From funding question to an application-ready plan.</h2>
            <p>No vague promises. Just a structured review of what may fit, what you need and what comes next.</p>
          </div>
          <ol>
            {processSteps.map((step, index) => (
              <li key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.copy}</p></div></li>
            ))}
          </ol>
        </section>

        <section className={styles.readiness}>
          <div className={styles.checklistCard}>
            <span className={styles.cardIcon}><FileCheck2 size={23} aria-hidden="true" /></span>
            <p className={styles.eyebrow}>Application readiness</p>
            <h2>Prepare the evidence before the deadline.</h2>
            <p>Requirements vary, but organising the common documents early makes it easier to respond when a suitable opportunity is identified.</p>
            <div className={styles.checklist}>
              {documentChecklist.map((item) => <div key={item}><Check size={15} aria-hidden="true" /><span>{item}</span></div>)}
            </div>
          </div>

          <aside className={styles.realityCard}>
            <Award size={28} aria-hidden="true" />
            <p className={styles.eyebrow}>Before you rely on an award</p>
            <h2>Keep the numbers practical.</h2>
            <p>Even a successful scholarship may cover only part of the total cost. Your plan should still account for tuition balance, living expenses, travel, visa-related costs and the financial evidence your destination may require.</p>
            <Link href="/contact">Discuss my study budget <ArrowRight size={16} aria-hidden="true" /></Link>
          </aside>
        </section>

        <section className={styles.disclaimer}>
          <Info size={19} aria-hidden="true" />
          <p><strong>Important:</strong> Scholarships are competitive and subject to the provider&apos;s current eligibility, deadlines and selection process. AE Global Group can support research and preparation but cannot guarantee funding or an award.</p>
        </section>

        <section className={styles.cta}>
          <div><p className={styles.eyebrow}>Build a realistic plan</p><h2>Tell us your course, destination and budget.</h2><p>We&apos;ll help you understand what to review next and how to prepare.</p></div>
          <LeadEnquiry className="teal-button">Start my funding review <ArrowRight size={16} aria-hidden="true" /></LeadEnquiry>
        </section>
      </main>
    </div>
  );
}
