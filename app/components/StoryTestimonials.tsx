"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const studentStories = [
  {
    label: "Course Fit",
    quote: "I stopped guessing and finally understood which options matched my profile.",
    student: "Student admit story",
    video: "/video/story-course-fit.mp4",
    poster: "/images/testimonials/student-1.webp"
  },
  {
    label: "Application Ready",
    quote: "The application steps became clear, organized and much easier to follow.",
    student: "Application support",
    video: "/video/story-arrival.mp4",
    poster: "/images/testimonials/student-2.webp"
  },
  {
    label: "Visa Guidance",
    quote: "I knew what to prepare next and why each document mattered.",
    student: "Pre-departure planning",
    video: "/video/story-guidance.mp4",
    poster: "/images/testimonials/student-4.webp"
  },
  {
    label: "Achievement",
    quote: "From aspiration to achievement, the whole path felt possible.",
    student: "Student success story",
    video: "/video/story-achievement.mp4",
    poster: "/images/testimonials/student-3.webp"
  }
];

export default function StoryTestimonials() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoadVideos, setShouldLoadVideos] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || shouldLoadVideos) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        setShouldLoadVideos(true);
        observer.disconnect();
      },
      {
        rootMargin: "420px 0px"
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [shouldLoadVideos]);

  const moveStories = (direction: -1 | 1) => {
    const track = trackRef.current;
    const firstCard = track?.querySelector<HTMLElement>(".story-card");

    if (!track || !firstCard) return;

    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 18;
    track.scrollBy({
      left: direction * (firstCard.offsetWidth + gap),
      behavior: "smooth"
    });
  };

  return (
    <section className="story-testimonials" aria-labelledby="student-stories-title" ref={sectionRef}>
      <div className="story-testimonials-header">
        <div>
          <p className="eyebrow">Student Stories</p>
          <h2 id="student-stories-title">Real journeys.<br /><span>Clearer next steps.</span></h2>
        </div>
      </div>
      <div className="story-carousel-shell">
        <button
          className="story-carousel-button previous"
          type="button"
          aria-label="Previous student story"
          onClick={() => moveStories(-1)}
        >
          <ChevronLeft size={20} />
        </button>
        <div className="story-card-grid" ref={trackRef}>
          {studentStories.map((story) => (
            <article className="story-card" key={story.label}>
              <video
                autoPlay={shouldLoadVideos}
                loop
                muted
                playsInline
                poster={story.poster}
                preload={shouldLoadVideos ? "metadata" : "none"}
              >
                {shouldLoadVideos ? <source src={story.video} type="video/mp4" /> : null}
              </video>
              <div className="story-card-overlay">
                <span>{story.label}</span>
                <p>&ldquo;{story.quote}&rdquo;</p>
                <small>{story.student}</small>
              </div>
            </article>
          ))}
        </div>
        <button
          className="story-carousel-button next"
          type="button"
          aria-label="Next student story"
          onClick={() => moveStories(1)}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
