"use client";

import { Check, Copy, Facebook, Linkedin, MessageCircle, Share2, Twitter } from "lucide-react";
import { useEffect, useState } from "react";

type BlogShareProps = {
  title: string;
  url: string;
};

export default function BlogShare({ title, url }: BlogShareProps) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedMessage = encodeURIComponent(`${title} ${url}`);

  useEffect(() => {
    if (!copied) return;

    const timeout = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      window.prompt("Copy this article link:", url);
    }
  };

  const shareLinks = [
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodedMessage}`,
      icon: MessageCircle
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: Linkedin
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: Facebook
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: Twitter
    }
  ];

  return (
    <aside className="blog-share" aria-label="Share this article">
      <div className="blog-share-heading">
        <Share2 size={17} aria-hidden="true" />
        <span>Share this guide</span>
      </div>
      <div className="blog-share-actions">
        {shareLinks.map(({ label, href, icon: Icon }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${label}`}
            key={label}
          >
            <Icon size={16} aria-hidden="true" />
            <span>{label}</span>
          </a>
        ))}
        <button type="button" onClick={copyLink} aria-live="polite">
          {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
          <span>{copied ? "Copied" : "Copy link"}</span>
        </button>
      </div>
    </aside>
  );
}
