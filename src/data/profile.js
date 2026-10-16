// Single source of truth for resume-driven content.
// The landing page, /work, /projects, and /about all read from here, so update
// this file (and public/documents/NelsonRodriguez.pdf) together.

// Non-breaking spaces keep a name on one line when the surrounding text wraps on phones.
const keepTogether = (text) => text.replace(/ /g, '\u00A0');

const collegeOfComputingUrl = 'https://www.cc.gatech.edu';

export const profile = {
  name: 'Nelson Rodriguez',
  role: 'Solutions Engineer',
  company: 'Fullstory',
  companyUrl: 'https://www.fullstory.com',
  location: 'Currently Atlanta, GA',
  // IANA zone for the live clock in the sidebar ("Currently Atlanta, GA · 14:03:22").
  timeZone: 'America/New_York',
  // Sidebar: a short line under the name and a two-line bio.
  // Rendered as "Computer Enjoyer · Engineer" with the school on the line below, linking to the College of Computing.
  tagline: ['Computer Enjoyer', 'Engineer'],
  school: { label: 'Georgia Tech CS', href: collegeOfComputingUrl },
  bio: "I build across mobile SDKs, AI workflows and full-stack web, often working directly in customers' codebases.",
  // Sidebar "Previously at" line, newest first.
  // Phone home page: a typed line cycling through "<role> at <company>." and then these (from the old hero).
  typedLines: [
    'Algorithms practitioner, intentional problem solver.',
    'Humanistic, design-minded software engineer.',
    'Georgia\u00A0Tech CS alum, information networks focus.',
    'Car enthusiast, hybrid athlete, iced coffee enjoyer.',
    'Kaizen as a practice - aiming to be 1% better every day.',
  ],
  // `href` makes the name a link; `tone` picks its hover color in the sidebar.
  previously: [
    { name: 'Civic Digital Experience', href: 'https://www.linkedin.com/company/civicdx/home/', tone: 'civic' },
    { name: 'eKlozet' },
    { name: 'GT WebDev' },
  ],
  email: 'neroxv1313@gmail.com',
  resumeUrl: '/documents/NelsonRodriguez.pdf',
  linkedin: 'https://www.linkedin.com/in/nelson-rodriguez13/',
  github: 'https://github.com/Yugenero',
  instagram: 'https://www.instagram.com/ne.ro.x/',
  openToWork: true,
  // false locks /photography: the nav link is disabled, the route redirects home, the landing strip isn't a link.
  photographyOpen: false,
  // Shown after "<role> at <company>." in the landing hero.
  pitch:
    "A technical + customer-facing solutions engineering role: I work directly in customers' codebases to implement Fullstory Mobile SDK and build proofs of concept. Part of my work includes building AI/automation workflows and internal tools. Before that, full-stack React + .NET.",
};

export const quickFacts = [
  { label: 'Focus', value: 'AI workflows · MCPs · Integrations · Full-stack engineering' },
  // `link` renders after the value as " · <link>".
  {
    label: 'Education',
    value: 'B.S. Computer Science',
    link: { label: keepTogether('Georgia Tech'), href: collegeOfComputingUrl },
  },
  { label: 'Based in', value: 'Atlanta, GA · Open to relocation' },
];

export const workExperience = [
  {
    employer: 'Fullstory, Inc.',
    url: 'https://www.fullstory.com',
    // Logo replaces the employer name in the Experience title, as a monochrome silhouette.
    // `ratio` = SVG viewBox width / height; optional `scale` (default 1) sizes it against the title;
    // `descent` = share of its height below the text baseline.
    // `tone` picks the logo's hover color on /work (brand colors from profileParts.jsx).
    logo: { src: '/images/logos/fullstory.svg', ratio: 130 / 25, descent: 0.24, tone: 'fullstory' },
    location: 'Atlanta, GA',
    date: 'Dec 2025 — Present',
    title: 'Solutions Engineer',
    summary:
      'Customer-facing solutions engineering: implementing the Fullstory Mobile SDK in customer codebases, building POCs, and engineering AI workflows and internal tools on the side.',
    highlights: [
      'Meet with customer engineering teams and work hands-on in their React Native, iOS, and Android codebases to get the Fullstory Mobile SDK implemented when the documented setup does not land on its own.',
      'Build customer proofs of concept and demo apps across React Native, Swift, SwiftUI, Java, Kotlin, and Flutter to validate SDK behavior on each customer stack.',
      'Design and implement AI and automation workflows that take repetitive work off the solutions engineering team.',
      'Build internal tools that make customer implementations and troubleshooting faster for the team.',
      'Partner closely with Production Engineering, turning customer-reported issues into minimal repro projects with logs and stack traces, and verifying the fixes.',
    ],
    stack: ['React Native', 'Swift / SwiftUI', 'Kotlin', 'Java', 'Flutter', 'TypeScript', 'AI workflows'],
  },
  {
    employer: 'Civic Digital Experience, Inc.',
    url: 'https://www.linkedin.com/company/civicdx/home/',
    // `tone` picks the employer link's hover color on /work (light blue, as in the sidebar).
    tone: 'civic',
    location: 'Atlanta, GA',
    date: 'Oct 2024 — Jul 2025',
    title: 'Software Engineer',
    summary:
      'Internal operations, finance, and asset-management platform serving 20,000+ ABM Industries contractors.',
    highlights: [
      'Built a global dataset filtering pipeline in React and C#/.NET, persisting filter state in MongoDB and querying Snowflake, which cut filter latency by over 40%.',
      'Architected C#/.NET services on SOLID and Clean Architecture principles to keep the backend maintainable as the platform scaled.',
      'Shipped 30+ reusable stateful React components that standardized UI across modules and sped internal feature roll-out by 50%.',
      'Developed 12+ asset-management pages and a bottom-up client-portal routing system for the contractor application.',
    ],
    stack: ['React', 'C# / .NET', 'MongoDB', 'Snowflake'],
  },
  {
    employer: 'eKlozet Designer Consignment',
    // `tone` picks the employer's highlight color on /work (rose; see profileParts.jsx).
    tone: 'eklozet',
    location: 'Atlanta, GA',
    date: 'Jan 2022 — Dec 2022',
    title: 'Software Engineer Intern',
    summary: 'iOS fashion platform used by 10,000+ people, with personalization and calendar-aware outfit planning.',
    highlights: [
      'Implemented item–item collaborative-filtering recommendations and bidirectional Google Calendar sync.',
      'Designed the SQL schema and ETL pipeline merging interaction logs, catalog, and preferences, with sub-5ms recommendation retrieval.',
      `Ran Agile delivery with Git and Jira; placed 2nd of 30+ teams at the Fall 2022 ${keepTogether('Georgia Tech')} CS Capstone Expo.`,
    ],
    stack: ['Swift', 'SQL', 'ETL', 'REST APIs'],
  },
  {
    employer: 'GT WebDev',
    tone: 'webdev',
    location: 'Atlanta, GA',
    date: 'Aug 2020 — May 2021',
    title: 'Web Developer',
    summary: 'Contributed to student-led web apps and taught front-end workflows across campus teams.',
    highlights: [
      'Built MUI-driven UI features for HackGT web experiences.',
      'Hosted front-end workshops that grew attendance by 50%.',
    ],
    stack: ['React', 'MUI', 'Git'],
  },
];

export const education = {
  school: keepTogether('Georgia Institute of Technology'),
  url: 'https://www.gatech.edu',
  collegeUrl: collegeOfComputingUrl,
  logo: { src: '/images/logos/georgia-tech.svg', ratio: 720 / 162, scale: 1.6, descent: 0.26, tone: 'school' },
  degree: 'B.S. Computer Science',
  date: 'Aug 2020 — Dec 2023',
  coursework: [
    'Data Structures & Algorithms',
    'Design & Analysis of Algorithms',
    'Software Engineering',
    'Database Systems',
    'Computer Architecture',
    'Systems & Networks',
  ],
};

export const skillGroups = [
  {
    label: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Java', 'C#', 'Swift', 'Kotlin', 'SQL'],
  },
  {
    label: 'Mobile',
    items: ['React Native', 'iOS / SwiftUI', 'Android', 'Flutter', 'SDK instrumentation'],
  },
  {
    label: 'Web & backend',
    items: ['React', 'Node / Express', '.NET', 'Flask', 'Django', 'Tailwind', 'MUI'],
  },
  {
    label: 'Data & infra',
    items: ['MongoDB', 'Snowflake', 'Firebase', 'Docker', 'Kubernetes', 'Azure', 'LangChain'],
  },
];

export const projects = [
  {
    title: 'Zenith',
    kind: 'iOS application',
    date: 'Jul 2025 — Present',
    description:
      'React Native app that helps people navigate careers using deterministic semantic analysis, with GPT/LangChain-generated insights and Firebase onboarding and auth.',
    stack: ['React Native', 'Firebase', 'LangChain', 'OpenAI'],
    link: 'https://github.com/Yugenero/Zenith',
  },
  {
    title: 'Running Sonification Engine',
    kind: 'Research simulator',
    date: 'Jun 2023 — Jul 2023',
    description:
      'Real-time audio feedback system that turns runner cadence and physical data into performance cues; improved pace consistency by 20% in user testing.',
    stack: ['Java', 'Processing', 'Audio UX'],
    link: 'https://github.com/Yugenero/RodriguezNelson_Simulator',
  },
  {
    title: 'Nexus',
    kind: 'Blogging platform',
    date: '',
    description:
      'Full-stack publishing app built with React hooks and Context, Express APIs, and MongoDB-backed authentication.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB'],
    link: 'https://github.com/Yugenero/Nexus',
  },
];
