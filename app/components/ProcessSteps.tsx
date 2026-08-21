"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileText, Globe2, MailOpen, Plane, Search, type LucideIcon } from "lucide-react";
import { useEffect, useRef } from "react";

export type ProcessStepIcon = "search" | "file" | "mail" | "globe" | "plane";

export type ProcessStepItem = {
  title: string;
  copy: string;
  icon: ProcessStepIcon;
};

const icons: Record<ProcessStepIcon, LucideIcon> = {
  search: Search,
  file: FileText,
  mail: MailOpen,
  globe: Globe2,
  plane: Plane
};

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

gsap.registerPlugin(ScrollTrigger);

export default function ProcessSteps({ items }: { items: ProcessStepItem[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stepsRef = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const section =
      containerRef.current?.closest<HTMLElement>(".process-support-scroll") ??
      containerRef.current?.closest<HTMLElement>(".process-scroll");
    const steps = stepsRef.current.filter(Boolean) as HTMLElement[];

    if (!section || steps.length === 0) return;

    const setComplete = () => {
      gsap.set(steps, { opacity: 1, visibility: "visible", y: 0, force3D: true, willChange: "auto" });
    };

    if (reducedMotion.matches) {
      setComplete();
      return;
    }

    const maxIndex = Math.max(0, items.length - 1);
    const ySetters = steps.map((step) => gsap.quickSetter(step, "y", "px"));
    const opacitySetters = steps.map((step) => gsap.quickSetter(step, "opacity"));

    const render = (progress: number) => {
      const sectionProgress = clamp(progress / 0.78);
      const snapPosition = sectionProgress * maxIndex;
      const activeIndex = Math.min(maxIndex, Math.floor(snapPosition));
      const nextIndex = Math.min(maxIndex, activeIndex + 1);
      const localProgress = snapPosition - activeIndex;
      const transitionProgress = easeOutCubic(clamp((localProgress - 0.62) / 0.38));

      steps.forEach((_, index) => {
        let translateY = 160;
        let opacity = 0;

        if (index < activeIndex) {
          translateY = -160;
        }

        if (index === activeIndex) {
          translateY = -160 * transitionProgress;
          opacity = 1 - transitionProgress;
        }

        if (index === nextIndex) {
          translateY = 160 * (1 - transitionProgress);
          opacity = transitionProgress;
        }

        if (activeIndex === maxIndex && index === maxIndex) {
          translateY = 0;
          opacity = 1;
        }

        ySetters[index](translateY);
        opacitySetters[index](opacity);
      });
    };

    gsap.set(steps, { opacity: 0, visibility: "visible", y: 160, force3D: true, willChange: "transform, opacity" });
    render(0);

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.18,
      snap: {
        snapTo: maxIndex > 0 ? 1 / maxIndex : 1,
        duration: { min: 0.12, max: 0.28 },
        delay: 0.02,
        ease: "power2.out"
      },
      invalidateOnRefresh: true,
      onUpdate: (self) => render(self.progress)
    });
    render(trigger.progress);

    const handleMotionChange = () => {
      if (reducedMotion.matches) {
        trigger.kill();
        setComplete();
        return;
      }

      ScrollTrigger.refresh();
    };

    reducedMotion.addEventListener("change", handleMotionChange);

    return () => {
      reducedMotion.removeEventListener("change", handleMotionChange);
      trigger.kill();
      gsap.set(steps, { willChange: "auto" });
    };
  }, [items.length]);

  return (
    <div className="process-steps" ref={containerRef}>
      {items.map((step, index) => {
        const Icon = icons[step.icon];

        return (
          <article
            className="step"
            key={step.title}
            ref={(node) => {
              stepsRef.current[index] = node;
            }}
          >
            <div className="step-icon"><Icon size={26} /></div>
            <strong>{String(index + 1).padStart(2, "0")}</strong>
            <h3>{step.title}</h3>
            <p>{step.copy}</p>
          </article>
        );
      })}
    </div>
  );
}
