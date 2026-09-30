export type BlogSection = {
  heading: string;
  body: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  readingTime: string;
  heroImage: string;
  takeaway: string;
  sections: BlogSection[];
  checklist?: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-build-a-study-abroad-shortlist",
    title: "How to build a study abroad shortlist that actually fits you",
    description:
      "A practical way to compare countries, universities and courses before you start applying abroad.",
    category: "University shortlisting",
    publishedAt: "2026-09-30",
    readingTime: "5 min read",
    heroImage: "/images/generated-destinations-landmarks-v2.webp",
    takeaway:
      "A good shortlist is not a long list of popular names. It is a small, defendable set of options that match your academics, budget, intake, documents and next-step plans.",
    sections: [
      {
        heading: "Start with your profile",
        body: [
          "Before choosing a country or university, write down your current qualification, grades, English test status, preferred subject area, budget range and target intake.",
          "This gives your advisor a clear starting point. It also prevents the shortlist from being shaped only by trends or one friend’s decision."
        ]
      },
      {
        heading: "Compare the course, not only the university name",
        body: [
          "A course can look similar across institutions but differ in modules, assessment style, placement options, location and progression routes.",
          "Look for a course that connects with your academic background and the kind of work you want to prepare for."
        ]
      },
      {
        heading: "Check the practical requirements early",
        body: [
          "Entry requirements, English language conditions, financial documents, application deadlines and visa timelines can change how realistic an option is.",
          "If two choices look equal, the one with a clearer document path may be the stronger first application."
        ]
      },
      {
        heading: "Keep room for advisor review",
        body: [
          "Your first shortlist should be flexible. An advisor can help compare priority institutions with wider options after reviewing your course goals, budget and intake timing.",
          "That review is where a list becomes an application plan."
        ]
      }
    ],
    checklist: [
      "Academic background and grades",
      "Preferred course area",
      "Budget range",
      "Target intake",
      "English test status",
      "Country preference",
      "Document readiness"
    ]
  },
  {
    slug: "study-abroad-application-documents-checklist",
    title: "Study abroad application documents: what to prepare first",
    description:
      "A clear document checklist for students preparing university applications and early visa planning.",
    category: "Applications",
    publishedAt: "2026-09-30",
    readingTime: "5 min read",
    heroImage: "/images/contact/contact-desk.webp",
    takeaway:
      "The best time to organize documents is before you rush an application. Clear files make course selection, application review and visa preparation much easier.",
    sections: [
      {
        heading: "Keep academic records ready",
        body: [
          "Collect your transcripts, certificates and grading information in one folder. Use clear file names so every document can be checked quickly.",
          "If a result is pending, note when it is expected. That helps your advisor decide which intake and institutions are realistic."
        ]
      },
      {
        heading: "Prepare identity and English evidence",
        body: [
          "Keep a valid passport copy ready. If you have taken an English language test, store the score report with your academic records.",
          "If your test is still pending, your application plan should include the likely test date and result timeline."
        ]
      },
      {
        heading: "Draft your statement with a real purpose",
        body: [
          "A statement of purpose should explain why the course makes sense for your background and goals. It should not read like a copied template.",
          "Start with bullet points about your studies, projects, work experience, course reason and future plan. The final draft can be shaped from there."
        ]
      },
      {
        heading: "Separate application files from visa files",
        body: [
          "Application documents and visa documents overlap, but they are not always the same. Keep separate folders so financial and travel documents do not get mixed into course applications too early.",
          "Your advisor can help you understand what belongs at each stage."
        ]
      }
    ],
    checklist: [
      "Passport copy",
      "Academic transcripts",
      "Certificates",
      "English test report or plan",
      "CV or resume",
      "Statement of purpose notes",
      "Reference details where required",
      "Financial document plan"
    ]
  },
  {
    slug: "compare-study-destinations-before-applying",
    title: "How to compare study destinations before you apply",
    description:
      "A practical guide to comparing country options by course fit, cost, documents, visa path and arrival planning.",
    category: "Study destinations",
    publishedAt: "2026-09-30",
    readingTime: "6 min read",
    heroImage: "/images/generated-destinations-landmarks-v2.webp",
    takeaway:
      "A destination should fit your course, budget, timeline and document readiness. Popularity alone is not a plan.",
    sections: [
      {
        heading: "Course availability comes first",
        body: [
          "Start by checking whether the destination has courses that match your subject, qualification level and intake timing.",
          "A country may be attractive, but if the course options are weak for your profile, it should not lead your shortlist."
        ]
      },
      {
        heading: "Compare total planning pressure",
        body: [
          "Students often compare tuition fees but forget deadlines, deposits, living costs, document timelines and visa preparation.",
          "A destination with a slightly higher fee may still be practical if the application and document path is clearer for your case."
        ]
      },
      {
        heading: "Think about arrival, not only admission",
        body: [
          "Accommodation, travel timing, local support and pre-departure preparation matter because the work continues after an offer letter.",
          "Ask what you will need to arrange before flying and what must be handled after arrival."
        ]
      },
      {
        heading: "Review destination choices with evidence",
        body: [
          "Use your grades, budget, target course and document readiness as evidence. This keeps the decision practical.",
          "AE Global Group can compare priority destinations with wider options once your profile is clear."
        ]
      }
    ],
    checklist: [
      "Course match",
      "Entry requirements",
      "Tuition and living budget",
      "Application deadline",
      "Visa document path",
      "Accommodation planning",
      "Pre-departure support"
    ]
  },
  {
    slug: "visa-preparation-starts-before-the-offer",
    title: "Why visa preparation starts before the offer letter",
    description:
      "What students should organize early so the visa stage does not become rushed after admission.",
    category: "Visa guidance",
    publishedAt: "2026-09-30",
    readingTime: "4 min read",
    heroImage: "/images/generated-support-mountains.webp",
    takeaway:
      "Visa preparation is easier when documents, timelines and finances are discussed before the offer letter arrives.",
    sections: [
      {
        heading: "The offer letter is not the start of planning",
        body: [
          "Many students wait for an offer before thinking about visa documents. That can make the next stage feel rushed.",
          "A better approach is to understand likely requirements while the application is still being prepared."
        ]
      },
      {
        heading: "Keep your financial plan realistic",
        body: [
          "Financial documents need time, accuracy and consistency. Even before exact visa steps are confirmed, you can discuss what kind of financial preparation may be needed.",
          "Do not guess or copy another student’s file. Your situation should be reviewed separately."
        ]
      },
      {
        heading: "Track deadlines in one place",
        body: [
          "Application deadlines, payment dates, document collection, visa appointments and travel plans should sit in one timeline.",
          "This helps you see what must happen next instead of reacting late."
        ]
      },
      {
        heading: "Use guidance for your own case",
        body: [
          "Visa steps depend on destination, course, documents and personal background. General checklists are useful, but they cannot replace a case review.",
          "AE Global Group helps students organize the preparation so the next step is clearer."
        ]
      }
    ],
    checklist: [
      "Passport validity",
      "Offer and course details",
      "Financial document planning",
      "Academic records",
      "English evidence where required",
      "Visa timeline",
      "Travel and accommodation plan"
    ]
  }
];

export const getBlogPost = (slug: string) => blogPosts.find((post) => post.slug === slug);
