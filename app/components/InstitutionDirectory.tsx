"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Building2, ExternalLink, Search, X } from "lucide-react";
import type { Institution } from "../data/destinations";
import LeadEnquiry from "./LeadEnquiry";

function searchableText(institution: Institution) {
  return [institution.name, institution.location, institution.note, ...(institution.aliases ?? [])].join(" ").toLowerCase();
}

export default function InstitutionDirectory({ institutions, country }: { institutions: Institution[]; country: string }) {
  const [query, setQuery] = useState("");
  const cleanedQuery = query.trim().toLowerCase();
  const filtered = institutions.filter((institution) => searchableText(institution).includes(cleanedQuery));

  return (
    <section className="institution-directory" id="institutions" aria-labelledby="institutions-title">
      <div className="institution-directory-heading">
        <div><p className="eyebrow">Priority institutions</p><h2 id="institutions-title">A stronger shortlist starts here.</h2><p>These are priority universities, colleges and pathway providers for {country}. Our advisors can compare these with many more options once we understand your course, budget and intake.</p></div>
        {institutions.length > 0 && <div className="institution-search"><Search size={18} aria-hidden="true" /><label className="sr-only" htmlFor="institution-search">Search institutions in {country}</label><input id="institution-search" type="search" placeholder="Search institutions…" value={query} onChange={(event) => setQuery(event.target.value)} />{query && <button type="button" onClick={() => setQuery("")} aria-label="Clear institution search"><X size={16} /></button>}</div>}
      </div>
      {institutions.length > 0 ? (
        <>
          <p className="institution-result-count" role="status">{cleanedQuery ? `Showing matches for "${query.trim()}"` : "Showing priority options first. Ask us for the wider institution list when you are ready to compare."}</p>
          <div className="institution-grid">
            {filtered.map((institution) => (
              <article className="institution-card" key={institution.name}>
                <div className="institution-media">
                  <Image className="institution-photo" src={institution.image} alt={`${institution.name} campus or student setting`} fill sizes="(max-width: 760px) 100vw, (max-width: 1000px) 50vw, 33vw" />
                  <span className={`institution-logo ${institution.logoTone === "dark" ? "institution-logo-dark" : ""}`}>
                    <Image className="institution-logo-image" src={institution.logo} alt={`${institution.name} logo`} width={150} height={76} unoptimized />
                  </span>
                </div>
                <div className="institution-card-body">
                  <p className="institution-country">{institution.location}</p>
                  <h3>{institution.name}</h3>
                  <p className="institution-note">{institution.note}</p>
                  <div className="institution-card-bottom">
                    <LeadEnquiry className="institution-enquire" country={country} institution={institution.name}>Enquire now <ArrowUpRight size={17} aria-hidden="true" /><span className="sr-only"> about {institution.name}</span></LeadEnquiry>
                    {institution.website && <a className="institution-website" href={institution.website} target="_blank" rel="noreferrer">Website <ExternalLink size={14} aria-hidden="true" /></a>}
                  </div>
                </div>
              </article>
            ))}
          </div>
          {filtered.length === 0 && <div className="institution-empty"><Search size={28} aria-hidden="true" /><h3>No institutions match your search.</h3><p>Try a shorter name or browse all listings for this destination.</p><button type="button" className="secondary-button" onClick={() => setQuery("")}>Show all institutions</button></div>}
          <p className="institution-footnote">This is a priority shortlist, not the full market. Course availability, entry requirements and intakes vary by institution, and our team can help confirm the details before you apply.</p>
        </>
      ) : <div className="institution-empty"><Building2 size={32} aria-hidden="true" /><h3>Let&apos;s build your shortlist together.</h3><p>Contact our team to explore institution and course options for {country}.</p><LeadEnquiry className="teal-button" country={country}>Discuss this destination <ArrowUpRight size={17} /></LeadEnquiry></div>}
    </section>
  );
}
