import { createFileRoute } from "@tanstack/react-router";
import { Code2, Layout, GitBranch, Smartphone, Palette, Lightbulb, Terminal, Braces, Eye, Wind } from "lucide-react";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills — Beanke Lennon" },
      { name: "description", content: "Technologies and skills of Beanke Lennon, Full Stack Developer." },
      { property: "og:title", content: "Skills — Beanke Lennon" },
      { property: "og:description", content: "Technologies and skills of Beanke Lennon, Full Stack Developer." },
    ],
  }),
  component: SkillsPage,
});

const skills = [
  { name: "HTML5", icon: Code2 },
  { name: "CSS3", icon: Layout },
  { name: "Tailwind CSS", icon: Wind },
  { name: "Flexbox & Grid", icon: Layout },
  { name: "JavaScript (ES6+)", icon: Braces },
  { name: "DOM Manipulation", icon: Eye },
  { name: "Python", icon: Terminal },
  { name: "Git & GitHub", icon: GitBranch },
  { name: "Responsive Design", icon: Smartphone },
  { name: "UI/UX Principles", icon: Palette },
  { name: "Problem Solving", icon: Lightbulb },
];

function SkillsPage() {
  return (
    <main className="container-wide">
      <h1 className="animate-fade-up page-title">Skills & Technologies</h1>
      <p className="animate-fade-up-delay-1 page-lead">
        A growing toolkit built through hands-on projects and continuous learning.
      </p>

      <div className="mt-12 animate-fade-up-delay-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill) => (
          <div key={skill.name} className="card-interactive flex items-center gap-4 p-4">
            <div className="icon-badge">
              <skill.icon className="h-5 w-5" />
            </div>
            <span className="font-medium text-foreground">{skill.name}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
