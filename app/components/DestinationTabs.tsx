"use client";

import Image from "next/image";
import { useState } from "react";

const destinations = [
  { name: "United Kingdom", flag: "/flags/gb.svg", meta: "Plan intakes and applications" },
  { name: "Australia", flag: "/flags/au.svg", meta: "Prepare study and arrival steps" },
  { name: "Canada", flag: "/flags/ca.svg", meta: "Review programs and documents" },
  { name: "Malaysia", flag: "/flags/my.svg", meta: "Compare courses and fees" },
  { name: "Ireland", flag: "/flags/ie.svg", meta: "Know the course and visa path" },
  { name: "Germany", flag: "/flags/de.svg", meta: "Compare public and private routes" },
  { name: "United Arab Emirates", flag: "/flags/ae.svg", meta: "Review campuses and costs" },
  { name: "New Zealand", flag: "/flags/nz.svg", meta: "Plan study and arrival steps" },
  { name: "Malta", flag: "/flags/mt.svg", meta: "Compare pathways and intakes" },
  { name: "France", flag: "/flags/fr.svg", meta: "Review courses and documents" },
  { name: "Netherlands", flag: "/flags/nl.svg", meta: "Compare programs and timelines" },
  { name: "Hungary", flag: "/flags/hu.svg", meta: "Check entry and fee options" },
  { name: "Italy", flag: "/flags/it.svg", meta: "Plan applications and documents" },
  { name: "Spain", flag: "/flags/es.svg", meta: "Compare study routes" },
  { name: "Switzerland", flag: "/flags/ch.svg", meta: "Review courses and costs" },
  { name: "Cyprus", flag: "/flags/cy.svg", meta: "Compare intakes and requirements" },
  { name: "Singapore", flag: "/flags/sg.svg", meta: "Review programs and fees" },
  { name: "Finland", flag: "/flags/fi.svg", meta: "Plan timelines and documents" },
  { name: "Sweden", flag: "/flags/se.svg", meta: "Compare courses and intakes" },
  { name: "Lithuania", flag: "/flags/lt.svg", meta: "Check entry requirements" },
  { name: "Denmark", flag: "/flags/dk.svg", meta: "Review programs and costs" },
  { name: "Austria", flag: "/flags/at.svg", meta: "Plan applications and fees" },
  { name: "Poland", flag: "/flags/pl.svg", meta: "Compare courses and documents" },
  { name: "Belgium", flag: "/flags/be.svg", meta: "Review intakes and pathways" },
  { name: "United States of America", flag: "/flags/us.svg", meta: "Plan shortlist and applications" },
  { name: "Greece", flag: "/flags/gr.svg", meta: "Compare programs and costs" },
  { name: "Georgia", flag: "/flags/ge.svg", meta: "Check courses and requirements" },
  { name: "Japan", flag: "/flags/jp.svg", meta: "Review programs and timelines" }
];

export default function DestinationTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const visibleDestinations = showAll ? destinations : destinations.slice(0, 10);

  const setActiveDestination = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="destination-panel" aria-label="Study destination selector">
      <div className="destination-panel-header">
        <div>
          <strong>Countries we help students compare</strong>
          <span>Choose a destination to start shaping your shortlist.</span>
        </div>
        <button type="button" onClick={() => setShowAll((current) => !current)}>
          {showAll ? "Show fewer countries" : `Show all ${destinations.length} countries`}
        </button>
      </div>
      <div className="destination-grid">
        {visibleDestinations.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              type="button"
              className={isActive ? "active" : ""}
              key={item.name}
              aria-pressed={isActive}
              onClick={() => setActiveDestination(index)}
            >
              <span className="destination-flag" aria-hidden="true">
                <Image src={item.flag} alt="" width={28} height={28} unoptimized />
              </span>
              <span>{item.name}</span>
              <small>{item.meta}</small>
            </button>
          );
        })}
      </div>
      {!showAll && <p className="destination-count">Showing key destinations first. Open the full country list when you need it.</p>}
    </div>
  );
}
