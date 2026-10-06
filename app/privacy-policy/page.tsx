import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText, Lock, Mail, ShieldCheck } from "lucide-react";
import SiteHeader from "../components/SiteHeader";
import { brandName, contactPoints, defaultOpenGraph, offices } from "../lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read how AE Global Group collects, uses, protects and shares student enquiry, application and counselling information.",
  alternates: {
    canonical: "/privacy-policy"
  },
  openGraph: {
    ...defaultOpenGraph,
    title: `Privacy Policy | ${brandName}`,
    description:
      "How AE Global Group handles student enquiry, application and counselling information.",
    url: "/privacy-policy"
  },
  twitter: {
    card: "summary_large_image",
    title: `Privacy Policy | ${brandName}`,
    description:
      "How AE Global Group handles student enquiry, application and counselling information.",
    images: ["/images/generated-destinations-landmarks-v2.webp"]
  }
};

const effectiveDate = "6 October 2026";

const sections = [
  {
    title: "Information We Collect",
    body: [
      "We may collect your name, phone number, email address, country of residence, preferred study destination, preferred course, academic background, budget range, target intake and other details you choose to share through our website forms, chat assistant, calls, messages or office interactions.",
      "If you ask us to assess study options or assist with applications, we may also collect academic records, passport details, English test information, CVs, statements of purpose, reference details, financial planning information and other application or visa-related documents that you provide voluntarily.",
      "We may collect basic technical information such as device type, browser, pages visited, approximate location, referral source and interaction data to understand website performance and improve the student experience."
    ]
  },
  {
    title: "How We Use Your Information",
    body: [
      "We use your information to respond to enquiries, understand your study goals, compare destinations, shortlist universities or courses, guide application preparation, arrange counselling follow-ups, support visa and pre-departure planning, and maintain service records.",
      "We may use contact details to send requested information, reminders, application updates, document checklists, meeting details or relevant service messages. We may also send occasional guidance or updates, and you can ask us to stop non-essential communications.",
      "We use website and service data to improve our content, forms, chat support, student workflows, internal training, security and quality control."
    ]
  },
  {
    title: "Sharing With Universities, Partners and Service Providers",
    body: [
      "When required for counselling, application or student support, we may share relevant information with universities, colleges, pathway providers, scholarship bodies, accommodation providers, application platforms, visa-related support providers or other education partners involved in your requested process.",
      "We share only what is reasonably needed for the relevant step. For example, an institution may need academic documents and identity information to assess eligibility, while an accommodation provider may need contact and arrival details.",
      "We may also use trusted technology, hosting, communication, analytics, payment, document management or professional service providers to operate our website and business. These providers are expected to handle information responsibly and only for the services they provide to us."
    ]
  },
  {
    title: "Student Documents and Sensitive Information",
    body: [
      "Student documents may contain sensitive personal, academic, financial or identity information. Please share documents only through channels requested by our team and avoid sending unnecessary information.",
      "We use student documents for the purpose for which they are provided, such as profile review, course matching, application preparation, visa planning or related student support. We do not sell student documents.",
      "You are responsible for ensuring that documents and information you provide are accurate, authentic and up to date. False, incomplete or misleading information may affect applications, visa outcomes and service support."
    ]
  },
  {
    title: "Cookies, Analytics and Website Tools",
    body: [
      "Our website may use cookies or similar technologies to help pages work correctly, remember preferences, measure traffic, understand page performance and improve user experience.",
      "Analytics tools may collect aggregated or pseudonymous information about how visitors use the website. You can control many cookies through your browser settings, but disabling them may affect some website features."
    ]
  },
  {
    title: "Data Retention",
    body: [
      "We keep information for as long as reasonably required to respond to enquiries, provide requested services, maintain application records, meet legal or accounting requirements, resolve disputes, prevent misuse and support legitimate business operations.",
      "If you do not proceed with services, we may still retain limited enquiry records for follow-up, audit, fraud prevention and service improvement unless you request deletion and we are not required to keep them."
    ]
  },
  {
    title: "Security",
    body: [
      "We use reasonable administrative, technical and organisational measures to protect personal information. However, no website, email, messaging channel or internet transmission is completely secure.",
      "Please keep your own email, messaging accounts and devices secure. Tell us promptly if you believe information shared with us has been accessed or sent incorrectly."
    ]
  },
  {
    title: "International Transfers",
    body: [
      "AE Global Group supports students across multiple countries and may work with institutions or providers in destinations such as the United Kingdom, United Arab Emirates, Malta, Spain, France, Poland, Australia, Canada, Malaysia, Ireland, Germany, New Zealand, the United States and other study routes listed on this website.",
      "This means your information may be processed or shared across borders where necessary for your enquiry, application, counselling or support request."
    ]
  },
  {
    title: "Your Choices and Rights",
    body: [
      "You may ask us to update, correct or delete your personal information, subject to reasonable verification and any legal, contractual or operational need to retain certain records.",
      "You may ask us to stop non-essential marketing messages. We may still contact you about active enquiries, applications, appointments, document requests or service matters.",
      "If you want to withdraw from an application or support process, contact us as soon as possible. Some third-party submissions or institutional records may not be reversible once sent."
    ]
  },
  {
    title: "Children and Minors",
    body: [
      "Our services are intended for students and families seeking study abroad guidance. If a student is a minor, a parent or lawful guardian should be involved before personal documents, payment information or application instructions are shared."
    ]
  },
  {
    title: "Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time to reflect changes in our services, website, legal requirements or operational practices. The updated version will be posted on this page with a revised effective date."
    ]
  }
];

export default function PrivacyPolicyPage() {
  return (
    <div className="legal-page">
      <SiteHeader />
      <main>
        <section className="legal-hero">
          <p className="eyebrow">Privacy Policy</p>
          <h1>How we handle<br /><span>student information.</span></h1>
          <p>
            This Privacy Policy explains how {brandName} collects, uses, shares and protects information
            when you use this website or contact us for study abroad guidance.
          </p>
          <div className="legal-meta">
            <span><ShieldCheck size={17} aria-hidden="true" /> Effective {effectiveDate}</span>
            <span><Lock size={17} aria-hidden="true" /> Student data and documents</span>
          </div>
        </section>

        <section className="legal-layout">
          <aside className="legal-summary" aria-label="Privacy policy summary">
            <FileText size={25} aria-hidden="true" />
            <h2>In short</h2>
            <p>
              We use your information to answer enquiries, guide study planning, support applications
              and coordinate requested student services. We share information with education partners
              only when needed for your chosen process.
            </p>
            <Link className="text-link" href="/contact">
              Contact us about privacy <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </aside>

          <div className="legal-content">
            {sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}

            <section>
              <h2>Contact Us</h2>
              <p>
                For privacy questions, correction requests or data-related concerns, contact us at{" "}
                <a href={`mailto:${contactPoints.email}`}>{contactPoints.email}</a>.
              </p>
              <p>
                You may also contact AE Global Group through our offices, including {offices.map((office) => office.name).join(", ")}.
              </p>
              <p className="legal-note">
                This policy is intended to explain our privacy practices for this website and related student services.
                It does not replace any privacy notice or consent form provided by a university, pathway provider,
                platform, accommodation provider or other third party.
              </p>
              <p className="legal-contact-line">
                <Mail size={16} aria-hidden="true" /> <a href={`mailto:${contactPoints.email}`}>{contactPoints.email}</a>
              </p>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}
