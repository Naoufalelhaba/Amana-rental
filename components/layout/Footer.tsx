import Link from "next/link";
import { Mail, Phone, MapPin, Globe, ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const SERVICES_LINKS = [
  { href: "/services", label: "Gestion locative longue durée" },
  { href: "/services", label: "Conciergerie saisonnière" },
  { href: "/services", label: "Pack meublé" },
  { href: "/notre-approche", label: "Notre approche" },
];

const LEGAL_LINKS = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/confidentialite", label: "Politique de confidentialité" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      {/* Gold top line */}
      <div className="h-0.5 bg-accent/70" />

      <div className="container-tight px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Col 1 — Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded bg-accent flex items-center justify-center font-bold text-sm text-white">
                AR
              </div>
              <span className="font-semibold text-base tracking-wide text-white">
                AMANA RENTAL
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              Partenaire structuré de gestion immobilière. Faire confiance, tout
              en gardant le contrôle.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-accent hover:border-accent/50 transition-colors"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-accent hover:border-accent/50 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2 — Services */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-5">
              Services
            </h3>
            <ul className="space-y-3">
              {SERVICES_LINKS.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-white/60 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contact */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-5">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-white/60 text-sm">+212 6 XX XX XX XX</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:contact@amana-rental.ma"
                  className="text-white/60 text-sm hover:text-white transition-colors"
                >
                  contact@amana-rental.ma
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-white/60 text-sm">
                  Casablanca, Maroc
                </span>
              </li>
            </ul>
            <div className="mt-5 inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3 py-1.5">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-white/70">Réponse sous 24h</span>
            </div>
          </div>
        </div>

        <Separator className="my-10 bg-white/10" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs">
            © {year} AMANA RENTAL. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            {LEGAL_LINKS.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="text-white/40 text-xs hover:text-white/70 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
