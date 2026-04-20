import type { Metadata } from "next";
import Image from "next/image";
import {
  TrendingUp,
  Shield,
  Smile,
  Globe2,
  Banknote,
  Clock,
} from "lucide-react";
import { SectionTitle } from "@/components/sections/SectionTitle";
import { PillarCard } from "@/components/sections/PillarCard";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Investisseurs & Propriétaires",
  description:
    "Optimisez et sécurisez vos revenus locatifs au Maroc. Solution dédiée aux investisseurs, propriétaires et MRE.",
};

const BENEFITS = [
  {
    icon: TrendingUp,
    title: "Optimisation des revenus",
    description:
      "Positionnement tarifaire ajusté, délais de vacance réduits, gestion proactive des relocations — chaque mois sans locataire coûte. Nous l'évitons.",
  },
  {
    icon: Shield,
    title: "Protection du patrimoine",
    description:
      "Sélection rigoureuse des locataires, visites régulières, entretien préventif. Votre bien conserve sa valeur et ne se dégrade pas dans le silence.",
  },
  {
    icon: Smile,
    title: "Tranquillité d'esprit",
    description:
      "Plus de gestion du quotidien, plus de coups de téléphone du locataire, plus de suivi des artisans. Vous encaissez. Nous gérons.",
  },
  {
    icon: Globe2,
    title: "Gestion à distance",
    description:
      "Vous êtes à l'étranger ? Aucun problème. Toute la gestion est assurée à distance, avec un reporting clair et un interlocuteur joignable.",
  },
];

const MRE_ADVANTAGES = [
  "Interlocuteur unique francophone dédié",
  "Virements sur compte étranger (France, Belgique, Canada…)",
  "Documentation fiscale pour les déclarations au pays de résidence",
  "Représentation légale en cas de besoin",
  "Communication par e-mail, WhatsApp ou visioconférence",
  "Gestion des formalités administratives locales",
];

const INVESTOR_STATS = [
  { value: "+18%", label: "revenus nets en moyenne", sub: "vs gestion autonome" },
  { value: "97%", label: "taux d'occupation", sub: "sur notre portefeuille" },
  { value: "12 j", label: "délai moyen de relocation", sub: "après fin de bail" },
  { value: "0", label: "impayé non traité", sub: "sur les 12 derniers mois" },
];

export default function InvestisseursPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/images/hero-investisseurs.jpg"
            alt="Investisseurs AMANA RENTAL"
            fill
            className="object-cover"
          />
        </div>
        <div className="container-tight relative z-10">
          <SectionTitle
            eyebrow="Investisseurs & Propriétaires"
            title="Votre patrimoine, optimisé et sécurisé"
            subtitle="Que vous soyez propriétaire d'un bien unique ou d'un portefeuille immobilier, notre approche s'adapte à vos objectifs tout en protégeant ce que vous avez construit."
            light
          />
        </div>
      </section>

      {/* Chiffres */}
      <section className="bg-accent py-14 px-4 sm:px-6 lg:px-8">
        <div className="container-tight">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {INVESTOR_STATS.map((stat, i) => (
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

      {/* Bénéfices */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <SectionTitle
            eyebrow="Ce que vous gagnez"
            title="Une gestion qui travaille pour vous"
            subtitle="Quatre bénéfices concrets que nos propriétaires identifient dès les premiers mois."
            centered
            className="mb-14"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {BENEFITS.map((b, i) => (
              <PillarCard key={i} {...b} />
            ))}
          </div>
        </div>
      </section>

      {/* Valorisation patrimoniale */}
      <section className="section-padding bg-secondary">
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden order-2 lg:order-1">
              <Image
                src="/images/investisseurs-patrimoine.jpg"
                alt="Immeuble de qualité — valorisation patrimoniale et gestion locative AMANA RENTAL"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-primary/20" />
            </div>
            <div className="order-1 lg:order-2">
              <SectionTitle
                eyebrow="Valorisation patrimoniale"
                title="Votre bien, un actif qui prend de la valeur"
              />
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Un bien mal géré se dégrade. Les petites réparations ignorées
                  deviennent de gros travaux. Les locataires non qualifiés
                  abîment les installations. La valeur du bien baisse.
                </p>
                <p>
                  Notre gestion préventive renverse cette logique. Visites
                  régulières, entretien proactif, interventions rapides — votre
                  bien est maintenu dans un état qui préserve sa valeur de marché
                  et facilite sa revente ou sa transmission.
                </p>
                <p>
                  Nous vous conseillons également sur les travaux d'amélioration
                  à haute valeur ajoutée : ceux qui augmentent réellement
                  l'attractivité locative et le prix du bien.
                </p>
              </div>
              <div className="mt-6 flex gap-4">
                {[
                  { icon: Banknote, label: "Revenus optimisés" },
                  { icon: Clock, label: "Entretien préventif" },
                  { icon: TrendingUp, label: "Valeur préservée" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-2 flex-1 p-3 rounded-lg bg-white border border-border text-center"
                    >
                      <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                      <span className="text-xs font-medium text-foreground">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MRE Section */}
      <section className="section-padding bg-primary">
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <div>
              <SectionTitle
                eyebrow="Marocains Résidents à l'Étranger"
                title="Gérer votre bien depuis l'autre côté de la Méditerranée"
                light
              />
              <p className="mt-6 text-white/70 leading-relaxed text-sm">
                Être propriétaire au Maroc quand on vit en France, en Belgique,
                au Canada ou ailleurs n'est pas simple. Les démarches
                administratives, le suivi des locataires, les interventions à
                coordonner à distance — tout cela mobilise du temps et génère
                du stress.
              </p>
              <p className="mt-4 text-white/70 leading-relaxed text-sm">
                AMANA RENTAL a conçu une offre spécifiquement adaptée aux MRE :
                un interlocuteur dédié, une communication en français,
                des virements simplifiés et une représentation locale
                pour toutes les démarches qui nécessitent une présence physique.
              </p>
            </div>
            <div className="bg-white/10 rounded-xl border border-white/15 p-5 sm:p-8">
              <h3 className="font-semibold text-white mb-6">
                Ce que vous n'aurez plus à gérer depuis l'étranger
              </h3>
              <ul className="space-y-4">
                {MRE_ADVANTAGES.map((adv, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-accent text-xs">✓</span>
                    </div>
                    <span className="text-white/80 text-sm">{adv}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-white/15">
                <p className="text-white/50 text-xs">
                  Disponible pour les propriétaires résidant en France, Belgique,
                  Espagne, Canada, et tout pays francophone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignage */}
      <section className="section-padding bg-background">
        <div className="container-tight max-w-3xl">
          <div className="bg-white rounded-xl border border-border p-6 sm:p-10 text-center shadow-sm">
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-accent text-lg">★</span>
              ))}
            </div>
            <blockquote className="font-serif italic text-base sm:text-lg md:text-xl text-foreground leading-relaxed mb-6">
              « Je vis à Paris depuis dix ans et j'avais un appartement à
              Casablanca dont je ne savais plus quoi faire. AMANA RENTAL a pris
              en charge tout ce que je ne pouvais pas gérer à distance — et
              aujourd'hui je reçois mon virement tous les mois, sans me soucier
              de rien. »
            </blockquote>
            <p className="text-sm font-medium text-foreground">Karim M.</p>
            <p className="text-xs text-muted-foreground">Propriétaire MRE, Paris</p>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Prêt à optimiser votre patrimoine ?"
        title="Faites le premier pas"
        subtitle="Une évaluation gratuite de votre bien pour estimer le potentiel locatif et les meilleures options de valorisation."
        primaryCta={{ label: "Évaluation gratuite", href: "/contact" }}
        secondaryCta={{ label: "Notre approche", href: "/notre-approche" }}
      />
    </>
  );
}
