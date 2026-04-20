import type { Metadata } from "next";
import Image from "next/image";
import { Shield, Eye, Handshake } from "lucide-react";
import { SectionTitle } from "@/components/sections/SectionTitle";
import { PillarCard } from "@/components/sections/PillarCard";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "La Marque",
  description:
    "Découvrez l'histoire et la philosophie d'AMANA RENTAL, partenaire structuré de gestion immobilière au Maroc.",
};

const VALUES = [
  {
    icon: Shield,
    title: "Rigueur",
    description:
      "Chaque décision est documentée, chaque action est traçable. La rigueur n'est pas un mot d'ordre — c'est une méthode de travail quotidienne qui protège votre patrimoine.",
  },
  {
    icon: Eye,
    title: "Transparence",
    description:
      "Vous savez à tout moment ce qui se passe dans votre bien. Rapports réguliers, accès aux informations, interlocuteur dédié : rien ne vous est dissimulé.",
  },
  {
    icon: Handshake,
    title: "Engagement",
    description:
      "Nous ne gérons pas des biens. Nous accompagnons des propriétaires. Cette distinction oriente chacune de nos décisions et chacun de nos comportements.",
  },
];

export default function LaMaquePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/images/hero-brand.jpg"
            alt="AMANA RENTAL"
            fill
            className="object-cover"
          />
        </div>
        <div className="container-tight relative z-10">
          <SectionTitle
            eyebrow="La Marque"
            title="Un projet bâti sur la confiance"
            subtitle="AMANA RENTAL est né d'un constat simple : la gestion immobilière manquait de structure, de rigueur et de transparence pour les propriétaires les plus exigeants."
            light
          />
        </div>
      </section>

      {/* Histoire */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <SectionTitle
                eyebrow="Notre histoire"
                title="De la frustration à la solution"
                subtitle=""
              />
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  AMANA RENTAL est né d'une frustration partagée par de nombreux propriétaires :
                  confier son bien à un gestionnaire, c'est souvent perdre le contrôle sans gagner
                  la sérénité. Des comptes rendus opaques, des locataires mal sélectionnés, des
                  travaux non signalés — la liste des déconvenues est longue.
                </p>
                <p>
                  Face à ce constat, nous avons construit une approche différente. Pas une agence
                  classique, pas une conciergerie de plus. Un partenaire structuré, qui rend compte,
                  qui documente et qui agit avec la même exigence que si le bien lui appartenait.
                </p>
                <p>
                  Le nom <em className="font-serif italic text-foreground">Amana</em> — qui signifie
                  confiance et dépôt sacré en arabe — résume à lui seul notre engagement :
                  votre bien nous est confié. Nous en prenons soin.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/marque-histoire.png"
                alt="AMANA RENTAL — partenaire de confiance en gestion immobilière au Maroc"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-white rounded-lg p-4 shadow-lg">
                <p className="text-sm font-medium text-foreground">
                  « Faire confiance, tout en gardant le contrôle. »
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  — La promesse AMANA RENTAL
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="section-padding bg-primary text-white">
        <div className="container-tight">
          <div className="max-w-3xl mx-auto text-center">
            <SectionTitle
              eyebrow="Notre vision"
              title="Redéfinir la relation entre propriétaire et gestionnaire"
              light
              centered
            />
            <blockquote className="mt-8 font-serif italic text-lg sm:text-xl md:text-2xl text-white/80 leading-relaxed border-l-2 border-accent pl-5 sm:pl-6 text-left">
              « La gestion immobilière ne devrait jamais être une source
              d'inquiétude. Elle devrait libérer du temps, préserver la valeur
              et générer une confiance durable. C'est exactement ce que nous
              construisons. »
            </blockquote>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <SectionTitle
            eyebrow="Nos valeurs"
            title="Ce qui guide chacune de nos décisions"
            subtitle="Trois valeurs fondamentales qui ne sont pas de simples mots, mais des engagements opérationnels."
            centered
            className="mb-14"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((v, i) => (
              <PillarCard key={i} {...v} />
            ))}
          </div>
        </div>
      </section>

      {/* Partenaire vs Prestataire */}
      <section className="section-padding bg-[#F9FAFB]">
        <div className="container-tight">
          <SectionTitle
            eyebrow="Notre positionnement"
            title="Partenaire, pas prestataire"
            subtitle="La distinction est fondamentale et oriente tout notre modèle de travail."
            centered
            className="mb-14"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl border border-border p-8">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">✗</span>
                </div>
                <h3 className="font-semibold text-muted-foreground">
                  Un prestataire classique
                </h3>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  "Exécute des tâches définies à l'avance",
                  "Rend compte quand vous le demandez",
                  "Optimise ses propres marges",
                  "Traite votre bien comme un dossier parmi d'autres",
                  "Se désengage quand le contrat se termine",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-border">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-primary rounded-xl border border-primary p-8">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-xs text-accent">✓</span>
                </div>
                <h3 className="font-semibold text-white">AMANA RENTAL</h3>
              </div>
              <ul className="space-y-3 text-sm text-white/80">
                {[
                  "Anticipe, propose, agit avec initiative",
                  "Informe proactivement, sans attendre",
                  "Aligne ses intérêts sur les vôtres",
                  "Traite votre bien comme un actif à valoriser",
                  "S'inscrit dans une relation de long terme",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-accent">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        variant="card"
        eyebrow="Prêt à nous faire confiance ?"
        title="Confiez-nous votre bien."
        titleAccent="Gardez l'esprit libre."
        subtitle="Un premier échange sans engagement pour évaluer ensemble la meilleure approche pour votre patrimoine."
        primaryCta={{ label: "Prendre contact", href: "/contact" }}
        secondaryCta={{ label: "Nos services", href: "/services" }}
      />
    </>
  );
}
