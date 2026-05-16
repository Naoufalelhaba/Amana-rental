import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { SectionTitle } from "@/components/sections/SectionTitle";

export const metadata: Metadata = {
  title: "Contact & Évaluation Gratuite de Votre Bien",
  description:
    "Contactez AMANA RENTAL pour une évaluation gratuite de votre bien locatif au Maroc. Gestion locative, conciergerie immobilière — réponse sous 24h ouvrées.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact & Évaluation Gratuite | AMANA RENTAL",
    description:
      "Contactez AMANA RENTAL pour discuter de votre projet de gestion locative ou conciergerie. Évaluation gratuite de votre bien — réponse sous 24h.",
    url: "/contact",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Contacter AMANA RENTAL — Gestion Locative au Maroc",
      },
    ],
  },
};

const contactInfo = [
  {
    icon: Phone,
    label: "Téléphone",
    value: "+212 06255054",
    href: "tel:+21206255054",
  },
  {
    icon: Mail,
    label: "E-mail",
    value: "contact@amana-rental.ma",
    href: "mailto:contact@amana-rental.ma",
  },
  {
    icon: MapPin,
    label: "Adresse",
    value: "Angle Mostafa Maani et 11 Janvier, Casablanca",
    href: undefined,
  },
  {
    icon: Clock,
    label: "Disponibilités",
    value: "Lundi – Vendredi, 9h – 18h",
    href: undefined,
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero sobre */}
      <section className="bg-primary pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container-tight">
          <SectionTitle
            eyebrow="Nous contacter"
            title="Parlons de votre bien"
            subtitle="Un premier échange sans engagement pour évaluer ensemble la meilleure approche pour votre patrimoine."
            light
          />
        </div>
      </section>

      {/* Contenu principal */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16">
            {/* Formulaire */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl border border-border p-5 sm:p-8 shadow-sm">
                <h2 className="text-xl font-semibold mb-1">Votre demande</h2>
                <p className="text-sm text-muted-foreground mb-8">
                  Renseignez ce formulaire — nous vous répondons sous 24 heures ouvrées.
                </p>
                <ContactForm />
              </div>
            </div>

            {/* Coordonnées */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold mb-1">Coordonnées</h2>
                  <p className="text-sm text-muted-foreground">
                    Préférez-vous nous appeler directement ? Nos conseillers
                    sont disponibles en semaine.
                  </p>
                </div>

                <ul className="space-y-5">
                  {contactInfo.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <li key={i} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">
                            {item.label}
                          </p>
                          {item.href ? (
                            <a
                              href={item.href}
                              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-sm font-medium text-foreground">
                              {item.value}
                            </p>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <div className="p-5 rounded-xl bg-primary/5 border border-primary/10">
                  <p className="text-sm font-medium text-primary mb-1">
                    Engagement de réponse
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Chaque demande reçoit une réponse personnalisée dans les 24
                    heures ouvrées. Aucun message standardisé — une vraie
                    prise en charge dès le premier contact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
