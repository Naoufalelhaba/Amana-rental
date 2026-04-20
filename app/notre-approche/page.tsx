import type { Metadata } from "next";
import Image from "next/image";
import {
  FileSearch,
  ShieldCheck,
  BarChart3,
  MessageSquare,
  Star,
  CheckSquare,
  ClipboardList,
  Users,
} from "lucide-react";
import { SectionTitle } from "@/components/sections/SectionTitle";
import { PillarCard } from "@/components/sections/PillarCard";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Notre Approche",
  description:
    "Une gestion encadrée, maîtrisée et sécurisée. Découvrez la méthodologie AMANA RENTAL et ses garde-fous.",
};

const SAFEGUARDS = [
  {
    icon: FileSearch,
    title: "Processus documentés",
    description:
      "Chaque action est encadrée par un processus écrit. Rien n'est laissé à l'improvisation — de la sélection du locataire à la gestion des interventions.",
  },
  {
    icon: ShieldCheck,
    title: "Contrôles internes",
    description:
      "Des points de contrôle réguliers garantissent que les procédures sont respectées et que les risques sont identifiés avant de devenir des problèmes.",
  },
  {
    icon: BarChart3,
    title: "Pilotage par la donnée",
    description:
      "Indicateurs de performance, taux d'occupation, délais d'intervention — tout est mesuré pour orienter nos décisions et votre reporting.",
  },
  {
    icon: MessageSquare,
    title: "Communication structurée",
    description:
      "Un rapport mensuel, une communication proactive en cas d'événement. Vous êtes toujours informé, jamais pris par surprise.",
  },
];

const PROCESS_STEPS = [
  {
    num: "01",
    icon: ClipboardList,
    title: "Audit initial",
    description:
      "Évaluation complète du bien : état, marché local, potentiel locatif, risques identifiés. Nous refusons les biens qui ne correspondent pas à nos standards.",
  },
  {
    num: "02",
    icon: Users,
    title: "Sélection & qualification",
    description:
      "Dossier locataire vérifié, garanties analysées, entretien de qualification. La sélection est notre premier rempart contre les risques locatifs.",
  },
  {
    num: "03",
    icon: CheckSquare,
    title: "Mise en gestion",
    description:
      "Signature des mandats, état des lieux d'entrée complet avec photos, remise des clés encadrée. Chaque détail est documenté.",
  },
  {
    num: "04",
    icon: BarChart3,
    title: "Suivi continu",
    description:
      "Encaissement mensuel, visites périodiques du bien, coordination des prestataires, réponse aux demandes locataires sous 48h.",
  },
  {
    num: "05",
    icon: FileSearch,
    title: "Reporting propriétaire",
    description:
      "Rapport mensuel : loyers encaissés, dépenses, état du bien, incidents éventuels. Accès à votre espace propriétaire en ligne.",
  },
];

const FAQ_ITEMS = [
  {
    question: "Comment sélectionnez-vous les locataires ?",
    answer:
      "Notre processus de sélection comprend la vérification des justificatifs de revenus (3 derniers bulletins de salaire ou bilans pour les indépendants), la vérification d'identité, et un entretien de qualification. Nous vérifions systématiquement la cohérence entre les revenus déclarés et le loyer demandé. Un dossier non conforme est refusé — sans exception.",
  },
  {
    question: "À quelle fréquence recevrai-je des nouvelles de mon bien ?",
    answer:
      "Vous recevez un rapport mensuel complet par e-mail. En dehors de ce rapport, nous vous contactons immédiatement en cas d'événement significatif (intervention technique, incident, demande particulière du locataire). Notre engagement est de ne jamais vous mettre devant le fait accompli.",
  },
  {
    question: "Comment gérez-vous les impayés ?",
    answer:
      "Dès le premier jour de retard, une relance est émise. Si la situation persiste, nous enclenchons les procédures prévues dans le bail, en coordination avec vous et si nécessaire avec un conseil juridique. Notre taux d'impayés est marginal, grâce à la rigueur de notre sélection initiale.",
  },
  {
    question: "Puis-je récupérer mon bien quand je le souhaite ?",
    answer:
      "Absolument. Les conditions de résiliation sont définies dans le mandat de gestion signé entre nous. Dans le respect des délais légaux et contractuels, vous restez libre de récupérer la gestion de votre bien à tout moment.",
  },
  {
    question: "Qui gère les interventions techniques et les réparations ?",
    answer:
      "Nous disposons d'un réseau de prestataires qualifiés (plombiers, électriciens, menuisiers, peintres). Pour toute intervention, nous vous soumettons un devis au-delà d'un seuil convenu d'avance. En dessous de ce seuil, nous gérons directement pour ne pas vous solliciter pour des urgences mineures.",
  },
];

export default function NotreApprochePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/images/hero-approche.jpg"
            alt="Notre approche AMANA RENTAL"
            fill
            className="object-cover"
          />
        </div>
        <div className="container-tight relative z-10">
          <SectionTitle
            eyebrow="Notre approche"
            title="Une gestion encadrée, maîtrisée et sécurisée"
            subtitle="Nous ne gérons pas des biens à l'instinct. Chaque décision repose sur un processus défini, des contrôles réguliers et une communication sans opacité."
            light
          />
        </div>
      </section>

      {/* Garde-fous */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <SectionTitle
            eyebrow="Les garde-fous"
            title="Ce qui nous distingue structurellement"
            subtitle="Des mécanismes concrets — pas des promesses — qui protègent votre bien et vos revenus."
            centered
            className="mb-14"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SAFEGUARDS.map((item, i) => (
              <PillarCard key={i} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-primary">
        <div className="container-tight">
          <SectionTitle
            eyebrow="Notre processus"
            title="5 étapes pour une gestion sans angle mort"
            centered
            light
            className="mb-14"
          />
          <div className="relative">
            {/* Vertical line on desktop */}
            <div className="hidden lg:block absolute left-[28px] top-0 bottom-0 w-px bg-accent/30" />

            <div className="space-y-10">
              {PROCESS_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} className="flex items-start gap-6">
                    <div className="relative z-10 w-14 h-14 rounded-full bg-accent/20 border border-accent/40 flex flex-col items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-accent" strokeWidth={1.5} />
                    </div>
                    <div className="pt-2">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-semibold tracking-widest text-accent">
                          {step.num}
                        </span>
                        <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                      </div>
                      <p className="text-white/60 text-sm leading-relaxed max-w-2xl">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Reporting */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <SectionTitle
                eyebrow="Pilotage & reporting"
                title="Vous gardez le contrôle, nous gérons le quotidien"
              />
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Le rapport mensuel n'est pas un document administratif — c'est
                  votre tableau de bord. Loyers encaissés, dépenses détaillées,
                  état général du bien, incidents signalés, actions menées.
                </p>
                <p>
                  Au-delà du rapport, chaque propriétaire dispose d'un espace
                  dédié où retrouver l'historique complet de la gestion : baux,
                  quittances, photos des visites, devis et factures.
                </p>
                <p>
                  Notre promesse de pilotage : vous ne devriez jamais avoir à
                  nous appeler pour savoir ce qui se passe chez vous. L'information
                  vous parvient — vous n'avez pas à la chercher.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/images/approche-reporting.png"
                alt="Tableau de bord de pilotage AMANA RENTAL — reporting, traçabilité et maîtrise de la gestion locative"
                fill
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-5">
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Délai de réponse", value: "< 48h" },
                    { label: "Reporting", value: "Mensuel" },
                    { label: "Visites du bien", value: "2×/an" },
                    { label: "Devis soumis", value: "100%" },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-center"
                    >
                      <p className="text-base font-bold text-primary leading-none mb-0.5">
                        {stat.value}
                      </p>
                      <p className="text-[10px] font-medium text-foreground/80">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-secondary">
        <div className="container-tight">
          <SectionTitle
            eyebrow="Questions fréquentes"
            title="Ce que vous vous demandez peut-être"
            centered
            className="mb-12"
          />
          <div className="max-w-3xl mx-auto">
            <FAQ items={FAQ_ITEMS} />
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Convaincu par la méthode ?"
        title="Discutons de votre bien"
        subtitle="Un premier entretien pour évaluer ensemble si notre approche correspond à vos attentes."
        primaryCta={{ label: "Prendre rendez-vous", href: "/contact" }}
        secondaryCta={{ label: "Nos services", href: "/services" }}
      />
    </>
  );
}
