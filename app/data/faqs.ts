export type FAQItem = {
  question: string;
  answer: string;
};

export type FAQCategory = {
  title: string;
  eyebrow: string;
  description: string;
  items: FAQItem[];
};

export const faqCategories: FAQCategory[] = [
  {
    title: "Getting started",
    eyebrow: "First steps",
    description: "Basic questions students usually ask before they start comparing options.",
    items: [
      {
        question: "What does AE Global Group help students with?",
        answer:
          "AE Global Group helps students compare study destinations, shortlist universities and courses, prepare applications, understand visa preparation steps, plan accommodation and organize pre-departure basics."
      },
      {
        question: "When should I start planning my study abroad application?",
        answer:
          "Start as early as possible, especially if you need time for course research, documents, English tests, financial planning or visa preparation. A clear shortlist and document plan usually make the process easier."
      },
      {
        question: "Can I speak with someone before choosing a country?",
        answer:
          "Yes. You can speak with the team before choosing a country. The first step is usually to understand your academic background, budget, preferred intake, course interest and long-term goals."
      }
    ]
  },
  {
    title: "Destinations and universities",
    eyebrow: "Shortlisting",
    description: "Questions about choosing a country, university or pathway provider.",
    items: [
      {
        question: "Which countries can I compare?",
        answer:
          "You can compare destinations such as the United Kingdom, Dubai and UAE, Malta, Spain, France, Poland and other study destinations shown on the website. The team can also discuss wider options based on your profile."
      },
      {
        question: "Are the universities shown on the website the full list?",
        answer:
          "No. The website shows priority universities, colleges and pathway providers. AE Global Group can compare these with many more options after reviewing your course, budget, intake and academic profile."
      },
      {
        question: "How do you help me choose the right university?",
        answer:
          "The team compares course fit, entry requirements, fees, intake timing, location, visa pathway and career direction. The goal is to create a shortlist that makes sense for your situation."
      }
    ]
  },
  {
    title: "Applications and documents",
    eyebrow: "Application support",
    description: "Questions about application forms, deadlines and required documents.",
    items: [
      {
        question: "What documents should I prepare first?",
        answer:
          "Common starting documents include academic transcripts, certificates, passport, CV, English test details if available, recommendation letters if required and a draft statement of purpose for relevant applications."
      },
      {
        question: "Can AE Global Group help with application forms and timelines?",
        answer:
          "Yes. The team helps students understand application requirements, organize forms, prepare supporting documents and keep track of intake timelines."
      },
      {
        question: "Do I need to know my exact course before contacting you?",
        answer:
          "No. You can contact the team with a broad interest area. The advisor can help you compare course options and narrow your choices before applications begin."
      }
    ]
  },
  {
    title: "Visa, accommodation and departure",
    eyebrow: "After shortlisting",
    description: "Questions about what happens after course and university planning.",
    items: [
      {
        question: "Do you guarantee visa approval?",
        answer:
          "No. AE Global Group can guide students through visa preparation, document organization and practical next steps, but no advisor can guarantee a visa outcome."
      },
      {
        question: "When should I start visa preparation?",
        answer:
          "Visa preparation should start before the final stage. Understanding financial documents, timelines and country-specific requirements early helps reduce last-minute pressure."
      },
      {
        question: "Can you help with accommodation and pre-departure planning?",
        answer:
          "Yes. AE Global Group supports students with practical accommodation and pre-departure planning, including travel basics, arrival preparation and settling-in guidance."
      }
    ]
  },
  {
    title: "Contact and next steps",
    eyebrow: "Talk to us",
    description: "How to reach the team and what to expect next.",
    items: [
      {
        question: "How can I contact AE Global Group?",
        answer:
          "You can contact AE Global Group by phone, email or the enquiry form on the website. The contact page lists phone numbers, email, opening hours and office locations."
      },
      {
        question: "What happens after I submit an enquiry?",
        answer:
          "The team reviews your details and gets in touch to understand your study plans, preferred destination, course interest, intake and current stage."
      },
      {
        question: "What if my question is not listed here?",
        answer:
          "Use Mimi, the AE Global Group chat assistant, to ask a quick study abroad question. For personal planning, share your details through the enquiry form so the team can follow up."
      }
    ]
  }
];

export const faqItems = faqCategories.flatMap((category) => category.items);
