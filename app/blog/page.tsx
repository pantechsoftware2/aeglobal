import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import SiteHeader from "../components/SiteHeader";
import LeadEnquiry from "../components/LeadEnquiry";
import { blogPosts } from "../data/blogPosts";
import { brandName, defaultOpenGraph, jsonLd, siteUrl } from "../lib/seo";

export const metadata: Metadata = {
  title: "Study Abroad Blog",
  description:
    "Practical study abroad guides from AE Global Group on shortlisting, applications, documents, visa preparation and destination planning.",
  alternates: {
    canonical: "/blog"
  },
  openGraph: {
    ...defaultOpenGraph,
    title: `Study Abroad Blog | ${brandName}`,
    description:
      "Practical study abroad guides on shortlisting, applications, documents, visa preparation and destination planning.",
    url: "/blog"
  },
  twitter: {
    card: "summary_large_image",
    title: `Study Abroad Blog | ${brandName}`,
    description:
      "Practical study abroad guides on shortlisting, applications, documents, visa preparation and destination planning.",
    images: ["/images/generated-destinations-landmarks-v2.webp"]
  }
};

export default function BlogPage() {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${siteUrl}/blog#blog`,
    name: "AE Global Group Study Abroad Blog",
    url: `${siteUrl}/blog`,
    publisher: { "@id": `${siteUrl}/#organization` },
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.publishedAt,
      url: `${siteUrl}/blog/${post.slug}`
    }))
  };

  return (
    <div className="blog-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(blogSchema)} />
      <SiteHeader />
      <main>
        <section className="blog-hero">
          <p className="eyebrow">Study Abroad Blog</p>
          <h1>Clear guides for<br /><span>better decisions.</span></h1>
          <p>
            Practical notes on shortlisting, applications, documents, visas and destination planning.
            Written for students who want the next step to feel less scattered.
          </p>
        </section>

        <section className="blog-featured" aria-label="Latest study abroad guides">
          {blogPosts.map((post, index) => (
            <article className={index === 0 ? "blog-card blog-card-large" : "blog-card"} key={post.slug}>
              <Link className="blog-card-image" href={`/blog/${post.slug}`} aria-label={post.title}>
                <Image src={post.heroImage} alt="" fill sizes={index === 0 ? "60vw" : "33vw"} />
              </Link>
              <div className="blog-card-body">
                <div className="blog-meta">
                  <span>{post.category}</span>
                  <span><Clock size={13} aria-hidden="true" /> {post.readingTime}</span>
                </div>
                <h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
                <p>{post.description}</p>
                <Link className="text-link" href={`/blog/${post.slug}`}>
                  Read guide <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </section>

        <section className="blog-cta">
          <div>
            <BookOpen size={28} aria-hidden="true" />
            <h2>Want advice for your profile?</h2>
            <p>Share your academic background, preferred course and target intake. We&apos;ll help you understand what to compare first.</p>
          </div>
          <LeadEnquiry className="teal-button">Talk to an advisor <ArrowRight size={16} aria-hidden="true" /></LeadEnquiry>
        </section>
      </main>
    </div>
  );
}
