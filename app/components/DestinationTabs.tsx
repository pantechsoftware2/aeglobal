"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { destinations, featuredDestinations } from "../data/destinations";

export default function DestinationTabs() {
  const [showAll, setShowAll] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const visibleDestinations = showAll ? destinations : featuredDestinations;

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || !("IntersectionObserver" in window)) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations: Animation[] = [];
    const observer = new IntersectionObserver((entries) => {
      let stagger = 0;
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const card = entry.target as HTMLElement;
        observer.unobserve(card);
        if (card.dataset.revealed) return;
        card.dataset.revealed = "true";
        if (motionPreference.matches) return;

        animations.push(card.animate(
          [{ opacity: 0, translate: "0 14px" }, { opacity: 1, translate: "0 0" }],
          { duration: 450, delay: (stagger++ % 3) * 65, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" },
        ));
      });
    }, { threshold: 0.15 });

    grid.querySelectorAll(".country-option").forEach((card) => observer.observe(card));
    const stopMotion = () => {
      if (motionPreference.matches) animations.forEach((animation) => animation.cancel());
    };
    motionPreference.addEventListener("change", stopMotion);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      motionPreference.removeEventListener("change", stopMotion);
    };
  }, [showAll]);

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
      <div className="destination-grid featured-country-grid" id="country-list" ref={gridRef}>
        {visibleDestinations.map((item) => (
          <Link className="country-option" href={`/destinations/${item.slug}`} key={item.slug}>
            <span className="country-option-flag" aria-hidden="true"><Image src={item.flag} alt="" width={72} height={48} unoptimized /></span>
            <div className="country-option-copy">
              <span>{item.label}</span>
              <small>{item.institutions.length ? "Explore featured institutions" : item.meta}</small>
            </div>
            <span className="country-option-action" aria-hidden="true"><ArrowUpRight className="country-option-arrow" size={16} /></span>
          </Link>
        ))}
      </div>
      {!showAll && <p className="destination-count">Six featured destinations. Choose one to explore institutions and plan your next step.</p>}
    </div>
  );
}
