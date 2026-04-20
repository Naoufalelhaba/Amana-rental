"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const SERVICES = [
  {
    badge: "Location Longue Durée",
    title: "Gestion Locative\nLongue Durée",
    subtitle:
      "Sérénité et valorisation de votre patrimoine immobilier sur le long terme.",
    imageSrc: "/images/gauche.png",
    imageAlt:
      "Intérieur chaleureux d'un appartement en gestion locative longue durée — AMANA RENTAL",
    imagePosition: "object-center",
    cta: "Découvrir la gestion longue durée",
    href: "/services",
  },
  {
    badge: "Conciergerie Saisonnière",
    title: "Conciergerie &\nLocation Saisonnière",
    subtitle:
      "Optimisation de vos revenus et exigence hôtelière pour vos voyageurs.",
    imageSrc: "/images/droite.jpg",
    imageAlt:
      "Chambre hôtelière haut de gamme — conciergerie saisonnière AMANA RENTAL",
    imagePosition: "object-top",
    cta: "Découvrir la conciergerie",
    href: "/services",
  },
];

export function HomeServicesTeaser() {
  return (
    <section className="section-padding bg-background">
      <div className="container-tight">
        {/* En-tête de section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-accent mb-3">
            Deux expertises
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">
            Une offre adaptée à chaque situation
          </h2>
        </motion.div>

        {/* Grille deux cartes magazine */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {SERVICES.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="group relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image */}
              <Image
                src={service.imageSrc}
                alt={service.imageAlt}
                fill
                className={`object-cover ${service.imagePosition} transition-transform duration-700 group-hover:scale-105`}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />

              {/* Contenu bas de carte */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 lg:p-9">
                <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-accent mb-3">
                  {service.badge}
                </span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white leading-tight mb-3 break-words">
                  {service.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-sm font-medium">
                  {service.subtitle}
                </p>
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-2 text-sm font-medium text-white border-b border-white/40 pb-0.5 hover:text-accent hover:border-accent transition-colors duration-200 group/link"
                >
                  {service.cta}
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
