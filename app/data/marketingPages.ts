import {
  Award,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  ClipboardCheck,
  Compass,
  FileText,
  GraduationCap,
  Landmark,
  Plane,
  SearchCheck,
  ShieldCheck
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { destinations } from "./destinations";

export type MarketingPageKey = "destinations" | "universities" | "courses" | "scholarships" | "services";

export type MarketingPage = {
  key: MarketingPageKey;
  slug: string;
  navLabel: string;
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  heroImage: string;
  heroAlt: string;
  stat: { value: string; label: string };
  intro: {
    eyebrow: string;
    title: string;
    copy: string;
  };
  highlights: Array<{
    title: string;
    copy: string;
    icon: LucideIcon;
  }>;
  steps: Array<{
    title: string;
    copy: string;
  }>;
  feature: {
    eyebrow: string;
    title: string;
    copy: string;
    bullets: string[];
  };
  cards: Array<{
    title: string;
    copy: string;
  }>;
};

const priorityCountries = destinations
  .filter((destination) => destination.institutions.length > 0)
  .map((destination) => destination.label);

export const marketingPages: Record<MarketingPageKey, MarketingPage> = {
  destinations: {
    key: "destinations",
    slug: "study-destinations",
    navLabel: "Study Destinations",
    eyebrow: "Study destinations",
    title: "Choose a country with clarity.",
    accent: "Not pressure.",
    description:
      "Compare destination fit using course availability, budget, intakes, visa path, lifestyle and long-term plans before you commit.",
    heroImage: "/images/pages/study-destinations.webp",
    heroAlt: "Global study destination landmarks",
    stat: { value: `${destinations.length}+`, label: "destinations to compare" },
    intro: {
      eyebrow: "Country comparison",
      title: "The right country is the one that fits your profile.",
      copy:
        "Popular study routes include the UK, Australia, Ireland, New Zealand, Dubai/UAE, Malta, Germany, France and the United States. AE Global Group turns that country list into a clear comparison based on your academics, budget and next step."
    },
    highlights: [
      { title: "Study goals", copy: "Match countries to your subject, level and career direction.", icon: Compass },
      { title: "Budget view", copy: "Compare tuition, living costs and practical financial planning early.", icon: SearchCheck },
      { title: "Visa pathway", copy: "Understand documentation and timelines before the final stage.", icon: ShieldCheck }
    ],
    steps: [
      { title: "Map your profile", copy: "We start with academics, preferred subject, budget and intake." },
      { title: "Compare realistic routes", copy: "You see countries that match your requirements, not just popular trends." },
      { title: "Shortlist next actions", copy: "We turn the comparison into a country and course plan." }
    ],
    feature: {
      eyebrow: "Priority destinations",
      title: "Start with the countries students ask about most.",
      copy:
        "The website already includes priority destination pages and a wider country list. The new destination page gives visitors a stronger overview before they explore individual country pages.",
      bullets: priorityCountries
    },
    cards: [
      { title: "United Kingdom", copy: "Strong route for short postgraduate timelines, city campuses and specialist providers." },
      { title: "Dubai & UAE", copy: "Useful for students who want international study options closer to South Asia." },
      { title: "Europe routes", copy: "France, Spain, Malta and Poland can work well for focused budget and course comparisons." }
    ]
  },
  universities: {
    key: "universities",
    slug: "universities",
    navLabel: "Universities",
    eyebrow: "University guidance",
    title: "Build a shortlist that makes sense.",
    accent: "On paper.",
    description:
      "Review universities, colleges and pathway providers using your academic record, course fit, intake timing, fee range and destination plan.",
    heroImage: "/images/pages/universities.jpg",
    heroAlt: "University campus building with students",
    stat: { value: "Priority", label: "institutions shown first" },
    intro: {
      eyebrow: "Shortlist strategy",
      title: "A good university list is balanced, realistic and personal.",
      copy:
        "Choosing a university works best when the course, institution and student profile are reviewed together. AE Global Group presents that as a practical shortlist process: understand the student first, then compare universities against the profile."
    },
    highlights: [
      { title: "Profile fit", copy: "Compare entry requirements against your academics and documents.", icon: GraduationCap },
      { title: "Institution type", copy: "Review universities, colleges and pathway providers with a clear purpose.", icon: Building2 },
      { title: "Outcome thinking", copy: "Look beyond ranking and check course structure, location and goals.", icon: Landmark }
    ],
    steps: [
      { title: "Profile audit", copy: "We review academics, test scores, subject interest and timeline." },
      { title: "University comparison", copy: "We compare course fit, entry requirements, intakes and fees." },
      { title: "Final shortlist", copy: "You get a focused list with next application actions." }
    ],
    feature: {
      eyebrow: "How we compare",
      title: "The shortlist should explain why each option is there.",
      copy:
        "A professional shortlist is more than a list of names. It should show why each university is worth considering and what the student must prepare next.",
      bullets: ["Course and curriculum fit", "Entry requirements", "Budget and fee range", "Intake availability", "Visa and document path"]
    },
    cards: [
      { title: "Priority partners", copy: "Start with the institutions already shown on the destination pages." },
      { title: "Wider market", copy: "Ask the team to compare many more options once your profile is clear." },
      { title: "Application readiness", copy: "Move from shortlist to forms, documents and timelines with less confusion." }
    ]
  },
  courses: {
    key: "courses",
    slug: "courses",
    navLabel: "Courses",
    eyebrow: "Course planning",
    title: "Pick a course for the life you want.",
    accent: "Not just the title.",
    description:
      "Compare course structure, subject fit, career direction, entry requirements and progression before starting applications.",
    heroImage: "/images/pages/courses.webp",
    heroAlt: "Student planning documents at a desk",
    stat: { value: "Fit", label: "before forms" },
    intro: {
      eyebrow: "Course selection",
      title: "The course choice drives the rest of the application.",
      copy:
        "Course and program selection should sit at the centre of counselling and application preparation. AE Global Group turns that into a course-fit process that checks goals, requirements and practical outcomes."
    },
    highlights: [
      { title: "Subject direction", copy: "Clarify what you want to study and where it can take you.", icon: BookOpen },
      { title: "Entry requirements", copy: "Check grades, English requirements and supporting documents early.", icon: ClipboardCheck },
      { title: "Career link", copy: "Connect course choice with employability and long-term plans.", icon: BriefcaseBusiness }
    ],
    steps: [
      { title: "Understand your background", copy: "We look at your previous studies and strengths." },
      { title: "Compare course routes", copy: "We review related programs, specializations and practical fit." },
      { title: "Prepare for applications", copy: "You know what documents and timelines the course requires." }
    ],
    feature: {
      eyebrow: "Course fit checks",
      title: "Every course should pass a few practical questions.",
      copy:
        "A course may sound attractive, but it needs to fit your profile, budget and timeline. This page gives visitors a clear way to think before they apply.",
      bullets: ["Does the course match your previous study?", "Are the entry requirements realistic?", "Does the intake work?", "Can the budget support it?", "Does it support your career direction?"]
    },
    cards: [
      { title: "Business and management", copy: "Popular with students comparing practical, career-led global programs." },
      { title: "Technology and computing", copy: "Useful for students looking for skill-based routes and industry relevance." },
      { title: "Health, law and specialist routes", copy: "Need early requirement checks because rules vary by country and institution." }
    ]
  },
  scholarships: {
    key: "scholarships",
    slug: "scholarships",
    navLabel: "Scholarships",
    eyebrow: "Scholarship guidance",
    title: "Plan funding early.",
    accent: "Apply stronger.",
    description:
      "Review scholarship possibilities, financial aid routes, budget fit and document timing before relying on funding assumptions.",
    heroImage: "/images/pages/scholarships.webp",
    heroAlt: "Student looking across mountains before a study journey",
    stat: { value: "Early", label: "funding review" },
    intro: {
      eyebrow: "Financial planning",
      title: "Scholarship planning works best before applications are rushed.",
      copy:
        "Financial aid and scholarship support needs careful timing. AE Global Group presents this as a practical review of eligibility, deadlines, documents and realistic funding fit."
    },
    highlights: [
      { title: "Eligibility review", copy: "Check whether your profile matches available scholarship routes.", icon: Award },
      { title: "Budget planning", copy: "Understand tuition, living costs and the remaining funding gap.", icon: SearchCheck },
      { title: "Document timing", copy: "Prepare records, statements and evidence before deadlines arrive.", icon: FileText }
    ],
    steps: [
      { title: "Review the profile", copy: "We check academics, subject, destination and likely eligibility." },
      { title: "Compare funding routes", copy: "We discuss scholarships, aid and budget fit together." },
      { title: "Prepare documents", copy: "You know what evidence and deadlines matter for the plan." }
    ],
    feature: {
      eyebrow: "Funding clarity",
      title: "Scholarships can help, but they need a realistic plan.",
      copy:
        "The goal is to avoid vague promises. Students should understand what can be explored, what is competitive and what they must prepare.",
      bullets: ["Academic merit", "Course or subject route", "Country and university policy", "Application deadlines", "Financial documents"]
    },
    cards: [
      { title: "Merit-based options", copy: "Often depend on academic strength, profile quality and competition." },
      { title: "University aid", copy: "Varies by institution, course level and intake." },
      { title: "Budget safety", copy: "Scholarship planning should sit beside a practical financial plan." }
    ]
  },
  services: {
    key: "services",
    slug: "services",
    navLabel: "Services",
    eyebrow: "Student services",
    title: "Support from first question to departure.",
    accent: "One clear process.",
    description:
      "Get help with career direction, course and university selection, applications, visa preparation, accommodation and pre-departure planning.",
    heroImage: "/images/pages/services.webp",
    heroAlt: "Student support advisor wearing a headset",
    stat: { value: "End-to-end", label: "study abroad support" },
    intro: {
      eyebrow: "What we do",
      title: "The work is easier when every step connects.",
      copy:
        "Student support should connect counselling, course selection, applications, financial aid, pre-departure and post-departure guidance. AE Global Group packages that into one clean journey."
    },
    highlights: [
      { title: "Career counselling", copy: "Clarify goals before choosing country, course or university.", icon: Compass },
      { title: "Application support", copy: "Organize forms, documents, deadlines and university communication.", icon: FileText },
      { title: "Departure planning", copy: "Prepare visa steps, accommodation, travel and arrival basics.", icon: Plane }
    ],
    steps: [
      { title: "Audit", copy: "We understand your goals, academics, budget and timeline." },
      { title: "Shortlist and apply", copy: "We help compare options and prepare the application path." },
      { title: "Prepare to travel", copy: "We support visa preparation, accommodation and departure planning." }
    ],
    feature: {
      eyebrow: "Service areas",
      title: "A connected support system for the whole journey.",
      copy:
        "Each service should remove a specific uncertainty. Students need clear answers, organized documents and practical next steps.",
      bullets: ["Career counselling", "Course and university selection", "Admission application processing", "Scholarship and financial aid review", "Pre-departure orientation", "Post-departure support"]
    },
    cards: [
      { title: "Before applying", copy: "Counselling, destination comparison, course selection and shortlist planning." },
      { title: "During applications", copy: "Documents, forms, statements, deadlines and follow-up steps." },
      { title: "After offers", copy: "Visa preparation, accommodation, travel and arrival guidance." }
    ]
  }
};

export const marketingPageList = Object.values(marketingPages);
