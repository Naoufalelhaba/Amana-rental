import type { Metadata } from "next";
import Image from "next/image";
import { Home, CalendarDays, Package, ArrowRight } from "lucide-react";
import { SectionTitle } from "@/components/sections/SectionTitle";
import { ServiceCardsSection } from "@/components/sections/ServiceCardsSection";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Gestion locative longue durée et conciergerie saisonnière. Deux expertises complémentaires pour valoriser votre bien au Maroc.",
};

const LONGUE_DUREE_FEATURES = [
  "Sélection rigoureuse des locataires (vérification des dossiers)",
  "Rédaction et gestion du bail",
  "Encaissement des loyers et gestion des impayés",
  "Suivi des charges et de la comptabilité locative",
  "Coordination des interventions techniques",
  "Reporting mensuel détaillé",
  "Interlocuteur dédié disponible",
];

const CONCIERGERIE_FEATURES = [
  "Mise en ligne et gestion des annonces (Airbnb, Booking…)",
  "Accueil et remise des clés aux voyageurs",
  "Ménage et linge de maison professionnel",
  "Communication voyageurs et gestion des avis",
  "Optimisation des tarifs en temps réel",
  "Maintenance et suivi de l'état du bien",
  "Reversement mensuel avec rapport de performance",
];

const PACK_FEATURES = [
  "Sélection et sourcing du mobilier adapté",
  "Aménagement et mise en valeur de l'espace",
  "Photographie professionnelle du bien",
  "Constitution du kit de bienvenue",
  "Optimisation pour la location courte durée",
];

const PROCESS_STEPS = [
  {
    num: "01",
    icon: Home,
    title: "Évaluation du bien",
    description:
      "Visite, analyse du marché local et recommandations sur le positionnement optimal.",
  },
  {
    num: "02",
    icon: Package,
    title: "Proposition sur mesure",
    description:
      "Choix de la formule adaptée à vos objectifs, votre bien et votre situation personnelle.",
  },
  {
    num: "03",
    icon: CalendarDays,
    title: "Mise en service",
    description:
      "Mise en conformité, mise en valeur du bien et lancement de la gestion sous 15 jours.",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/images/hero-services.jpg"
            alt="Services AMANA RENTAL"
            fill
            className="object-cover"
          />
        </div>
        <div className="container-tight relative z-10">
          <SectionTitle
            eyebrow="Nos services"
            title="Deux expertises, une logique cohérente"
            subtitle="Quelle que soit la durée de location souhaitée, AMANA RENTAL dispose d'une expertise dédiée — et des deux à la fois pour les propriétaires qui souhaitent flexibilité."
            light
          />
        </div>
      </section>

      {/* Deux piliers */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <SectionTitle
            eyebrow="Nos deux piliers"
            title="Choisissez votre mode de valorisation"
            subtitle="Deux offres distinctes, conçues pour deux réalités différentes — mais gérées avec la même exigence."
            centered
            className="mb-14"
          />
          <ServiceCardsSection
            longDureeFeatures={LONGUE_DUREE_FEATURES}
            conciergerieFeatures={CONCIERGERIE_FEATURES}
          />
        </div>
      </section>

      {/* Pack Meublé */}
      <section className="section-padding bg-secondary">
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <SectionTitle
                eyebrow="Offre différenciante"
                title="Pack Meublé & Mise en Valeur"
                subtitle="Vous disposez d'un bien vide ou mal meublé ? Notre Pack Meublé vous permet d'optimiser votre bien pour la location avant même de confier sa gestion."
              />
              <ul className="mt-8 space-y-4">
                {PACK_FEATURES.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-accent text-xs font-bold">{i + 1}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/10">
                <p className="text-sm text-primary font-medium">
                  Un bien mis en valeur se loue plus vite et au meilleur prix.
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  En moyenne, le Pack Meublé réduit vos délais de location de 40 %
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/images/pack.png"
                alt="Appartement meublé AMANA RENTAL"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <SectionTitle
            eyebrow="Comment ça marche"
            title="De la décision à la gestion en 3 étapes"
            centered
            className="mb-14"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="relative flex flex-col">
                  {/* Connector line */}
                  {i < PROCESS_STEPS.length - 1 && (
                    <div className="hidden md:block absolute top-6 left-1/2 w-full h-px bg-border" />
                  )}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm mb-4">
                      {step.num}
                    </div>
                    <Icon className="w-6 h-6 text-accent mb-3" strokeWidth={1.5} />
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-14 text-center">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Démarrer avec AMANA RENTAL
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Votre bien mérite mieux"
        title="Quelle formule vous correspond ?"
        subtitle="Discutons ensemble de votre bien, de vos objectifs et de la solution la mieux adaptée."
        primaryCta={{ label: "Évaluation gratuite", href: "/contact" }}
        secondaryCta={{ label: "Notre approche", href: "/notre-approche" }}
      />
    </>
  );
}
