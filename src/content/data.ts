export const SITE = {
    name: "Ishwaq Syed",
    role: "Software Developer · AI / ML Engineer",
    title: "Ishwaq Syed • Software Developer & AI/ML Engineer",
    description:
          "Portfolio of Ishwaq Syed — Software Developer with hands-on experience in Python, REST API development, and machine learning. Building production-grade projects with LLM integration, NLP pipelines, and full-stack web apps using FastAPI, React, and Flutter. Final year B.Tech CS @ Visvesvaraya College of Engineering and Technology, Hyderabad.",
    email: "ishwaqsyed16@gmail.com",
    phone: "+91 6305815330",
    location: "Hyderabad, Telangana, India",
};

export const SOCIALS = [
    { icon: "github", href: "https://github.com/Ishwaqsyed03" },
    { icon: "linkedin", href: "https://www.linkedin.com/in/ishwaqsyed" },
    { icon: "mail", href: "mailto:ishwaqsyed16@gmail.com" },
];

export const BRANDS = [
    "VCET Hyderabad",
    "Skill India",
    "NASSCOM",
    "Open Source",
    "Hackathons",
    "Community",
  ];

export const EXPERIENCE = [
  {
        title: "B.Tech in Computer Science — VCET, Hyderabad",
        period: "2023 — 2026",
        points: [
                "Visvesvaraya College of Engineering and Technology, Hyderabad, Telangana · CGPA: 7.0 / 10.",
                "Strong foundation in Data Structures & Algorithms, OOP, DBMS, and REST API design.",
              ],
  },
  {
        title: "Diploma in Electrical & Electronics Engineering (EEE)",
        period: "2019 — 2023",
        points: [
                "Sri Indu Institute of Engineering and Technology, Hyderabad, Telangana.",
                "Built an engineering foundation before transitioning into software and AI development.",
              ],
  },
  ];

export const TESTIMONIALS = [
  {
        quote:
                "Ishwaq ships quickly with quality, bringing clarity to complex integrations. His ReviewGuard project showed real product thinking.",
        name: "Hackathon Mentor",
        meta: "AI/ML Track",
  },
  {
        quote:
                "Strong grasp of ML fundamentals and data pipelines. He designs modular systems that are easy to scale and extend.",
        name: "Project Reviewer",
        meta: "VCET Hyderabad",
  },
  {
        quote:
                "Self-motivated and analytical. He anticipates edge cases and turns research-grade ideas into working REST APIs.",
        name: "Engineering Mentor",
        meta: "Skill India Program",
  },
  ];

export const STATS = [
  { label: "Model Accuracy", value: "93%" },
  { label: "Engineered Signals", value: "17" },
  { label: "Technologies", value: "20+" },
  ];

export const SKILLS = [
  {
        icon: "robot",
        title: "AI / ML",
        items: [
                "Machine Learning & NLP",
                "LLM Integration (OpenAI, Claude, Gemini)",
                "RAG Pipelines & Prompt Engineering",
                "HuggingFace Transformers, TF-IDF, NER",
                "Scikit-learn & Gradient Boosting",
              ],
  },
  {
        icon: "code",
        title: "Languages & Core",
        items: [
                "Python, JavaScript, Dart, SQL",
                "Data Structures & Algorithms",
                "Object-Oriented Programming",
                "DBMS & REST API Design",
                "Pandas, NumPy",
              ],
  },
  {
        icon: "share",
        title: "Frameworks & Tools",
        items: [
                "FastAPI, Flask, LangChain",
                "React.js, Next.js, Flutter, Tailwind CSS",
                "Git, GitHub, Postman, Docker (Basics)",
                "PostgreSQL, MongoDB, Firebase, MySQL",
                "Jupyter Notebook",
              ],
  },
  ];

export const PROJECTS = [
  {
        title: "ReviewGuard",
        type: "Fake Review Detection System",
        status: "Live",
        video: "/vid/reviewguard.mp4",
        previewUrl: "https://reviewguard-sable.vercel.app/",
        gallery: [
                "/project-images/reviewguard-1.png",
                "/project-images/reviewguard-2.png",
                "/project-images/reviewguard-3.png",
              ],
        links: [
                { label: "Live Demo", href: "https://reviewguard-sable.vercel.app/" },
                { label: "GitHub", href: "https://github.com/Ishwaqsyed03" },
              ],
        description:
                "Fake review detection system using a 17-signal Gradient Boosting model achieving ~93% accuracy.",
        detailedDescription: "ReviewGuard detects fake product reviews using 17 engineered signals including review length analysis, sentiment polarity, and behavioral pattern scoring. A FastAPI backend exposes REST endpoints for real-time classification with Pandas preprocessing and Scikit-learn inference, paired with a responsive Next.js frontend that shows confidence-scored results for instant feedback.",
        features: [
                "17-signal feature engineering (length, sentiment, behavior)",
                "~93% detection accuracy with Gradient Boosting",
                "FastAPI REST backend for real-time classification",
                "Next.js + Tailwind frontend with confidence scoring",
                "Pandas / NumPy data processing pipelines",
                "Explainable, instant review analysis",
              ],
        tech: ["Python", "FastAPI", "Scikit-learn", "Pandas", "NumPy", "Next.js", "Tailwind CSS"],
        stats: { accuracy: "93%", signals: "17", type: "Gradient Boosting" },
        github: "https://github.com/Ishwaqsyed03",
  },
  {
        title: "Criminal Identification",
        type: "ML & Face Recognition System",
        status: "On GitHub",
        previewImage: "/project-images/criminal-og.png",
        gallery: ["/project-images/criminal-og.png"],
        links: [
                { label: "GitHub", href: "https://github.com/Ishwaqsyed03/criminal-identification-ml" },
              ],
        description:
                "Automated criminal identification using OpenCV and CNN-based deep learning for real-time face recognition.",
        detailedDescription: "An automated criminal identification system built with OpenCV (Haar Cascade, LBPH) and CNN-based deep learning models (TensorFlow/Keras) for real-time face detection and recognition. A multi-stage ML pipeline covers image preprocessing, model training, and inference, achieving robust identification across varied lighting and camera conditions, with live lookups against a MySQL criminal-records database.",
        features: [
                "OpenCV Haar Cascade + LBPH detection",
                "CNN deep-learning recognition (TensorFlow/Keras)",
                "Multi-stage preprocessing → training → inference pipeline",
                "Real-time webcam & CCTV feed support",
                "Live record lookups against MySQL",
                "Modular, scalable component architecture",
              ],
        tech: ["Python", "OpenCV", "TensorFlow/Keras", "NumPy", "Pandas", "Scikit-learn", "MySQL"],
        stats: { models: "CNN + LBPH", source: "Webcam / CCTV", type: "Face Recognition" },
        github: "https://github.com/Ishwaqsyed03/criminal-identification-ml",
  },
  {
        title: "Resume Builder",
        type: "ATS-Friendly Resume Generator",
        status: "Live",
        previewUrl: "https://resume-builder-neon-nine.vercel.app/",
        gallery: [
                "/project-images/resumebuilder-1.png",
                "/project-images/resumebuilder-2.png",
                "/project-images/resumebuilder-3.png",
              ],
        links: [
                { label: "Live Demo", href: "https://resume-builder-neon-nine.vercel.app/" },
                { label: "GitHub", href: "https://github.com/Ishwaqsyed03/resume_builder" },
              ],
        description:
                "A live resume builder with multiple templates, drag-to-reorder sections, an ATS score, and one-click PDF export.",
        detailedDescription: "A web-based resume builder built with Next.js, React, and TypeScript that lets users craft a resume section by section — personal info, summary, experience, education, projects, skills, and certifications — with a real-time preview. It offers Classic, Modern, and Creative templates, drag-and-drop section reordering, a live ATS (Applicant Tracking System) score to gauge resume strength, and one-click PDF export powered by jsPDF and html2canvas.",
        features: [
                "Live, section-by-section resume editor",
                "Classic, Modern & Creative templates",
                "Drag-and-drop section reordering",
                "Real-time ATS score feedback",
                "One-click PDF export (jsPDF + html2canvas)",
                "Real-time preview as you type",
              ],
        tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "jsPDF", "html2canvas"],
        stats: { templates: "3 templates", export: "PDF", type: "Web App" },
        github: "https://github.com/Ishwaqsyed03/resume_builder",
  },
  ];
