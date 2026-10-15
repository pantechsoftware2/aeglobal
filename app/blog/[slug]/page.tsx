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
    title: post.metaTitle ?? post.title,
    description: post.metaDescription ?? post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/${post.slug}`
    },
    openGraph: {
      ...defaultOpenGraph,
      type: "article",
      title: `${post.title} | ${brandName}`,
      description: post.metaDescription ?? post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      images: [
        {
          url: post.heroImage,
          alt: post.heroImageAlt
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | ${brandName}`,
      description: post.metaDescription ?? post.description,
      images: [post.heroImage]
    }
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const articleWordCount = [
    post.title,
    post.description,
    post.takeaway,
    ...post.sections.flatMap((section) => [
      section.heading,
      ...section.body,
      ...(section.bullets ?? []),
      ...(section.subsections?.flatMap((subsection) => [subsection.heading, ...subsection.body, ...(subsection.bullets ?? [])]) ?? []),
      ...(section.table?.rows.flat() ?? [])
    ]),
    ...(post.faqs?.flatMap((faq) => [faq.question, faq.answer]) ?? [])
  ].join(" ").trim().split(/\s+/).length;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${siteUrl}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.metaDescription ?? post.description,
    image: toAbsoluteUrl(post.heroImage),
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    wordCount: articleWordCount,
    keywords: post.keywords?.join(", "),
    citation: post.sources?.map((source) => source.href),
    author: {
      "@type": "Organization",
      name: brandName,
      url: siteUrl
    },
    publisher: { "@id": `${siteUrl}/#organization` },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`
  };

  const faqSchema = post.faqs?.length ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  } : null;

  const relatedPosts = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <div className="blog-post-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(articleSchema)} />
      {faqSchema ? <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema)} /> : null}
      <SiteHeader />
      <main>
        <div className="blog-shell">
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
              <Image src={post.heroImage} alt={post.heroImageAlt} fill sizes="(max-width: 900px) 100vw, 1120px" priority />
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
                    {section.table ? (
                      <div className="blog-table-wrap" tabIndex={0} role="region" aria-label={`${section.heading} comparison table`}>
                        <table>
                          <thead>
                            <tr>{section.table.headers.map((header) => <th scope="col" key={header}>{header}</th>)}</tr>
                          </thead>
                          <tbody>
                            {section.table.rows.map((row) => (
                              <tr key={row.join("|")}>{row.map((cell, index) => index === 0 ? <th scope="row" key={cell}>{cell}</th> : <td key={`${index}-${cell}`}>{cell}</td>)}</tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : null}
                    {section.bullets?.length ? (
                      <ul className="blog-bullets">
                        {section.bullets.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    ) : null}
                    {section.subsections?.map((subsection) => (
                      <div className="blog-subsection" key={subsection.heading}>
                        <h3>{subsection.heading}</h3>
                        {subsection.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                        {subsection.bullets?.length ? (
                          <ul className="blog-bullets">
                            {subsection.bullets.map((item) => <li key={item}>{item}</li>)}
                          </ul>
                        ) : null}
                      </div>
                    ))}
                  </section>
                ))}

                {post.internalLinks?.length ? (
                  <section className="blog-useful-links">
                    <h2>Continue planning</h2>
                    <ul>
                      {post.internalLinks.map((item) => <li key={item.href}><Link href={item.href}>{item.label}<ArrowRight size={15} aria-hidden="true" /></Link></li>)}
                    </ul>
                  </section>
                ) : null}

                {post.faqs?.length ? (
                  <section className="blog-faqs">
                    <h2>Frequently asked questions</h2>
                    <div>
                      {post.faqs.map((faq) => (
                        <details key={faq.question}>
                          <summary>{faq.question}</summary>
                          <p>{faq.answer}</p>
                        </details>
                      ))}
                    </div>
                  </section>
                ) : null}

                {post.sources?.length ? (
                  <section className="blog-sources">
                    <h2>Official sources</h2>
                    <p>Checked on 15 October 2026. Immigration rules can change, so review the official guidance before applying.</p>
                    <ol>
                      {post.sources.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noopener noreferrer">{source.label}<span aria-hidden="true"> ↗</span></a></li>)}
                    </ol>
                  </section>
                ) : null}
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
        </div>
      </main>
    </div>
  );
}
