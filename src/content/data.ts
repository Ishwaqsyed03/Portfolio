export const SITE = {
    name: "Ishwaq Syed",
    role: "AI Application Engineer · LLM Developer",
    title: "Ishwaq Syed • AI Application Engineer & LLM Developer",
    description:
          "Portfolio of Ishwaq Syed — AI Application Engineer & LLM Developer. Final year CS @ JNTUH, Hyderabad. Building RAG pipelines, LLM-powered apps, and AI-integrated full-stack systems.",
    email: "ishwaqsyed@example.com",
    location: "Hyderabad, India",
};

export const BRANDS = [
    "JNTUH",
    "Open Source",
    "AI Labs",
    "Early-stage Startups",
    "HackStorm 2026",
    "Community",
  ];

export const EXPERIENCE = [
  {
        title: "ReviewGuard — AI Fake Review Detector",
        period: "2025 — Present",
        points: [
                "Built a 17-signal Gradient Boosting model achieving 93% accuracy on fake review detection, deployed via FastAPI + Next.js.",
                "Originated as a hackathon project; expanded into a production-ready tool with a REST API and a responsive TypeScript frontend.",
              ],
  },
  {
        title: "AI FOLIO — AI-Powered Portfolio Generator",
        period: "2024 — 2025",
        points: [
                "Integrated Gemini API and HuggingFace NER (dslim/bert-base-NER) for intelligent skills extraction from resumes.",
                "Built with React/Vite frontend and deployed on GitHub Pages via a Gatekeeper OAuth proxy.",
              ],
  },
  {
        title: "MultiSenseNet — Industrial Predictive Maintenance",
        period: "2024 — 2025",
        points: [
                "Final year B.Tech project: multi-sensor fusion model for industrial fault detection using Python, TensorFlow, and sensor data pipelines.",
                "Delivered a full 60-page project report with UI screenshots and system architecture diagrams.",
              ],
  },
  ];

export const TESTIMONIALS = [
  {
        quote:
                "Ishwaq ships quickly with quality, bringing clarity to complex integrations. His ReviewGuard project showed real product thinking.",
        name: "Hackathon Mentor",
        meta: "HackStorm 2026",
  },
  {
        quote:
                "His attention to UX details transformed our app from functional to delightful. The result was faster onboarding and happier users.",
        name: "Founder",
        meta: "EdTech Startup",
  },
  {
        quote:
                "Strong sense of ownership. He anticipates edge cases and designs for scale. A great addition to any high-velocity AI team.",
        name: "Engineering Manager",
        meta: "AI Labs",
  },
  ];

export const STATS = [
  { label: "AI/ML Projects", value: "10+" },
  { label: "Model Accuracy", value: "93%" },
  { label: "Technologies", value: "20+" },
  ];

export const SKILLS = [
  {
        icon: "robot",
        title: "AI & LLM Engineering",
        items: [
                "LangChain & RAG Pipelines",
                "Gemini API & HuggingFace Transformers",
                "Scikit-learn & Gradient Boosting",
                "TensorFlow / Keras",
                "Prompt Engineering & Fine-tuning",
              ],
  },
  {
        icon: "code",
        title: "Full-Stack Development",
        items: [
                "Python & FastAPI Backend",
                "React / Next.js / TypeScript",
                "Java & Spring Boot",
                "Node.js & PostgreSQL",
                "REST API Design",
              ],
  },
  {
        icon: "share",
        title: "Tools & Platforms",
        items: [
                "GitHub Actions & CI/CD",
                "Docker & Deployment",
                "Firebase & Supabase",
                "Android (Java / Room DB)",
                "Vercel & GitHub Pages",
              ],
  },
  ];

export const PROJECTS = [
  {
        title: "ReviewGuard",
        type: "AI Detection System",
        status: "Live",
        description:
                "AI-powered fake review detection system using a 17-signal Gradient Boosting model with 93% accuracy.",
        detailedDescription: "ReviewGuard is an end-to-end AI system that detects fake product reviews using 17 engineered signals including sentiment, posting pattern, and linguistic features. Built with Python, Scikit-learn, FastAPI, Next.js, and TypeScript. Originated as a hackathon project and expanded into a production-ready REST API.",
        features: ["17-signal feature engineering", "93% detection accuracy", "FastAPI REST backend", "Next.js + TypeScript frontend", "Real-time review scoring", "Explainable predictions"],
        tech: ["Python", "Scikit-learn", "FastAPI", "Next.js", "TypeScript", "Gradient Boosting"],
        stats: { accuracy: "93%", signals: "17", type: "Gradient Boosting" },
        github: "https://github.com/Ishwaqsyed03",
  },
  {
        title: "AI FOLIO",
        type: "AI Portfolio Generator",
        status: "Live",
        description:
                "AI-powered portfolio generator using Gemini API and HuggingFace NER for intelligent skills extraction.",
        detailedDescription: "AI FOLIO uses the Gemini API and HuggingFace's dslim/bert-base-NER model to extract skills and generate a personalized portfolio from a user's resume. Built with a React/Vite frontend and deployed on GitHub Pages via a Gatekeeper OAuth proxy for secure API access.",
        features: ["Gemini API integration", "HuggingFace NER skills extraction", "React/Vite frontend", "GitHub Pages deployment", "OAuth Gatekeeper proxy", "Resume parsing"],
        tech: ["Gemini API", "HuggingFace", "React", "Vite", "TypeScript", "Python"],
        stats: { models: "2 AI models", deployment: "GitHub Pages", type: "LLM-powered" },
        github: "https://github.com/Ishwaqsyed03",
  },
  {
        title: "HostelHub",
        type: "Student Accommodation App",
        status: "In Development",
        description:
                "React Native + Expo app for Hyderabad student accommodation with Razorpay payments and full security architecture.",
        detailedDescription: "HostelHub targets the Hyderabad student accommodation market, built with React Native/Expo, Node.js, PostgreSQL, and Firebase. Features include Razorpay payment integration, a full security architecture, and real-time availability tracking.",
        features: ["React Native + Expo", "Razorpay payment integration", "Node.js + PostgreSQL backend", "Firebase real-time sync", "Full security architecture", "Hyderabad market focus"],
        tech: ["React Native", "Expo", "Node.js", "PostgreSQL", "Firebase", "Razorpay"],
        stats: { market: "Hyderabad", stack: "Full-stack", type: "Mobile App" },
        github: "https://github.com/Ishwaqsyed03",
  },
  ];
