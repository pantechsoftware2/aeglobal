"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { courses, courseSubjects, type CourseLevel } from "../data/courses";
import styles from "../courses/courses.module.css";

const levels: CourseLevel[] = ["Foundation", "Undergraduate", "Postgraduate"];
const initialPageSize = 12;

export default function CourseExplorer() {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("all");
  const [subject, setSubject] = useState("all");
  const [visibleCount, setVisibleCount] = useState(initialPageSize);

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();

    return courses.filter((course) => {
      const searchable = [course.title, course.subject, course.level]
        .join(" ")
        .toLowerCase();

      return (
        (!search || searchable.includes(search)) &&
        (level === "all" || course.level === level) &&
        (subject === "all" || course.subject === subject)
      );
    });
  }, [level, query, subject]);

  const visibleCourses = filtered.slice(0, visibleCount);
  const hasFilters = Boolean(query) || level !== "all" || subject !== "all";

  function resetResults() {
    setVisibleCount(initialPageSize);
  }

  function clearFilters() {
    setQuery("");
    setLevel("all");
    setSubject("all");
    resetResults();
  }

  return (
    <section className={`${styles.container} ${styles.explorer}`} id="course-explorer" aria-labelledby="explorer-title">
      <div className={styles.sectionHeading}>
        <div>
          <p className={styles.eyebrow}>Verified course directory</p>
          <h2 id="explorer-title">Explore real courses.<br /><span>Check the official source.</span></h2>
        </div>
        <Link className={styles.textLink} href="/contact">
          Get a personalised shortlist <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>

      <div className={styles.courseFilters} aria-label="Course filters">
        <div className={styles.search}>
          <Search size={19} aria-hidden="true" />
          <label className="sr-only" htmlFor="course-search">Search courses</label>
          <input
            id="course-search"
            type="search"
            placeholder="Search by course or subject"
            value={query}
            onChange={(event) => { setQuery(event.target.value); resetResults(); }}
          />
          {query && <button type="button" aria-label="Clear search" onClick={() => { setQuery(""); resetResults(); }}><X size={16} /></button>}
        </div>

        <label className={styles.selectFilter}>
          <span>Study level</span>
          <select value={level} onChange={(event) => { setLevel(event.target.value); resetResults(); }}>
            <option value="all">All levels</option>
            {levels.map((item) => <option value={item} key={item}>{item}</option>)}
          </select>
        </label>

        <label className={styles.selectFilter}>
          <span>Subject</span>
          <select value={subject} onChange={(event) => { setSubject(event.target.value); resetResults(); }}>
            <option value="all">All subjects</option>
            {courseSubjects.map((item) => <option value={item} key={item}>{item}</option>)}
          </select>
        </label>
      </div>

      <div className={styles.resultsRow}>
        <p className={styles.results} role="status">
          Showing {Math.min(visibleCount, filtered.length)} of {filtered.length} {filtered.length === 1 ? "course" : "courses"}
        </p>
        {hasFilters && <button type="button" className={styles.clearFilters} onClick={clearFilters}>Clear all filters <X size={14} aria-hidden="true" /></button>}
      </div>

      {visibleCourses.length > 0 ? (
        <div className={styles.courseGrid}>
          {visibleCourses.map((course) => (
            <article className={styles.courseCard} key={`${course.institution}-${course.title}`}>
              <div className={styles.courseMeta}>
                <span>{course.level}</span>
                <span>{course.subject}</span>
              </div>
              <h3>{course.title}</h3>
              <div className={styles.courseActions}>
                <a href={course.sourceUrl} target="_blank" rel="noreferrer">View course information <ExternalLink size={14} aria-hidden="true" /></a>
                <Link href="/contact">Check eligibility <ArrowRight size={14} aria-hidden="true" /></Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <Search size={28} aria-hidden="true" />
          <h3>No courses match those filters</h3>
          <p>Try a broader subject or clear the filters.</p>
          <button type="button" className={styles.textLink} onClick={clearFilters}>Clear filters <X size={16} aria-hidden="true" /></button>
        </div>
      )}

      {visibleCount < filtered.length && (
        <div className={styles.loadMore}>
          <button type="button" onClick={() => setVisibleCount((count) => count + initialPageSize)}>
            Show more courses <span>{filtered.length - visibleCount} remaining</span>
          </button>
        </div>
      )}

      <p className={styles.footnote}>
        Course names are taken from official institution catalogues. Availability, campus, entry requirements and intakes can change; use the source link and confirm details with an advisor before applying.
      </p>
    </section>
  );
}
