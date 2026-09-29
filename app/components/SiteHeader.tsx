import Image from "next/image";
import Link from "next/link";
import LeadEnquiry from "./LeadEnquiry";

export default function SiteHeader({ contactPage = false, destinationPage = false }: { contactPage?: boolean; destinationPage?: boolean }) {
  return (
    <header className={`site-header${contactPage || destinationPage ? " contact-header" : ""}`}>
      <Link className="brand" href="/" aria-label="AE Global Group home">
        <Image src="/brand/mark.png" alt="" width={50} height={44} preload />
        <span>AE Global Group</span>
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <Link href="/#destinations" aria-current={destinationPage ? "page" : undefined}>Study Destinations</Link>
        <Link href="/#partners">Universities</Link>
        <Link href="/#courses">Courses</Link>
        <Link href="/#scholarships">Scholarships</Link>
        <Link href="/#services">Services</Link>
        <Link href="/contact" aria-current={contactPage ? "page" : undefined}>Contact Us</Link>
      </nav>
      <div className="header-actions">
        <LeadEnquiry className="journey-link">I&apos;m Ready to Start</LeadEnquiry>
      </div>
      <Link className="mobile-contact-link" href="/contact" aria-current={contactPage ? "page" : undefined}>Contact Us</Link>
    </header>
  );
}
