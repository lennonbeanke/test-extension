import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, Wrench } from "lucide-react";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience — Beanke Lennon" },
      { name: "description", content: "Professional experience of Beanke Lennon, Full Stack Developer." },
      { property: "og:title", content: "Experience — Beanke Lennon" },
      { property: "og:description", content: "Professional experience of Beanke Lennon, Full Stack Developer." },
    ],
  }),
  component: ExperiencePage,
});

const experiences = [
  {
    period: "2025 — Present",
    title: "Front-End Developer (Freelance)",
    icon: Briefcase,
    description:
      "Built responsive websites, converted requirements into clean UIs, and improved usability for end users. Delivered pixel-perfect implementations with modern CSS techniques.",
  },
  {
    period: "2024 — 2026",
    title: "IT Support Assistant",
    icon: Wrench,
    description:
      "Troubleshot system issues, installed software, and provided technical support to users. Developed strong problem-solving and communication skills.",
  },
];

function ExperiencePage() {
  return (
    <main className="container-narrow">
      <h1 className="animate-fade-up page-title">Experience</h1>
      <p className="animate-fade-up-delay-1 page-lead">
        My professional journey so far — a mix of freelance development and hands-on IT support.
      </p>

      <div className="mt-12 animate-fade-up-delay-2 relative space-y-8">
        <div className="absolute left-5 top-2 bottom-2 w-px bg-border" />
        {experiences.map((exp) => (
          <div key={exp.title} className="relative flex gap-6">
            <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <exp.icon className="h-4 w-4" />
            </div>
            <div className="card-surface flex-1 p-5">
              <span className="eyebrow">{exp.period}</span>
              <h3 className="mt-1 font-heading text-lg font-semibold text-foreground">{exp.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
