import { createFileRoute } from "@tanstack/react-router";
import { Monitor, Server, Smartphone } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Beanke Lennon" },
      { name: "description", content: "Services offered by Beanke Lennon, Full Stack Developer." },
      { property: "og:title", content: "Services — Beanke Lennon" },
      { property: "og:description", content: "Services offered by Beanke Lennon, Full Stack Developer." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    title: "Frontend Development",
    icon: Monitor,
    description:
      "Responsive and accessible interfaces using modern HTML, CSS, and JavaScript patterns with clean, maintainable code.",
  },
  {
    title: "Backend Fundamentals",
    icon: Server,
    description:
      "Server logic and data handling support with Python basics and structured coding practices.",
  },
  {
    title: "Mobile-First UI",
    icon: Smartphone,
    description:
      "Adaptive layouts that remain clear and usable across desktop, tablet, and mobile screens.",
  },
];

function ServicesPage() {
  return (
    <main className="container-wide">
      <h1 className="animate-fade-up page-title">Services</h1>
      <p className="animate-fade-up-delay-1 page-lead">
        What I can help you build — from clean interfaces to solid foundations.
      </p>

      <div className="mt-12 animate-fade-up-delay-2 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div key={service.title} className="card-interactive flex flex-col">
            <div className="icon-badge-lg">
              <service.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">{service.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
