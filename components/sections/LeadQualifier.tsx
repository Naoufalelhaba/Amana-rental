"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Easing } from "framer-motion";
import { ArrowRight, ChevronLeft, CheckCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface QualifyData {
  projet: string;
  typeBien: string;
  ville: string;
  nom: string;
  telephone: string;
  email: string;
}

type StepId = 1 | 2 | 3 | 4;

const ease: Easing = "easeOut";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 56 : -56,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -56 : 56,
    opacity: 0,
  }),
};

const STEP_LABELS = ["Projet", "Bien", "Localisation", "Contact"];

const PROJET_CHOICES = [
  { value: "location-longue-duree", label: "Mise en location\nlongue durée" },
  { value: "conciergerie-saisonniere", label: "Conciergerie\nsaisonnière" },
  { value: "renseignement", label: "Je me\nrenseigne" },
];

const BIEN_CHOICES = [
  { value: "appartement", label: "Appartement" },
  { value: "villa", label: "Villa" },
  { value: "immeuble", label: "Immeuble" },
  { value: "autre", label: "Autre" },
];

export function LeadQualifier() {
  const [step, setStep] = useState<StepId>(1);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<Partial<QualifyData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function goNext() {
    setDirection(1);
    setStep((s) => (Math.min(s + 1, 4) as StepId));
  }

  function goBack() {
    setDirection(-1);
    setStep((s) => (Math.max(s - 1, 1) as StepId));
  }

  function handleChoice(field: keyof QualifyData, value: string) {
    setData((d) => ({ ...d, [field]: value }));
    setTimeout(goNext, 180);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/qualify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setSubmitError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const progress = submitted ? 100 : ((step - 1) / 4) * 100;

  return (
    <section className="bg-white border-b border-[#E5E7EB]">
      <div className="container-tight px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-10"
        >
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-accent mb-3">
            Qualification rapide
          </p>
          <h2 className="text-xl sm:text-2xl font-semibold text-primary leading-snug">
            Obtenez votre estimation gratuite en 2 minutes
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Répondez à 3 questions pour que nous puissions préparer une proposition adaptée à votre bien.
          </p>
        </motion.div>

        {/* Progress indicator */}
        {!submitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-lg mx-auto mb-10"
          >
            <div className="h-1 bg-[#E5E7EB] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent rounded-full origin-left"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.45, ease }}
              />
            </div>
            <div className="flex justify-between mt-2">
              {STEP_LABELS.map((label, i) => (
                <span
                  key={label}
                  className={cn(
                    "text-[10px] font-medium transition-colors duration-300",
                    step > i + 1
                      ? "text-accent"
                      : step === i + 1
                      ? "text-primary"
                      : "text-[#9CA3AF]"
                  )}
                >
                  {label}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step content */}
        <div className="max-w-2xl mx-auto" style={{ minHeight: "220px" }}>
          <AnimatePresence mode="wait" custom={direction}>
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease }}
                className="text-center py-8"
              >
                <div className="w-14 h-14 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle className="w-7 h-7 text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  Demande reçue
                  {data.nom ? `, merci ${data.nom.split(" ")[0]}` : ""} !
                </h3>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                  Notre équipe vous contactera sous 24h pour vous présenter une proposition
                  adaptée à votre bien.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.32, ease }}
              >
                {/* ── Step 1 : Projet ── */}
                {step === 1 && (
                  <div>
                    <p className="text-center text-base font-semibold text-primary mb-6">
                      Quel est votre projet ?
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {PROJET_CHOICES.map((choice) => (
                        <button
                          key={choice.value}
                          type="button"
                          onClick={() => handleChoice("projet", choice.value)}
                          className={cn(
                            "rounded-xl border-2 px-5 py-5 text-sm font-medium text-center leading-snug whitespace-pre-line transition-all duration-200 hover:border-accent hover:bg-accent/5 hover:shadow-sm",
                            data.projet === choice.value
                              ? "border-accent bg-accent/10 text-primary shadow-sm"
                              : "border-[#E5E7EB] text-foreground bg-white"
                          )}
                        >
                          {choice.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Step 2 : Type de bien ── */}
                {step === 2 && (
                  <div>
                    <p className="text-center text-base font-semibold text-primary mb-6">
                      Quel type de bien possédez-vous ?
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {BIEN_CHOICES.map((choice) => (
                        <button
                          key={choice.value}
                          type="button"
                          onClick={() => handleChoice("typeBien", choice.value)}
                          className={cn(
                            "rounded-xl border-2 px-4 py-5 text-sm font-medium text-center transition-all duration-200 hover:border-accent hover:bg-accent/5 hover:shadow-sm",
                            data.typeBien === choice.value
                              ? "border-accent bg-accent/10 text-primary shadow-sm"
                              : "border-[#E5E7EB] text-foreground bg-white"
                          )}
                        >
                          {choice.label}
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={goBack}
                      className="mt-5 flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      Retour
                    </button>
                  </div>
                )}

                {/* ── Step 3 : Ville ── */}
                {step === 3 && (
                  <div>
                    <p className="text-center text-base font-semibold text-primary mb-6">
                      Où se situe votre bien ?
                    </p>
                    <input
                      type="text"
                      placeholder="Ex : Casablanca, Marrakech, Rabat…"
                      value={data.ville ?? ""}
                      onChange={(e) =>
                        setData((d) => ({ ...d, ville: e.target.value }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && data.ville?.trim()) goNext();
                      }}
                      className="w-full border-2 border-[#E5E7EB] rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-accent transition-colors"
                      autoFocus
                    />
                    <div className="mt-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={goBack}
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        Retour
                      </button>
                      <button
                        type="button"
                        onClick={goNext}
                        disabled={!data.ville?.trim()}
                        className="inline-flex items-center gap-2 rounded-lg bg-accent text-white font-medium px-6 py-2.5 text-sm transition-all hover:bg-accent/90 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Continuer
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* ── Step 4 : Coordonnées ── */}
                {step === 4 && (
                  <div>
                    <p className="text-center text-base font-semibold text-primary mb-1">
                      Vos coordonnées
                    </p>
                    <p className="text-center text-sm text-muted-foreground mb-6">
                      Pour recevoir votre estimation personnalisée gratuitement.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <input
                        type="text"
                        placeholder="Nom complet"
                        required
                        value={data.nom ?? ""}
                        onChange={(e) =>
                          setData((d) => ({ ...d, nom: e.target.value }))
                        }
                        className="w-full border-2 border-[#E5E7EB] rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-accent transition-colors"
                      />
                      <input
                        type="tel"
                        placeholder="Téléphone"
                        required
                        value={data.telephone ?? ""}
                        onChange={(e) =>
                          setData((d) => ({ ...d, telephone: e.target.value }))
                        }
                        className="w-full border-2 border-[#E5E7EB] rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-accent transition-colors"
                      />
                      <input
                        type="email"
                        placeholder="Adresse e-mail"
                        required
                        value={data.email ?? ""}
                        onChange={(e) =>
                          setData((d) => ({ ...d, email: e.target.value }))
                        }
                        className="w-full border-2 border-[#E5E7EB] rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-accent transition-colors"
                      />
                      {submitError && (
                        <p className="text-xs text-red-500">{submitError}</p>
                      )}
                      <div className="flex items-center justify-between pt-1">
                        <button
                          type="button"
                          onClick={goBack}
                          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                          Retour
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="inline-flex items-center gap-2 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium px-7 py-2.5 text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Envoi…
                            </>
                          ) : (
                            <>
                              Envoyer ma demande
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Scroll hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center text-[10px] tracking-widest uppercase text-muted-foreground mt-10"
        >
          Découvrez nos services ci-dessous
        </motion.p>
      </div>
    </section>
  );
}
