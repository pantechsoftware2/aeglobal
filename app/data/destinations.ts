export type Institution = {
  name: string;
  location: string;
  note: string;
  logo: string;
  image: string;
  website?: string;
  logoTone?: "light" | "dark";
  aliases?: string[];
};

export type StudyDestination = { name: string; label: string; slug: string; flag: string; meta: string; institutions: Institution[] };

// Institution listings transcribed from the two user-supplied country lists.
// Grouped providers and abbreviations are retained rather than expanded speculatively.
export const destinations: StudyDestination[] = [
  {
    "name": "United Kingdom",
    "flag": "/flags/gb.svg",
    "meta": "Plan intakes and applications",
    "slug": "united-kingdom",
    "label": "United Kingdom",
    "institutions": [
      { "name": "Aston University London", "location": "London, United Kingdom", "note": "Business-focused London campus option for students comparing city-based study routes.", "logo": "/images/institutions/aston-logo.svg", "image": "/images/institutions/aston-campus.png", "website": "https://www.aston.ac.uk/london/", "aliases": ["Aston London"] },
      { "name": "University of Hull London", "location": "London, United Kingdom", "note": "London study option connected to the University of Hull pathway.", "logo": "/images/institutions/hull-logo.svg", "image": "/images/institutions/hull-campus.jpg", "website": "https://london.hull.ac.uk/", "logoTone": "dark", "aliases": ["Hull London"] },
      { "name": "Coventry University", "location": "Coventry, United Kingdom", "note": "A practical option for career-led courses, intakes and UK study planning.", "logo": "/images/institutions/coventry-logo.svg", "image": "/images/institutions/coventry-campus.jpg", "website": "https://www.coventry.ac.uk/" },
      { "name": "Arden University", "location": "United Kingdom", "note": "Flexible study routes across business, technology and professional subjects.", "logo": "/images/institutions/arden-logo.svg", "image": "/images/institutions/arden-campus.jpg", "website": "https://arden.ac.uk/", "aliases": ["GUS - Arden"] },
      { "name": "Canterbury Christ Church University", "location": "Canterbury, United Kingdom", "note": "Supportive UK university route with undergraduate and postgraduate options.", "logo": "/images/institutions/cccu-logo.svg", "image": "/images/institutions/cccu-campus.jpg", "website": "https://www.canterbury.ac.uk/", "aliases": ["GUS - CCCU", "CCCU"] },
      { "name": "The University of Law", "location": "United Kingdom", "note": "Specialist legal, business and professional education with multiple UK locations.", "logo": "/images/institutions/ulaw-logo.svg", "image": "/images/institutions/ulaw-campus.jpg", "website": "https://www.law.ac.uk/", "aliases": ["GUS - ULaw", "ULaw"] },
      { "name": "Hartpury University", "location": "Gloucestershire, United Kingdom", "note": "A specialist university choice with applied learning and campus-based study.", "logo": "/images/institutions/hartpury-logo.png", "image": "/images/institutions/hartpury-campus.jpg", "website": "https://www.hartpury.ac.uk/" },
      { "name": "Leeds Beckett University", "location": "Leeds, United Kingdom", "note": "A city university option with a strong applied learning and student support focus.", "logo": "/images/institutions/leeds-logo.svg", "image": "/images/institutions/leeds-campus.jpg", "website": "https://www.leedsbeckett.ac.uk/" },
      { "name": "Oxford International pathways", "location": "United Kingdom", "note": "Pathway discussion for Winchester, HSU and Bishop Grosseteste options.", "logo": "/images/institutions/oieg-logo.png", "image": "/images/institutions/oieg-students.jpg", "website": "https://www.oxfordinternationaleducationgroup.com/", "aliases": ["OIEG - Winchester, HSU, Lincoln Bishop"] },
      { "name": "Oxfordian College", "location": "United Kingdom", "note": "College pathway option for students who want guided course matching.", "logo": "/images/institutions/oxfordian-logo.png", "image": "/images/institutions/oxfordian-campus.png", "website": "https://oxfordiancollege.com/" },
      { "name": "QA Higher Education pathways", "location": "United Kingdom", "note": "Pathway discussion for Ulster, Northumbria, International Year One and foundation routes.", "logo": "/images/institutions/qahe-logo.svg", "image": "/images/institutions/qahe-students.jpg", "website": "https://qahighereducation.com/", "aliases": ["QAHE - Ulster, Northumbria, IY1, Foundation"] },
      { "name": "Regent College London", "location": "London, United Kingdom", "note": "London college option with course routes for practical academic progression.", "logo": "/images/institutions/regent-logo.svg", "image": "/images/institutions/regent-campus.webp", "website": "https://www.rcl.ac.uk/" },
      { "name": "University of Huddersfield pathway", "location": "Huddersfield, United Kingdom", "note": "Study Group pathway discussion for Huddersfield-linked study options.", "logo": "/images/institutions/huddersfield-logo.svg", "image": "/images/institutions/huddersfield-campus.jpg", "website": "https://www.hud.ac.uk/", "logoTone": "dark", "aliases": ["Studygroup - Huddersfield"] },
      { "name": "Royal Holloway pathway", "location": "London, United Kingdom", "note": "Study Group pathway discussion for Royal Holloway-linked study options.", "logo": "/images/institutions/royal-holloway-logo.png", "image": "/images/institutions/royal-holloway-campus.jpg", "website": "https://www.royalholloway.ac.uk/", "aliases": ["Studygroup - RHUL", "RHUL"] },
      { "name": "Study Group International College", "location": "United Kingdom", "note": "International pathway support for foundation and degree-preparation routes.", "logo": "/images/institutions/studygroup-logo.svg", "image": "/images/institutions/studygroup-students.png", "website": "https://www.studygroup.com/", "aliases": ["Studygroup IC"] },
      { "name": "University of South Wales", "location": "Wales, United Kingdom", "note": "Welsh university option with campuses across Cardiff, Newport and Pontypridd.", "logo": "/images/institutions/south-wales-logo.png", "image": "/images/institutions/south-wales-campus.jpg", "website": "https://www.southwales.ac.uk/" },
      { "name": "University of the West of Scotland - London", "location": "London, United Kingdom", "note": "London campus route for students comparing Scottish university options in the capital.", "logo": "/images/institutions/uws-logo.png", "image": "/images/institutions/uws-campus.webp", "website": "https://www.uwslondon.ac.uk/", "logoTone": "dark", "aliases": ["University of West Scotland - London"] },
      { "name": "York St John University", "location": "York, United Kingdom", "note": "A student-centred university option with a clear campus community feel.", "logo": "/images/institutions/york-logo.jpg", "image": "/images/institutions/york-campus.jpg", "website": "https://www.yorksj.ac.uk/" }
    ]
  },
  {
    "name": "United Arab Emirates",
    "flag": "/flags/ae.svg",
    "meta": "Review campuses and costs",
    "slug": "united-arab-emirates",
    "label": "Dubai & UAE",
    "institutions": [
      { "name": "Brookstone Institute of Global Studies", "location": "Dubai, United Arab Emirates", "note": "Business and professional study option in Dubai.", "logo": "/images/institutions/brookstone-logo.svg", "image": "/images/institutions/brookstone-campus.webp", "website": "https://www.brookstone.ae/", "aliases": ["BIGS Dubai"] },
      { "name": "Britts Imperial Global Education", "location": "Sharjah, United Arab Emirates", "note": "International business education pathway in the UAE.", "logo": "/images/institutions/britts-logo.png", "image": "/images/institutions/britts-campus.jpg", "website": "https://brittsimperial.com/", "aliases": ["Britts Imperial"] },
      { "name": "De Montfort University Dubai", "location": "Dubai, United Arab Emirates", "note": "Dubai campus option for UK-style degree routes.", "logo": "/images/institutions/dmu-logo.svg", "image": "/images/institutions/dmu-campus.webp", "website": "https://www.dmu.ac.ae/", "aliases": ["DMU"] },
      { "name": "GBS Dubai", "location": "Dubai, United Arab Emirates", "note": "Business and technology study option in Dubai Knowledge Park.", "logo": "/images/institutions/gbs-dubai-logo.png", "image": "/images/institutions/gbs-dubai-campus.webp", "website": "https://gbs.ac.ae/" },
      { "name": "Global University College Ajman", "location": "Ajman, United Arab Emirates", "note": "Ajman-based college option for business and progression routes.", "logo": "/images/institutions/guc-logo.svg", "image": "/images/institutions/guc-campus.webp", "website": "https://college.globalu.com/", "aliases": ["GUC Ajman", "GlobalU"] },
      { "name": "Mount Institute of Business Development", "location": "United Arab Emirates", "note": "Business-focused institution for students comparing practical study routes.", "logo": "/images/institutions/mibd-logo.png", "image": "/images/institutions/mibd-campus.jpg", "website": "https://mountinstitute.com/", "aliases": ["MIBD"] },
      { "name": "Northwood University RAK", "location": "Ras Al Khaimah, United Arab Emirates", "note": "US-linked business university option based in Ras Al Khaimah.", "logo": "/images/institutions/northwood-logo.png", "image": "/images/institutions/northwood-campus.jpg", "website": "https://northwood.ac.ae/" },
      { "name": "Regent College London Dubai", "location": "Dubai, United Arab Emirates", "note": "Dubai route from Regent College London for business and professional study.", "logo": "/images/institutions/regent-logo.svg", "image": "/images/institutions/regent-dubai-campus.jpg", "website": "https://www.rcl.ac.uk/Dubai/", "aliases": ["Regent College"] },
      { "name": "The Innovation Institute of Business", "location": "United Arab Emirates", "note": "Modern business institute with career-focused learning routes.", "logo": "/images/institutions/tiib-logo.svg", "image": "/images/institutions/tiib-campus.jpeg", "website": "https://tiib.co/", "logoTone": "dark" }
    ]
  },
  {
    "name": "Malta",
    "flag": "/flags/mt.svg",
    "meta": "Compare pathways and intakes",
    "slug": "malta",
    "label": "Malta",
    "institutions": [
      { "name": "Ascencia Business School Malta", "location": "Malta", "note": "Business school option for students comparing Malta routes.", "logo": "/images/institutions/ascencia-logo.svg", "image": "/images/institutions/ascencia-campus.webp", "website": "https://www.ascenciamalta.edu.mt/", "aliases": ["Ascencia Business School"] },
      { "name": "EIE European Business School", "location": "Malta", "note": "Malta business school option with practical campus-based study.", "logo": "/images/institutions/eie-logo.png", "image": "/images/institutions/eie-campus.jpeg", "website": "https://eieinstitute.com/", "aliases": ["EIE Business School Malta"] },
      { "name": "GBS Malta", "location": "Malta", "note": "Business and technology option for students exploring Malta.", "logo": "/images/institutions/gbs-malta-logo.svg", "image": "/images/institutions/gbs-malta-campus.webp", "website": "https://gbs.edu.mt/" },
      { "name": "Global College Malta", "location": "Malta", "note": "Malta college option with business-focused study routes.", "logo": "/images/institutions/global-malta-logo.png", "image": "/images/institutions/global-malta-campus.jpg", "website": "https://gcm.edu.mt/" }
    ]
  },
  {
    "name": "Spain",
    "flag": "/flags/es.svg",
    "meta": "Compare study routes",
    "slug": "spain",
    "label": "Spain",
    "institutions": [
      { "name": "C3S Business School", "location": "Barcelona, Spain", "note": "Barcelona business school option for career-focused international study.", "logo": "/images/institutions/c3s-logo.webp", "image": "/images/institutions/c3s-campus.webp", "website": "https://www.csss.es/" },
      { "name": "Schiller International University", "location": "Madrid, Spain", "note": "International university option with a Madrid campus route.", "logo": "/images/institutions/schiller-logo.svg", "image": "/images/institutions/schiller-campus.webp", "website": "https://www.schiller.edu/", "aliases": ["Schiller University"] }
    ]
  },
  {
    "name": "France",
    "flag": "/flags/fr.svg",
    "meta": "Review courses and documents",
    "slug": "france",
    "label": "France",
    "institutions": [
      { "name": "ICN Business School", "location": "France", "note": "French business school option with international management routes.", "logo": "/images/institutions/icn-logo.png", "image": "/images/institutions/icn-campus.jpg", "website": "https://www.icn-artem.com/" }
    ]
  },
  {
    "name": "Poland",
    "flag": "/flags/pl.svg",
    "meta": "Compare courses and documents",
    "slug": "poland",
    "label": "Poland",
    "institutions": [
      { "name": "Coventry University Wroclaw", "location": "Wroclaw, Poland", "note": "Coventry's Poland campus option for students comparing European study routes.", "logo": "/images/institutions/coventry-logo.svg", "image": "/images/institutions/coventry-wroclaw-campus.jpg", "website": "https://www.coventry.ac.uk/wroclaw/", "aliases": ["Coventry University, Wroclaw"] }
    ]
  },
  {
    "name": "Australia",
    "flag": "/flags/au.svg",
    "meta": "Prepare study and arrival steps",
    "slug": "australia",
    "label": "Australia",
    "institutions": []
  },
  {
    "name": "Canada",
    "flag": "/flags/ca.svg",
    "meta": "Review programs and documents",
    "slug": "canada",
    "label": "Canada",
    "institutions": []
  },
  {
    "name": "Malaysia",
    "flag": "/flags/my.svg",
    "meta": "Compare courses and fees",
    "slug": "malaysia",
    "label": "Malaysia",
    "institutions": []
  },
  {
    "name": "Ireland",
    "flag": "/flags/ie.svg",
    "meta": "Know the course and visa path",
    "slug": "ireland",
    "label": "Ireland",
    "institutions": []
  },
  {
    "name": "Germany",
    "flag": "/flags/de.svg",
    "meta": "Compare public and private routes",
    "slug": "germany",
    "label": "Germany",
    "institutions": []
  },
  {
    "name": "New Zealand",
    "flag": "/flags/nz.svg",
    "meta": "Plan study and arrival steps",
    "slug": "new-zealand",
    "label": "New Zealand",
    "institutions": []
  },
  {
    "name": "Netherlands",
    "flag": "/flags/nl.svg",
    "meta": "Compare programs and timelines",
    "slug": "netherlands",
    "label": "Netherlands",
    "institutions": []
  },
  {
    "name": "Hungary",
    "flag": "/flags/hu.svg",
    "meta": "Check entry and fee options",
    "slug": "hungary",
    "label": "Hungary",
    "institutions": []
  },
  {
    "name": "Italy",
    "flag": "/flags/it.svg",
    "meta": "Plan applications and documents",
    "slug": "italy",
    "label": "Italy",
    "institutions": []
  },
  {
    "name": "Switzerland",
    "flag": "/flags/ch.svg",
    "meta": "Review courses and costs",
    "slug": "switzerland",
    "label": "Switzerland",
    "institutions": []
  },
  {
    "name": "Cyprus",
    "flag": "/flags/cy.svg",
    "meta": "Compare intakes and requirements",
    "slug": "cyprus",
    "label": "Cyprus",
    "institutions": []
  },
  {
    "name": "Singapore",
    "flag": "/flags/sg.svg",
    "meta": "Review programs and fees",
    "slug": "singapore",
    "label": "Singapore",
    "institutions": []
  },
  {
    "name": "Finland",
    "flag": "/flags/fi.svg",
    "meta": "Plan timelines and documents",
    "slug": "finland",
    "label": "Finland",
    "institutions": []
  },
  {
    "name": "Sweden",
    "flag": "/flags/se.svg",
    "meta": "Compare courses and intakes",
    "slug": "sweden",
    "label": "Sweden",
    "institutions": []
  },
  {
    "name": "Lithuania",
    "flag": "/flags/lt.svg",
    "meta": "Check entry requirements",
    "slug": "lithuania",
    "label": "Lithuania",
    "institutions": []
  },
  {
    "name": "Denmark",
    "flag": "/flags/dk.svg",
    "meta": "Review programs and costs",
    "slug": "denmark",
    "label": "Denmark",
    "institutions": []
  },
  {
    "name": "Austria",
    "flag": "/flags/at.svg",
    "meta": "Plan applications and fees",
    "slug": "austria",
    "label": "Austria",
    "institutions": []
  },
  {
    "name": "Belgium",
    "flag": "/flags/be.svg",
    "meta": "Review intakes and pathways",
    "slug": "belgium",
    "label": "Belgium",
    "institutions": []
  },
  {
    "name": "United States of America",
    "flag": "/flags/us.svg",
    "meta": "Plan shortlist and applications",
    "slug": "united-states-of-america",
    "label": "United States of America",
    "institutions": []
  },
  {
    "name": "Greece",
    "flag": "/flags/gr.svg",
    "meta": "Compare programs and costs",
    "slug": "greece",
    "label": "Greece",
    "institutions": []
  },
  {
    "name": "Georgia",
    "flag": "/flags/ge.svg",
    "meta": "Check courses and requirements",
    "slug": "georgia",
    "label": "Georgia",
    "institutions": []
  },
  {
    "name": "Japan",
    "flag": "/flags/jp.svg",
    "meta": "Review programs and timelines",
    "slug": "japan",
    "label": "Japan",
    "institutions": []
  }
];

export const featuredDestinations = destinations.slice(0, 6);
