import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarCheck,
  Clock3,
  Compass,
  FileText,
  Mail,
  MessageSquareText,
  Phone,
  ShieldCheck
} from "lucide-react";
import LeadEnquiry from "../components/LeadEnquiry";
import SiteHeader from "../components/SiteHeader";
import { brandName, contactPoints, defaultOpenGraph, jsonLd, offices as schemaOffices, siteUrl } from "../lib/seo";
import styles from "./contact.module.css";

const heroImage = "/images/contact/contact-guidance-v2.webp";
const contactDescription =
  "Speak with AE Global Group about study destinations, course selection, university applications, funding planning, visa preparation and your next step.";

export const metadata: Metadata = {
  title: "Contact Us",
  description: contactDescription,
  alternates: { canonical: "/contact" },
  openGraph: {
    ...defaultOpenGraph,
    title: `Contact Us | ${brandName}`,
    description: contactDescription,
    url: "/contact",
    images: [{ url: heroImage, width: 2048, height: 768, alt: "A student discussing study abroad plans with an education advisor" }]
  },
  twitter: { card: "summary_large_image", title: `Contact Us | ${brandName}`, description: contactDescription, images: [heroImage] }
};

const offices = [
  { city: "California, USA", eyebrow: "United States", addresses: ["1228 Hibiscus Way, Livermore, CA 94551"] },
  { city: "Kolkata, India", eyebrow: "India", addresses: ["16, Strand Road, Diamond Heritage, 1st Floor, Suite No. 201E, Kolkata 700001"] },
  { city: "Dhaka, Bangladesh", eyebrow: "Bangladesh", addresses: ["257, Lalkuthi Bazar, Mazer road, Mirpur 1, Dhaka, Bangladesh.", "Shop no. 26, Nowabpur road, Rothkhola mor, Dhaka, Bangladesh."] }
];

const enquiryTopics = [
  "Choosing a destination, course or university",
  "Planning an application and its documents",
  "Understanding funding and scholarship options",
  "Preparing for visa and pre-departure stages"
];

const nextSteps = [
  { icon: MessageSquareText, number: "01", title: "Tell us where you are", copy: "Share your academic background, preferred destination, course interests and intended intake." },
  { icon: Compass, number: "02", title: "Discuss the right direction", copy: "Our team will review your enquiry and talk through the areas that need clearer decisions." },
  { icon: CalendarCheck, number: "03", title: "Leave with a practical next step", copy: "Understand what to research, prepare or compare before moving further in the process." }
];

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${siteUrl}/contact#contact`,
    url: `${siteUrl}/contact`,
    name: `Contact ${brandName}`,
    description: contactDescription,
    about: { "@id": `${siteUrl}/#organization` },
    mainEntity: {
      "@type": "EducationalOrganization",
      "@id": `${siteUrl}/#organization`,
      name: brandName,
      email: contactPoints.email,
      telephone: contactPoints.phone,
      openingHours: contactPoints.hours,
      address: schemaOffices.map((office) => ({
        "@type": "PostalAddress",
        streetAddress: office.streetAddress,
        addressLocality: office.addressLocality,
        addressRegion: office.addressRegion,
        postalCode: office.postalCode,
        addressCountry: office.addressCountry
      }))
    }
  };

  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(contactSchema)} />
      <SiteHeader contactPage />
      <main id="main-content">
        <section className={styles.hero} aria-labelledby="contact-title">
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <nav className="contact-breadcrumb" aria-label="Breadcrumb">
                <Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Contact Us</span>
              </nav>
              <p className={styles.eyebrow}>Start with a conversation</p>
              <h1 id="contact-title">Your questions.<br /><span>A clearer way forward.</span></h1>
              <p className={styles.heroText}>Tell us what you are considering and where you need clarity. We&apos;ll help you understand the next decisions in your study abroad journey.</p>
              <div className={styles.heroActions}>
                <LeadEnquiry className="primary-button">Send an enquiry <ArrowRight size={16} aria-hidden="true" /></LeadEnquiry>
                <a className={styles.textLink} href={`mailto:${contactPoints.email}`}>Email our team <ArrowRight size={15} aria-hidden="true" /></a>
              </div>
              <p className={styles.heroNote}><ShieldCheck size={15} aria-hidden="true" /> Your details are used only to understand and respond to your enquiry.</p>
            </div>

          </div>
        </section>

        <section className={styles.contactRail} aria-label="Direct contact details">
          <a href={`tel:${contactPoints.phone[0]}`}><span><Phone size={18} aria-hidden="true" /></span><div><small>Call our team</small><strong>+91 98312 16414</strong></div><ArrowRight size={15} aria-hidden="true" /></a>
          <a href={`mailto:${contactPoints.email}`}><span><Mail size={18} aria-hidden="true" /></span><div><small>Email us</small><strong>{contactPoints.email}</strong></div><ArrowRight size={15} aria-hidden="true" /></a>
          <div><span><Clock3 size={18} aria-hidden="true" /></span><div><small>Opening hours</small><strong>Mon–Fri 09:00–20:00</strong></div></div>
        </section>

        <section className={styles.intro} aria-labelledby="contact-options-title">
          <div><p className={styles.eyebrow}>Choose how to connect</p><h2 id="contact-options-title">A direct route to the guidance you need.</h2></div>
          <p>Whether you are at the research stage or already preparing an application, give us enough context to understand your position. We can then focus the conversation on the decisions that matter now.</p>
        </section>

        <section className={styles.enquiryGrid} aria-label="Contact and enquiry options">
          <article className={styles.enquiryCard}>
            <span className={styles.cardIcon}><FileText size={23} aria-hidden="true" /></span>
            <p className={styles.eyebrow}>Personal study enquiry</p>
            <h2>Tell us what you are planning.</h2>
            <p>Use the enquiry form to share your contact details, destination, course interest and any questions. It gives our team a useful starting point for the conversation.</p>
            <ul>{enquiryTopics.map((topic) => <li key={topic}><BadgeCheck size={16} aria-hidden="true" /> {topic}</li>)}</ul>
            <LeadEnquiry className="teal-button">Open enquiry form <ArrowRight size={16} aria-hidden="true" /></LeadEnquiry>
          </article>

          <aside className={styles.directCard}>
            <span className={styles.cardIcon}><Phone size={23} aria-hidden="true" /></span>
            <p className={styles.eyebrow}>Contact us directly</p>
            <h2>Prefer to call or email?</h2>
            <p>Reach the AE Global Group team using the details below. For a more focused discussion, include your preferred course, country and intake in your email.</p>
            <div className={styles.directDetails}>
              <a href={`tel:${contactPoints.phone[0]}`}><Phone size={17} aria-hidden="true" /><span><small>Primary phone</small><strong>+91 98312 16414</strong></span></a>
              <a href={`tel:${contactPoints.phone[1]}`}><Phone size={17} aria-hidden="true" /><span><small>Office phone</small><strong>+91 33 4809 5556</strong></span></a>
              <a href={`mailto:${contactPoints.email}`}><Mail size={17} aria-hidden="true" /><span><small>Email address</small><strong>{contactPoints.email}</strong></span></a>
            </div>
            <div className={styles.hours}><Clock3 size={17} aria-hidden="true" /><p><strong>Hours of operation</strong><span>Monday–Friday: 09:00–20:00<br />Saturday–Sunday: 10:30–22:00</span></p></div>
          </aside>
        </section>

        <section className={styles.locations} aria-labelledby="locations-title">
          <div className={styles.sectionHeading}>
            <div><p className={styles.eyebrow}>Our offices</p><h2 id="locations-title">Local offices. One connected team.</h2></div>
            <p>Choose the location most relevant to you, or contact our central enquiry team using the details above.</p>
          </div>
          <div className={styles.locationGrid}>
            {offices.map((office, index) => (
              <article className={styles.locationCard} key={office.city}>
                <div className={styles.locationTop}><span><Building2 size={20} aria-hidden="true" /></span><small>{String(index + 1).padStart(2, "0")}</small></div>
                <p className={styles.locationEyebrow}>{office.eyebrow}</p>
                <h3>{office.city}</h3>
                {office.addresses.map((address) => (
                  <div className={styles.address} key={address}>
                    <address>{address}</address>
                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer" aria-label={`Get directions to ${address} (opens in a new tab)`}>Get directions <ArrowRight size={14} aria-hidden="true" /></a>
                  </div>
                ))}
              </article>
            ))}
          </div>
        </section>

        <section className={styles.process} aria-labelledby="process-title">
          <div className={styles.processHeading}>
            <p className={styles.eyebrow}>What happens next</p>
            <h2 id="process-title">A simple start to a bigger decision.</h2>
            <p>We keep the first conversation practical: understand your position, identify what needs attention and define a sensible next action.</p>
          </div>
          <ol>
            {nextSteps.map((step) => {
              const Icon = step.icon;
              return <li key={step.number}><span><Icon size={20} aria-hidden="true" /></span><small>{step.number}</small><h3>{step.title}</h3><p>{step.copy}</p></li>;
            })}
          </ol>
        </section>

        <section className={styles.finalCta}>
          <div><p className={styles.eyebrow}>Ready when you are</p><h2>Bring your question. We&apos;ll help make the next step clearer.</h2></div>
          <LeadEnquiry className="teal-button">Start my enquiry <ArrowRight size={16} aria-hidden="true" /></LeadEnquiry>
        </section>
      </main>
    </div>
  );
}
