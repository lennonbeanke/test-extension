import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, FileCode, FormInput, Calendar, ScrollText, Grid3x3, Music, Cloud, Calculator, Quote, UtensilsCrossed } from "lucide-react";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Beanke Lennon" },
      { name: "description", content: "Portfolio projects by Beanke Lennon, Full Stack Developer." },
      { property: "og:title", content: "Projects — Beanke Lennon" },
      { property: "og:description", content: "Portfolio projects by Beanke Lennon, Full Stack Developer." },
    ],
  }),
  component: ProjectsPage,
});

const projects = [
  {
    title: "First Time Portfolio",
    description: "Initial personal portfolio structure with hero, services, and contact flow. Built with semantic HTML and modern CSS layout techniques.",
    icon: FileCode,
    tags: ["HTML", "CSS"],
    demo: "#",
  },
  {
    title: "Accessible Form UI",
    description: "Account creation form with focus states, validation checks, and progress feedback. WCAG-compliant accessibility features.",
    icon: FormInput,
    tags: ["HTML", "CSS", "JavaScript"],
    demo: "#",
  },
  {
    title: "Datepicker UI",
    description: "Calendar layout component with responsive grid structure and active-day styling. Custom date selection logic.",
    icon: Calendar,
    tags: ["HTML", "CSS", "JavaScript"],
    demo: "#",
  },
  {
    title: "Changelog Component",
    description: "Timeline-style update log showing versions and release dates. Animated entry transitions for each item.",
    icon: ScrollText,
    tags: ["HTML", "CSS", "JavaScript"],
    demo: "#",
  },
  {
    title: "Image Grid Layout",
    description: "CSS Grid gallery experiment with custom span sizing and responsive breakpoints. Masonry-style layout.",
    icon: Grid3x3,
    tags: ["HTML", "CSS"],
    demo: "#",
  },
  {
    title: "Music Player",
    description: "A music player website built with HTML, CSS, and JavaScript. Users can play, pause, and switch between songs with a responsive interface.",
    icon: Music,
    tags: ["HTML", "CSS", "JavaScript"],
    demo: "#",
  },
  {
    title: "Weather App",
    description: "Search for a city and view live weather information using an API. Simple, clean, and responsive design with API integration.",
    icon: Cloud,
    tags: ["HTML", "CSS", "JavaScript", "API"],
    demo: "#",
  },
  {
    title: "Basic Calculator",
    description: "Performs simple calculations like addition, subtraction, multiplication, and division. Built with HTML, CSS, and JavaScript.",
    icon: Calculator,
    tags: ["HTML", "CSS", "JavaScript"],
    demo: "#",
  },
  {
    title: "Quote Generator",
    description: "Displays random motivational or inspirational quotes with a user-friendly design. Improved JavaScript, DOM manipulation, and front-end skills.",
    icon: Quote,
    tags: ["HTML", "CSS", "JavaScript"],
    demo: "#",
  },
  {
    title: "Sushi Restaurant",
    description: "Responsive sushi restaurant website with food menu, online reservation, gallery, and contact page. Smooth navigation and mobile-friendly layout.",
    icon: UtensilsCrossed,
    tags: ["HTML", "CSS", "JavaScript"],
    demo: "#",
  },
];

function ProjectsPage() {
  return (
    <main className="container-page">
      <h1 className="animate-fade-up page-title">Portfolio Projects</h1>
      <p className="animate-fade-up-delay-1 page-lead">
        A collection of hands-on projects that shaped my skills as a developer.
      </p>

      <div className="mt-12 animate-fade-up-delay-2 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div key={project.title} className="card-interactive group flex flex-col">
            <div className="icon-badge-lg">
              <project.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">{project.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="tag-chip">{tag}</span>
              ))}
            </div>
            <a href={project.demo} className="link-arrow mt-5">
              View Project <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
