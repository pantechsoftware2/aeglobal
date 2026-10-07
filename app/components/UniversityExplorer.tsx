"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin, Plus, Search, X } from "lucide-react";
import { useState } from "react";
import type { Institution } from "../data/destinations";
import LeadEnquiry from "./LeadEnquiry";
import styles from "../universities/universities.module.css";

type Listing = Institution & { country: string; countryLabel: string; countrySlug: string };
type Country = { name: string; label: string; slug: string };

export default function UniversityExplorer({ institutions, countries }: { institutions: Listing[]; countries: Country[] }) {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("");
  const [limit, setLimit] = useState(6);
  const filtered = institutions.filter((institution) => (
    (!country || country === institution.countrySlug) &&
    [institution.name, institution.location, institution.countryLabel, ...(institution.aliases ?? [])]
      .join(" ").toLowerCase().includes(query.trim().toLowerCase())
  ));
  const reset = () => { setQuery(""); setCountry(""); setLimit(6); };

  return (
    <section className={`${styles.container} ${styles.directory}`} id="university-directory" aria-labelledby="directory-title">
      <div className={styles.sectionHeading}>
        <div><p className={styles.eyebrow}>Explore your options</p><h2 id="directory-title">Find a place to move forward.</h2></div>
        <Link className={styles.textLink} href="/study-destinations">Explore destinations <ArrowRight size={16} aria-hidden="true" /></Link>
      </div>
      <p className={styles.directoryIntro}>Universities, colleges and pathway providers from our current destination listings.</p>
      <div className={styles.filters}>
        <div className={styles.search}>
          <Search size={19} aria-hidden="true" />
          <label className="sr-only" htmlFor="university-search">Search institutions</label>
          <input id="university-search" type="search" placeholder="Search by institution or city" value={query} onChange={(event) => { setQuery(event.target.value); setLimit(6); }} />
          {query && <button type="button" aria-label="Clear search" onClick={() => { setQuery(""); setLimit(6); }}><X size={16} /></button>}
        </div>
        <div className={styles.countryFilter}>
          <label htmlFor="university-country">Destination</label>
          <select id="university-country" value={country} onChange={(event) => { setCountry(event.target.value); setLimit(6); }}>
            <option value="">All destinations</option>
            {countries.map((item) => <option value={item.slug} key={item.slug}>{item.label}</option>)}
          </select>
        </div>
      </div>
      <p className={styles.results} role="status">{filtered.length} {filtered.length === 1 ? "institution" : "institutions"}{filtered.length > limit && ` / Showing ${limit}`}</p>
      <div className={styles.institutionGrid}>
        {filtered.slice(0, limit).map((institution) => (
          <article className={styles.institution} key={`${institution.countrySlug}-${institution.name}`}>
            <div className={styles.campus}>
              <Image src={institution.image} alt={`${institution.name} campus or student setting`} fill sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw" />
            </div>
            <div className={styles.institutionBody}>
              <Link className={styles.location} href={`/destinations/${institution.countrySlug}`}><MapPin size={13} aria-hidden="true" />{institution.location}</Link>
              <h3>{institution.name}</h3>
              <p>{institution.note}</p>
              <div className={styles.institutionActions}>
                <LeadEnquiry className={styles.textLink} country={institution.country} institution={institution.name}>Enquire <ArrowRight size={15} aria-hidden="true" /><span className="sr-only"> about {institution.name}</span></LeadEnquiry>
                {institution.website && <a href={institution.website} target="_blank" rel="noreferrer" aria-label={`Visit ${institution.name} website (opens in a new tab)`} title="Official website"><ArrowUpRight size={19} aria-hidden="true" /></a>}
              </div>
            </div>
          </article>
        ))}
      </div>
      {filtered.length === 0 && <div className={styles.empty}><Search size={28} aria-hidden="true" /><h3>No matching institutions</h3><p>Try another name or destination.</p><button type="button" className={styles.textLink} onClick={reset}>Clear filters <X size={16} aria-hidden="true" /></button></div>}
      {filtered.length > limit && <div className={styles.loadMore}><button type="button" onClick={() => setLimit((current) => current + 6)}>Show more institutions <Plus size={16} aria-hidden="true" /></button></div>}
      <p className={styles.footnote}>This is a starting list. Course availability, fees and entry requirements must be confirmed with the institution before you apply.</p>
    </section>
  );
}
