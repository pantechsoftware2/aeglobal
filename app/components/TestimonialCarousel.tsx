"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Star, X } from "lucide-react";

const testimonials = [
  {
    initials: "AS",
    image: "/images/testimonials/student-1.webp",
    quote: "The counseling helped me stop guessing and focus on the countries that actually matched my profile and budget.",
    meta: "Anonymized student feedback / University shortlisting"
  },
  {
    initials: "RK",
    image: "/images/testimonials/student-2.webp",
    quote: "My documents, deadlines and application steps became much clearer after the first review.",
    meta: "Anonymized student feedback / Application support"
  },
  {
    initials: "NM",
    image: "/images/testimonials/student-3.webp",
    quote: "I liked that the team explained requirements honestly instead of promising things they could not control.",
    meta: "Anonymized student feedback / Visa preparation"
  },
  {
    initials: "JP",
    image: "/images/testimonials/student-4.webp",
    quote: "The process felt organized. I knew what to prepare next and why each document mattered.",
    meta: "Anonymized student feedback / Pre-departure planning"
  }
];

export default function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const activeTestimonial = testimonials[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % testimonials.length);
    }, 4400);

    return () => window.clearInterval(timer);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="testimonial-stage" aria-live="polite" aria-label="Student feedback">
      <article className="testimonial-card" key={activeTestimonial.initials}>
        <button
          className="testimonial-close"
          type="button"
          aria-label="Close student feedback"
          onClick={() => setIsVisible(false)}
        >
          <X size={13} strokeWidth={2.4} />
        </button>
        <div className="testimonial-initials" aria-hidden="true">
          <Image
            src={activeTestimonial.image}
            alt=""
            width={92}
            height={132}
          />
        </div>
        <div className="testimonial-body">
          <div className="stars" aria-label="5 out of 5 rating">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} size={15} fill="currentColor" />
            ))}
          </div>
          <p>{activeTestimonial.quote}</p>
          <span>{activeTestimonial.meta}</span>
        </div>
      </article>
    </div>
  );
}
