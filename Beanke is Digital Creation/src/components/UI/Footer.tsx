import { Github, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-heading text-lg font-semibold text-foreground">Beanke Lennon</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Aspiring Full Stack Developer building clean, accessible digital experiences.
            </p>
          </div>
          <div>
            <h4 className="font-heading text-sm font-semibold text-foreground">Location</h4>
            <div className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              Gauteng, South Africa
            </div>
          </div>
          <div>
            <h4 className="font-heading text-sm font-semibold text-foreground">Contact</h4>
            <div className="mt-3 space-y-2">
              <a
                href="mailto:eloff.beanke@gmail.com"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="h-4 w-4 text-primary" />
                eloff.beanke@gmail.com
              </a>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                +27 60 959 7419
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-heading text-sm font-semibold text-foreground">Links</h4>
            <div className="mt-3">
              <a
                href="https://github.com/BeaLennon"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Github className="h-4 w-4 text-primary" />
                GitHub — BeaLennon
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Beanke Lennon. Built with care and modern web tech.
        </div>
      </div>
    </footer>
  );
}
