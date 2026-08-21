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
const mix = (from: number, to: number, progress: number) => from + (to - from) * progress;

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
      const snapPosition = clamp(progress) * maxIndex;
      const activeIndex = Math.min(maxIndex, Math.floor(snapPosition));
      const nextIndex = Math.min(maxIndex, activeIndex + 1);
      const localProgress = snapPosition - activeIndex;
      const transitionProgress = easeOutCubic(localProgress);
      const currentFade = clamp((transitionProgress - 0.68) / 0.24);
      const outgoingContentProgress = 1 - easeOutCubic(clamp((transitionProgress - 0.52) / 0.26));
      const incomingContentProgress = easeOutCubic(clamp((transitionProgress - 0.5) / 0.28));

      steps.forEach((_, index) => {
        let translateX = 0;
        let translateY = 88;
        let opacity = 0;
        let scale = 0.94;
        let rotateX = -2.4;
        let rotateZ = 1.2;
        let zIndex = 0;
        let shadowAlpha = 0.08;
        let contentProgress = 0;
        let numberY = 34;
        let waveY = 14;
        let waveX = -10;
        let dotsY = -8;

        if (index < activeIndex) {
          translateX = 0;
          translateY = -58;
          scale = 0.955;
          rotateX = 4.5;
          rotateZ = -1.2;
          numberY = -28;
          shadowAlpha = 0.06;
          waveY = -10;
          waveX = 8;
          dotsY = 8;
        }

        if (index === activeIndex) {
          translateX = 0;
          translateY = -44 * transitionProgress;
          opacity = 1 - currentFade;
          scale = 1 - 0.035 * transitionProgress;
          rotateX = 3.5 * transitionProgress;
          rotateZ = -0.8 * transitionProgress;
          zIndex = 20;
          shadowAlpha = mix(0.14, 0.08, transitionProgress);
          contentProgress = outgoingContentProgress;
          numberY = mix(0, -30, transitionProgress);
          waveY = mix(0, -10, transitionProgress);
          waveX = mix(0, 10, transitionProgress);
          dotsY = mix(0, 8, transitionProgress);
        }

        if (index === nextIndex) {
          const incomingOpacity = easeOutCubic(clamp((transitionProgress - 0.32) / 0.36));
          translateX = 0;
          translateY = 96 * (1 - transitionProgress);
          opacity = incomingOpacity;
          scale = 0.955 + 0.045 * transitionProgress;
          rotateX = -2 * (1 - transitionProgress);
          rotateZ = 0.8 * (1 - transitionProgress);
          zIndex = 10;
          shadowAlpha = mix(0.08, 0.14, transitionProgress);
          contentProgress = incomingContentProgress;
          numberY = mix(34, 0, incomingContentProgress);
          waveY = mix(14, 0, transitionProgress);
          waveX = mix(-10, 0, transitionProgress);
          dotsY = mix(-8, 0, transitionProgress);
        }

        if (activeIndex === maxIndex && index === maxIndex) {
          translateY = 0;
          opacity = 1;
          scale = 1;
          rotateX = 0;
          rotateZ = 0;
          zIndex = 20;
          shadowAlpha = 0.14;
          contentProgress = 1;
          numberY = 0;
          waveY = 0;
          waveX = 0;
          dotsY = 0;
        }

        xSetters[index](translateX);
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
      trigger: section,
      start: "center center",
      end: () => `+=${Math.max(steps.length - 1, 1) * window.innerHeight * 0.72}`,
      pin: section,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: 0.9,
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
