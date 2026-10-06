"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { destinations, featuredDestinations } from "../data/destinations";

export default function DestinationTabs() {
  const [showAll, setShowAll] = useState(false);
  const visibleDestinations = showAll ? destinations : featuredDestinations;

  return (
    <div className="destination-panel" aria-label="Study destination selector">
      <div className="destination-panel-header">
        <div>
          <strong>Find your destination. Explore your options.</strong>
          <span>Discover universities, colleges and study pathways by destination.</span>
        </div>
        <button type="button" aria-expanded={showAll} aria-controls="country-list" onClick={() => setShowAll((current) => !current)}>
          {showAll ? "Show featured destinations" : `Show all ${destinations.length} countries`}
        </button>
      </div>
      <div className="destination-grid featured-country-grid" id="country-list">
        {visibleDestinations.map((item) => (
          <Link className="country-option" href={`/destinations/${item.slug}`} key={item.slug}>
            <span className="destination-flag" aria-hidden="true"><Image src={item.flag} alt={`${item.label} flag`} width={36} height={36} unoptimized /></span>
            <span>{item.label}</span>
            <small>{item.institutions.length ? "Explore featured institutions" : item.meta}</small>
            <ArrowUpRight className="country-option-arrow" size={17} aria-hidden="true" />
          </Link>
        ))}
      </div>
      {!showAll && <p className="destination-count">Six featured destinations. Choose one to explore institutions and plan your next step.</p>}
    </div>
  );
}
