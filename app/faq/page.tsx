import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Compass,
  FileCheck2,
  GraduationCap,
  HelpCircle,
  MessagesSquare,
  Plane,
  ShieldCheck
} from "lucide-react";
import OpenChatButton from "../components/OpenChatButton";
import SiteHeader from "../components/SiteHeader";
import { faqCategories, faqItems } from "../data/faqs";
import { brandName, defaultOpenGraph, jsonLd, siteUrl } from "../lib/seo";

const faqDescription =
  "Find answers about AE Global Group study abroad counseling, destinations, universities, applications, visa preparation, accommodation and pre-departure support.";

export const metadata: Metadata = {
  title: "FAQs",
  description: faqDescription,
  alternates: {
    canonical: "/faq"
  },
  openGraph: {
    ...defaultOpenGraph,
    title: `FAQs | ${brandName}`,
    description: faqDescription,
    url: "/faq",
    images: [
      {
        url: "/images/faq-ai-hero.webp",
        width: 1200,
        height: 630,
        alt: "Study abroad FAQ support background"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `FAQs | ${brandName}`,
    description: faqDescription,
    images: ["/images/faq-ai-hero.webp"]
  }
};

const quickSupport = [
  {
    title: "Compare with context",
    copy: "Destinations, universities and courses measured against your priorities.",
    icon: Compass
  },
  {
    title: "Prepare with structure",
    copy: "Documents, requirements and deadlines organized into clear next steps.",
    icon: FileCheck2
  },
  {
    title: "Move forward informed",
    copy: "Visa preparation, accommodation and departure guidance without guarantees.",
    icon: Plane
  }
];

const categoryIcons = [Compass, GraduationCap, FileCheck2, Plane, MessagesSquare];
const categoryId = (title: string) => `faq-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteUrl}/faq#faq`,
    url: `${siteUrl}/faq`,
    name: "AE Global Group FAQs",
    description: faqDescription,
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return (
    <div className="faq-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema)} />
      <SiteHeader faqPage />
      <main>
        <section className="faq-hero" aria-labelledby="faq-title">
          <nav className="contact-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">FAQs</span>
          </nav>
          <div className="faq-hero-grid">
            <div className="faq-hero-copy">
              <p className="eyebrow"><span aria-hidden="true">01</span> Student questions</p>
              <h1 id="faq-title">Clear answers.<br /><span>Practical next steps.</span></h1>
              <p>
                Start with straightforward information about choosing a destination,
                preparing an application and understanding the support AE Global Group provides.
              </p>
              <div className="faq-overview" aria-label="FAQ overview">
                <span><strong>{faqItems.length}</strong> practical answers</span>
                <span><strong>{faqCategories.length}</strong> planning topics</span>
                <span><strong>No</strong> approval guarantees</span>
              </div>
              <div className="faq-topic-nav" aria-label="FAQ categories">
                {faqCategories.map((category) => (
                  <a href={`#${categoryId(category.title)}`} key={category.title}>
                    {category.title}
                  </a>
                ))}
              </div>
              <div className="button-row">
                <a className="primary-button" href="#faq-list">
                  Read FAQs <ArrowRight size={16} aria-hidden="true" />
                </a>
                <OpenChatButton className="secondary-button faq-chat-button" />
              </div>
            </div>
          </div>
        </section>

        <section className="faq-support-strip" aria-label="FAQ support topics">
          {quickSupport.map((item, index) => {
            const Icon = item.icon;
            return (
            <div key={item.title}>
              <span className="faq-support-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <span className="faq-support-icon"><Icon size={20} aria-hidden="true" /></span>
              <span><strong>{item.title}</strong><small>{item.copy}</small></span>
            </div>
            );
          })}
        </section>

        <p className="faq-information-note">
          <ShieldCheck size={18} aria-hidden="true" />
          These answers explain AE Global Group&apos;s services and general planning steps. Admission,
          scholarship and visa requirements can change; confirm them with the relevant university,
          funding provider or official immigration authority before acting.
        </p>

        <section className="faq-layout" id="faq-list" aria-label="Frequently asked questions">
          <aside className="faq-directory">
            <p className="eyebrow">Browse by topic</p>
            <h2>Find your starting point.</h2>
            <nav aria-label="FAQ topic directory">
              {faqCategories.map((category, index) => (
                <a href={`#${categoryId(category.title)}`} key={category.title}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <strong>{category.title}</strong>
                  <ArrowRight size={14} aria-hidden="true" />
                </a>
              ))}
            </nav>
            <div className="faq-directory-help">
              <MessagesSquare size={20} aria-hidden="true" />
              <strong>Need a more specific answer?</strong>
              <p>Ask Mimi for general website guidance or contact the team for help with your profile.</p>
              <OpenChatButton className="faq-directory-chat" />
            </div>
          </aside>
          <div className="faq-category-list">
            {faqCategories.map((category, categoryIndex) => {
              const CategoryIcon = categoryIcons[categoryIndex] ?? HelpCircle;
              return (
              <section className="faq-category" key={category.title} aria-labelledby={categoryId(category.title)}>
                <div className="faq-category-heading">
                  <span className="faq-category-number" aria-hidden="true">{String(categoryIndex + 1).padStart(2, "0")}</span>
                  <span className="faq-help-icon"><CategoryIcon size={21} aria-hidden="true" /></span>
                  <div>
                    <p className="eyebrow">{category.eyebrow}</p>
                    <h2 id={categoryId(category.title)}>{category.title}</h2>
                    <p>{category.description}</p>
                  </div>
                </div>
                <div className="faq-accordion">
                  {category.items.map((item) => (
                    <details key={item.question}>
                      <summary>{item.question}</summary>
                      <p>{item.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
              );
            })}
          </div>
        </section>

        <section className="faq-final-cta">
          <div>
            <p className="eyebrow">Still deciding?</p>
            <h2>Tell us where you are in the process.</h2>
            <p>
              Share your study plans, preferred country, budget and intake. AE Global Group
              can help you understand the next practical step.
            </p>
          </div>
          <div className="button-row">
            <Link className="primary-button" href="/contact">
              Contact Us <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <OpenChatButton className="secondary-button faq-chat-button" />
          </div>
        </section>
      </main>
    </div>
  );
}
