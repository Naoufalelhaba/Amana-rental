"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Easing } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroProps {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  subtitle: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  imageSrc?: string | undefined;
  imageAlt?: string;
  fullHeight?: boolean;
  className?: string;
}

const ease: Easing = "easeOut";

function fadeUpProps(delay: number) {
  return {
    initial: { opacity: 0, y: 32 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease, delay },
  };
}

export function Hero({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  primaryCta = { label: "Découvrir notre approche", href: "/notre-approche" },
  secondaryCta = { label: "Nous contacter", href: "/contact" },
  imageSrc,
  imageAlt = "Résidence premium AMANA RENTAL",
  fullHeight = true,
  className,
}: HeroProps) {
  return (
    <section
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-primary",
        fullHeight ? "min-h-screen" : "min-h-[60vh]",
        className
      )}
    >
      {/* Background image */}
      {imageSrc && (
        <div className="absolute inset-0">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>
      )}

      {/* Overlay neutre — assombrit sans teinter les couleurs de l'image */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Gradient vertical — zone menu (haut) et zone texte (centre/bas) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/60" />

      {/* Gold accent line top */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent/60" />

      {/* Content */}
      <div className="relative z-10 container-tight px-4 sm:px-6 lg:px-8 text-center py-20 sm:py-28 lg:py-32">
        {eyebrow && (
          <motion.p
            {...fadeUpProps(0)}
            className="text-xs font-semibold tracking-[0.25em] uppercase text-white/90 drop-shadow-sm mb-6"
          >
            {eyebrow}
          </motion.p>
        )}

        <motion.h1
          {...fadeUpProps(0.15)}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-white leading-[1.2] sm:leading-[1.15] tracking-tight max-w-4xl mx-auto drop-shadow-md"
        >
          {title}
          {titleAccent && (
            <>
              <br className="hidden sm:block" />
              <em
                className="font-serif italic font-normal text-accent"
                style={{ textShadow: "0 2px 12px rgba(0,0,0,0.55)" }}
              >
                {titleAccent}
              </em>
            </>
          )}
        </motion.h1>

        <motion.p
          {...fadeUpProps(0.3)}
          className="mt-5 text-base sm:text-lg md:text-xl font-medium text-white/80 max-w-2xl mx-auto leading-relaxed drop-shadow-sm"
        >
          {subtitle}
        </motion.p>

        <motion.div
          {...fadeUpProps(0.45)}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href={primaryCta.href}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent hover:bg-accent/90 text-white font-medium px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base transition-all"
          >
            {primaryCta.label}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href={secondaryCta.href}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 text-white hover:bg-white/10 font-medium px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base transition-all"
          >
            {secondaryCta.label}
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        {fullHeight && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
            className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 hover:text-white/70 transition-colors cursor-pointer"
            aria-label="Défiler vers le contenu"
          >
            <span className="text-xs tracking-widest uppercase">Défiler</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </motion.button>
        )}
      </div>
    </section>
  );
}
