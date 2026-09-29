import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Clock, Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import SiteHeader from "../components/SiteHeader";
import LeadEnquiry from "../components/LeadEnquiry";

export const metadata: Metadata = {
  title: "Contact Us | AE Global Group",
  description: "Talk to AE Global Group about course selection, applications and your next step towards studying abroad."
};

const offices = [
  { city: "California, USA", addresses: ["1228 Hibiscus Way, Livermore, CA 94551"] },
  { city: "Kolkata, India", addresses: ["16, Strand Road, Diamond Heritage, 1st Floor, Suite No. 201E, Kolkata 700001"] },
  { city: "Dhaka, Bangladesh", addresses: ["257, Lalkuthi Bazar, Mazer road, Mirpur 1, Dhaka, Bangladesh.", "Shop no. 26, Nowabpur road, Rothkhola mor, Dhaka, Bangladesh."] }
];

export default function ContactPage() {
  return (
    <div className="contact-page">
      <SiteHeader contactPage />
      <main id="main-content">
        <section className="contact-hero" aria-labelledby="contact-title">
          <div className="contact-breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>Contact Us</span></div>
          <p className="eyebrow">Contact Us</p>
          <h1 id="contact-title">Your next step.<br /><span>Let&apos;s talk it through.</span></h1>
          <p className="contact-intro">Questions about studying abroad? Tell us where you are in the process. We&apos;ll help you understand your options and plan what comes next.</p>
        </section>

        <section className="contact-grid" aria-label="Get in touch">
          <article className="contact-office">
            <span className="contact-icon"><MapPin size={24} aria-hidden="true" /></span>
            <p className="eyebrow">Get in touch</p>
            <h2>A conversation.<br />A clearer direction.</h2>
            <p>Connect with our team for practical guidance on your study abroad plans.</p>
            <div className="contact-details">
              <div><Phone size={19} aria-hidden="true" /><div><h3>Our phone</h3><a href="tel:+919831216414">9831216414</a><a href="tel:+913348095556">033-48095556</a></div></div>
              <div><Mail size={19} aria-hidden="true" /><div><h3>Our email</h3><a href="mailto:contact@abroadedus.com">contact@abroadedus.com</a></div></div>
              <div><Clock size={19} aria-hidden="true" /><div><h3>Hours of operation</h3><p>Monday – Friday: 09:00 – 20:00<br />Saturday &amp; Sunday: 10:30 – 22:00</p></div></div>
            </div>
          </article>

          <article className="contact-enquiry">
            <span className="contact-icon"><MessageSquare size={24} aria-hidden="true" /></span>
            <p className="eyebrow">Start with clarity</p>
            <h2>Tell us what<br />you have in mind.</h2>
            <p>A destination, a course or just a question. Share a few details so we can understand what matters to you.</p>
            <ul className="contact-topics">
              <li><Check size={18} aria-hidden="true" /> Countries and courses that fit your goals</li>
              <li><Check size={18} aria-hidden="true" /> Applications, documents and intake timelines</li>
              <li><Check size={18} aria-hidden="true" /> Visa preparation and departure planning</li>
            </ul>
            <LeadEnquiry className="teal-button">Send an Enquiry <ArrowRight size={16} aria-hidden="true" /></LeadEnquiry>
            <p className="contact-note">Share your questions and contact details in our enquiry form.</p>
          </article>
        </section>

        <section className="contact-locations" aria-labelledby="locations-title">
          <p className="eyebrow">Our offices</p>
          <h2 id="locations-title">Find us closer to you.</h2>
          <div className="contact-location-grid">
            {offices.map((office) => (
              <article className="contact-location" key={office.city}>
                <MapPin size={22} aria-hidden="true" />
                <h3>{office.city}</h3>
                {office.addresses.map((address) => (
                  <div className="contact-address" key={address}>
                    <address>{address}</address>
                    <a className="text-link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer" aria-label={`Get directions to ${address} (opens in a new tab)`}>Get directions <ArrowRight size={15} aria-hidden="true" /></a>
                  </div>
                ))}
              </article>
            ))}
          </div>
        </section>

        <section className="contact-next" aria-labelledby="contact-next-title">
          <div><p className="eyebrow">What happens next</p><h2 id="contact-next-title">Clear advice, from the first conversation.</h2></div>
          <ol>
            <li><span>01</span><div><h3>Share your plans</h3><p>Tell us about your studies, goals and preferred intake.</p></div></li>
            <li><span>02</span><div><h3>Talk through your options</h3><p>Our team reviews your enquiry and gets in touch.</p></div></li>
            <li><span>03</span><div><h3>Know your next step</h3><p>Understand what to prepare and where to begin.</p></div></li>
          </ol>
        </section>
      </main>
      <footer className="contact-footer"><Link href="/">AE Global Group</Link><p>Clear options. Careful preparation. No guesswork.</p><small>© 2026 AE Global Group. All rights reserved.</small></footer>
    </div>
  );
}
