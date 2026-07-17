import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Beanke Lennon" },
      { name: "description", content: "Learn about Beanke Lennon, an aspiring Full Stack Developer from South Africa." },
      { property: "og:title", content: "About — Beanke Lennon" },
      { property: "og:description", content: "Learn about Beanke Lennon, an aspiring Full Stack Developer from South Africa." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="container-narrow">
      <h1 className="animate-fade-up page-title">About Me</h1>
      <div className="mt-8 animate-fade-up-delay-1 space-y-6 text-base leading-relaxed text-muted-foreground">
        <p>
          I am Beanke Lennon, an aspiring Full Stack Developer based in Gauteng, South Africa. My
          journey into tech started with a genuine curiosity about how websites work, which quickly
          grew into a passion for building digital experiences that are both functional and
          beautiful.
        </p>
        <p>
          Over the past few years, I have built practical experience with HTML, CSS, JavaScript,
          and Python. I enjoy turning designs into clean, responsive interfaces and solving problems
          through code. Every project teaches me something new, and I approach each challenge with
          enthusiasm and a willingness to learn.
        </p>
        <p>
          When I am not coding, I am exploring new tools, reading about web development trends, or
          refining my existing projects. I believe in writing accessible, maintainable code and
          delivering work that I am proud of.
        </p>
        <p>
          I am currently available for freelance opportunities and open to full-time roles where I
          can contribute, grow, and collaborate with like-minded teams.
        </p>
      </div>

      <div className="mt-12 animate-fade-up-delay-2 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Demo Pages", value: "7+" },
          { label: "Active Portfolio", value: "2025" },
          { label: "Location", value: "Remote" },
          { label: "Status", value: "Available" },
        ].map((stat) => (
          <div key={stat.label} className="stat-card">
            <div className="font-heading text-2xl font-bold text-primary">{stat.value}</div>
            <div className="mt-1 text-xs font-medium text-muted-foreground uppercase tracking-wide">{stat.label}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
