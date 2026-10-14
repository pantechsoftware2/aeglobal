import { writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const outputPath = path.join(process.cwd(), "app", "data", "courses.generated.json");

const catalogues = [
  {
    institution: "Coventry University",
    country: "United Kingdom",
    location: "Coventry and London",
    sitemap: "https://www.coventry.ac.uk/course-sitemap.xml",
    include: (url) => /\/course-structure\/(?:ug|pg)\//.test(url),
    limit: 180,
  },
  {
    institution: "Canterbury Christ Church University",
    country: "United Kingdom",
    location: "Canterbury, United Kingdom",
    sitemap: "https://www.canterbury.ac.uk/sitemap.xml",
    include: (url) => /\/study-here\/courses\/[^/?]+$/.test(url),
    limit: 150,
  },
  {
    institution: "Leeds Beckett University",
    country: "United Kingdom",
    location: "Leeds, United Kingdom",
    sitemap: "https://www.leedsbeckett.ac.uk/courses.xml",
    include: (url) => /\/courses\/[^/]+\/$/.test(url),
    limit: 180,
  },
  {
    institution: "The University of Law",
    country: "United Kingdom",
    location: "United Kingdom and online",
    sitemap: "https://www.law.ac.uk/sitemap.xml",
    include: (url) => /\/study\/(?:undergraduate|postgraduate)\//.test(url),
    limit: 100,
  },
  {
    institution: "Oxfordian College",
    country: "United Kingdom",
    location: "United Kingdom",
    sitemap: "https://oxfordiancollege.com/lp_course-sitemap.xml",
    include: (url) => /\/courses\/[^/]+\/$/.test(url),
    limit: 20,
  },
  {
    institution: "Mount Institute of Business Development",
    country: "United Arab Emirates",
    location: "United Arab Emirates",
    sitemap: "https://mountinstitute.com/wp-sitemap-posts-mibd_programme-1.xml",
    include: (url) => /\/programmes\/[^/]+\/$/.test(url),
    limit: 17,
  },
  {
    institution: "EIE European Business School",
    country: "Malta",
    location: "Malta",
    sitemap: "http://eieinstitute.com/sitemap.ols.xml",
    include: (url) => /\/courses-2\/ols\/products\/[^/]+$/.test(url),
    limit: 25,
  },
  {
    institution: "Global College Malta",
    country: "Malta",
    location: "Malta",
    sitemap: "https://gcm.edu.mt/course-sitemap.xml",
    include: (url) => /\/course\/[^/]+\/$/.test(url),
    limit: 20,
  },
];

// A conservative official-source seed for every provider in the Universities
// directory. These also keep full country coverage if a catalogue changes URL.
const coverageSeeds = [
  ["Aston University London", "United Kingdom", "London, United Kingdom", "Cyber Security Management MSc", "Postgraduate", "Computing & AI", "https://www.aston.ac.uk/london/courses"],
  ["University of Hull London", "United Kingdom", "London, United Kingdom", "MSc Business Analytics and Artificial Intelligence", "Postgraduate", "Computing & AI", "https://london.hull.ac.uk/courses/"],
  ["Coventry University", "United Kingdom", "Coventry, United Kingdom", "Acting for Stage and Screen BA (Hons)", "Undergraduate", "Design & Media", "https://www.coventry.ac.uk/course-structure/ug/fah/acting-stage-and-screen-ba-hons/"],
  ["Arden University", "United Kingdom", "UK study centres and online", "BSc (Hons) Psychology", "Undergraduate", "Psychology", "https://arden.ac.uk/our-courses"],
  ["Canterbury Christ Church University", "United Kingdom", "Canterbury, United Kingdom", "BSc (Hons) Accounting & Finance", "Undergraduate", "Finance & Accounting", "https://www.canterbury.ac.uk/study-here/courses/accounting-and-finance"],
  ["The University of Law", "United Kingdom", "United Kingdom and online", "MA Education", "Postgraduate", "Education", "https://www.law.ac.uk/study/postgraduate/education/ma-education/online/"],
  ["Hartpury University", "United Kingdom", "Gloucestershire, United Kingdom", "MSc Sustainable Agriculture", "Postgraduate", "Science & Environment", "https://www.hartpury.ac.uk/university/courses"],
  ["Leeds Beckett University", "United Kingdom", "Leeds, United Kingdom", "MSc Artificial Intelligence and Data Science", "Postgraduate", "Computing & AI", "https://www.leedsbeckett.ac.uk/courses/ai-data-science-msc/"],
  ["Oxford International pathways", "United Kingdom", "United Kingdom", "International Foundation", "Foundation", "Pathway Programmes", "https://www.oxfordinternationaleducationgroup.com/services/oxford-international-digital-institute/oxford-international-global-hubs/"],
  ["Oxfordian College", "United Kingdom", "United Kingdom", "Pre-Masters in Business", "Foundation", "Pathway Programmes", "https://oxfordiancollege.com/courses/pre-masters-in-business/"],
  ["QA Higher Education pathways", "United Kingdom", "United Kingdom", "Business Management BA (Hons)", "Undergraduate", "Business & Management", "https://qahighereducation.com/wp-content/uploads/2025/04/LMET_AAG_2526_DIGITAL.pdf"],
  ["Regent College London", "United Kingdom", "London, United Kingdom", "MSc International Management", "Postgraduate", "Business & Management", "https://www.rcl.ac.uk/study/international-eu-students/courses-international-students/"],
  ["University of Huddersfield pathway", "United Kingdom", "Huddersfield, United Kingdom", "International Foundation Year", "Foundation", "Pathway Programmes", "https://students.studygroup.com/study-options/international-pathway-programmes"],
  ["Royal Holloway pathway", "United Kingdom", "London, United Kingdom", "Pre-Masters Programme", "Foundation", "Pathway Programmes", "https://www.studygroup.com/our-solutions/degree-preparation"],
  ["Study Group International College", "United Kingdom", "United Kingdom", "International Year One", "Foundation", "Pathway Programmes", "https://www.studygroup.com/our-solutions/degree-preparation"],
  ["University of South Wales", "United Kingdom", "Wales, United Kingdom", "Accounting and Finance - BA (Hons)", "Undergraduate", "Finance & Accounting", "https://www.southwales.ac.uk/courses/?courselevel=undergraduate"],
  ["University of the West of Scotland - London", "United Kingdom", "London, United Kingdom", "MSc Information Technology", "Postgraduate", "Computing & AI", "https://www.uwslondon.ac.uk/courses/"],
  ["York St John University", "United Kingdom", "York, United Kingdom", "Accounting and Finance BA (Hons)", "Undergraduate", "Finance & Accounting", "https://www.yorksj.ac.uk/courses/"],
  ["Brookstone Institute of Global Studies", "United Arab Emirates", "Dubai, United Arab Emirates", "Training Certificate in Advanced Excel Using Copilot", "Undergraduate", "Computing & AI", "https://www.brookstone.ae/"],
  ["Britts Imperial Global Education", "United Arab Emirates", "Sharjah, United Arab Emirates", "BSc in Business Administration", "Undergraduate", "Business & Management", "https://uol.brittsimperial.com/Course.aspx"],
  ["De Montfort University Dubai", "United Arab Emirates", "Dubai, United Arab Emirates", "Computer Science BSc (Hons)", "Undergraduate", "Computing & AI", "https://dmu.ac.ae/storage/files/1707378769/UG%20Computer%20Sciences.pdf"],
  ["GBS Dubai", "United Arab Emirates", "Dubai, United Arab Emirates", "HND in Digital Technologies (Cyber Security)", "Undergraduate", "Computing & AI", "https://gbs.ac.ae/courses/"],
  ["Global University College Ajman", "United Arab Emirates", "Ajman, United Arab Emirates", "HND International in Business Online Level 4 & 5", "Undergraduate", "Business & Management", "https://college.globalu.com/programmes/"],
  ["Mount Institute of Business Development", "United Arab Emirates", "United Arab Emirates", "Level 4 Logistics and Supply Chain Management", "Undergraduate", "Supply Chain & Logistics", "https://mountinstitute.com/programmes/level-4-logistics-and-supply-chain-management/"],
  ["Northwood University RAK", "United Arab Emirates", "Ras Al Khaimah, United Arab Emirates", "Management Major", "Undergraduate", "Business & Management", "https://northwood.ac.ae/management-major/"],
  ["Regent College London Dubai", "United Arab Emirates", "Dubai, United Arab Emirates", "INTO International Foundation", "Foundation", "Pathway Programmes", "https://www.rcl.ac.uk/Dubai/"],
  ["The Innovation Institute of Business", "United Arab Emirates", "United Arab Emirates", "Data Analytics and Cyber Security", "Undergraduate", "Computing & AI", "https://tiib.co/"],
  ["Ascencia Business School Malta", "Malta", "Malta", "ATHE Level 7 Diploma in Strategic Management", "Postgraduate", "Business & Management", "https://www.ascenciamalta.edu.mt/"],
  ["EIE European Business School", "Malta", "Malta", "Master of Business Administration", "Postgraduate", "Business & Management", "https://eieinstitute.com/courses-2/ols/products/mba"],
  ["GBS Malta", "Malta", "Malta", "BSc (Hons) Computer Science and Information Technology", "Undergraduate", "Computing & AI", "https://gbs.edu.mt/"],
  ["Global College Malta", "Malta", "Malta", "Master of Science in Health and Social Care Management", "Postgraduate", "Health & Social Care", "https://gcm.edu.mt/course/master-of-science-in-health-and-social-care-management/"],
  ["C3S Business School", "Spain", "Barcelona, Spain", "BA (Hons) in Business Analytics and Digital Transformation", "Undergraduate", "Business & Management", "https://www.csss.es/our_programs/"],
  ["Schiller International University", "Spain", "Madrid, Spain", "Bachelor of Science in International Business", "Undergraduate", "Business & Management", "https://www.schiller.edu/programs/"],
  ["ICN Business School", "France", "France", "MSc Data, AI & Business Innovation", "Postgraduate", "Computing & AI", "https://www.icn-artem.com/en/programmes/"],
  ["Coventry University Wroclaw", "Poland", "Wroclaw, Poland", "Computing Science BSc (Hons)", "Undergraduate", "Computing & AI", "https://www.coventry.ac.uk/wroclaw/course-structure/ug/computing-science-bsc-hons/"],
].map(([institution, country, location, title, level, subject, sourceUrl]) => ({ institution, country, location, title, level, subject, sourceUrl }));

const entityMap = new Map([
  ["amp", "&"], ["quot", '"'], ["apos", "'"], ["nbsp", " "],
  ["ndash", "–"], ["mdash", "—"], ["rsquo", "’"], ["lsquo", "‘"],
]);

function decodeHtml(value) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&([a-z]+);/gi, (match, name) => entityMap.get(name.toLowerCase()) ?? match)
    .replace(/\s+/g, " ")
    .trim();
}

function inferLevel(title, url) {
  if (/foundation|pre-master|international year|level [123]|certhe/i.test(title)) return "Foundation";
  if (/\/pg\//.test(url) || /postgraduate|master|msc|mba|ma\b|llm|pgcert|pgdip|doctor|dba|phd|level [678]/i.test(title)) return "Postgraduate";
  return "Undergraduate";
}

function inferSubject(title) {
  const tests = [
    ["Computing & AI", /comput|software|cyber|data|artificial intelligence|digital technolog|information technolog|web|network/i],
    ["Finance & Accounting", /account|finance|bank|fintech|investment|financial/i],
    ["Health & Social Care", /health|nurs|care|medical|physio|public health|wellbeing/i],
    ["Law & Criminology", /law|legal|crimin|polic|justice/i],
    ["Engineering", /engineer|automotive|aerospace|construction|architecture|built environment/i],
    ["Psychology", /psycholog|counsell/i],
    ["Design & Media", /design|media|film|animation|fashion|music|acting|creative|writing|art\b/i],
    ["Hospitality & Tourism", /hospitality|tourism|event|hotel/i],
    ["Education", /education|teaching|academic|school/i],
    ["Science & Environment", /science|biology|bioscience|environment|agricultur|animal|equine|sustainab/i],
    ["Sport", /sport|exercise|coaching|athletic/i],
    ["Marketing", /marketing|advertis|brand|public relations/i],
    ["Supply Chain & Logistics", /logistic|supply chain|procurement/i],
  ];
  return tests.find(([, pattern]) => pattern.test(title))?.[0] ?? "Business & Management";
}

async function fetchText(url, timeoutMs = 25000) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { "user-agent": "AEGlobalCourseDirectory/1.0 (+https://aeglobal.study)" },
        signal: AbortSignal.timeout(timeoutMs),
      });
      if (!response.ok) throw new Error(`${response.status} ${url}`);
      return response.text();
    } catch (error) {
      lastError = error;
      if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, attempt * 750));
    }
  }
  throw lastError;
}

function sitemapUrls(xml) {
  return [...xml.matchAll(/<loc>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/loc>/gis)]
    .map((match) => decodeHtml(match[1]));
}

function titleFromHtml(html) {
  const h1 = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1];
  const title = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1];
  return decodeHtml(title ?? h1 ?? "")
    .split(/\s+\|\s+/)[0]
    .replace(/\s+Course$/i, "")
    .trim();
}

async function mapConcurrent(items, limit, mapper) {
  const results = new Array(items.length);
  let cursor = 0;
  async function worker() {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await mapper(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

const discovered = [];
for (const catalogue of catalogues) {
  const xml = await fetchText(catalogue.sitemap, 60000);
  const urls = sitemapUrls(xml).filter(catalogue.include).slice(0, catalogue.limit);
  for (const sourceUrl of urls) discovered.push({ ...catalogue, sourceUrl });
  console.log(`${catalogue.institution}: found ${urls.length} official course pages`);
}

let completed = 0;
const scraped = await mapConcurrent(discovered, 40, async (entry) => {
  try {
    const html = await fetchText(entry.sourceUrl, 12000);
    const title = titleFromHtml(html);
    if (!title || title.length < 4 || title.length > 180) return null;
    return {
      title,
      institution: entry.institution,
      country: entry.country,
      location: entry.location,
      level: inferLevel(title, entry.sourceUrl),
      subject: inferSubject(title),
      sourceUrl: entry.sourceUrl,
    };
  } catch (error) {
    console.warn(`Skipped ${entry.sourceUrl}: ${error.message}`);
    return null;
  } finally {
    completed += 1;
    if (completed % 100 === 0) console.log(`Checked ${completed}/${discovered.length} pages`);
  }
});

const unique = new Map();
for (const course of [...coverageSeeds, ...scraped.filter(Boolean)]) {
  const key = `${course.institution}::${course.title}`.toLocaleLowerCase("en-GB");
  if (!unique.has(key)) unique.set(key, course);
}

const courses = [...unique.values()].sort((a, b) =>
  a.institution.localeCompare(b.institution) || a.title.localeCompare(b.title)
);

await writeFile(outputPath, `${JSON.stringify(courses, null, 2)}\n`, "utf8");
console.log(`Wrote ${courses.length} verified records to ${outputPath}`);
