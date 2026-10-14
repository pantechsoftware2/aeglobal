import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  BriefcaseBusiness,
  Building2,
  Check,
  ClipboardCheck,
  Compass,
  FileCheck2,
  GraduationCap,
  Handshake,
  House,
  Plane,
  ShieldCheck,
  WalletCards
} from "lucide-react";
import LeadEnquiry from "../components/LeadEnquiry";
import SiteHeader from "../components/SiteHeader";
import { marketingPages } from "../data/marketingPages";
import { brandName, defaultOpenGraph } from "../lib/seo";
import styles from "./services.module.css";

const page = marketingPages.services;

export const metadata: Metadata = {
  title: page.navLabel,
  description: "Connected study abroad guidance for counselling, course and university selection, applications, funding review, visa preparation and departure planning.",
  alternates: { canonical: "/services" },
  openGraph: {
    ...defaultOpenGraph,
    title: page.navLabel + " | " + brandName,
    description: page.description,
    url: "/services",
    images: [{ url: page.heroImage, width: 1200, height: 630, alt: page.heroAlt }]
  },
  twitter: { card: "summary_large_image", title: page.navLabel + " | " + brandName, description: page.description, images: [page.heroImage] }
};

const serviceAreas = [
  { icon: Compass, title: "Career and profile counselling", copy: "Clarify your goals, academic background, strengths, budget and preferred timeline before choosing a route." },
  { icon: BookOpenCheck, title: "Course and university selection", copy: "Compare study options using entry requirements, course fit, location, fees and progression goals." },
  { icon: FileCheck2, title: "Application coordination", copy: "Organise forms, supporting documents, statements, deadlines and the next actions for each application." },
  { icon: WalletCards, title: "Scholarship and budget review", copy: "Explore published funding possibilities while keeping the complete study budget practical and realistic." },
  { icon: ShieldCheck, title: "Visa preparation guidance", copy: "Understand the document pathway and prepare carefully for the requirements relevant to your destination." },
  { icon: Plane, title: "Accommodation and departure", copy: "Plan housing, travel preparation, pre-departure essentials and the practical transition to student life." }
];

const journey = [
  { label: "Discover", title: "Understand the student", copy: "Goals, academics, experience, budget, preferred countries and intake timing." },
  { label: "Decide", title: "Build the right shortlist", copy: "A balanced comparison of destinations, courses and institutions that fit the profile." },
  { label: "Apply", title: "Prepare strong applications", copy: "Clear document checks, forms, statements, submissions and deadline tracking." },
  { label: "Prepare", title: "Move from offer to readiness", copy: "Offer conditions, funding plan, visa preparation and accommodation guidance." },
  { label: "Depart", title: "Get ready for the transition", copy: "Pre-departure information, travel preparation and arrival-focused next steps." }
];

const studentChecklist = [
  "Academic records and certificates",
  "Passport and identification",
  "English test results, if available",
  "Current CV or experience details",
  "Preferred subject and destinations",
  "Budget range and intended intake"
];

export default function Page() {
  const heroStyle = { "--services-image": `url(${page.heroImage})` } as CSSProperties;

  return (
    <div className={styles.page}>
      <SiteHeader activePage="services" />
      <main>
        <section className={styles.hero} style={heroStyle}>
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <nav className="contact-breadcrumb" aria-label="Breadcrumb">
                <Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Services</span>
              </nav>
              <p className={styles.eyebrow}>Student guidance, connected</p>
              <h1>One journey.<br /><span>Clear support at every stage.</span></h1>
              <p className={styles.heroText}>From your first study question to departure preparation, AE Global Group connects each decision, document and deadline into one practical plan.</p>
              <div className={styles.heroActions}>
                <LeadEnquiry className="primary-button">Start my study plan <ArrowRight size={16} aria-hidden="true" /></LeadEnquiry>
                <Link className={styles.textLink} href="/contact">Speak with an advisor <ArrowRight size={15} aria-hidden="true" /></Link>
              </div>
              <p className={styles.heroNote}><BadgeCheck size={15} aria-hidden="true" /> Guidance built around your profile—not a one-size-fits-all list.</p>
            </div>

          </div>
        </section>

        <section className={styles.principles} aria-label="How AE Global supports students">
          <div><GraduationCap size={19} aria-hidden="true" /><span><strong>Student-first planning</strong><small>Start with your profile and goals</small></span></div>
          <div><Handshake size={19} aria-hidden="true" /><span><strong>Connected guidance</strong><small>Keep every stage working together</small></span></div>
          <div><ClipboardCheck size={19} aria-hidden="true" /><span><strong>Clear next actions</strong><small>Know what to prepare and when</small></span></div>
        </section>

        <section className={styles.intro}>
          <div>
            <p className={styles.eyebrow}>How we help</p>
            <h2>Good guidance connects the whole journey.</h2>
          </div>
          <div className={styles.introCopy}>
            <p>Course choice affects the university shortlist. The shortlist affects documents, cost and timing. Offers lead into funding, visa preparation and departure planning. Treating each stage separately creates unnecessary confusion.</p>
            <p>AE Global Group brings those steps together so you can make informed decisions, prepare the right evidence and move forward with a clearer understanding of what comes next.</p>
          </div>
        </section>

        <section className={styles.services} aria-labelledby="services-title">
          <div className={styles.sectionHeading}>
            <div><p className={styles.eyebrow}>Our service areas</p><h2 id="services-title">Practical help for the decisions that matter.</h2></div>
            <p>Every service is designed to remove a specific uncertainty and move your plan forward.</p>
          </div>
          <div className={styles.serviceGrid}>
            {serviceAreas.map((service, index) => {
              const Icon = service.icon;
              return (
                <article key={service.title}>
                  <div className={styles.serviceCardTop}><span><Icon size={21} aria-hidden="true" /></span><small>{String(index + 1).padStart(2, "0")}</small></div>
                  <h3>{service.title}</h3><p>{service.copy}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className={styles.process} aria-labelledby="journey-title">
          <div className={styles.processHeading}>
            <p className={styles.eyebrow}>The student journey</p>
            <h2 id="journey-title">A clear route from discovery to departure.</h2>
            <p>Your plan develops as new decisions and documents become relevant. The process stays connected from one stage to the next.</p>
          </div>
          <ol>
            {journey.map((step, index) => (
              <li key={step.label}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><small>{step.label}</small><h3>{step.title}</h3><p>{step.copy}</p></div>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.stages} aria-label="Support by application stage">
          <article><BriefcaseBusiness size={23} aria-hidden="true" /><small>Before applying</small><h2>Find your direction.</h2><p>Profile review, destination comparison, course exploration, university shortlisting and budget planning.</p></article>
          <article><Building2 size={23} aria-hidden="true" /><small>During applications</small><h2>Stay organised.</h2><p>Document checks, forms, statements, deadline planning and application-related next steps.</p></article>
          <article><House size={23} aria-hidden="true" /><small>After an offer</small><h2>Prepare for the move.</h2><p>Offer conditions, visa preparation guidance, accommodation, travel and pre-departure essentials.</p></article>
        </section>

        <section className={styles.readiness}>
          <div className={styles.checklistCard}>
            <span className={styles.cardIcon}><FileCheck2 size={23} aria-hidden="true" /></span>
            <p className={styles.eyebrow}>Come prepared</p>
            <h2>A few details help us guide you better.</h2>
            <p>You do not need everything ready for the first conversation. Bring what you have, and we&apos;ll help identify the gaps.</p>
            <div className={styles.checklist}>{studentChecklist.map((item) => <div key={item}><Check size={15} aria-hidden="true" /><span>{item}</span></div>)}</div>
          </div>
          <aside className={styles.expectationCard}>
            <ShieldCheck size={29} aria-hidden="true" />
            <p className={styles.eyebrow}>Clear expectations</p>
            <h2>Guidance with honesty built in.</h2>
            <p>We help you research, compare and prepare. Admission, scholarship and visa decisions remain with the relevant university, funding provider or government authority.</p>
            <LeadEnquiry className={styles.cardLink}>Discuss my situation <ArrowRight size={16} aria-hidden="true" /></LeadEnquiry>
          </aside>
        </section>

        <section className={styles.cta}>
          <div><p className={styles.eyebrow}>Start where you are</p><h2>Tell us your goal. We&apos;ll help map the next step.</h2><p>Whether you are still exploring or preparing to apply, your plan can start with one clear conversation.</p></div>
          <LeadEnquiry className="teal-button">I&apos;m ready to start <ArrowRight size={16} aria-hidden="true" /></LeadEnquiry>
        </section>
      </main>
    </div>
  );
}
