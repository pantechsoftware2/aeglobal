import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, HelpCircle, MessageCircle, SearchCheck } from "lucide-react";
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
    url: "/faq"
  },
  twitter: {
    card: "summary_large_image",
    title: `FAQs | ${brandName}`,
    description: faqDescription,
    images: ["/images/generated-destinations-landmarks-v2.webp"]
  }
};

const quickSupport = [
  "Destination and university comparison",
  "Application documents and deadlines",
  "Visa preparation and pre-departure planning"
];

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
            <div>
              <p className="eyebrow">Student questions</p>
              <h1 id="faq-title">Clear answers before you apply.</h1>
              <p>
                Browse common questions about destinations, universities, applications,
                visa preparation and what happens after you contact AE Global Group.
              </p>
              <div className="faq-topic-nav" aria-label="FAQ categories">
                {faqCategories.map((category) => (
                  <a href={`#faq-${category.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} key={category.title}>
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
            <aside className="faq-help-card" aria-label="Ask Mimi for help">
              <span className="faq-help-icon"><MessageCircle size={24} aria-hidden="true" /></span>
              <p className="eyebrow">Need a quick answer?</p>
              <h2>Ask Mimi, AE Global Group&apos;s study abroad chat assistant.</h2>
              <p>
                If your question is not listed, open the chat and ask about your destination,
                course shortlist, documents, visa preparation or next step.
              </p>
              <OpenChatButton />
            </aside>
          </div>
        </section>

        <section className="faq-support-strip" aria-label="FAQ support topics">
          {quickSupport.map((item) => (
            <div key={item}>
              <CheckCircle2 size={18} aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </section>

        <section className="faq-layout" id="faq-list" aria-label="Frequently asked questions">
          <aside className="faq-side-card">
            <span className="faq-help-icon"><SearchCheck size={24} aria-hidden="true" /></span>
            <h2>How to use this page</h2>
            <p>
              Start with the category closest to your question. If your case is personal,
              use Mimi for a quick answer or send an enquiry so the team can review your details.
            </p>
            <Link className="text-link" href="/contact">
              Contact the team <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </aside>

          <div className="faq-category-list">
            {faqCategories.map((category) => (
              <section className="faq-category" key={category.title} aria-labelledby={`faq-${category.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                <div className="faq-category-heading">
                  <span className="faq-help-icon"><HelpCircle size={22} aria-hidden="true" /></span>
                  <div>
                    <p className="eyebrow">{category.eyebrow}</p>
                    <h2 id={`faq-${category.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>{category.title}</h2>
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
            ))}
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
