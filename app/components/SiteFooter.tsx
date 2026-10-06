import Image from "next/image";
import Link from "next/link";

const footerGroups = [
  ["Explore", "Destination Guide", "University Guidance", "Course Guidance", "Scholarship Guidance", "Student Services"],
  ["Students", "Application Support", "Visa Guidance", "Accommodation", "Pre-Departure", "Counseling"],
  ["Company", "Contact AE Global", "Careers", "Partners"],
  ["Resources", "Website Sitemap", "Blog", "Study Guides", "FAQs", "News & Updates"]
];

const getFooterLink = (link: string) => {
  if (link === "Contact AE Global") return "/contact";
  if (link === "Website Sitemap") return "/sitemap";
  if (link === "Blog") return "/blog";
  if (link === "FAQs") return "/faq";
  if (link === "Destination Guide") return "/study-destinations";
  if (link === "University Guidance") return "/universities";
  if (link === "Course Guidance") return "/courses";
  if (link === "Scholarship Guidance") return "/scholarships";
  if (link === "Student Services") return "/services";
  if (link === "Application Support") return "/services";
  if (link === "Visa Guidance") return "/services";
  if (link === "Accommodation") return "/services";
  if (link === "Pre-Departure") return "/services";
  if (link === "Counseling") return "/services";
  return "#";
};

export default function SiteFooter() {
  return (
    <footer className="footer" id="about">
      <div className="footer-brand">
        <Link className="brand" href="/" aria-label="AE Global Group home">
          <Image src="/brand/mark.png" alt="AE Global Group logo" width={58} height={52} />
          <span>AE Global Group website</span>
        </Link>
        <p>Study abroad counseling for students who want clear options, careful preparation and no guesswork.</p>
      </div>
      <div className="footer-credential" aria-label="ICEF Agency Status credential">
        <Image
          src="/badge/icef-ias-7314-badge.png"
          alt="ICEF Agency Status badge"
          width={650}
          height={762}
        />
      </div>
      <div className="footer-links">
        {footerGroups.map(([title, ...links]) => (
          <div key={title}>
            <h3>{title}</h3>
            {links.map((link) => (
              <Link href={getFooterLink(link)} key={link}>{link}</Link>
            ))}
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <span>© 2026 AE Global Group. All rights reserved.</span>
        <span>
          <Link href="/sitemap">HTML sitemap</Link>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Link href="/privacy-policy">Privacy Policy</Link>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
        </span>
      </div>
    </footer>
  );
}
