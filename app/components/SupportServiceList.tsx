"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function SupportServiceList({ children }: { children: ReactNode }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const section = viewport?.closest<HTMLElement>(".support");
    if (!viewport || !section) return;
    let cancelled = false;
    let dispose: (() => void) | undefined;

    const distance = () => Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    const updateProgress = () => {
      if (progressRef.current) {
        const progress = distance() ? viewport.scrollLeft / distance() : 1;
        progressRef.current.style.transform = `scaleX(${0.12 + progress * 0.88})`;
      }
    };
    viewport.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    void (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"), import("gsap/ScrollTrigger")
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      media.add("(min-width: 761px) and (min-height: 560px) and (prefers-reduced-motion: no-preference)", () => {
        section.classList.add("support-scroll-active");
        viewport.scrollLeft = 0;
        const tween = gsap.to(viewport, {
          scrollLeft: distance,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "center center",
            end: () => `+=${Math.max(600, distance() * 1.2)}`,
            pin: section,
            pinSpacing: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: updateProgress
          }
        });
        // Arrow keys remain useful while the section is pinned.
        const onKeyDown = (event: KeyboardEvent) => {
          const trigger = tween.scrollTrigger;
          if (!trigger?.isActive) return;
          const direction = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
          if (!direction) return;
          event.preventDefault();
          trigger.scroll(Math.max(trigger.start, Math.min(trigger.end, trigger.scroll() + direction * 280)));
        };
        viewport.addEventListener("keydown", onKeyDown);
        return () => {
          viewport.removeEventListener("keydown", onKeyDown);
          section.classList.remove("support-scroll-active");
          viewport.scrollLeft = 0;
          updateProgress();
        };
      });
      const frame = requestAnimationFrame(() => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      });
      dispose = () => {
        cancelAnimationFrame(frame);
        media.revert();
      };
    })().catch(() => {
      // Native horizontal scrolling stays available if the animation cannot load.
      dispose?.();
    });

    return () => {
      cancelled = true;
      dispose?.();
      viewport.removeEventListener("scroll", updateProgress);
    };
  }, []);

  return (
    <div className="support-services">
      <div className="support-services-caption" aria-hidden="true">
        <span>Support at every step</span>
        <span className="support-swipe-hint">Explore services →</span>
        <span className="support-scroll-hint">Scroll to explore →</span>
      </div>
      <div className="support-services-viewport" ref={viewportRef} tabIndex={0} role="region" aria-label="Student support services. Scroll horizontally or use arrow keys to explore.">
        <div className="service-grid" role="list">{children}</div>
      </div>
      <div className="support-services-progress" aria-hidden="true"><span ref={progressRef} /></div>
    </div>
  );
}
