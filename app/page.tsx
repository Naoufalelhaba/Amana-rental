import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  User,
  Globe2,
  TrendingUp,
} from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { HomeServicesTeaser } from "@/components/sections/HomeServicesTeaser";
import { HomeReassurance } from "@/components/sections/HomeReassurance";
import { SectionTitle } from "@/components/sections/SectionTitle";
import { FAQ } from "@/components/sections/FAQ";

export const metadata: Metadata = {
  title: "AMANA RENTAL — Gestion Locative Premium au Maroc",
  description:
    "Partenaire structuré de gestion immobilière au Maroc. Gestion locative longue durée et conciergerie saisonnière pour propriétaires exigeants, investisseurs et MRE.",
};


const PROFILES = [
  {
    icon: User,
    title: "Propriétaire occupant devenu investisseur",
    description:
      "Vous avez un bien à louer mais pas l'envie de gérer le quotidien. Nous prenons le relais complètement.",
    href: "/investisseurs-proprietaires",
  },
  {
    icon: TrendingUp,
    title: "Investisseur avec plusieurs biens",
    description:
      "Votre portefeuille mérite un partenaire structuré, pas une accumulation de petites agences sans cohérence.",
    href: "/investisseurs-proprietaires",
  },
  {
    icon: Globe2,
    title: "MRE — Marocain Résidant à l'Étranger",
    description:
      "Vous vivez hors du Maroc mais votre bien y est. Nous gérons tout sur place, vous restez serein.",
    href: "/investisseurs-proprietaires",
  },
];

const STATS = [
  { value: "+18%", label: "revenus nets moyens", sub: "vs gestion autonome" },
  { value: "97%", label: "taux d'occupation", sub: "sur notre portefeuille" },
  { value: "< 48h", label: "délai de réponse", sub: "aux demandes locataires" },
  { value: "100%", label: "reporting transparent", sub: "chaque mois" },
];

const TESTIMONIALS = [
  {
    quote:
      "Depuis que j'ai confié mon bien à AMANA RENTAL, je n'ai plus à gérer quoi que ce soit. Le rapport mensuel me suffit pour savoir que tout va bien.",
    name: "Leila B.",
    role: "Propriétaire, Casablanca",
  },
  {
    quote:
      "En tant qu'investisseur, j'avais besoin de quelqu'un de structuré. AMANA RENTAL m'a impressionné par la rigueur de leur suivi dès le premier mois.",
    name: "Hamid R.",
    role: "Investisseur immobilier",
  },
  {
    quote:
      "Je vis à Lyon et mon appartement est à Marrakech. AMANA gère tout à distance — et mes revenus locatifs arrivent sans que j'aie à me battre pour les obtenir.",
    name: "Sara M.",
    role: "MRE, Lyon",
  },
];

const FAQ_ITEMS = [
  {
    question: "Êtes-vous une agence immobilière ou une conciergerie ?",
    answer:
      "Ni l'un ni l'autre, dans leur sens classique. AMANA RENTAL est un partenaire structuré de gestion immobilière. Nous combinons la rigueur de la gestion locative professionnelle et les services d'une conciergerie pour la location courte durée — dans les deux cas avec des processus encadrés et un reporting transparent.",
  },
  {
    question: "Quelle est votre zone d'intervention géographique ?",
    answer:
      "Nous intervenons principalement à Casablanca et dans les grandes villes du Maroc. Contactez-nous pour vérifier la disponibilité de nos services dans votre ville.",
  },
  {
    question: "Comment êtes-vous rémunérés ?",
    answer:
      "Notre rémunération est basée sur un pourcentage des loyers encaissés — nous n'avons donc aucun intérêt à votre bien rester vide. Pour la conciergerie courte durée, la commission s'applique sur les nuitées générées. Tous les détails sont transparents dans notre mandat.",
  },
  {
    question: "Puis-je vous confier un bien qui n'est pas encore loué ?",
    answer:
      "Oui. Nous prenons en charge le bien dès la phase de mise en location : évaluation du loyer de marché, mise en valeur du bien, rédaction de l'annonce, sélection des candidats locataires.",
  },
  {
    question: "Combien de temps pour démarrer ?",
    answer:
      "Après la signature du mandat, nous visons une mise en gestion effective sous 15 jours ouvrés. Ce délai inclut l'état des lieux d'entrée, la documentation du bien et, le cas échéant, la mise en valeur initiale.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Hero
        eyebrow="Partenaire de gestion immobilière au Maroc"
        title="Faire confiance,"
        titleAccent="tout en gardant le contrôle."
        subtitle="AMANA RENTAL gère votre bien locatif avec rigueur, transparence et une méthode éprouvée — pour que vous encaissiez sans vous inquiéter."
        primaryCta={{ label: "Nous confier votre bien", href: "/contact" }}
        secondaryCta={{ label: "Découvrir notre approche", href: "/notre-approche" }}
        imageSrc="/images/hero-accueil.png"
        imageAlt="Résidence premium gérée par AMANA RENTAL — gestion locative haut de gamme au Maroc"
      />

      <HomeServicesTeaser />

      <HomeReassurance />

      {/* Pour qui */}
      <section className="section-padding bg-[#F9FAFB]">
        <div className="container-tight">
          <SectionTitle
            eyebrow="Pour qui ?"
            title="Trois profils, une même exigence"
            subtitle="AMANA RENTAL s'adresse aux propriétaires qui refusent de choisir entre déléguer et contrôler."
            centered
            className="mb-14"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROFILES.map((profile, i) => {
              const Icon = profile.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-md p-5 sm:p-6 lg:p-7 hover:shadow-lg transition-shadow group"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/15 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-accent" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-semibold text-[#1A2220] mb-3">{profile.title}</h3>
                  <p className="text-[#1A2220]/60 text-sm leading-relaxed mb-4">
                    {profile.description}
                  </p>
                  <Link
                    href={profile.href}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:text-accent/80 transition-colors"
                  >
                    En savoir plus
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-accent">
        <div className="container-tight">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-white/90">{stat.label}</p>
                <p className="text-xs text-white/60 mt-0.5">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <SectionTitle
            eyebrow="Témoignages"
            title="Ce que disent nos propriétaires"
            centered
            className="mb-14"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-border p-7 flex flex-col"
              >
                <div className="flex gap-0.5 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-accent text-sm">★</span>
                  ))}
                </div>
                <blockquote className="font-serif italic text-foreground leading-relaxed text-sm flex-1 mb-5">
                  &laquo; {t.quote} &raquo;
                </blockquote>
                <div className="border-t border-border pt-4">
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-secondary">
        <div className="container-tight">
          <SectionTitle
            eyebrow="Questions fréquentes"
            title="Les questions que vous vous posez"
            centered
            className="mb-12"
          />
          <div className="max-w-3xl mx-auto">
            <FAQ items={FAQ_ITEMS} />
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <div className="bg-primary rounded-2xl p-6 sm:p-8 lg:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent/60" />
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">
              Prêt à passer le cap ?
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white leading-tight mb-4">
              Confiez-nous votre bien.<br />
              <em className="font-serif italic font-normal text-accent">
                Gardez l&apos;esprit libre.
              </em>
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              Un premier échange sans engagement pour évaluer votre bien et vous
              présenter notre approche en détail.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent hover:bg-accent/90 text-white font-medium px-8 py-3 text-sm transition-all"
              >
                Évaluation gratuite
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 text-white hover:bg-white/10 font-medium px-8 py-3 text-sm transition-all"
              >
                Nos services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
