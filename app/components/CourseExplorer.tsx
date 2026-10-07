"use client";

import Link from "next/link";
import { ArrowRight, BarChart3, BriefcaseBusiness, Laptop, Scale, Search, X } from "lucide-react";
import { useState } from "react";
import LeadEnquiry from "./LeadEnquiry";
import styles from "../courses/courses.module.css";

type Track = { title: string; slug: string; icon: typeof Laptop; copy: string; routes: string; level: string; destinations: string };

const tracks: Track[] = [
  { title: "Business & management", slug: "business", icon: BriefcaseBusiness, copy: "Build practical skills in leadership, marketing, finance and enterprise.", routes: "Business, management, marketing", level: "Undergraduate and postgraduate", destinations: "UK, UAE, Malta, Europe" },
  { title: "Computing & technology", slug: "computing", icon: Laptop, copy: "Explore software, data and digital systems through career-focused study.", routes: "Computing, data, cybersecurity", level: "Foundation, undergraduate and postgraduate", destinations: "UK, UAE, Europe" },
  { title: "Finance & analytics", slug: "finance", icon: BarChart3, copy: "Connect numbers, decision-making and commercial thinking to your next role.", routes: "Accounting, finance, analytics", level: "Undergraduate and postgraduate", destinations: "UK, Ireland, Europe" },
  { title: "Law & professional study", slug: "law", icon: Scale, copy: "Compare specialist routes with a close look at requirements and progression.", routes: "Law, business law, professional practice", level: "Undergraduate and postgraduate", destinations: "UK and Europe" },
];

export default function CourseExplorer() {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("all");
  const search = query.trim().toLowerCase();
  const filtered = tracks.filter((track) => {
    const matchesSearch = !search || [track.title, track.copy, track.routes, track.destinations].join(" ").toLowerCase().includes(search);
    const matchesLevel = level === "all" || track.level.toLowerCase().includes(level);
    return matchesSearch && matchesLevel;
  });

  return (
    <section className={`${styles.container} ${styles.explorer}`} id="course-explorer" aria-labelledby="explorer-title">
      <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Explore course areas</p><h2 id="explorer-title">Start with what interests you.</h2></div><Link className={styles.textLink} href="/contact">Ask about a different subject <ArrowRight size={16} aria-hidden="true" /></Link></div>
      <p className={styles.explorerIntro}>Use the subject area as a starting point. Your advisor can then compare specific course and institution options.</p>
      <div className={styles.filters}><div className={styles.search}><Search size={19} aria-hidden="true" /><label className="sr-only" htmlFor="course-search">Search course areas</label><input id="course-search" type="search" placeholder="Search subject, course or route" value={query} onChange={(event) => setQuery(event.target.value)} />{query && <button type="button" aria-label="Clear search" onClick={() => setQuery("")}><X size={16} /></button>}</div><label className={styles.levelFilter}>Study level<select value={level} onChange={(event) => setLevel(event.target.value)}><option value="all">All levels</option><option value="undergraduate">Undergraduate</option><option value="postgraduate">Postgraduate</option><option value="foundation">Foundation</option></select></label></div>
      <p className={styles.results} role="status">{filtered.length} course {filtered.length === 1 ? "area" : "areas"} to explore</p>
      {filtered.length > 0 ? <div className={styles.trackGrid}>{filtered.map((track) => { const Icon = track.icon; return <article className={styles.track} key={track.slug}><div className={styles.trackIcon}><Icon size={23} aria-hidden="true" /></div><h3>{track.title}</h3><p>{track.copy}</p><dl><div><dt>Typical routes</dt><dd>{track.routes}</dd></div><div><dt>Study level</dt><dd>{track.level}</dd></div><div><dt>Destinations</dt><dd>{track.destinations}</dd></div></dl><div className={styles.trackActions}><LeadEnquiry className={styles.textLink}>Discuss this area <ArrowRight size={15} aria-hidden="true" /></LeadEnquiry><span aria-hidden="true">{track.slug.slice(0, 2).toUpperCase()}</span></div></article>; })}</div> : <div className={styles.empty}><Search size={28} aria-hidden="true" /><h3>No course areas match that search</h3><p>Try a broader subject or clear the filter.</p><button type="button" className={styles.textLink} onClick={() => { setQuery(""); setLevel("all"); }}>Clear filters <X size={16} aria-hidden="true" /></button></div>}
      <p className={styles.footnote}>Course availability, entry requirements and intakes vary by institution. Confirm the final details before applying.</p>
    </section>
  );
}
