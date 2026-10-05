import type { Metadata } from "next";
import Image from "next/image";
import SiteHeader from "./components/SiteHeader";
import {
  ArrowRight,
  Award,
  ClipboardList,
  FileText,
  GraduationCap,
  Home,
  Send,
  ShieldCheck
} from "lucide-react";
import AtomicGlobe from "./components/AtomicGlobe";
import DestinationTabs from "./components/DestinationTabs";
import ProcessSteps, { type ProcessStepItem } from "./components/ProcessSteps";
import StoryTestimonials from "./components/StoryTestimonials";
import TestimonialCarousel from "./components/TestimonialCarousel";
import LeadEnquiry from "./components/LeadEnquiry";
import SupportServiceList from "./components/SupportServiceList";
import { destinations } from "./data/destinations";
import { brandName, defaultDescription, defaultOpenGraph, jsonLd, siteUrl } from "./lib/seo";

export const metadata: Metadata = {
  title: `${brandName} | Study Abroad Guidance`,
  description: defaultDescription,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    ...defaultOpenGraph,
    title: `${brandName} | Study Abroad Guidance`,
    description: defaultDescription,
    url: "/"
  },
  twitter: {
    card: "summary_large_image",
    title: `${brandName} | Study Abroad Guidance`,
    description: defaultDescription,
    images: ["/images/generated-destinations-landmarks-v2.webp"]
  }
};

const trustPoints = [
  {
    title: "No Guesswork",
    copy: "Know what fits your profile, budget and timeline before you apply."
  },
  {
    title: "Application Ready",
    copy: "Get your forms, SOP, documents and deadlines organized in one plan."
  },
  {
    title: "Straight Answers",
    copy: "No fake guarantees. No inflated numbers. Just practical next steps."
  },
  {
    title: "Support Beyond Offers",
    copy: "Stay guided through visa prep, accommodation and pre-departure work."
  }
];

const institutionLogos = destinations
  .flatMap((destination) => destination.institutions)
  .filter((institution, index, list) => list.findIndex((item) => item.logo === institution.logo) === index)
  .map((institution) => ({
    name: institution.name,
    logo: institution.logo,
    tone: institution.logoTone
  }));

const firstMarqueeLogos = institutionLogos.filter((_, index) => index % 2 === 0);
const secondMarqueeLogos = institutionLogos.filter((_, index) => index % 2 === 1);

const shortlistCriteria = [
  "Course fit",
  "Entry requirements",
  "Budget and fees",
  "Intake timing",
  "Visa pathway",
  "Career direction"
];

const process: ProcessStepItem[] = [
  { title: "Audit", copy: "We review your academics, budget, goals and timeline.", icon: "search" },
  { title: "Shortlist", copy: "You get a focused list of countries, courses and universities.", icon: "file" },
  { title: "Apply", copy: "We help prepare forms, SOPs and supporting documents.", icon: "mail" },
  { title: "Visa Prep", copy: "You organize the documents needed for the visa stage.", icon: "globe" },
  { title: "Depart", copy: "Plan travel, stay and arrival basics before you fly.", icon: "plane" }
];

const services = [
  { label: "University Selection", icon: GraduationCap, copy: "Based on profile and goals" },
  { label: "Application Support", icon: ClipboardList, copy: "Forms, documents and timelines" },
  { label: "Scholarships", icon: Award, copy: "Available options reviewed" },
  { label: "Visa Guidance", icon: FileText, copy: "Requirement-based support" },
  { label: "Accommodation", icon: Home, copy: "Practical settling-in guidance" },
  { label: "Pre-Departure", icon: Send, copy: "Travel and arrival preparation" }
];

export default function HomePage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}/#study-abroad-counseling`,
    name: "Study abroad counseling",
    serviceType: "Study abroad counseling and application guidance",
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: destinations.map((destination) => destination.name),
    audience: {
      "@type": "Audience",
      audienceType: "Students planning international study"
    },
    description:
      "Course selection, applications, visa preparation and pre-departure planning for students comparing study abroad options."
  };

  return (
    <main id="top">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(serviceSchema)} />
      <SiteHeader />

      <section className="hero">
        <div className="hero-copy">
          <h1>Stop guessing.<br /><span>Start applying with clarity.</span></h1>
          <p>
            Course selection, applications, visa prep and pre-departure planning
            in one clear study abroad process built for students who want straight answers.
          </p>
          <div className="button-row">
            <a className="primary-button" href="/study-destinations">
              Show Me My Options <ArrowRight size={16} />
            </a>
            <LeadEnquiry className="secondary-button">I&apos;m Ready to Start</LeadEnquiry>
          </div>
        </div>
        <div className="hero-image" aria-hidden="true">
          <AtomicGlobe />
        </div>
      </section>

      <section className="trust-points" aria-label="How AE Global Group builds trust">
        {trustPoints.map((item) => (
          <div className="trust-point" key={item.title}>
            <strong>{item.title}</strong>
            <span>{item.copy}</span>
          </div>
        ))}
      </section>

      <section className="destinations" id="destinations">
        <div className="destination-hero">
          <div>
            <p className="eyebrow">Study Destinations</p>
            <h2>Don&apos;t pick a country<br />because everyone else is.</h2>
            <p>Compare course fit, budget, intakes, visa rules and post-study plans before you commit.</p>
            <a className="text-link" href="/study-destinations">
              Compare destinations <ArrowRight size={15} />
            </a>
          </div>
          <Image
            src="/images/generated-destinations-landmarks-v2.webp"
            alt="Collage of global study destination landmarks"
            fill
            sizes="100vw"
          />
        </div>
        <DestinationTabs />
      </section>

      <StoryTestimonials />

      <section className="partners" id="partners">
        <div className="university-showcase">
          <p className="showcase-label">Universities our students compare</p>
          <div className="university-marquee" aria-label="Universities our students compare">
            <div className="marquee-track">
              {[...firstMarqueeLogos, ...firstMarqueeLogos].map((university, index) => (
                <div className={`university-logo ${university.tone === "dark" ? "university-logo-dark" : ""}`} key={`${university.name}-${index}`} aria-hidden={index >= firstMarqueeLogos.length}>
                  <Image
                    src={university.logo}
                    alt={index < firstMarqueeLogos.length ? university.name : ""}
                    width={240}
                    height={64}
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="university-marquee university-marquee-reverse" aria-label="More priority institutions our students compare">
            <div className="marquee-track marquee-track-reverse">
              {[...secondMarqueeLogos, ...secondMarqueeLogos].map((university, index) => (
                <div className={`university-logo ${university.tone === "dark" ? "university-logo-dark" : ""}`} key={`${university.name}-${index}`} aria-hidden={index >= secondMarqueeLogos.length}>
                  <Image
                    src={university.logo}
                    alt={index < secondMarqueeLogos.length ? university.name : ""}
                    width={240}
                    height={64}
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="section-intro">
          <p className="eyebrow">University Guidance</p>
          <h2>Your shortlist should<br />make sense on paper.</h2>
          <p>We help you compare universities and courses using your academic record, budget, intake preference and career goals.</p>
          <a className="text-link" href="/universities">
            Build my shortlist <ArrowRight size={15} />
          </a>
        </div>
        <div className="shortlist-panel">
          <div className="university-copy">
            <h3>Build a shortlist that fits the student, not the trend.</h3>
            <p>
              Compare countries, courses, fees, intakes and documents in one clear
              process before applications begin.
            </p>
          </div>
          <div className="criteria-grid" aria-label="Shortlist criteria">
            {shortlistCriteria.map((item) => (
              <div className="criteria-card" key={item}>
                <ShieldCheck size={18} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="process-support-scroll">
        <div className="process-support-sticky">
          <section className="process process-scroll" id="courses">
            <div className="process-sticky process-redesign">
              <div className="section-intro">
                <p className="eyebrow">How we work</p>
                <h2>One process.<br />No scattered advice.</h2>
                <p>Every student journey is different. We keep the work clear, practical and requirement-led.</p>
                <div className="process-scroll-note"><span aria-hidden="true">↓</span> Scroll through your next steps</div>
              </div>
              <ProcessSteps items={process} />
            </div>
          </section>

          <section className="support" id="services">
            <div className="support-content">
              <p className="eyebrow">Student Support</p>
              <h2>You don&apos;t have to manage<br />every step alone.</h2>
              <p>Get help with the real work: requirements, timelines, documents, visa preparation and departure planning.</p>
              <SupportServiceList>
                {services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <div className="service" key={service.label} role="listitem">
                      <Icon size={22} />
                      <span>{service.label}</span>
                      <small>{service.copy}</small>
                    </div>
                  );
                })}
              </SupportServiceList>
              <a className="teal-button" href="#contact">
                Get Study Abroad Support <ArrowRight size={16} />
              </a>
            </div>
          </section>
        </div>
      </section>

      <section className="testimonials-section" aria-labelledby="student-feedback-title">
        <h2 id="student-feedback-title" className="sr-only">Student feedback</h2>
        <TestimonialCarousel />
      </section>

      <section className="cta" id="contact">
        <div>
          <h2>Ready to stop guessing?<br /><span>Let&apos;s map the next step.</span></h2>
        </div>
        <div className="button-row">
          <LeadEnquiry className="primary-button">I&apos;m Ready to Start <ArrowRight size={16} /></LeadEnquiry>
          <a className="secondary-button" href="/study-destinations">Show Me My Options</a>
        </div>
      </section>

    </main>
  );
}
