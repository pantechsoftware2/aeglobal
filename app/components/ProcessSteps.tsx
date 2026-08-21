"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, FileText, Globe2, MailOpen, Plane, Search, type LucideIcon } from "lucide-react";
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
    const section = containerRef.current?.closest<HTMLElement>(".process-sticky");
    const steps = stepsRef.current.filter(Boolean) as HTMLElement[];

    if (!section || steps.length === 0) return;

    const setComplete = () => {
      gsap.set(steps, {
        opacity: 1,
        scale: 1,
        rotateX: 0,
        visibility: "visible",
        y: 0,
        force3D: true,
        willChange: "auto"
      });
    };

    const supportsPinnedStory = window.matchMedia("(min-width: 761px)").matches;

    if (reducedMotion.matches || !supportsPinnedStory) {
      setComplete();
      return;
    }

    const maxIndex = Math.max(0, items.length - 1);
    const ySetters = steps.map((step) => gsap.quickSetter(step, "y", "px"));
    const opacitySetters = steps.map((step) => gsap.quickSetter(step, "opacity"));
    const scaleSetters = steps.map((step) => gsap.quickSetter(step, "scale"));
    const rotateXSetters = steps.map((step) => gsap.quickSetter(step, "rotateX", "deg"));

    const render = (progress: number) => {
      const snapPosition = clamp(progress) * maxIndex;
      const activeIndex = Math.min(maxIndex, Math.floor(snapPosition));
      const nextIndex = Math.min(maxIndex, activeIndex + 1);
      const localProgress = snapPosition - activeIndex;
      const transitionProgress = easeOutCubic(clamp((localProgress - 0.52) / 0.48));

      steps.forEach((_, index) => {
        let translateY = 54;
        let opacity = 0;
        let scale = 0.96;
        let rotateX = -4;

        if (index < activeIndex) {
          translateY = -46;
          scale = 0.96;
          rotateX = 4;
        }

        if (index === activeIndex) {
          translateY = -46 * transitionProgress;
          opacity = 1 - transitionProgress;
          scale = 1 - 0.04 * transitionProgress;
          rotateX = 4 * transitionProgress;
        }

        if (index === nextIndex) {
          translateY = 54 * (1 - transitionProgress);
          opacity = transitionProgress;
          scale = 0.96 + 0.04 * transitionProgress;
          rotateX = -4 * (1 - transitionProgress);
        }

        if (activeIndex === maxIndex && index === maxIndex) {
          translateY = 0;
          opacity = 1;
          scale = 1;
          rotateX = 0;
        }

        ySetters[index](translateY);
        opacitySetters[index](opacity);
        scaleSetters[index](scale);
        rotateXSetters[index](rotateX);
      });
    };

    gsap.set(steps, {
      opacity: 0,
      scale: 0.96,
      rotateX: -4,
      transformOrigin: "center center",
      visibility: "visible",
      y: 54,
      force3D: true,
      willChange: "transform, opacity"
    });
    render(0);

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "center center",
      end: () => `+=${Math.max(steps.length - 1, 1) * window.innerHeight * 0.72}`,
      pin: section,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: 0.5,
      snap: {
        snapTo: maxIndex > 0 ? 1 / maxIndex : 1,
        duration: { min: 0.22, max: 0.46 },
        delay: 0.04,
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
            <span className="step-arrow" aria-hidden="true">
              <ArrowRight size={20} />
            </span>
          </article>
        );
      })}
    </div>
  );
}
