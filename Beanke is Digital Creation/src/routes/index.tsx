import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Code2, Layout, Smartphone, Server } from "lucide-react";
import heroImg from "../assets/hero-illustration.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Beanke Lennon — Full Stack Developer" },
      { name: "description", content: "Portfolio of Beanke Lennon, an aspiring Full Stack Developer from South Africa." },
      { property: "og:title", content: "Beanke Lennon — Full Stack Developer" },
      { property: "og:description", content: "Portfolio of Beanke Lennon, an aspiring Full Stack Developer from South Africa." },
    ],
  }),
  component: Index,
});

const highlights = [
  { label: "Demo Pages", value: "7+" },
  { label: "Active Portfolio", value: "2025" },
  { label: "Work Style", value: "Remote" },
  { label: "Availability", value: "Available" },
];

const services = [
  {
    title: "Frontend Development",
    icon: Code2,
    description: "Responsive and accessible interfaces using modern HTML, CSS, and JavaScript patterns.",
  },
  {
    title: "UI/UX Implementation",
    icon: Layout,
    description: "Pixel-perfect implementations with clean, maintainable code and smooth interactions.",
  },
  {
    title: "Mobile-First Design",
    icon: Smartphone,
    description: "Adaptive layouts that remain clear and usable across all screen sizes.",
  },
  {
    title: "Backend Support",
    icon: Server,
    description: "Structured server logic and data handling with Python fundamentals.",
  },
];

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-background">
        <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-10 px-4 py-16 lg:flex-row lg:py-24">
          <div className="flex-1 text-center lg:text-left">
            <p className="animate-fade-up text-sm font-semibold uppercase tracking-wide text-primary">
              Full Stack Developer
            </p>
            <h1 className="animate-fade-up mt-3 text-5xl font-bold leading-tight text-foreground lg:text-6xl">
              Beanke Lennon
            </h1>
            <p className="animate-fade-up-delay-1 mt-4 max-w-lg text-lg text-muted-foreground">
              Aspiring Full Stack Developer building digital experiences with modern tech. Responsive websites, UI components, and practical frontend demos.
            </p>
            <div className="animate-fade-up-delay-2 mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Link to="/projects" className="btn-primary">
                View Projects <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="btn-outline">
                View CV
              </Link>
            </div>

            <div className="animate-fade-up-delay-3 mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {highlights.map((h) => (
                <div key={h.label} className="stat-card p-3">
                  <div className="font-heading text-xl font-bold text-primary">{h.value}</div>
                  <div className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">{h.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <img
              src={heroImg}
              alt="Illustration of a developer workspace"
              width={1200}
              height={800}
              className="animate-fade-up rounded-2xl border border-border shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* About preview */}
      <section className="section-divider bg-surface">
        <div className="container-narrow text-center">
          <h2 className="animate-fade-up section-title">About Me</h2>
          <p className="animate-fade-up-delay-1 mt-4 text-base leading-relaxed text-muted-foreground">
            Passionate and self-motivated developer with practical work in HTML, CSS, JavaScript, and Python basics.
            Focused on clean interfaces, accessible interactions, and reliable delivery.
          </p>
          <Link to="/about" className="link-arrow animate-fade-up-delay-2 mt-6">
            Read more <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* Services preview */}
      <section className="section-divider bg-background">
        <div className="container-page">
          <div className="text-center">
            <h2 className="animate-fade-up section-title">Services</h2>
            <p className="animate-fade-up-delay-1 mt-3 text-muted-foreground">What I can help you build.</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <div key={s.title} className="card-interactive">
                <div className="icon-badge">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-heading text-base font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/services" className="link-arrow">
              See all services <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
