import generatedCourses from "./courses.generated.json";

export type CourseLevel = "Foundation" | "Undergraduate" | "Postgraduate";

export type Course = {
  title: string;
  institution: string;
  country: string;
  location: string;
  level: CourseLevel;
  subject: string;
  sourceUrl: string;
};

type CourseSeed = [title: string, level: CourseLevel, subject: string];

function fromOfficialCatalogue(
  institution: string,
  location: string,
  sourceUrl: string,
  courses: CourseSeed[]
): Course[] {
  return courses.map(([title, level, subject]) => ({
    title,
    institution,
    country: "United Kingdom",
    location,
    level,
    subject,
    sourceUrl
  }));
}

// Course titles and levels were checked against the linked official institution
// catalogues on 14 October 2026. Availability and intakes can change, so the UI
// links students to the primary source instead of presenting the list as an offer.
const curatedCourses: Course[] = [
  ...fromOfficialCatalogue(
    "Arden University",
    "UK study centres and online",
    "https://arden.ac.uk/our-courses",
    [
      ["BSc (Hons) Psychology", "Undergraduate", "Psychology"],
      ["BSc (Hons) Psychology with Foundation Year", "Foundation", "Psychology"],
      ["BSc (Hons) Psychology with Counselling and Mental Health", "Undergraduate", "Psychology"],
      ["BSc (Hons) Psychology with Counselling and Mental Health with Foundation Year", "Foundation", "Psychology"],
      ["MSc Psychology Conversion Degree (BPS)", "Postgraduate", "Psychology"],
      ["MSc Business Psychology", "Postgraduate", "Psychology"],
      ["BA (Hons) Business Management (Applied AI)", "Undergraduate", "Business & Management"],
      ["BSc (Hons) Data Science and AI", "Undergraduate", "Computing & AI"],
      ["BA (Hons) Business Management", "Undergraduate", "Business & Management"],
      ["BA (Hons) Business Management with Foundation Year", "Foundation", "Business & Management"],
      ["MBA", "Postgraduate", "Business & Management"],
      ["Executive MBA", "Postgraduate", "Business & Management"],
      ["Executive MBA (Artificial Intelligence)", "Postgraduate", "Business & Management"],
      ["BSc (Hons) Health and Care Management", "Undergraduate", "Health & Social Care"],
      ["BSc (Hons) Health and Care Management (Top-Up)", "Undergraduate", "Health & Social Care"],
      ["BSc (Hons) Health and Care Management with Foundation Year", "Foundation", "Health & Social Care"],
      ["Level 4 CertHE Health and Care Management", "Undergraduate", "Health & Social Care"],
      ["Level 5 DipHE Health and Care Management", "Undergraduate", "Health & Social Care"],
      ["Master of Public Health", "Postgraduate", "Health & Social Care"],
      ["MSc Global Health Management", "Postgraduate", "Health & Social Care"],
      ["BSc (Hons) Forensic and Criminal Investigation", "Undergraduate", "Law & Criminology"],
      ["BSc (Hons) Policing and Criminal Investigation", "Undergraduate", "Law & Criminology"],
      ["LLB (Hons) Law", "Undergraduate", "Law & Criminology"],
      ["LLB (Hons) Law with Foundation Year", "Foundation", "Law & Criminology"],
      ["LLM in Professional Legal Practice (SQE1 and SQE2)", "Postgraduate", "Law & Criminology"],
      ["BSc (Hons) Computing", "Undergraduate", "Computing & AI"],
      ["MSc Data Science", "Postgraduate", "Computing & AI"],
      ["MSc Cyber Security", "Postgraduate", "Computing & AI"],
      ["BSc (Hons) Computing (Top-Up)", "Undergraduate", "Computing & AI"],
      ["BSc (Hons) Computing with Foundation Year", "Foundation", "Computing & AI"],
      ["BA (Hons) Graphic Design", "Undergraduate", "Design & Media"],
      ["BSc (Hons) Accounting and Finance", "Undergraduate", "Finance & Accounting"],
      ["BSc (Hons) Accounting and Finance with Foundation Year", "Foundation", "Finance & Accounting"],
      ["BSc (Hons) Project Management", "Undergraduate", "Business & Management"],
      ["BSc (Hons) Project Management with Foundation Year", "Foundation", "Business & Management"],
      ["MSc Project Management", "Postgraduate", "Business & Management"],
      ["MSc Strategic Human Resource Management", "Postgraduate", "Business & Management"],
      ["BA (Hons) Criminology", "Undergraduate", "Law & Criminology"],
      ["BA (Hons) Criminology with Cybercrime", "Undergraduate", "Law & Criminology"],
      ["BA (Hons) Criminology and Psychology", "Undergraduate", "Law & Criminology"],
      ["BA (Hons) Criminology with Law", "Undergraduate", "Law & Criminology"],
      ["BSc (Hons) International Hospitality and Tourism Management", "Undergraduate", "Hospitality & Tourism"],
      ["BSc (Hons) International Hospitality and Tourism Management with Foundation Year", "Foundation", "Hospitality & Tourism"],
      ["BA (Hons) Business Management and Computing", "Undergraduate", "Business & Management"],
      ["BA (Hons) Business Management and Law", "Undergraduate", "Business & Management"],
      ["BA (Hons) Business Management (Accounting & Finance)", "Undergraduate", "Finance & Accounting"],
      ["BA (Hons) Business Management (Marketing)", "Undergraduate", "Marketing"],
      ["BA (Hons) Business Management (Human Resource Management)", "Undergraduate", "Business & Management"],
      ["MSc Supply Chain Management and Logistics", "Postgraduate", "Supply Chain & Logistics"],
      ["MSc Engineering Management", "Postgraduate", "Engineering"],
    ]
  ),
  ...fromOfficialCatalogue(
    "Coventry University",
    "Coventry and London",
    "https://www.coventry.ac.uk/study-at-coventry/postgraduate-study/az-course-list/",
    [
      ["Accounting and Financial Management MSc", "Postgraduate", "Finance & Accounting"],
      ["Advertising and Brand Management MA", "Postgraduate", "Marketing"],
      ["Applied Innovation Leadership MA", "Postgraduate", "Business & Management"],
      ["Automotive Journalism MA", "Postgraduate", "Design & Media"],
      ["Banking and Finance MSc", "Postgraduate", "Finance & Accounting"],
      ["Business Analytics MSc", "Postgraduate", "Business & Management"],
      ["Business and Organisational Psychology MSc", "Postgraduate", "Psychology"],
      ["Control, Robotics and Intelligent Automation MSc", "Postgraduate", "Engineering"],
      ["Creative Writing MA", "Postgraduate", "Design & Media"],
      ["Criminology and Criminal Justice MA", "Postgraduate", "Law & Criminology"],
      ["Crowded Places and Public Safety Management MSc/PGCert", "Postgraduate", "Health & Social Care"],
      ["Data Science MSc", "Postgraduate", "Computing & AI"],
      ["Digital Marketing Management MSc", "Postgraduate", "Marketing"],
      ["Disaster Management and Resilience MSc", "Postgraduate", "Health & Social Care"],
      ["Emergency and Incident Management PGCert", "Postgraduate", "Health & Social Care"],
      ["Emergency Management and Resilience MSc", "Postgraduate", "Health & Social Care"],
      ["Emergency Preparedness and Management PGCert", "Postgraduate", "Health & Social Care"],
      ["Energy Transition Management MSc", "Postgraduate", "Science & Environment"],
      ["Engineering Management MSc", "Postgraduate", "Engineering"],
      ["English Literature MA", "Postgraduate", "Humanities"],
      ["Events and Experience Management MSc", "Postgraduate", "Hospitality & Tourism"],
      ["Finance MSc", "Postgraduate", "Finance & Accounting"],
      ["FinTech MSc", "Postgraduate", "Finance & Accounting"],
      ["Food Safety and Control MSc", "Postgraduate", "Science & Environment"],
      ["Global Business MBA", "Postgraduate", "Business & Management"],
      ["Innovation Management and Entrepreneurship MSc", "Postgraduate", "Business & Management"],
      ["International Business Management MSc", "Postgraduate", "Business & Management"],
      ["International Human Resource Management MSc", "Postgraduate", "Business & Management"],
      ["International Marketing Management MSc", "Postgraduate", "Marketing"],
      ["Project Management MSc", "Postgraduate", "Business & Management"],
    ]
  ),
  ...fromOfficialCatalogue(
    "University of South Wales",
    "Cardiff, Newport and Pontypridd",
    "https://www.southwales.ac.uk/courses/?courselevel=undergraduate",
    [
      ["Accounting and Finance - BA (Hons)", "Undergraduate", "Finance & Accounting"],
      ["Accounting and Finance including Foundation Year - BA (Hons)", "Foundation", "Finance & Accounting"],
      ["Advertising - BA (Hons)", "Undergraduate", "Marketing"],
      ["Aeronautical Engineering - BEng (Hons)", "Undergraduate", "Engineering"],
      ["Aeronautical Engineering - MEng", "Undergraduate", "Engineering"],
      ["Aeronautical Engineering including Foundation Year - BEng (Hons)", "Foundation", "Engineering"],
      ["Aerospace Engineering - BEng (Hons)", "Undergraduate", "Engineering"],
      ["Aerospace Engineering - MEng", "Undergraduate", "Engineering"],
      ["Aerospace Systems Engineering - BEng (Hons)", "Undergraduate", "Engineering"],
      ["Aircraft Engineering and Maintenance Systems (Top Up) - BSc (Hons)", "Undergraduate", "Engineering"],
      ["Aircraft Maintenance Engineering - BSc (Hons)", "Undergraduate", "Engineering"],
      ["Animation - BA (Hons)", "Undergraduate", "Design & Media"],
      ["Animation (2D and Stop Motion) - BA (Hons)", "Undergraduate", "Design & Media"],
      ["Applied Biology - BSc (Hons)", "Undergraduate", "Science & Environment"],
      ["Applied Cyber Security - BSc (Hons)", "Undergraduate", "Computing & AI"],
    ]
  ),
  ...fromOfficialCatalogue(
    "Aston University London",
    "London",
    "https://www.aston.ac.uk/london/courses",
    [
      ["Cyber Security Management MSc", "Postgraduate", "Computing & AI"],
      ["Global Business and Management MSc", "Postgraduate", "Business & Management"],
      ["Project Management MSc", "Postgraduate", "Business & Management"],
      ["Business Analytics MSc", "Postgraduate", "Business & Management"],
      ["Advanced Computer Science MSc", "Postgraduate", "Computing & AI"],
      ["Data Science MSc", "Postgraduate", "Computing & AI"],
      ["Global Business and Management (Top-up) BSc (Hons)", "Undergraduate", "Business & Management"],
    ]
  ),
  ...fromOfficialCatalogue(
    "University of Hull London",
    "London",
    "https://london.hull.ac.uk/courses/",
    [
      ["MSc Business Analytics and Artificial Intelligence", "Postgraduate", "Computing & AI"],
      ["MSc Artificial Intelligence for Business", "Postgraduate", "Computing & AI"],
      ["MSc Artificial Intelligence for Healthcare", "Postgraduate", "Computing & AI"],
      ["MSc Artificial Intelligence and Data Science", "Postgraduate", "Computing & AI"],
      ["MSc Business Management", "Postgraduate", "Business & Management"],
      ["MSc Digital Marketing and Advertising", "Postgraduate", "Marketing"],
      ["MSc Healthcare Leadership", "Postgraduate", "Health & Social Care"],
      ["MSc Logistics and Supply Chain Management", "Postgraduate", "Supply Chain & Logistics"],
    ]
  ),
  ...fromOfficialCatalogue(
    "Hartpury University",
    "Gloucestershire",
    "https://www.hartpury.ac.uk/university/courses",
    [
      ["MSc Sustainable Agriculture", "Postgraduate", "Science & Environment"],
      ["BSc (Hons) Environmental Science", "Undergraduate", "Science & Environment"],
      ["MSci Veterinary Physiotherapy", "Undergraduate", "Health & Social Care"],
      ["MSc Sport and Exercise Nutrition", "Postgraduate", "Sport"],
      ["BSc (Hons) Equine Science", "Undergraduate", "Science & Environment"],
      ["BSc (Hons) Bioveterinary Science", "Undergraduate", "Science & Environment"],
      ["BSc (Hons) Racehorse Performance and Rehabilitation", "Undergraduate", "Sport"],
      ["BSc (Hons) Animal Behaviour and Training (Clinical)", "Undergraduate", "Science & Environment"],
      ["MSc Sports Coaching", "Postgraduate", "Sport"],
      ["MSc Applied Animal Behaviour and Welfare", "Postgraduate", "Science & Environment"],
    ]
  )
];

const mergedCourses = [...curatedCourses, ...(generatedCourses as Course[])];

// Keep one card per institution/title if a hand-checked seed also appears in a
// synced official catalogue. Institution stays internal and is not rendered.
export const courses: Course[] = [
  ...new Map(
    mergedCourses.map((course) => [
      `${course.institution}::${course.title}`.toLocaleLowerCase("en-GB"),
      course,
    ])
  ).values(),
];

export const courseInstitutions = [...new Set(courses.map((course) => course.institution))].sort();
export const courseSubjects = [...new Set(courses.map((course) => course.subject))].sort();
