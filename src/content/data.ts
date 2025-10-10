export const SITE = {
  name: "Ishwaq Syed",
  role: "Full-Stack Developer & AI Engineer",
  title: "Ishwaq Syed • Full-Stack Developer & AI Engineer",
  description:
    "Portfolio of Ishwaq Syed — Full-Stack Developer & AI Engineer. Premium interactive experience, stellar visuals, and selected projects.",
  email: "ishwaqsyed@example.com",
  location: "Hyderabad, India",
};

export const BRANDS = [
  "Open Source",
  "Early-stage Startups",
  "EdTech",
  "FinTech",
  "AI Labs",
  "Community",
];

export const EXPERIENCE = [
  {
    title: "AI Brand Manager Platform",
    period: "2024 — Present",
    points: [
      "Built OAuth flows and posting pipelines across multiple social networks with modular Node.js backend and CI/CD.",
      "Unified posting, analytics, and token management; Dockerized dev + GitHub Actions.",
    ],
  },
  {
    title: "Notemate — EdTech",
    period: "2023 — 2024",
    points: [
      "Flutter + Firebase superapp for notes, announcements, and AI assistant.",
      "Realtime sync & offline access; AI chatbot for study help.",
    ],
  },
  {
    title: "Remote Access Utility",
    period: "2022 — 2023",
    points: [
      "Cross-platform remote desktop and system monitoring with secure encryption and performance tuning.",
      "AES-256 encryption + MFA; Adaptive quality + failover.",
    ],
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Ishwaq ships quickly with quality, bringing clarity to complex integrations. Our social posting pipeline felt simple for the first time.",
    name: "Product Lead",
    meta: "AI Startup",
  },
  {
    quote:
      "His attention to UX details transformed our app from functional to delightful. The result was faster onboarding and happier users.",
    name: "Founder",
    meta: "EdTech",
  },
  {
    quote:
      "Strong sense of ownership. He anticipates edge cases and designs for scale. A great addition to any high-velocity team.",
    name: "Engineering Manager",
    meta: "Community",
  },
];

export const STATS = [
  { label: "Years Experience", value: "3" },
  { label: "Projects Built", value: "15+" },
  { label: "Technologies", value: "5+" },
];

export const SKILLS = [
  {
    icon: "code",
    title: "Full-Stack Development",
    items: [
      "Flutter with Firebase Authentication",
      "Modern Gen Z-styled Websites",
      "Node.js & FastAPI Backend",
      "Python Development",
      "Responsive UI/UX Design",
    ],
  },
  {
    icon: "robot",
    title: "AI Integration",
    items: [
      "Mistral 7B & DeepSeek Models",
      "Hugging Face Transformers",
      "Llama Models on GPU",
      "AI-powered Tools & Automation",
      "Misinformation Detection Systems",
    ],
  },
  {
    icon: "share",
    title: "Platform Integrations",
    items: [
      "OAuth Flows Implementation",
      "Twitter & Instagram APIs",
      "LinkedIn & Reddit Integration",
      "Threads & Facebook APIs",
      "Modular Backend Architecture",
    ],
  },
];

export const PROJECTS = [
  {
    title: "Notemate",
    type: "Educational Platform",
    status: "Live",
    description:
      "App for teachers and students to share notes, announcements, and get AI-driven assistance.",
    detailedDescription: "A comprehensive educational platform that revolutionizes classroom interaction. Features include real-time note sharing, automated announcements, AI-powered study assistance, and seamless collaboration tools. Built with Flutter for cross-platform compatibility and Firebase for real-time synchronization.",
    features: ["Real-time note synchronization", "AI chatbot for study help", "Automated announcements", "Offline access", "Multi-user collaboration", "Smart search functionality"],
    tech: ["Flutter", "Firebase", "AI APIs", "Real-time Database", "Cloud Functions"],
    stats: { users: "500+", rating: "4.8/5", downloads: "2K+" },
    tags: ["Flutter", "Firebase", "AI Integration", "Real-time"],
    links: [
      { label: "Live Demo", href: "https://www.ishwaqsyed.me" },
      { label: "Source", href: "https://www.ishwaqsyed.me" },
    ],
  },
  {
    title: "AI-FOLIO",
    type: "AI Portfolio Builder",
    status: "Live",
    description:
      "AI-powered portfolio maker: create a portfolio by chatting or uploading your resume, then get 10 unique downloadable templates and a live site.",
    detailedDescription:
      "AI-FOLIO is an AI-based portfolio builder that lets users create a professional portfolio by answering a chatbot's questions or uploading their resume. The system scans the resume, extracts key information, and automatically generates 10 different portfolio template designs. Users can download a zip folder containing HTML, CSS, and JS files for all templates, and also get a live website link.",
    features: [
      "Conversational chatbot for guided portfolio creation",
      "Resume upload and automatic parsing",
      "AI-driven content extraction and formatting",
      "10 unique portfolio template designs",
      "Downloadable zip with HTML, CSS, JS for all templates",
      "Instant live website deployment",
      "Customizable sections and themes",
      "Mobile-friendly and accessible",
      "Shareable portfolio link",
      "Hosted at aifolio.ishwaqsyed.me"
    ],
    tech: ["Next.js", "OpenAI API", "Node.js", "Express", "Resume Parsing", "HTML/CSS/JS", "Vercel"],
    stats: { templates: "10", users: "1K+", resumesParsed: "2K+" },
    tags: ["AI", "Portfolio", "Chatbot", "Resume Parsing", "Web Templates"],
    links: [
      { label: "Live Website", href: "https://aifolio.ishwaqsyed.me" }
    ],
  },
  {
    title: "Steward Labs",
    type: "AI Brand Manager",
    status: "Beta",
    description:
      "AI-powered Brand Manager unifying social platforms into one dashboard with analytics.",
    detailedDescription: "Revolutionary social media management platform that leverages AI to automate content creation, scheduling, and analytics across multiple social networks. Features advanced OAuth implementations, intelligent content suggestions, and comprehensive performance tracking.",
    features: ["Multi-platform posting", "AI content generation", "Advanced analytics", "OAuth integrations", "Automated scheduling", "Performance tracking"],
    tech: ["Node.js", "Express", "AI APIs", "OAuth 2.0", "MongoDB", "React"],
    stats: { platforms: "8+", automation: "95%", efficiency: "+300%" },
    tags: ["Node.js", "AI APIs", "Social Media", "Analytics"],
    links: [{ label: "Live Website", href: "https://www.ishwaqsyed.me" }],
  },
];

export const SOCIALS = [
  { icon: "github", href: "https://github.com/Ishwaqsyed03" },
  { icon: "linkedin", href: "https://www.linkedin.com/in/ishwaq-syed-3a4368286" },
  { icon: "twitter", href: "https://twitter.com/ishwaqsyed" },
  { icon: "instagram", href: "https://instagram.com/ishwaqsyed" },
  { icon: "mail", href: "mailto:" + SITE.email },
];
