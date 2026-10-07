import Image from "next/image";
import Link from "next/link";
import LeadEnquiry from "./LeadEnquiry";
import { destinations } from "../data/destinations";

export default function SiteHeader({
  contactPage = false,
  destinationPage = false,
  faqPage = false,
  activePage
}: {
  contactPage?: boolean;
  destinationPage?: boolean;
  faqPage?: boolean;
  activePage?: "destinations" | "universities" | "courses" | "scholarships" | "services";
}) {
  return (
    <header className={`site-header${contactPage || destinationPage || faqPage || activePage ? " contact-header" : ""}`}>
      <Link className="brand" href="/#top" aria-label="AE Global Group home">
        <Image src="/brand/mark.png" alt="AE Global Group logo" width={50} height={44} preload />
        <span>AE Global Group</span>
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <Link href="/#top">Home</Link>
        <div className="nav-dropdown">
          <Link href="/study-destinations" aria-current={destinationPage || activePage === "destinations" ? "page" : undefined}>Study Destinations</Link>
          <div className="nav-dropdown-panel" aria-label="Study destination country pages">
            <Link className="nav-dropdown-featured" href="/study-destinations">
              <strong>All study destinations</strong>
              <span>Compare countries by fit, budget, intake and visa path.</span>
            </Link>
            <div className="nav-destination-grid">
              {destinations.map((destination) => (
                <Link key={destination.slug} href={`/destinations/${destination.slug}`}>
                  <Image src={destination.flag} alt={`${destination.label} flag`} width={20} height={20} unoptimized />
                  <span>{destination.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <Link href="/universities" aria-current={activePage === "universities" ? "page" : undefined}>Universities</Link>
        <Link href="/courses" aria-current={activePage === "courses" ? "page" : undefined}>Courses</Link>
        <Link href="/scholarships" aria-current={activePage === "scholarships" ? "page" : undefined}>Scholarships</Link>
        <Link href="/services" aria-current={activePage === "services" ? "page" : undefined}>Services</Link>
        <Link href="/contact" aria-current={contactPage ? "page" : undefined}>Contact Us</Link>
      </nav>
      <div className="header-actions">
        <LeadEnquiry className="journey-link">I&apos;m Ready to Start</LeadEnquiry>
      </div>
      <Link className="mobile-contact-link" href="/contact" aria-current={contactPage ? "page" : undefined}>Contact advisor</Link>
    </header>
  );
}
