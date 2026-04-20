"use client";

import { motion, Variants } from "framer-motion";
import { ServiceCard } from "./ServiceCard";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

interface ServiceCardsProps {
  longDureeFeatures: string[];
  conciergerieFeatures: string[];
}

export function ServiceCardsSection({
  longDureeFeatures,
  conciergerieFeatures,
}: ServiceCardsProps) {
  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      <motion.div variants={item}>
        <ServiceCard
          badge="Location Longue Durée"
          title="Gestion locative classique"
          description="Une solution complète pour les propriétaires qui souhaitent déléguer entièrement la gestion de leur bien loué à l'année, sans sacrifier la tranquillité d'esprit."
          features={longDureeFeatures}
          href="/notre-approche"
          imageSrc="/images/service-longue-duree.png"
          imageAlt="Intérieur chaleureux d'un appartement en gestion locative longue durée AMANA RENTAL"
        />
      </motion.div>
      <motion.div variants={item}>
        <ServiceCard
          badge="Conciergerie Saisonnière"
          title="Location courte durée pilotée"
          description="Maximisez vos revenus locatifs grâce à une gestion professionnelle de votre bien sur les plateformes de location courte durée. Nous gérons tout, vous encaissez."
          features={conciergerieFeatures}
          href="/notre-approche"
          highlight
          imageSrc="/images/service-saisonnier.png"
          imageAlt="Chambre hôtelière haut de gamme — conciergerie saisonnière AMANA RENTAL"
        />
      </motion.div>
    </motion.div>
  );
}
