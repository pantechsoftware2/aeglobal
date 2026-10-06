import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileCheck2, GraduationCap, Mail, Scale } from "lucide-react";
import SiteHeader from "../components/SiteHeader";
import { brandName, contactPoints, defaultOpenGraph } from "../lib/seo";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Read the terms for using the AE Global Group website and study abroad counselling, application and student support services.",
  alternates: {
    canonical: "/terms-and-conditions"
  },
  openGraph: {
    ...defaultOpenGraph,
    title: `Terms and Conditions | ${brandName}`,
    description:
      "Terms for using the AE Global Group website and study abroad counselling services.",
    url: "/terms-and-conditions"
  },
  twitter: {
    card: "summary_large_image",
    title: `Terms and Conditions | ${brandName}`,
    description:
      "Terms for using the AE Global Group website and study abroad counselling services.",
    images: ["/images/generated-destinations-landmarks-v2.webp"]
  }
};

const effectiveDate = "6 October 2026";

const sections = [
  {
    title: "Acceptance of These Terms",
    body: [
      `By accessing this website, submitting an enquiry, using our chat assistant, communicating with our team or engaging ${brandName} for study abroad guidance, you agree to these Terms and Conditions.`,
      "If you do not agree with these terms, please do not use the website or request services through it. Additional written agreements, invoices, partner forms or application terms may apply to specific services."
    ]
  },
  {
    title: "Our Services",
    body: [
      "AE Global Group provides study abroad counselling and related support, which may include destination comparison, university or course shortlisting, application guidance, document review, statement of purpose support, scholarship guidance, visa preparation support, accommodation guidance and pre-departure planning.",
      "The exact scope of support depends on your profile, destination, institution, course, intake, document readiness and the service arrangement agreed with our team."
    ]
  },
  {
    title: "No Admission, Scholarship or Visa Guarantee",
    body: [
      "We provide guidance and support, but we do not guarantee admission, scholarship approval, visa approval, accommodation availability, employment, post-study work outcomes or any decision made by a university, college, embassy, immigration authority, scholarship body, accommodation provider or other third party.",
      "Final decisions are made by the relevant institution, authority or provider. Requirements, deadlines, fees, visa rules, course availability and scholarship conditions can change without notice."
    ]
  },
  {
    title: "Your Responsibilities",
    body: [
      "You are responsible for providing accurate, complete and authentic information and documents. You must review forms, applications, statements, payment details and submissions before approval or submission.",
      "You are responsible for meeting deadlines, attending appointments, checking official institution or government requirements, maintaining valid identity documents and informing us promptly of any change in your circumstances.",
      "You must not submit false documents, misleading information, plagiarised statements, fraudulent financial evidence or any content that violates applicable law or third-party rules."
    ]
  },
  {
    title: "Information on This Website",
    body: [
      "The content on this website is for general study abroad guidance. It is not legal, immigration, financial, tax or academic advice. You should verify official requirements with the relevant institution, authority or qualified professional before making decisions.",
      "We aim to keep information clear and practical, but we do not promise that all website content is complete, current or applicable to every student profile."
    ]
  },
  {
    title: "Applications and Third-Party Providers",
    body: [
      "When you choose to apply to an institution or use a third-party provider, you may also be subject to that party's terms, privacy notices, payment rules, refund policies, admission conditions and deadlines.",
      "AE Global Group is not responsible for the acts, omissions, delays, decisions, platform issues, policy changes or service terms of universities, colleges, pathway providers, payment processors, testing bodies, accommodation providers, visa centres, embassies or other third parties."
    ]
  },
  {
    title: "Fees, Payments and Refunds",
    body: [
      "Any service fee, consultation fee, processing fee or package fee will be communicated before payment. Third-party fees such as university application fees, tuition deposits, courier fees, exam fees, visa fees, health insurance, accommodation deposits or government charges are separate unless expressly stated.",
      "Refund eligibility depends on the specific service, stage of work completed, third-party rules and any written terms agreed at the time of payment. Fees paid to third parties are usually controlled by those third parties and may be non-refundable.",
      "Payment of a fee does not guarantee admission, scholarship, visa approval or any third-party outcome."
    ]
  },
  {
    title: "Website Use",
    body: [
      "You may use this website for lawful personal study planning and enquiry purposes only. You must not attempt to disrupt the website, scrape or misuse content, interfere with security, upload harmful code, impersonate another person or submit abusive, false or unlawful material.",
      "We may restrict or refuse service if we reasonably believe the website or our services are being misused."
    ]
  },
  {
    title: "Intellectual Property",
    body: [
      "Website content, branding, page designs, text, graphics, layouts, icons, images and other materials are owned by or licensed to AE Global Group unless otherwise stated.",
      "You may view and use website content for personal study planning. You may not copy, reproduce, modify, distribute, publish or commercially exploit website content without written permission."
    ]
  },
  {
    title: "Communication",
    body: [
      "By submitting an enquiry or contacting us, you agree that AE Global Group may contact you by phone, email, messaging apps, chat, forms or other reasonable channels about your enquiry, counselling, applications, documents, appointments and related services.",
      "You should keep your contact details up to date and check messages regularly during active counselling or application work."
    ]
  },
  {
    title: "Limitation of Liability",
    body: [
      "To the maximum extent permitted by applicable law, AE Global Group will not be liable for indirect, incidental, consequential or special losses, including lost opportunities, missed intakes, rejected applications, visa refusals, third-party delays, changed requirements or decisions outside our control.",
      "Our responsibility is limited to providing the agreed support with reasonable care. Nothing in these terms excludes liability that cannot be excluded under applicable law."
    ]
  },
  {
    title: "Privacy",
    body: [
      "Our use of personal information is explained in our Privacy Policy. By using the website or requesting services, you acknowledge that we may collect, use and share information as described there and as required for requested student support."
    ]
  },
  {
    title: "Changes to These Terms",
    body: [
      "We may update these Terms and Conditions from time to time. The updated terms will be posted on this page with a revised effective date. Continued use of the website or services after changes means you accept the updated terms."
    ]
  }
];

export default function TermsAndConditionsPage() {
  return (
    <div className="legal-page">
      <SiteHeader />
      <main>
        <section className="legal-hero">
          <p className="eyebrow">Terms and Conditions</p>
          <h1>Clear terms for<br /><span>study abroad support.</span></h1>
          <p>
            These terms explain how you may use this website and how AE Global Group provides
            study abroad counselling, application guidance and related student support.
          </p>
          <div className="legal-meta">
            <span><Scale size={17} aria-hidden="true" /> Effective {effectiveDate}</span>
            <span><GraduationCap size={17} aria-hidden="true" /> Counselling and application support</span>
          </div>
        </section>

        <section className="legal-layout">
          <aside className="legal-summary" aria-label="Terms summary">
            <FileCheck2 size={25} aria-hidden="true" />
            <h2>Important point</h2>
            <p>
              We help students prepare and make informed choices. Admissions, scholarships, visas and
              other third-party decisions are made by the relevant institutions and authorities.
            </p>
            <Link className="text-link" href="/privacy-policy">
              Read the Privacy Policy <ArrowRight size={15} aria-hidden="true" />
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
              <h2>Contact</h2>
              <p>
                Questions about these Terms and Conditions can be sent to{" "}
                <a href={`mailto:${contactPoints.email}`}>{contactPoints.email}</a>.
              </p>
              <p className="legal-note">
                These terms are written for general website and service use. A separate written agreement,
                invoice, university form, partner form or payment confirmation may add specific terms for a
                particular service or application.
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
