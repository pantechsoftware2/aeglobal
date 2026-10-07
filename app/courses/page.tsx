import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, BookOpen, BriefcaseBusiness, Check, ClipboardCheck } from "lucide-react";
import SiteHeader from "../components/SiteHeader";
import LeadEnquiry from "../components/LeadEnquiry";
import CourseExplorer from "../components/CourseExplorer";
import { marketingPages } from "../data/marketingPages";
import { brandName, defaultOpenGraph } from "../lib/seo";
import styles from "./courses.module.css";

const page = marketingPages.courses;
const heroImage = "/images/courses-hero-ai.png";

export const metadata: Metadata = {
  title: page.navLabel,
  description: page.description,
  alternates: { canonical: "/courses" },
  openGraph: {
    ...defaultOpenGraph,
    title: page.navLabel + " | " + brandName,
    description: page.description,
    url: "/courses",
    images: [{ url: heroImage, width: 1536, height: 1024, alt: "International students comparing courses in a university library" }]
  },
  twitter: { card: "summary_large_image", title: page.navLabel + " | " + brandName, description: page.description, images: [heroImage] }
};

export default function Page() {
  return (
    <div className={styles.page}>
      <SiteHeader activePage="courses" />
      <main>
        <section className={styles.hero} aria-labelledby="courses-title">
          <Image className={styles.heroImage} src={heroImage} alt="International students comparing courses in a university library" fill sizes="100vw" preload />
          <div className={styles.heroShade} />
          <div className={`${styles.container} ${styles.heroInner}`}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Courses</span></nav>
            <p className={styles.eyebrow}>Course planning</p>
            <h1 id="courses-title">Choose a course.<br /><span>Build a direction.</span></h1>
            <p className={styles.heroCopy}>Compare subjects, course structure, entry requirements and career direction before you commit to an application.</p>
            <div className={styles.actions}><a className="primary-button" href="#course-explorer">Explore courses <ArrowDown size={16} aria-hidden="true" /></a><LeadEnquiry className={styles.textLink}>Talk to an advisor <ArrowRight size={16} aria-hidden="true" /></LeadEnquiry></div>
            <p className={styles.photoCaption}>Course planning starts with a better question <span>What fits your next step?</span></p>
          </div>
        </section>

        <div className={styles.principles}><div className={styles.container}><span><BookOpen size={20} aria-hidden="true" /> Subject and course direction</span><span><ClipboardCheck size={20} aria-hidden="true" /> Requirements checked early</span><span><BriefcaseBusiness size={20} aria-hidden="true" /> A clearer career connection</span></div></div>

        <CourseExplorer />

        <section className={styles.fitSection} aria-labelledby="fit-title"><div className={`${styles.container} ${styles.fitGrid}`}><div><p className={styles.eyebrow}>Course fit, in practice</p><h2 id="fit-title">A course should make sense<br /><span>before the forms.</span></h2><p>We help you compare the details that affect your application and your life after enrolment.</p><Link className={styles.textLink} href="/contact">Discuss your course direction <ArrowRight size={16} aria-hidden="true" /></Link></div><div className={styles.fitList}>{[["Background", "Does the subject build naturally from what you have studied?"], ["Requirements", "Are the grades, English evidence and documents realistic?"], ["Outcome", "Does the course support the career direction you are considering?"], ["Practical fit", "Do the destination, budget and intake work for your plan?"]].map(([title, copy]) => <div key={title}><Check size={17} aria-hidden="true" /><div><strong>{title}</strong><p>{copy}</p></div></div>)}</div></div></section>

        <section className={`${styles.container} ${styles.process}`} aria-labelledby="process-title"><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>How we help</p><h2 id="process-title">From subject interest<br /><span>to application.</span></h2></div><p>Clear decisions are easier when the steps are visible.</p></div><ol className={styles.steps}>{[["Understand your goals", "Start with your background, interests, preferred destination and intended intake."], ["Compare the course", "Review modules, requirements, progression and practical fit together."], ["Prepare the next step", "Organise the documents, shortlist and timeline needed to apply."]].map(([title, copy], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol></section>

        <section className={styles.closing}><div className={styles.container}><div><p className={styles.eyebrow}>Ready to choose with clarity?</p><h2>Let&apos;s find the course that fits.</h2><p>Bring your questions. We will help you turn them into practical next steps.</p></div><LeadEnquiry className="primary-button">Start my course plan <ArrowRight size={16} aria-hidden="true" /></LeadEnquiry></div></section>
      </main>
    </div>
  );
}
