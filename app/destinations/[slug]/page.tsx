import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowRight, Check, Compass, GraduationCap } from "lucide-react";
import { destinations, featuredDestinations } from "../../data/destinations";
import SiteHeader from "../../components/SiteHeader";
import InstitutionDirectory from "../../components/InstitutionDirectory";
import LeadEnquiry from "../../components/LeadEnquiry";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return destinations.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const destination = destinations.find((item) => item.slug === slug);
  if (!destination) return { title: "Destination not found | AE Global Group" };
  return { title: `Study in ${destination.label} | AE Global Group`, description: `Explore institutions and study pathways in ${destination.name}. Get guidance on your shortlist, applications and next steps with AE Global Group.` };
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const destination = destinations.find((item) => item.slug === slug);
  if (!destination) notFound();

  return (
    <div className="study-page">
      <SiteHeader destinationPage />
      <main>
        <section className="study-hero">
          <nav className="contact-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/#destinations">Study destinations</Link><span aria-hidden="true">/</span><span aria-current="page">{destination.label}</span></nav>
          <div className="study-hero-grid">
            <div><p className="eyebrow">Your destination. Your direction.</p><h1>Study in<br /><span>{destination.label}.</span></h1><p className="study-hero-copy">Find the right fit for your next chapter. Explore institutions in {destination.name} and get clear guidance on where to begin.</p><div className="button-row"><a className="primary-button" href="#institutions">{destination.institutions.length ? "Explore institutions" : "Explore your options"} <ArrowDown size={16} /></a><LeadEnquiry className="study-advisor-link" country={destination.name}>Talk to an advisor <ArrowRight size={16} /></LeadEnquiry></div></div>
            <aside className="study-destination-summary" aria-label={`${destination.label} at a glance`}>
              <div className="study-summary-top"><span>DESTINATION GUIDE</span><Compass size={20} aria-hidden="true" /></div>
              <Image className="study-country-flag" src={destination.flag} alt={`${destination.name} flag`} width={100} height={74} unoptimized />
              <h2>{destination.label}</h2><p>{destination.name === "United Arab Emirates" ? "Explore Dubai and the wider UAE" : "Your study plans start with a clear shortlist"}</p>
              <div className="study-summary-stat"><GraduationCap size={25} aria-hidden="true" /><div><strong>{destination.institutions.length ? "Priority options" : "Let’s talk"}</strong><span>{destination.institutions.length ? "featured institutions, with more available" : "about your institution options"}</span></div></div>
            </aside>
          </div>
        </section>
        <nav className="study-country-nav" aria-label="Featured study destinations">
          {featuredDestinations.map((item) => <Link key={item.slug} href={`/destinations/${item.slug}`} aria-current={item.slug === slug ? "page" : undefined}><Image src={item.flag} width={22} height={22} alt="" unoptimized />{item.label}</Link>)}
        </nav>
        <InstitutionDirectory key={destination.slug} institutions={destination.institutions} country={destination.name} />
        <section className="study-advice">
          <div><p className="eyebrow">Make your next step count</p><h2>Options are a start.<br /><span>A clear plan takes you further.</span></h2><p>Share your academic background, budget and preferred intake. We&apos;ll help you work out what fits.</p><LeadEnquiry className="teal-button" country={destination.name}>Help me build my shortlist <ArrowRight size={16} /></LeadEnquiry></div>
          <ul>{["Compare course and institution fit", "Understand entry requirements", "Plan documents and application timelines"].map((text) => <li key={text}><Check size={19} aria-hidden="true" />{text}</li>)}</ul>
        </section>
      </main>
      <footer className="study-footer"><Link href="/">AE Global Group</Link><p>Clear options. Careful preparation. No guesswork.</p><Link href="/contact">Contact Us <ArrowRight size={14} /></Link></footer>
    </div>
  );
}
