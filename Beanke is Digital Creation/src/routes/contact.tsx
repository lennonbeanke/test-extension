import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Mail, Phone, Github } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Beanke Lennon" },
      { name: "description", content: "Get in touch with Beanke Lennon, Full Stack Developer from South Africa." },
      { property: "og:title", content: "Contact — Beanke Lennon" },
      { property: "og:description", content: "Get in touch with Beanke Lennon, Full Stack Developer from South Africa." },
    ],
  }),
  component: ContactPage,
});

const contactItems = [
  {
    label: "Location",
    value: "Gauteng, South Africa",
    icon: MapPin,
    href: null,
  },
  {
    label: "Email",
    value: "eloff.beanke@gmail.com",
    icon: Mail,
    href: "mailto:eloff.beanke@gmail.com",
  },
  {
    label: "Phone",
    value: "+27 60 959 7419",
    icon: Phone,
    href: "tel:+27609597419",
  },
  {
    label: "GitHub",
    value: "BeaLennon",
    icon: Github,
    href: "https://github.com/BeaLennon",
  },
];

function ContactPage() {
  return (
    <main className="container-narrow">
      <h1 className="animate-fade-up page-title">Get In Touch</h1>
      <p className="animate-fade-up-delay-1 page-lead">
        I am currently available for freelance work and open to new opportunities. Reach out and let us talk.
      </p>

      <div className="mt-12 animate-fade-up-delay-2 grid gap-4 sm:grid-cols-2">
        {contactItems.map((item) => {
          const content = (
            <div className="card-interactive flex items-start gap-4 p-5">
              <div className="icon-badge">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{item.label}</div>
                <div className="mt-1 text-sm font-medium text-foreground">{item.value}</div>
              </div>
            </div>
          );

          return item.href ? (
            <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}>
              {content}
            </a>
          ) : (
            <div key={item.label}>{content}</div>
          );
        })}
      </div>
    </main>
  );
}
