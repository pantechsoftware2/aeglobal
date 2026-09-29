"use client";

import { useEffect, useRef, useState } from "react";
import { Facebook, Instagram, Linkedin, Share2, X, Youtube } from "lucide-react";

const socialLinks = [
  { name: "Facebook", href: "https://www.facebook.com/abroadeduversity/", icon: Facebook, className: "is-facebook" },
  { name: "Instagram", href: "https://www.instagram.com/abroad_eduversity/", icon: Instagram, className: "is-instagram" },
  { name: "YouTube", href: "https://www.youtube.com/@Abroad_Eduversity", icon: Youtube, className: "is-youtube" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/abroad-eduversity", icon: Linkedin, className: "is-linkedin" }
];

export default function SocialMediaDock() {
  const [open, setOpen] = useState(false);
  const dock = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (!dock.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);

  return (
    <div
      ref={dock}
      className={`social-dock${open ? " is-open" : ""}`}
      onPointerEnter={(event) => { if (event.pointerType === "mouse") setOpen(true); }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse" && !dock.current?.contains(document.activeElement)) setOpen(false);
      }}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <button
        ref={toggle}
        type="button"
        className="social-dock-toggle"
        aria-label={open ? "Close social media links" : "Follow us on social media"}
        aria-expanded={open}
        aria-controls="social-dock-links"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={18} aria-hidden="true" /> : <Share2 size={18} aria-hidden="true" />}
        <span>Follow us</span>
      </button>
      <nav id="social-dock-links" className="social-dock-links" aria-label="Social media" inert={!open}>
        {socialLinks.map(({ name, href, icon: Icon, className }) => (
          <a
            key={name}
            className={className}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} (opens in a new tab)`}
          >
            <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
            <span className="social-dock-tooltip">{name}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}
