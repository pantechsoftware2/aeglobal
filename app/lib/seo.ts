import type { Metadata } from "next";

export const siteUrl = "https://aeglobal.study";

export const brandName = "AE Global Group";

export const defaultDescription =
  "Study abroad counseling for students who want clear options, careful preparation and no guesswork.";

export const socialProfiles = [
  "https://www.facebook.com/abroadeduversity/",
  "https://www.instagram.com/abroad_eduversity/",
  "https://www.youtube.com/@Abroad_Eduversity",
  "https://www.linkedin.com/company/abroad-eduversity"
];

export const contactPoints = {
  phone: ["+919831216414", "+913348095556"],
  email: "contact@abroadedus.com",
  hours: ["Mo-Fr 09:00-20:00", "Sa-Su 10:30-22:00"]
};

export const offices = [
  {
    name: "California, USA",
    streetAddress: "1228 Hibiscus Way",
    addressLocality: "Livermore",
    addressRegion: "CA",
    postalCode: "94551",
    addressCountry: "US"
  },
  {
    name: "Kolkata, India",
    streetAddress: "16, Strand Road, Diamond Heritage, 1st Floor, Suite No. 201E",
    addressLocality: "Kolkata",
    postalCode: "700001",
    addressCountry: "IN"
  },
  {
    name: "Dhaka, Bangladesh",
    streetAddress: "257, Lalkuthi Bazar, Mazer road, Mirpur 1",
    addressLocality: "Dhaka",
    addressCountry: "BD"
  }
];

export const toAbsoluteUrl = (path = "/") => {
  if (path.startsWith("http")) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
};

export const defaultOpenGraph: Metadata["openGraph"] = {
  type: "website",
  siteName: brandName,
  locale: "en_US",
  images: [
    {
      url: toAbsoluteUrl("/images/generated-destinations-landmarks-v2.webp"),
      width: 1200,
      height: 630,
      alt: "AE Global Group study abroad destinations"
    }
  ]
};

export const jsonLd = (data: Record<string, unknown> | Record<string, unknown>[]) => ({
  __html: JSON.stringify(data).replace(/</g, "\\u003c")
});

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${siteUrl}/#organization`,
  name: brandName,
  url: siteUrl,
  logo: toAbsoluteUrl("/brand/logo1.png"),
  image: toAbsoluteUrl("/images/generated-destinations-landmarks-v2.webp"),
  description: defaultDescription,
  email: contactPoints.email,
  telephone: contactPoints.phone,
  sameAs: socialProfiles,
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: contactPoints.phone[0],
      email: contactPoints.email,
      contactType: "student enquiry",
      areaServed: ["IN", "BD", "US"],
      availableLanguage: ["en"]
    }
  ],
  address: offices.map((office) => ({
    "@type": "PostalAddress",
    streetAddress: office.streetAddress,
    addressLocality: office.addressLocality,
    addressRegion: office.addressRegion,
    postalCode: office.postalCode,
    addressCountry: office.addressCountry
  }))
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: brandName,
  url: siteUrl,
  publisher: { "@id": `${siteUrl}/#organization` },
  inLanguage: "en"
};
