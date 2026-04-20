"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, LayoutGrid, ShieldCheck, CheckSquare } from "lucide-react";

const POINTS = [
  {
    icon: LayoutGrid,
    title: "Organisation & Rigueur",
    description:
      "Des processus documentés pour chaque étape de la gestion. Rien n'est laissé au hasard, tout est traçable.",
  },
  {
    icon: ShieldCheck,
    title: "Transparence Maîtrisée",
    description:
      "Reporting mensuel, accès à l'historique complet, zéro décision prise sans votre aval.",
  },
  {
    icon: CheckSquare,
    title: "Garde-fous Opérationnels",
    description:
      "Des mécanismes de contrôle concrets qui protègent votre bien et sécurisent vos revenus.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function HomeReassurance() {
  return (
    <section className="section-padding bg-primary">
      <div className="container-tight">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-accent mb-4">
            Notre différence
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-tight mb-5">
            Une méthode éprouvée.{" "}
            <em className="font-serif italic font-normal text-accent">
              Des risques maîtrisés.
            </em>
          </h2>
          <p className="text-white/65 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            Nous ne sommes pas une simple agence. AMANA RENTAL est un partenaire
            structuré de gestion immobilière, reposant sur des process internes
            rigoureux.
          </p>
        </motion.div>

        {/* 3 points clés */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14"
        >
          {POINTS.map((point, i) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex flex-col items-center text-center p-8 rounded-xl border border-white/10 bg-white/5 hover:bg-white/8 transition-colors duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center mb-5 flex-shrink-0">
                  <Icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold text-white mb-3">{point.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {point.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA centré */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link
            href="/notre-approche"
            className="inline-flex items-center gap-2 rounded-lg bg-accent hover:bg-accent/90 text-white font-medium px-8 py-3.5 text-sm transition-all"
          >
            Comprendre notre approche
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
