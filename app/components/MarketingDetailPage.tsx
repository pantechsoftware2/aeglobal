import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import type { MarketingPage } from "../data/marketingPages";
import LeadEnquiry from "./LeadEnquiry";
import SiteHeader from "./SiteHeader";

export default function MarketingDetailPage({ page }: { page: MarketingPage }) {
  const heroStyle = {
    "--marketing-hero-image": `url(${page.heroImage})`
  } as CSSProperties & Record<"--marketing-hero-image", string>;

  return (
    <div className="marketing-detail-page">
      <SiteHeader activePage={page.key} />
      <main>
        <section className="marketing-hero" style={heroStyle}>
          <div className="marketing-hero-copy">
            <nav className="contact-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{page.navLabel}</span>
            </nav>
            <p className="eyebrow">{page.eyebrow}</p>
            <h1>{page.title}<br /><span>{page.accent}</span></h1>
            <p>{page.description}</p>
            <div className="button-row">
              <LeadEnquiry className="primary-button">
                Start my plan <ArrowRight size={16} aria-hidden="true" />
              </LeadEnquiry>
              <Link className="secondary-button" href="/contact">Talk to an advisor</Link>
            </div>
          </div>
          <div className="marketing-hero-visual">
            <div className="marketing-stat-card">
              <strong>{page.stat.value}</strong>
              <span>{page.stat.label}</span>
            </div>
          </div>
        </section>

        <section className="marketing-intro-grid">
          <div className="marketing-intro-copy">
            <p className="eyebrow">{page.intro.eyebrow}</p>
            <h2>{page.intro.title}</h2>
            <p>{page.intro.copy}</p>
          </div>
          <div className="marketing-highlight-grid">
            {page.highlights.map((item) => {
              const Icon = item.icon;
              return (
                <article className="marketing-highlight-card" key={item.title}>
                  <span><Icon size={22} aria-hidden="true" /></span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="marketing-process-panel">
          <div>
            <p className="eyebrow">How it works</p>
            <h2>A clearer route from question to action.</h2>
          </div>
          <ol>
            {page.steps.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="marketing-feature-section">
          <div className="marketing-feature-card">
            <span className="marketing-feature-icon"><Sparkles size={23} aria-hidden="true" /></span>
            <p className="eyebrow">{page.feature.eyebrow}</p>
            <h2>{page.feature.title}</h2>
            <p>{page.feature.copy}</p>
          </div>
          <div className="marketing-bullet-panel">
            {page.feature.bullets.map((item) => (
              <div key={item}>
                <Check size={17} aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="marketing-card-row" aria-label={`${page.navLabel} planning points`}>
          {page.cards.map((card) => (
            <article key={card.title}>
              <h2>{card.title}</h2>
              <p>{card.copy}</p>
            </article>
          ))}
        </section>

        <section className="marketing-final-cta">
          <div>
            <p className="eyebrow">Ready for the next step?</p>
            <h2>Tell us what you want to study and where you are in the process.</h2>
          </div>
          <LeadEnquiry className="teal-button">
            Build my plan <ArrowRight size={16} aria-hidden="true" />
          </LeadEnquiry>
        </section>
      </main>
    </div>
  );
}
