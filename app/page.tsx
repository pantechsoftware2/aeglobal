import Image from "next/image";
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

const universityLogos = [
  { name: "University of Oxford", logo: "/university-logos/oxford.svg", width: 240 },
  { name: "University of Toronto", logo: "/university-logos/toronto.svg", width: 250 },
  { name: "University of Melbourne", logo: "/university-logos/melbourne.svg", width: 270 },
  { name: "University of Manchester", logo: "/university-logos/manchester.svg", width: 285 },
  { name: "Trinity College Dublin", logo: "/university-logos/trinity-dublin.svg", width: 285 },
  { name: "Technical University of Munich", logo: "/university-logos/tum.svg", width: 330 },
  { name: "University of British Columbia", logo: "/university-logos/ubc.svg", width: 320 },
  { name: "Monash University", logo: "/university-logos/monash.svg", width: 250 }
];

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

const footerGroups = [
  ["Explore", "Study Destinations", "Universities", "Courses", "Scholarships", "Services"],
  ["Students", "Application Support", "Visa Guidance", "Accommodation", "Pre-Departure", "Counseling"],
  ["Company", "About Us", "Careers", "Contact Us", "Partners"],
  ["Resources", "Blog", "Study Guides", "FAQs", "News & Updates"]
];

export default function HomePage() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#" aria-label="AE Global Group home">
          <Image src="/brand/mark.png" alt="" width={50} height={44} priority />
          <span>AE Global Group</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#destinations">Study Destinations</a>
          <a href="#partners">Universities</a>
          <a href="#courses">Courses</a>
          <a href="#scholarships">Scholarships</a>
          <a href="#services">Services</a>
          <a href="#about">About Us</a>
        </nav>
        <div className="header-actions">
          <a className="journey-link" href="#contact">I&apos;m Ready to Start</a>
        </div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <h1>Stop guessing.<br /><span>Start applying with clarity.</span></h1>
          <p>
            Course selection, applications, visa prep and pre-departure planning
            in one clear study abroad process built for students who want straight answers.
          </p>
          <div className="button-row">
            <a className="primary-button" href="#destinations">
              Show Me My Options <ArrowRight size={16} />
            </a>
            <a className="secondary-button" href="#contact">I&apos;m Ready to Start</a>
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
            <a className="text-link" href="#">
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


      <section className="partners" id="partners">
        <div className="university-showcase">
          <p className="showcase-label">Universities our students compare</p>
          <div className="university-marquee" aria-label="Universities our students compare">
            <div className="marquee-track">
              {[...universityLogos, ...universityLogos].map((university, index) => (
                <div className="university-logo" key={`${university.name}-${index}`} aria-hidden={index >= universityLogos.length}>
                  <Image
                    src={university.logo}
                    alt={index < universityLogos.length ? university.name : ""}
                    width={university.width}
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
          <a className="text-link" href="#">
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
            <div className="process-sticky">
              <div className="section-intro">
                <p className="eyebrow">How we work</p>
                <h2>One process.<br />No scattered advice.</h2>
                <p>Every student journey is different. We keep the work clear, practical and requirement-led.</p>
              </div>
              <ProcessSteps items={process} />
            </div>
          </section>

          <section className="support" id="services">
            <div className="support-content">
              <p className="eyebrow">Student Support</p>
              <h2>You don&apos;t have to manage<br />every step alone.</h2>
              <p>Get help with the real work: requirements, timelines, documents, visa preparation and departure planning.</p>
              <div className="service-grid">
                {services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <div className="service" key={service.label}>
                      <Icon size={22} />
                      <span>{service.label}</span>
                      <small>{service.copy}</small>
                    </div>
                  );
                })}
              </div>
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
          <a className="primary-button" href="#">I&apos;m Ready to Start <ArrowRight size={16} /></a>
          <a className="secondary-button" href="#destinations">Show Me My Options</a>
        </div>
      </section>

      <StoryTestimonials />

      <footer className="footer" id="about">
        <div className="footer-brand">
          <a className="brand" href="#">
            <Image src="/brand/mark.png" alt="" width={58} height={52} />
            <span>AE Global Group</span>
          </a>
          <p>Study abroad counseling for students who want clear options, careful preparation and no guesswork.</p>
        </div>
        <div className="footer-links">
          {footerGroups.map(([title, ...links]) => (
            <div key={title}>
              <h3>{title}</h3>
              {links.map((link) => (
                <a href="#" key={link}>{link}</a>
              ))}
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© 2026 AE Global Group. All rights reserved.</span>
          <span>Privacy Policy&nbsp;&nbsp;&nbsp;&nbsp; Terms &amp; Conditions</span>
        </div>
      </footer>
    </main>
  );
}
