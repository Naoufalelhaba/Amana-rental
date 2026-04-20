"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CTASectionProps {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  variant?: "primary" | "light" | "card";
  className?: string;
}

export function CTASection({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  primaryCta = { label: "Nous contacter", href: "/contact" },
  secondaryCta,
  variant = "primary",
  className,
}: CTASectionProps) {
  const isDark = variant === "primary";
  const isCard = variant === "card";

  if (isCard) {
    return (
      <section className={cn("section-padding bg-[#F9FAFB]", className)}>
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-primary rounded-2xl p-6 sm:p-8 lg:p-12 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent/60" />
            {eyebrow && (
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">
                {eyebrow}
              </p>
            )}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white leading-tight mb-4">
              {title}
              {titleAccent && (
                <>
                  <br />
                  <em className="font-serif italic font-normal text-accent">{titleAccent}</em>
                </>
              )}
            </h2>
            {subtitle && (
              <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">{subtitle}</p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={primaryCta.href}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent hover:bg-accent/90 text-white font-medium px-8 py-3 text-sm transition-all"
              >
                {primaryCta.label}
                <ArrowRight className="w-4 h-4" />
              </Link>
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 text-white hover:bg-white/10 font-medium px-8 py-3 text-sm transition-all"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn(
        "section-padding",
        isDark ? "bg-primary" : "bg-secondary",
        className
      )}
    >
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto"
        >
          {eyebrow && (
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 text-accent">
              {eyebrow}
            </p>
          )}
          <h2
            className={cn(
              "text-3xl sm:text-4xl font-semibold leading-tight mb-4",
              isDark ? "text-white" : "text-foreground"
            )}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className={cn(
                "text-lg mb-8",
                isDark ? "text-white/70" : "text-muted-foreground"
              )}
            >
              {subtitle}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={primaryCta.href}
              className={cn(
                "inline-flex items-center justify-center gap-1.5 rounded-lg px-6 py-2.5 text-sm font-medium transition-all",
                isDark
                  ? "bg-accent hover:bg-accent/90 text-white"
                  : "bg-primary hover:bg-primary/90 text-white"
              )}
            >
              {primaryCta.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className={cn(
                  "inline-flex items-center justify-center gap-1.5 rounded-lg border px-6 py-2.5 text-sm font-medium transition-all",
                  isDark
                    ? "bg-white text-primary hover:bg-white/90"
                    : "border-primary text-primary hover:bg-primary/5"
                )}
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
