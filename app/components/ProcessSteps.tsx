"use client";

import { FileText, Globe2, MailOpen, Plane, Search, type LucideIcon } from "lucide-react";
import { useLayoutEffect, useRef } from "react";

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
const easeInOutCubic = (value: number) =>
  value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;
const mix = (from: number, to: number, progress: number) => from + (to - from) * progress;

export default function ProcessSteps({ items }: { items: ProcessStepItem[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stepsRef = useRef<Array<HTMLElement | null>>([]);

  useLayoutEffect(() => {
    let effectCleanup: (() => void) | undefined;
    let isCancelled = false;

    void (async () => {
    const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger")
    ]);

    if (isCancelled) return;

    gsap.registerPlugin(ScrollTrigger);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stickySection = containerRef.current?.closest<HTMLElement>(".process-sticky");
    const scrollSection = containerRef.current?.closest<HTMLElement>(".process-scroll");
    const steps = stepsRef.current.filter(Boolean) as HTMLElement[];

    if (!stickySection || !scrollSection || steps.length === 0) return;

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
    const xSetters = steps.map((step) => gsap.quickSetter(step, "x", "px"));
    const ySetters = steps.map((step) => gsap.quickSetter(step, "y", "px"));
    const opacitySetters = steps.map((step) => gsap.quickSetter(step, "opacity"));
    const scaleSetters = steps.map((step) => gsap.quickSetter(step, "scale"));
    const rotateXSetters = steps.map((step) => gsap.quickSetter(step, "rotateX", "deg"));
    const rotateZSetters = steps.map((step) => gsap.quickSetter(step, "rotateZ", "deg"));
    const zIndexSetters = steps.map((step) => gsap.quickSetter(step, "zIndex"));
    const shadowSetters = steps.map((step) => gsap.quickSetter(step, "--step-shadow-alpha"));
    const waveYSetters = steps.map((step) => gsap.quickSetter(step, "--step-wave-y", "px"));
    const waveXSetters = steps.map((step) => gsap.quickSetter(step, "--step-wave-x", "px"));
    const dotsYSetters = steps.map((step) => gsap.quickSetter(step, "--step-dots-y", "px"));
    const content = steps.map((step) => ({
      icon: step.querySelector<HTMLElement>(".step-icon"),
      title: step.querySelector<HTMLElement>("h3"),
      number: step.querySelector<HTMLElement>("strong"),
      copy: step.querySelector<HTMLElement>("p")
    }));
    const iconScaleSetters = content.map(({ icon }) => icon ? gsap.quickSetter(icon, "scale") : null);
    const iconRotateSetters = content.map(({ icon }) => icon ? gsap.quickSetter(icon, "rotate", "deg") : null);
    const titleYSetters = content.map(({ title }) => title ? gsap.quickSetter(title, "y", "px") : null);
    const titleOpacitySetters = content.map(({ title }) => title ? gsap.quickSetter(title, "opacity") : null);
    const copyYSetters = content.map(({ copy }) => copy ? gsap.quickSetter(copy, "y", "px") : null);
    const copyOpacitySetters = content.map(({ copy }) => copy ? gsap.quickSetter(copy, "opacity") : null);
    const numberYSetters = content.map(({ number }) => number ? gsap.quickSetter(number, "y", "px") : null);
    const numberOpacitySetters = content.map(({ number }) => number ? gsap.quickSetter(number, "opacity") : null);

    const setContentState = (index: number, progress: number, numberY: number) => {
      const iconProgress = easeOutCubic(clamp((progress - 0.04) / 0.58));
      const titleProgress = easeOutCubic(clamp((progress - 0.12) / 0.52));
      const copyProgress = easeOutCubic(clamp((progress - 0.2) / 0.52));

      iconScaleSetters[index]?.(mix(0.8, 1, iconProgress));
      iconRotateSetters[index]?.(mix(-6, 0, iconProgress));
      titleYSetters[index]?.(mix(20, 0, titleProgress));
      titleOpacitySetters[index]?.(titleProgress);
      copyYSetters[index]?.(mix(18, 0, copyProgress));
      copyOpacitySetters[index]?.(copyProgress);
      numberYSetters[index]?.(numberY);
      numberOpacitySetters[index]?.(clamp(progress));

      if (content[index].title) {
        gsap.set(content[index].title, { "--step-accent-scale": titleProgress });
      }
    };

    const render = (progress: number) => {
      const position = clamp(progress) * maxIndex;

      steps.forEach((_, index) => {
        const offset = index - position;
        const distance = Math.abs(offset);
        const proximity = easeInOutCubic(clamp((0.66 - distance) / 0.66));
        const isOutgoing = offset < 0;
        const isIncoming = offset > 0;

        let translateY = 0;
        let scale = 1;
        let rotateX = 0;
        let rotateZ = 0;
        let opacity = 0;
        let shadowAlpha = 0.1;
        let waveY = 0;
        let waveX = 0;
        let dotsY = 0;

        if (isOutgoing) {
          const exit = easeInOutCubic(clamp(-offset));
          translateY = mix(0, -62, exit);
          scale = mix(1, 0.965, exit);
          rotateX = mix(0, 4, exit);
          rotateZ = mix(0, -0.45, exit);
          opacity = mix(1, 0, easeInOutCubic(clamp((exit - 0.62) / 0.38)));
          shadowAlpha = mix(0.14, 0.08, exit);
          waveY = mix(0, -10, exit);
          waveX = mix(0, 7, exit);
          dotsY = mix(0, 8, exit);
        } else if (isIncoming) {
          const entry = easeOutCubic(clamp(1 - offset));
          translateY = mix(82, 0, entry);
          scale = mix(0.968, 1, entry);
          rotateX = mix(-2.2, 0, entry);
          rotateZ = mix(0.42, 0, entry);
          opacity = offset > 1.05 ? 0 : mix(0.28, 1, entry);
          shadowAlpha = mix(0.06, 0.14, entry);
          waveY = mix(12, 0, entry);
          waveX = mix(-8, 0, entry);
          dotsY = mix(-8, 0, entry);
        } else {
          opacity = 1;
          shadowAlpha = 0.14;
        }

        const contentProgress = proximity;
        const numberY = mix(isOutgoing ? -24 : 24, 0, proximity);
        const zIndex = Math.round(100 - distance * 12 + (isIncoming ? -2 : 0));

        xSetters[index](0);
        ySetters[index](translateY);
        opacitySetters[index](opacity);
        scaleSetters[index](scale);
        rotateXSetters[index](rotateX);
        rotateZSetters[index](rotateZ);
        zIndexSetters[index](zIndex);
        shadowSetters[index](shadowAlpha);
        waveYSetters[index](waveY);
        waveXSetters[index](waveX);
        dotsYSetters[index](dotsY);
        setContentState(index, contentProgress, numberY);
      });
    };

    gsap.set(steps, {
      opacity: 0,
      scale: 0.94,
      rotateX: -2.4,
      rotateZ: 1.2,
      transformOrigin: "center center",
      visibility: "visible",
      x: 0,
      y: 82,
      force3D: true,
      willChange: "transform, opacity"
    });
    render(0);

    const trigger = ScrollTrigger.create({
      trigger: scrollSection,
      start: "top top",
      end: () => `+=${Math.max(1, maxIndex) * Math.round(window.innerHeight * 0.72)}`,
      pin: stickySection,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: 0.85,
      invalidateOnRefresh: true,
      onUpdate: (self) => render(self.progress)
    });
    render(trigger.progress);

    const refresh = () => {
      ScrollTrigger.refresh();
      render(trigger.progress);
    };
    const refreshFrame = window.requestAnimationFrame(() => {
      refresh();
    });
    const refreshTimeout = window.setTimeout(refresh, 450);
    const resizeObserver = new ResizeObserver(refresh);

    resizeObserver.observe(document.body);
    window.addEventListener("load", refresh, { once: true });
    document.fonts?.ready.then(refresh).catch(() => undefined);

    const handleMotionChange = () => {
      if (reducedMotion.matches) {
        trigger.kill();
        setComplete();
        return;
      }

      ScrollTrigger.refresh();
    };

    reducedMotion.addEventListener("change", handleMotionChange);

    effectCleanup = () => {
      reducedMotion.removeEventListener("change", handleMotionChange);
      window.cancelAnimationFrame(refreshFrame);
      window.clearTimeout(refreshTimeout);
      window.removeEventListener("load", refresh);
      resizeObserver.disconnect();
      trigger.kill();
      gsap.set(steps, { willChange: "auto" });
    };

    if (isCancelled) {
      effectCleanup();
    }
    })();

    return () => {
      isCancelled = true;
      effectCleanup?.();
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
