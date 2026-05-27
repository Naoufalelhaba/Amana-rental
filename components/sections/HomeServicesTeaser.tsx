"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const SERVICE = {
  title: "Nos Services",
  subtitle: "Gestion locative longue durée ou conciergerie saisonnière\n— deux approches pour valoriser votre bien.",
  imageSrc: "/images/gauche.png",
  imageAlt: "Services de gestion immobilière AMANA RENTAL",
  imagePosition: "object-center",
  cta: "Découvrir nos services",
  href: "/services",
};

export function HomeServicesTeaser() {
  return (
    <section className="py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-background to-primary/5">
      <div className="container-tight">
        {/* En-tête de section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">
            Une offre adaptée à chaque situation
          </h2>
        </motion.div>

        {/* Bloc service unique */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="group relative aspect-[3/2] sm:aspect-[16/9] lg:aspect-[21/9] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          {/* Image */}
          <Image
            src={SERVICE.imageSrc}
            alt={SERVICE.imageAlt}
            fill
            className={`object-cover ${SERVICE.imagePosition} transition-transform duration-700 group-hover:scale-105`}
            sizes="100vw"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />

          {/* Contenu bas de carte */}
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 lg:p-9">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white leading-tight mb-3">
              {SERVICE.title}
            </h3>
            <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-md font-medium whitespace-pre-line">
              {SERVICE.subtitle}
            </p>
            <Link
              href={SERVICE.href}
              className="inline-flex items-center gap-2 text-sm font-medium text-white border-b border-white/40 pb-0.5 hover:text-accent hover:border-accent transition-colors duration-200 group/link"
            >
              {SERVICE.cta}
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
