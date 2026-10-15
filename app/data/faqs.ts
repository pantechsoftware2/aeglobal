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
          "Start early enough to compare courses, check each institution's published deadlines, prepare documents and plan your budget. Timelines differ by country, institution, course and intake, so there is no single deadline that applies to every student."
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
          "The Study Destinations page shows the countries currently covered by this website. The suitable options depend on your course, academic profile, budget, preferred intake and current admission and immigration requirements."
      },
      {
        question: "Are the universities shown on the website the full list?",
        answer:
          "No. The website presents selected universities, colleges and pathway providers for comparison. Course availability, intakes and institutional relationships can change, so confirm the current options with the team and the institution before applying or paying a deposit."
      },
      {
        question: "How do you help me choose the right university?",
        answer:
          "The team can compare course content, published entry requirements, tuition, intake timing, location and your academic and budget profile. The university makes the admission decision, and immigration requirements must be checked separately with the relevant government authority."
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
          "A practical starting set is your passport, academic transcripts and certificates, current CV and any available English-language test results. Statements, references, portfolios, financial evidence and other documents are course- and institution-specific, so prepare them only after checking the published requirements."
      },
      {
        question: "Can AE Global Group help with application forms and timelines?",
        answer:
          "Yes. The team can help you interpret published application requirements, organise forms and supporting documents, and plan around known intake deadlines. You remain responsible for providing complete and truthful information and approving the final submission."
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
          "No. AE Global Group can help you understand published requirements and organise your preparation, but only the relevant government authority decides a visa or study-permit application. No education advisor can guarantee approval."
      },
      {
        question: "When should I start visa preparation?",
        answer:
          "Review the official immigration guidance for your destination early, then build the application timeline around your offer, required documents, financial evidence and permitted application window. Requirements and processing times can change, so recheck the official government website before applying."
      },
      {
        question: "Can you help with accommodation and pre-departure planning?",
        answer:
          "AE Global Group can provide practical guidance on accommodation research, travel preparation and arrival planning. Housing remains subject to availability, price and the provider's terms, so students should verify the property and contract before making a payment."
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
          "The team uses the information you provide to understand your study plans, destination and course interests, intended intake and current stage, then follows up using the contact details in your enquiry."
      },
      {
        question: "What if my question is not listed here?",
        answer:
          "Mimi can help you find general information from the website. It does not replace official university or immigration guidance. For advice based on your personal documents or circumstances, submit an enquiry for the team to review."
      }
    ]
  }
];

export const faqItems = faqCategories.flatMap((category) => category.items);
