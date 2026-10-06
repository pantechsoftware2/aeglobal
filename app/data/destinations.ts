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

export type DestinationGuide = {
  headline: string;
  intro: string;
  bestFor: string[];
  planningFocus: string[];
  applicationNotes: string[];
  studentFit: string;
  cityAndLifestyle: string;
  nextStep: string;
};

export type DestinationHero = {
  image: string;
  eyebrow: string;
  title: string;
  accent: string;
  copy: string;
  focusLabel: string;
  cardTitle: string;
  cardStat: string;
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

const destinationGuides: Record<string, DestinationGuide> = {
  "united-kingdom": {
    headline: "A strong route for career-led degrees, pathway options and clear academic progression.",
    intro: "The United Kingdom suits students who want a familiar international education system, strong postgraduate choices and a wide range of city or campus-based routes.",
    bestFor: ["Business, law, computing and health-related progression", "One-year master's options for faster academic movement", "Students who want structured pathway and foundation routes"],
    planningFocus: ["Match course outcomes with location and tuition budget", "Check intake availability before finalising documents", "Compare London and regional study costs carefully"],
    applicationNotes: ["Prepare academic transcripts, passport and English evidence early", "Keep funds and credibility documents consistent", "Plan CAS and visa steps only after the offer route is clear"],
    studentFit: "Best for students who want a broad choice of institutions and a practical study plan that can move from shortlist to application quickly.",
    cityAndLifestyle: "London gives maximum exposure and cost, while regional cities can offer a quieter budget and strong campus communities.",
    nextStep: "Share your subject, grades, English level and budget so we can compare UK routes by course fit, fees and intake timing."
  },
  "united-arab-emirates": {
    headline: "A modern campus route for students comparing Dubai, Sharjah, Ajman and Ras Al Khaimah.",
    intro: "The UAE is a practical option for students who want international campuses, business-focused study and a regional hub close to home.",
    bestFor: ["Business, management, hospitality and technology routes", "Students who prefer urban campuses and industry exposure", "Families comparing study abroad with shorter travel distance"],
    planningFocus: ["Compare emirate, campus location and daily commute", "Review tuition, deposits and accommodation before choosing", "Check whether the route is local, UK-linked or international"],
    applicationNotes: ["Keep passport, academic records and fee deadlines ready", "Ask how the student visa process is handled by the institution", "Confirm campus, award title and progression details"],
    studentFit: "Best for students who want a global-feeling city experience with practical entry points and a business-heavy academic environment.",
    cityAndLifestyle: "Dubai is fast-paced and highly connected; Sharjah, Ajman and Ras Al Khaimah can feel calmer and more cost-conscious.",
    nextStep: "Tell us your preferred emirate, course area and budget so we can compare UAE campuses properly."
  },
  malta: {
    headline: "A compact European route for business, hospitality and cost-conscious study planning.",
    intro: "Malta works well for students who want an English-speaking study environment, smaller campuses and a European lifestyle without an overwhelming city choice.",
    bestFor: ["Business, hospitality and professional diploma routes", "Students who prefer a smaller destination", "Budget-sensitive learners comparing Europe options"],
    planningFocus: ["Check course level, awarding body and progression route", "Plan accommodation early because supply can be limited", "Compare tuition with living costs across the island"],
    applicationNotes: ["Prepare academics, passport and financial documents together", "Confirm intake dates and visa document sequence", "Check English requirements before paying deposits"],
    studentFit: "Best for students who want a manageable European destination with a practical study environment and clear support needs.",
    cityAndLifestyle: "Life is coastal, compact and student-friendly, but planning housing and transport early makes the experience smoother.",
    nextStep: "Share your course interest and budget range so we can check whether Malta is the right fit against other European options."
  },
  spain: {
    headline: "A city-led route for business, international management and creative study choices.",
    intro: "Spain suits students who want a lively European setting, business school options and a strong lifestyle factor alongside academic planning.",
    bestFor: ["Business, marketing, tourism and international management", "Students drawn to Barcelona or Madrid city life", "Learners comparing English-taught European programs"],
    planningFocus: ["Check whether the program is English-taught or bilingual", "Compare private school fees with city living costs", "Plan documents early for visa appointment timing"],
    applicationNotes: ["Confirm award, campus and language requirements", "Prepare financial and accommodation documents in order", "Allow time for translation or legalisation where needed"],
    studentFit: "Best for students who value international business exposure and want a culturally rich city experience.",
    cityAndLifestyle: "Barcelona feels creative and coastal, while Madrid is central, business-focused and fast-moving.",
    nextStep: "Tell us your preferred city and subject area so we can compare Spain options with the right document timeline."
  },
  france: {
    headline: "A focused route for business, design, management and internationally minded students.",
    intro: "France is a strong option for students who want European academic credibility, business school routes and culture-rich city choices.",
    bestFor: ["Business, luxury, design, arts and management programs", "Students comparing English-taught French routes", "Applicants who can plan documents carefully"],
    planningFocus: ["Check language of instruction and campus location", "Review tuition, deposits and living costs by city", "Leave time for document preparation and visa steps"],
    applicationNotes: ["Prepare academic records, passport and financial proof", "Confirm whether translations or attestations are needed", "Track intake deadlines before choosing your shortlist"],
    studentFit: "Best for students who want a European destination with strong business and creative study appeal.",
    cityAndLifestyle: "Paris offers major exposure and higher costs; other cities may offer a calmer and more affordable student rhythm.",
    nextStep: "Share your study area and budget so we can compare France with nearby Europe routes."
  },
  poland: {
    headline: "An affordable European route with practical campus options and straightforward comparison points.",
    intro: "Poland is useful for students who want a European destination, lower relative living costs and career-focused courses in growing student cities.",
    bestFor: ["Business, computing and applied undergraduate routes", "Students comparing Europe on value", "Applicants who want a less crowded destination choice"],
    planningFocus: ["Compare city cost, campus support and course language", "Check entry requirements against your academic background", "Plan accommodation before arrival"],
    applicationNotes: ["Keep transcripts, passport and financial proof ready", "Check if documents need translation or legalisation", "Confirm intake and visa document sequence"],
    studentFit: "Best for practical students who want a European option that balances cost, campus life and academic progression.",
    cityAndLifestyle: "Cities such as Wroclaw can offer a student-friendly environment with easier day-to-day costs than many Western European capitals.",
    nextStep: "Send your academics and course interest so we can check Poland against your budget and intake target."
  },
  australia: {
    headline: "A destination for structured degrees, campus life and long-range planning.",
    intro: "Australia suits students who want a full campus experience, strong student services and a destination where course choice and documentation must line up carefully.",
    bestFor: ["Business, IT, engineering, health and applied programs", "Students seeking a classic campus lifestyle", "Applicants ready for detailed financial planning"],
    planningFocus: ["Compare city, tuition and living cost before applying", "Check entry and English requirements by institution", "Plan documents early for visa readiness"],
    applicationNotes: ["Keep academic, English and financial evidence consistent", "Confirm course duration and intake availability", "Review health cover and pre-departure steps"],
    studentFit: "Best for students who want a major study destination and are ready to plan budget, course fit and arrival details seriously.",
    cityAndLifestyle: "Large cities offer wider networks and higher costs; regional choices may feel calmer and more campus-led.",
    nextStep: "Share your subject, marks and budget so we can compare Australian routes with realistic timelines."
  },
  canada: {
    headline: "A practical route for students comparing diplomas, degrees and province-level fit.",
    intro: "Canada works well for students who want structured programs, clear documentation and careful comparison between institution type, location and budget.",
    bestFor: ["Diploma, postgraduate certificate and degree planning", "Students comparing city and province options", "Applicants who need strong document organisation"],
    planningFocus: ["Compare program level, tuition and total funds", "Check intake availability before committing", "Understand the difference between college and university routes"],
    applicationNotes: ["Prepare academics, English scores and financial proof early", "Keep statement and study plan consistent with your background", "Confirm institution and program details before deposits"],
    studentFit: "Best for students who want a structured study route and can prepare a careful application file.",
    cityAndLifestyle: "Major cities are highly connected and competitive; smaller cities can offer a quieter student experience and different cost profile.",
    nextStep: "Tell us your program level, marks, English status and budget so we can filter Canada options with care."
  },
  malaysia: {
    headline: "A value-focused Asian route with international campuses and flexible study choices.",
    intro: "Malaysia suits students who want affordability, English-taught options and a regional education hub with practical city living.",
    bestFor: ["Business, IT, hospitality and foundation routes", "Students comparing branch campus options", "Families looking for cost-conscious international study"],
    planningFocus: ["Compare award structure, campus and transfer options", "Review tuition and living costs together", "Check intake flexibility and visa processing timeline"],
    applicationNotes: ["Prepare academic records and passport early", "Confirm medical, visa and arrival steps", "Check English requirements by course"],
    studentFit: "Best for students who want an international environment at a more manageable budget.",
    cityAndLifestyle: "Kuala Lumpur is busy and connected, while other cities may provide quieter study settings and lower daily costs.",
    nextStep: "Share your subject and budget so we can compare Malaysia with UAE, Singapore and Europe routes."
  },
  ireland: {
    headline: "A focused route for technology, business and English-speaking European study.",
    intro: "Ireland appeals to students who want an English-speaking destination, strong tech and business pathways and a smaller country feel than the UK.",
    bestFor: ["Technology, business, finance and analytics programs", "Students comparing Europe with English-language study", "Applicants who can plan housing early"],
    planningFocus: ["Compare Dublin costs with regional options", "Check course entry and English requirements", "Plan accommodation before the rush"],
    applicationNotes: ["Prepare academic, English and financial documents in sequence", "Track intake deadlines carefully", "Confirm visa and insurance requirements"],
    studentFit: "Best for students who want European study with an English-speaking academic environment and career-focused programs.",
    cityAndLifestyle: "Dublin has strong industry exposure but higher costs; smaller cities can feel more manageable.",
    nextStep: "Send your course target and intake so we can compare Ireland routes with UK and Europe options."
  },
  germany: {
    headline: "A route for students who can balance academic ambition, language planning and detailed requirements.",
    intro: "Germany is attractive for students comparing public and private routes, technical subjects and long-term European study planning.",
    bestFor: ["Engineering, technology, management and applied sciences", "Students comparing public and private institution routes", "Applicants ready for strong documentation discipline"],
    planningFocus: ["Check language, admission rules and deadlines early", "Compare public-route competitiveness with private options", "Budget for living costs and blocked-fund style requirements"],
    applicationNotes: ["Prepare transcripts, grading details and English or German evidence", "Allow time for APS or document checks if applicable", "Track application portals and deadlines closely"],
    studentFit: "Best for detail-oriented students who can plan early and compare route types carefully.",
    cityAndLifestyle: "Germany offers strong student cities, but housing and local language confidence can shape the experience heavily.",
    nextStep: "Share your academics, language status and preferred subject so we can judge whether Germany is realistic for your timeline."
  },
  "new-zealand": {
    headline: "A calm, practical route for students who want smaller cities and applied learning.",
    intro: "New Zealand suits students who prefer a quieter destination, supportive campuses and careful pre-arrival planning.",
    bestFor: ["Business, IT, hospitality, health and applied programs", "Students who want smaller class environments", "Applicants focused on safety, lifestyle and support"],
    planningFocus: ["Compare course level, city and total budget", "Check English and academic entry requirements", "Plan accommodation and arrival support early"],
    applicationNotes: ["Prepare academics, English evidence and funds consistently", "Confirm insurance, visa and travel steps", "Check intake availability before narrowing options"],
    studentFit: "Best for students who want a balanced lifestyle and a less overwhelming study environment.",
    cityAndLifestyle: "Cities are generally smaller and nature-connected, so lifestyle fit matters as much as the institution name.",
    nextStep: "Tell us your academic profile and preferred course so we can compare New Zealand with Australia and Canada."
  },
  netherlands: {
    headline: "A competitive English-taught European route where early planning matters.",
    intro: "The Netherlands is strong for students seeking English-taught degrees, international classrooms and modern European campuses.",
    bestFor: ["Business, data, engineering, social sciences and design", "Students who want an international European classroom", "Applicants who can apply early"],
    planningFocus: ["Check deadlines because popular programs close early", "Plan housing as seriously as the application", "Compare university of applied sciences and research university routes"],
    applicationNotes: ["Prepare academics, English evidence and motivation documents", "Confirm numerus fixus or capacity limits where relevant", "Keep financial and residence steps on schedule"],
    studentFit: "Best for proactive students who can make decisions early and handle a competitive application calendar.",
    cityAndLifestyle: "Dutch cities are international and well-connected, but housing pressure can be the key planning challenge.",
    nextStep: "Share your subject and target intake so we can check deadlines and fit for the Netherlands."
  },
  hungary: {
    headline: "A value-conscious European option for medicine, business and applied programs.",
    intro: "Hungary is useful for students looking at affordable European study with established student cities and clear academic routes.",
    bestFor: ["Medicine, health sciences, business and IT routes", "Students comparing Central Europe", "Applicants looking for manageable living costs"],
    planningFocus: ["Compare entry exams or interview requirements", "Check course language and recognition needs", "Plan housing and living costs by city"],
    applicationNotes: ["Prepare academics, passport and English evidence", "Confirm whether entrance tests are required", "Keep visa and financial documents ready"],
    studentFit: "Best for students who want a Central European destination with practical fees and defined course pathways.",
    cityAndLifestyle: "Budapest offers an active student scene, while other cities can feel quieter and more affordable.",
    nextStep: "Send your subject interest and academic marks so we can check Hungary against your course requirements."
  },
  italy: {
    headline: "A culture-rich European route for design, business, hospitality and public-private comparison.",
    intro: "Italy appeals to students who value culture, design and European lifestyle while needing careful planning around documents and language.",
    bestFor: ["Design, fashion, architecture, hospitality and management", "Students comparing public and private options", "Applicants comfortable with document preparation"],
    planningFocus: ["Check English-taught availability and city costs", "Compare private schools with public university routes", "Allow time for pre-enrolment and document steps"],
    applicationNotes: ["Prepare translated or legalised documents if required", "Confirm admission route and visa sequence", "Track deadlines closely"],
    studentFit: "Best for students who want a creative European environment and can manage a detailed application process.",
    cityAndLifestyle: "Milan is industry-focused and expensive; other cities can offer a slower, more affordable rhythm.",
    nextStep: "Tell us your study area and target city style so we can compare Italy routes properly."
  },
  switzerland: {
    headline: "A premium route for hospitality, business and highly planned study decisions.",
    intro: "Switzerland suits students looking for specialised programs, strong professional environments and a clear understanding of higher costs.",
    bestFor: ["Hospitality, business, luxury management and international relations", "Students seeking premium specialist schools", "Families ready for detailed budget planning"],
    planningFocus: ["Compare tuition, living costs and internship structure", "Check campus location and language environment", "Understand the full cost before applying"],
    applicationNotes: ["Prepare academic, financial and passport documents early", "Confirm visa timing and deposit requirements", "Review program structure carefully"],
    studentFit: "Best for students who value specialist education and can plan a premium budget responsibly.",
    cityAndLifestyle: "Swiss cities are orderly, international and high-cost, with lifestyle quality tied closely to budget planning.",
    nextStep: "Share your course goal and budget range so we can judge if Switzerland is the right specialist route."
  },
  cyprus: {
    headline: "An accessible Mediterranean route for students comparing flexible intakes and costs.",
    intro: "Cyprus can suit students who want a warmer European setting, practical entry points and a manageable study environment.",
    bestFor: ["Business, hospitality, IT and foundation-style routes", "Students comparing affordable European options", "Applicants looking for flexible intakes"],
    planningFocus: ["Check institution recognition and course structure", "Compare tuition with accommodation and living costs", "Plan visa documents in the correct sequence"],
    applicationNotes: ["Prepare academics, passport and funds together", "Confirm intake dates and deposit requirements", "Check any interview or English requirements"],
    studentFit: "Best for students who want a practical European-style route without the pressure of larger destinations.",
    cityAndLifestyle: "The island setting can be relaxed and student-friendly, but location and transport should be reviewed before choosing.",
    nextStep: "Tell us your course area and budget so we can compare Cyprus with Malta, Poland and UAE."
  },
  singapore: {
    headline: "A compact regional hub for business, technology and globally connected study.",
    intro: "Singapore suits students who want a highly organised city, strong business links and a focused academic environment.",
    bestFor: ["Business, finance, computing and logistics-related programs", "Students who want a compact global city", "Applicants comparing Asian study hubs"],
    planningFocus: ["Compare private and partner institution routes", "Review tuition and living costs carefully", "Check entry requirements and award structure"],
    applicationNotes: ["Prepare academic and passport documents early", "Confirm visa pass guidance with the institution", "Check payment deadlines and intake availability"],
    studentFit: "Best for students who like efficient city life, professional exposure and a structured study setting.",
    cityAndLifestyle: "Singapore is clean, connected and fast-paced, but the cost of living needs clear planning.",
    nextStep: "Share your subject and budget so we can compare Singapore with Malaysia and UAE options."
  },
  finland: {
    headline: "A northern European route for tech-minded, independent and well-prepared students.",
    intro: "Finland appeals to students who want modern education, technology-oriented programs and a quieter European lifestyle.",
    bestFor: ["Technology, business, sustainability and applied sciences", "Students comfortable with independent living", "Applicants looking for scholarship-aware planning"],
    planningFocus: ["Check scholarship deadlines and tuition rules", "Plan for climate, housing and living costs", "Compare university and applied sciences routes"],
    applicationNotes: ["Prepare academics and English evidence early", "Track application windows carefully", "Confirm residence permit and financial requirements"],
    studentFit: "Best for students who like calm environments, strong systems and early application planning.",
    cityAndLifestyle: "Finnish cities are safe and organised, with winter lifestyle and independence being important fit factors.",
    nextStep: "Tell us your subject and intake goal so we can check Finland deadlines and scholarship possibilities."
  },
  sweden: {
    headline: "An innovation-focused route for students interested in design, sustainability and tech.",
    intro: "Sweden suits students who value modern teaching, international classrooms and a society known for innovation and equality.",
    bestFor: ["Engineering, sustainability, design, business and technology", "Students comparing Nordic education", "Applicants who can meet central application deadlines"],
    planningFocus: ["Check program deadlines and documentation windows", "Plan living costs and housing early", "Compare scholarship availability before applying"],
    applicationNotes: ["Prepare transcripts, English proof and ranking choices", "Track application portal steps carefully", "Confirm residence permit and financial requirements"],
    studentFit: "Best for students who want a progressive study environment and can plan early with attention to detail.",
    cityAndLifestyle: "Stockholm and Gothenburg are international and high-demand; smaller cities may feel more campus-focused.",
    nextStep: "Share your subject area and budget so we can compare Sweden with Finland, Denmark and Netherlands."
  },
  lithuania: {
    headline: "A practical Baltic route for affordability, business and technology programs.",
    intro: "Lithuania is useful for students seeking a European destination with manageable costs and growing English-taught options.",
    bestFor: ["Business, IT, engineering and health-related routes", "Students comparing affordable Europe", "Applicants who want smaller student cities"],
    planningFocus: ["Check course recognition and English-taught availability", "Compare Vilnius and other city costs", "Plan visa and residence documents early"],
    applicationNotes: ["Prepare academic records, passport and financial proof", "Confirm document translation requirements", "Track deadlines and admission steps"],
    studentFit: "Best for students who want a European route with practical costs and a less crowded study environment.",
    cityAndLifestyle: "Vilnius is compact, green and student-friendly, with a quieter pace than larger Western European cities.",
    nextStep: "Tell us your academic background and course target so we can compare Lithuania with Poland and Hungary."
  },
  denmark: {
    headline: "A selective Nordic route for applied learning and carefully matched programs.",
    intro: "Denmark suits students who want high-quality education, project-based learning and a realistic plan around limited program availability.",
    bestFor: ["Business, engineering, design and sustainability-related routes", "Students who value applied teaching", "Applicants who can meet strict deadlines"],
    planningFocus: ["Check whether your course is available in English", "Compare tuition and living costs honestly", "Plan housing early"],
    applicationNotes: ["Prepare documents before deadline windows", "Confirm English and academic entry requirements", "Review residence and financial steps"],
    studentFit: "Best for students who want a structured Nordic environment and are ready to apply early.",
    cityAndLifestyle: "Copenhagen is highly attractive and expensive; smaller cities can be more manageable and campus-oriented.",
    nextStep: "Share your subject and timeline so we can see whether Denmark has a realistic route for you."
  },
  austria: {
    headline: "A central European route for students balancing culture, language and academic fit.",
    intro: "Austria works for students who want European study in a central location with careful attention to language and documentation.",
    bestFor: ["Business, tourism, music, technology and applied programs", "Students comparing German-speaking Europe", "Applicants open to language planning"],
    planningFocus: ["Check English-taught versus German-taught availability", "Compare Vienna with smaller cities", "Plan document legalisation and visa timing"],
    applicationNotes: ["Prepare transcripts, passport and financial evidence", "Confirm translation or legalisation needs", "Track residence permit requirements"],
    studentFit: "Best for students who want a cultured European setting and can prepare documents carefully.",
    cityAndLifestyle: "Vienna offers major cultural value and strong transport, while smaller cities can feel calmer and student-centred.",
    nextStep: "Tell us your language level and course goal so we can compare Austria with Germany and Switzerland."
  },
  belgium: {
    headline: "A multilingual European route for business, policy, technology and international exposure.",
    intro: "Belgium suits students who want a central European location, international cities and a mix of language and academic options.",
    bestFor: ["Business, international relations, EU policy and technology", "Students comparing Brussels and regional campuses", "Applicants comfortable with multilingual environments"],
    planningFocus: ["Check language of instruction by program", "Compare city costs and campus location", "Plan residence and document steps early"],
    applicationNotes: ["Prepare transcripts, English proof and passport", "Confirm translations if required", "Track visa and housing timelines"],
    studentFit: "Best for students who want a connected European base and can navigate a multilingual setting.",
    cityAndLifestyle: "Brussels feels international and policy-focused; other cities can offer a more traditional student atmosphere.",
    nextStep: "Share your course area and preferred language of study so we can compare Belgium routes accurately."
  },
  "united-states-of-america": {
    headline: "A broad route for students who need careful shortlisting across thousands of options.",
    intro: "The USA suits students who want wide academic choice, campus variety and a shortlist built around fit rather than brand names alone.",
    bestFor: ["Business, STEM, liberal arts and specialist programs", "Students wanting large campus choice", "Applicants who can plan funding and documents early"],
    planningFocus: ["Compare program quality, location, fees and scholarships", "Check testing and English requirements", "Build a balanced shortlist by reach, fit and budget"],
    applicationNotes: ["Prepare transcripts, English scores and financial proof", "Plan essays or statements where required", "Confirm I-20 and visa steps after admission"],
    studentFit: "Best for students who want maximum choice and are ready for a detailed application strategy.",
    cityAndLifestyle: "The experience varies dramatically by state, city and campus type, so lifestyle fit is a major decision point.",
    nextStep: "Send your grades, course area and funding plan so we can narrow USA options into a realistic shortlist."
  },
  greece: {
    headline: "A Mediterranean route for students comparing business, hospitality and cost-aware study.",
    intro: "Greece can suit students who want a warmer European destination, approachable lifestyle and practical programs in business or hospitality.",
    bestFor: ["Hospitality, tourism, business and humanities-related routes", "Students comparing Mediterranean Europe", "Applicants who want a balanced cost profile"],
    planningFocus: ["Check course language and institution recognition", "Compare Athens with smaller city options", "Plan living costs and documents before applying"],
    applicationNotes: ["Prepare academic, passport and financial documents", "Confirm translations or attestations if required", "Track visa appointment timing"],
    studentFit: "Best for students who want European study with a warmer lifestyle and practical course choices.",
    cityAndLifestyle: "Athens is active and historic; island or regional settings may feel quieter but need closer transport planning.",
    nextStep: "Share your study interest and budget so we can compare Greece with Cyprus, Malta and Italy."
  },
  georgia: {
    headline: "An accessible route often considered for medicine, business and budget-sensitive study.",
    intro: "Georgia appeals to students seeking manageable costs, direct study routes and a compact international student environment.",
    bestFor: ["Medicine, business and applied undergraduate routes", "Students comparing affordable options", "Applicants who need clear document guidance"],
    planningFocus: ["Check institution recognition for your intended career", "Compare tuition, living costs and city setting", "Review visa or residence steps early"],
    applicationNotes: ["Prepare academics, passport and financial documents", "Confirm translation or notarisation requirements", "Check intake and arrival timelines"],
    studentFit: "Best for students who want an accessible study route and need careful confirmation of recognition and progression.",
    cityAndLifestyle: "Tbilisi has a growing student scene with lower costs than many Western destinations, but planning support remains important.",
    nextStep: "Tell us your course goal and long-term plan so we can verify whether Georgia is suitable."
  },
  japan: {
    headline: "A culture-rich route for students prepared for language, structure and long-term planning.",
    intro: "Japan suits students interested in technology, business, culture and a highly organised study environment where preparation matters.",
    bestFor: ["Technology, business, language, design and culture-related programs", "Students interested in Asia-focused careers", "Applicants willing to plan language and documents early"],
    planningFocus: ["Check English-taught options versus Japanese-language routes", "Plan living costs and city choice carefully", "Allow time for certificate and visa steps"],
    applicationNotes: ["Prepare academic records, passport and financial proof", "Confirm language requirements and application windows", "Track COE and visa timelines if applicable"],
    studentFit: "Best for students who are curious, disciplined and ready for a distinct academic and cultural environment.",
    cityAndLifestyle: "Tokyo is intense and connected; regional cities may offer a calmer student life and different cost profile.",
    nextStep: "Share your course area and language comfort so we can compare Japan routes by fit and timeline."
  }
};

export function getDestinationGuide(destination: StudyDestination): DestinationGuide {
  return destinationGuides[destination.slug] ?? {
    headline: `A focused study route for students comparing ${destination.label} with clearer priorities.`,
    intro: `${destination.label} can be considered when the course, budget, entry requirements and lifestyle all make sense together.`,
    bestFor: ["Students comparing multiple study abroad options", "Applicants who want a practical shortlist", "Families looking for clear next steps"],
    planningFocus: ["Check course fit before choosing the country", "Compare tuition, living cost and intake timing", "Plan documents before application deadlines"],
    applicationNotes: ["Prepare academic records and passport early", "Confirm English and entry requirements", "Keep financial documents consistent"],
    studentFit: `Best for students who want to evaluate ${destination.label} through fit, budget and timeline instead of choosing by popularity alone.`,
    cityAndLifestyle: "The right city or campus depends on your budget, accommodation needs and preferred daily lifestyle.",
    nextStep: `Share your profile so we can compare ${destination.label} with nearby destination options.`
  };
}

const destinationHeroImages: Record<string, string> = {
  "united-kingdom": "/images/uk-study-hero-ai.webp",
  "united-arab-emirates": "/images/destination-hero-united-arab-emirates-ai.webp",
  malta: "/images/destination-hero-malta-ai.webp",
  spain: "/images/destination-hero-spain-ai.webp",
  france: "/images/destination-hero-france-ai.webp",
  poland: "/images/destination-hero-poland-ai.webp",
  canada: "/images/destination-hero-canada-ai.webp",
  australia: "/images/destination-hero-australia-ai.webp",
  germany: "/images/destination-hero-germany-ai.webp",
  "united-states-of-america": "/images/destination-hero-united-states-of-america-ai.webp",
  singapore: "/images/destination-hero-singapore-ai.webp",
  japan: "/images/destination-hero-japan-ai.webp",
  malaysia: "/images/destination-hero-malaysia-ai.webp",
  ireland: "/images/destination-hero-ireland-ai.webp",
  "new-zealand": "/images/destination-hero-new-zealand-ai.webp",
  netherlands: "/images/destination-hero-netherlands-ai.webp",
  hungary: "/images/destination-hero-hungary-ai.webp",
  italy: "/images/destination-hero-italy-ai.webp",
  switzerland: "/images/destination-hero-switzerland-ai.webp",
  cyprus: "/images/destination-hero-cyprus-ai.webp",
  finland: "/images/destination-hero-finland-ai.webp",
  sweden: "/images/destination-hero-sweden-ai.webp",
  denmark: "/images/destination-hero-denmark-ai.webp",
  lithuania: "/images/destination-hero-lithuania-ai.webp",
  austria: "/images/destination-hero-austria-ai.webp",
  belgium: "/images/destination-hero-belgium-ai.webp",
  greece: "/images/destination-hero-greece-ai.webp",
  georgia: "/images/destination-hero-georgia-ai.webp"
};

const destinationHeroCopy: Record<string, Partial<DestinationHero>> = {
  "united-kingdom": {
    eyebrow: "UK study route",
    title: "Build your UK",
    accent: "study plan.",
    copy: "Compare UK universities, London and regional study options, pathway routes, intakes, CAS preparation and visa-ready documents before you apply.",
    focusLabel: "UK application focus",
    cardTitle: "Shortlist with purpose",
    cardStat: "UK institutions, pathways and intake options"
  },
  "united-arab-emirates": {
    eyebrow: "UAE campus route",
    title: "Plan your UAE",
    accent: "campus move.",
    copy: "Compare Dubai, Sharjah, Ajman and Ras Al Khaimah options by campus style, fee range, commute, intake timing and visa support.",
    focusLabel: "UAE application focus",
    cardTitle: "Compare emirates carefully",
    cardStat: "Dubai and wider UAE campus options"
  },
  malta: {
    eyebrow: "Malta study route",
    title: "Choose Malta",
    accent: "with clarity.",
    copy: "Compare Malta business schools, English-taught routes, compact island living, accommodation planning and visa document timing before you apply.",
    focusLabel: "Malta planning focus",
    cardTitle: "Small destination, clear details",
    cardStat: "business, hospitality and cost-aware options"
  },
  spain: {
    eyebrow: "Spain study route",
    title: "Map your Spain",
    accent: "city route.",
    copy: "Compare Barcelona and Madrid study options, business school routes, English-taught programs, private fees and visa document timelines.",
    focusLabel: "Spain application focus",
    cardTitle: "Match city with course",
    cardStat: "Barcelona, Madrid and English-taught options"
  },
  france: {
    eyebrow: "France study route",
    title: "Shape your France",
    accent: "study plan.",
    copy: "Compare French business, design and management routes by city, language of instruction, tuition range and document preparation needs.",
    focusLabel: "France application focus",
    cardTitle: "Plan beyond Paris",
    cardStat: "business, design and management options"
  },
  poland: {
    eyebrow: "Poland study route",
    title: "Build a Poland",
    accent: "value plan.",
    copy: "Compare Poland routes by city cost, English-taught availability, campus support, entry requirements and European study budget fit.",
    focusLabel: "Poland planning focus",
    cardTitle: "Value needs structure",
    cardStat: "affordable European study routes"
  },
  canada: {
    eyebrow: "Canada study route",
    title: "Shape your Canada",
    accent: "program plan.",
    copy: "Compare Canadian colleges and universities by program level, province, total funds, intake timing and study-plan document readiness.",
    focusLabel: "Canada application focus",
    cardTitle: "Province and program first",
    cardStat: "college, university and document-ready routes"
  },
  australia: {
    eyebrow: "Australia study route",
    title: "Plan your Australia",
    accent: "campus path.",
    copy: "Compare Australian cities, campus lifestyle, course duration, tuition range, health cover and visa-ready evidence before you apply.",
    focusLabel: "Australia planning focus",
    cardTitle: "Campus life needs planning",
    cardStat: "city, course and arrival-ready options"
  },
  germany: {
    eyebrow: "Germany study route",
    title: "Balance Germany",
    accent: "with detail.",
    copy: "Compare German public and private routes, language requirements, deadline windows, technical programs and financial-document readiness.",
    focusLabel: "Germany application focus",
    cardTitle: "Requirements decide the route",
    cardStat: "public, private and technical study routes"
  },
  "united-states-of-america": {
    eyebrow: "USA study route",
    title: "Build a USA",
    accent: "shortlist.",
    copy: "Compare US campuses by program fit, state, tuition, scholarships, application documents, I-20 readiness and visa preparation.",
    focusLabel: "USA application focus",
    cardTitle: "Choice needs filtering",
    cardStat: "campus, funding and application options"
  },
  singapore: {
    eyebrow: "Singapore study route",
    title: "Choose Singapore",
    accent: "with precision.",
    copy: "Compare Singapore business and technology routes by institution type, award structure, tuition, living cost and student pass guidance.",
    focusLabel: "Singapore planning focus",
    cardTitle: "Compact, career-focused",
    cardStat: "business, finance and technology options"
  },
  japan: {
    eyebrow: "Japan study route",
    title: "Prepare for Japan",
    accent: "properly.",
    copy: "Compare Japanese English-taught and language-supported routes by course area, city, document timing, COE steps and cultural fit.",
    focusLabel: "Japan application focus",
    cardTitle: "Language and timeline matter",
    cardStat: "technology, business and culture-focused routes"
  },
  malaysia: {
    eyebrow: "Malaysia study route",
    title: "Compare Malaysia",
    accent: "by value.",
    copy: "Compare Malaysia branch campuses, English-taught routes, tuition value, transfer options, living costs and visa processing timelines.",
    focusLabel: "Malaysia planning focus",
    cardTitle: "Affordable does not mean vague",
    cardStat: "international campus and value-focused routes"
  },
  ireland: {
    eyebrow: "Ireland study route",
    title: "Plan Ireland",
    accent: "early.",
    copy: "Compare Irish technology and business routes by city, course fit, intake timing, accommodation pressure and visa-ready documents.",
    focusLabel: "Ireland planning focus",
    cardTitle: "Course and housing together",
    cardStat: "tech, business and English-speaking Europe routes"
  },
  "new-zealand": {
    eyebrow: "New Zealand study route",
    title: "Choose New Zealand",
    accent: "calmly.",
    copy: "Compare New Zealand courses by city size, applied learning, arrival support, accommodation, insurance and total budget.",
    focusLabel: "New Zealand planning focus",
    cardTitle: "Lifestyle fit matters",
    cardStat: "applied learning and arrival-ready routes"
  },
  netherlands: {
    eyebrow: "Netherlands study route",
    title: "Start the Netherlands",
    accent: "early.",
    copy: "Compare Dutch English-taught programs by deadline, university type, housing pressure, city cost and residence planning.",
    focusLabel: "Netherlands application focus",
    cardTitle: "Deadlines shape the route",
    cardStat: "English-taught and housing-aware options"
  },
  hungary: {
    eyebrow: "Hungary study route",
    title: "Compare Hungary",
    accent: "by fit.",
    copy: "Compare Hungary routes by course area, entrance requirements, English-taught availability, city cost and document readiness.",
    focusLabel: "Hungary planning focus",
    cardTitle: "Entry rules come first",
    cardStat: "medicine, business and Central Europe options"
  },
  italy: {
    eyebrow: "Italy study route",
    title: "Shape Italy",
    accent: "creatively.",
    copy: "Compare Italian design, fashion, business and hospitality routes by city, language, pre-enrolment steps and document legalisation.",
    focusLabel: "Italy application focus",
    cardTitle: "Creativity needs paperwork",
    cardStat: "design, business and culture-rich options"
  },
  switzerland: {
    eyebrow: "Switzerland study route",
    title: "Plan Switzerland",
    accent: "premium.",
    copy: "Compare Swiss hospitality, business and specialist programs by tuition, internship structure, living cost and visa document timing.",
    focusLabel: "Switzerland planning focus",
    cardTitle: "Premium needs precision",
    cardStat: "hospitality, business and specialist options"
  },
  cyprus: {
    eyebrow: "Cyprus study route",
    title: "Compare Cyprus",
    accent: "simply.",
    copy: "Compare Cyprus intakes, practical course routes, tuition range, accommodation, institution fit and visa document order.",
    focusLabel: "Cyprus planning focus",
    cardTitle: "Accessible still needs checks",
    cardStat: "Mediterranean and flexible-intake routes"
  },
  finland: {
    eyebrow: "Finland study route",
    title: "Start Finland",
    accent: "on time.",
    copy: "Compare Finland technology, business and applied-science routes by scholarship deadlines, winter lifestyle, residence permit and funds.",
    focusLabel: "Finland application focus",
    cardTitle: "Deadlines carry the plan",
    cardStat: "technology, scholarship and applied routes"
  },
  sweden: {
    eyebrow: "Sweden study route",
    title: "Choose Sweden",
    accent: "early.",
    copy: "Compare Swedish innovation, sustainability, design and technology routes by central deadlines, housing, scholarship and budget fit.",
    focusLabel: "Sweden planning focus",
    cardTitle: "Innovation with structure",
    cardStat: "design, tech and sustainability options"
  },
  denmark: {
    eyebrow: "Denmark study route",
    title: "Assess Denmark",
    accent: "realistically.",
    copy: "Compare Denmark applied-learning routes by English-taught availability, city cost, housing, selective deadlines and financial planning.",
    focusLabel: "Denmark planning focus",
    cardTitle: "Selective means early",
    cardStat: "applied learning and Nordic study routes"
  },
  lithuania: {
    eyebrow: "Lithuania study route",
    title: "Compare Lithuania",
    accent: "practically.",
    copy: "Compare Lithuania technology, business and affordable Europe routes by entry rules, English-taught options, city cost and visa documents.",
    focusLabel: "Lithuania planning focus",
    cardTitle: "Affordable needs evidence",
    cardStat: "Baltic Europe and practical study routes"
  },
  austria: {
    eyebrow: "Austria study route",
    title: "Plan Austria",
    accent: "carefully.",
    copy: "Compare Austria routes by English or German study language, city fit, document legalisation, residence steps and fee planning.",
    focusLabel: "Austria application focus",
    cardTitle: "Language shapes the plan",
    cardStat: "Central Europe and culture-rich options"
  },
  belgium: {
    eyebrow: "Belgium study route",
    title: "Choose Belgium",
    accent: "strategically.",
    copy: "Compare Belgium routes by Brussels and regional campuses, language of instruction, international exposure, residence steps and city costs.",
    focusLabel: "Belgium planning focus",
    cardTitle: "International, multilingual, precise",
    cardStat: "business, policy and EU-centred options"
  },
  greece: {
    eyebrow: "Greece study route",
    title: "Compare Greece",
    accent: "with balance.",
    copy: "Compare Greece business, hospitality and Mediterranean study routes by course language, city cost, documents and visa timing.",
    focusLabel: "Greece planning focus",
    cardTitle: "Lifestyle still needs structure",
    cardStat: "Mediterranean business and hospitality routes"
  },
  georgia: {
    eyebrow: "Georgia study route",
    title: "Check Georgia",
    accent: "properly.",
    copy: "Compare Georgia routes by course recognition, tuition, city cost, translation or notarisation needs and long-term study goals.",
    focusLabel: "Georgia planning focus",
    cardTitle: "Recognition comes first",
    cardStat: "accessible and document-aware study routes"
  }
};

export function getDestinationHero(destination: StudyDestination): DestinationHero {
  const guide = getDestinationGuide(destination);
  const copy = destinationHeroCopy[destination.slug] ?? {};

  return {
    image: destinationHeroImages[destination.slug] ?? "/images/study-destinations-ai-hero.webp",
    eyebrow: copy.eyebrow ?? `${destination.label} study route`,
    title: copy.title ?? `Plan your ${destination.label}`,
    accent: copy.accent ?? "study route.",
    copy: copy.copy ?? guide.intro,
    focusLabel: copy.focusLabel ?? `${destination.label} planning focus`,
    cardTitle: copy.cardTitle ?? "Shortlist with purpose",
    cardStat: copy.cardStat ?? `${destination.label} course, cost and intake options`
  };
}
