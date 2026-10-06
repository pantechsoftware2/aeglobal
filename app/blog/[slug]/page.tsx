import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Clock } from "lucide-react";
import SiteHeader from "../../components/SiteHeader";
import LeadEnquiry from "../../components/LeadEnquiry";
import { blogPosts, getBlogPost } from "../../data/blogPosts";
import { brandName, defaultOpenGraph, jsonLd, siteUrl, toAbsoluteUrl } from "../../lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: `Blog post not found | ${brandName}` };

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`
    },
    openGraph: {
      ...defaultOpenGraph,
      type: "article",
      title: `${post.title} | ${brandName}`,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      images: [
        {
          url: post.heroImage,
          width: 1200,
          height: 630,
          alt: post.title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | ${brandName}`,
      description: post.description,
      images: [post.heroImage]
    }
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${siteUrl}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.description,
    image: toAbsoluteUrl(post.heroImage),
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Organization",
      name: brandName,
      url: siteUrl
    },
    publisher: { "@id": `${siteUrl}/#organization` },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`
  };

  const relatedPosts = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <div className="blog-post-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(articleSchema)} />
      <SiteHeader />
      <main>
        <article className="blog-post">
          <Link className="blog-back-link" href="/blog"><ArrowLeft size={15} aria-hidden="true" /> Back to blog</Link>
          <header className="blog-post-header">
            <p className="eyebrow">{post.category}</p>
            <h1>{post.title}</h1>
            <p>{post.description}</p>
            <div className="blog-meta">
              <span>{new Date(`${post.publishedAt}T00:00:00`).toLocaleDateString("en", { day: "numeric", month: "long", year: "numeric" })}</span>
              <span><Clock size={13} aria-hidden="true" /> {post.readingTime}</span>
            </div>
          </header>

          <div className="blog-post-image">
            <Image src={post.heroImage} alt={`${post.title} guide image`} fill sizes="(max-width: 900px) 100vw, 880px" priority />
          </div>

          <section className="blog-takeaway">
            <h2>Quick answer</h2>
            <p>{post.takeaway}</p>
          </section>

          <div className="blog-post-grid">
            <div className="blog-post-content">
              {post.sections.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
              ))}
            </div>

            {post.checklist?.length ? (
              <aside className="blog-checklist" aria-label="Guide checklist">
                <h2>Checklist</h2>
                <ul>
                  {post.checklist.map((item) => (
                    <li key={item}><Check size={16} aria-hidden="true" />{item}</li>
                  ))}
                </ul>
              </aside>
            ) : null}
          </div>
        </article>

        <section className="blog-related" aria-label="Related guides">
          <div>
            <p className="eyebrow">Read next</p>
            <h2>More practical guides</h2>
          </div>
          <div className="blog-related-grid">
            {relatedPosts.map((item) => (
              <Link href={`/blog/${item.slug}`} key={item.slug}>
                <span>{item.category}</span>
                <strong>{item.title}</strong>
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>

        <section className="blog-cta">
          <div>
            <h2>Ready to compare your options?</h2>
            <p>Tell us where you are in the process. We&apos;ll help you map the next step.</p>
          </div>
          <LeadEnquiry className="teal-button">Start with clarity <ArrowRight size={16} aria-hidden="true" /></LeadEnquiry>
        </section>
      </main>
    </div>
  );
}
