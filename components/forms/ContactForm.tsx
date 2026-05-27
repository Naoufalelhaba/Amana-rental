"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, AlertCircle, Loader2, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { contactSchema, type ContactFormData } from "@/lib/validators";
import { cn } from "@/lib/utils";

type SubmitStatus = "idle" | "loading" | "success" | "error";

const DIAL_CODES = [
  { code: "+212", flag: "🇲🇦", label: "Maroc" },
  { code: "+33", flag: "🇫🇷", label: "France" },
  { code: "+32", flag: "🇧🇪", label: "Belgique" },
  { code: "+34", flag: "🇪🇸", label: "Espagne" },
  { code: "+41", flag: "🇨🇭", label: "Suisse" },
  { code: "+971", flag: "🇦🇪", label: "Émirats arabes" },
  { code: "+966", flag: "🇸🇦", label: "Arabie Saoudite" },
  { code: "+974", flag: "🇶🇦", label: "Qatar" },
  { code: "+213", flag: "🇩🇿", label: "Algérie" },
  { code: "+216", flag: "🇹🇳", label: "Tunisie" },
  { code: "+44", flag: "🇬🇧", label: "Royaume-Uni" },
  { code: "+1", flag: "🇺🇸", label: "États-Unis" },
  { code: "+49", flag: "🇩🇪", label: "Allemagne" },
  { code: "+39", flag: "🇮🇹", label: "Italie" },
  { code: "+351", flag: "🇵🇹", label: "Portugal" },
  { code: "+31", flag: "🇳🇱", label: "Pays-Bas" },
];

export function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [phoneIndicatif, setPhoneIndicatif] = useState("+212");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus("loading");
    try {
      const payload = {
        ...data,
        telephone: data.telephone ? `${phoneIndicatif} ${data.telephone}` : "",
      };
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
          <CheckCircle className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Message envoyé</h3>
        <p className="text-muted-foreground text-sm max-w-sm">
          Votre demande a bien été reçue. Un membre de notre équipe vous
          contactera dans les 24 heures ouvrées.
        </p>
        <button
          onClick={() => setSubmitStatus("idle")}
          className="mt-6 text-sm text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Row 1: Nom + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="nom" className="text-sm font-medium">
            Nom complet <span className="text-destructive">*</span>
          </Label>
          <Input
            id="nom"
            placeholder=""
            {...register("nom")}
            className={cn(errors.nom && "border-destructive focus-visible:ring-destructive")}
          />
          {errors.nom && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.nom.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Adresse e-mail <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder=""
            {...register("email")}
            className={cn(errors.email && "border-destructive focus-visible:ring-destructive")}
          />
          {errors.email && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      {/* Row 2: Téléphone + Type de bien */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="telephone" className="text-sm font-medium">
            Téléphone
          </Label>
          <div
            className={cn(
              "flex h-9 w-full overflow-hidden rounded-lg border border-input bg-transparent text-sm transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
              errors.telephone && "border-destructive focus-within:border-destructive focus-within:ring-destructive/20"
            )}
          >
            {/* Indicatif selector */}
            <div className="relative flex items-center border-r border-input flex-shrink-0">
              <select
                value={phoneIndicatif}
                onChange={(e) => setPhoneIndicatif(e.target.value)}
                aria-label="Indicatif téléphonique"
                className="h-full appearance-none bg-transparent pl-2.5 pr-6 text-sm text-foreground focus:outline-none cursor-pointer"
              >
                {DIAL_CODES.map((dc) => (
                  <option key={dc.code} value={dc.code}>
                    {dc.flag} {dc.code}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-1.5 w-3 h-3 text-muted-foreground" />
            </div>
            {/* Numéro local */}
            <input
              id="telephone"
              type="tel"
              placeholder=""
              {...register("telephone")}
              className="min-w-0 flex-1 bg-transparent px-2.5 py-1 placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          {errors.telephone && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.telephone.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="typeBien" className="text-sm font-medium">
            Type de bien <span className="text-destructive">*</span>
          </Label>
          <select
            id="typeBien"
            {...register("typeBien")}
            className={cn(
              "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              errors.typeBien && "border-destructive focus-visible:ring-destructive"
            )}
          >
            <option value="">Sélectionner...</option>
            <option value="appartement">Appartement</option>
            <option value="villa">Villa / Maison</option>
            <option value="bureau">Bureau</option>
            <option value="local-commercial">Local commercial</option>
            <option value="autre">Autre</option>
          </select>
          {errors.typeBien && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.typeBien.message}
            </p>
          )}
        </div>
      </div>

      {/* Ville */}
      <div className="space-y-2">
        <Label htmlFor="ville" className="text-sm font-medium">
          Ville <span className="text-destructive">*</span>
        </Label>
        <Input
          id="ville"
          placeholder=""
          {...register("ville")}
          className={cn(errors.ville && "border-destructive focus-visible:ring-destructive")}
        />
        {errors.ville && (
          <p className="text-xs text-destructive flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.ville.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message" className="text-sm font-medium">
          Votre message <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="message"
          rows={5}
          placeholder="Décrivez votre bien et vos attentes..."
          {...register("message")}
          className={cn(
            "resize-none",
            errors.message && "border-destructive focus-visible:ring-destructive"
          )}
        />
        {errors.message && (
          <p className="text-xs text-destructive flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Error banner */}
      {submitStatus === "error" && (
        <div className="flex items-center gap-2 p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          Une erreur est survenue. Veuillez réessayer ou nous contacter directement par téléphone.
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting || submitStatus === "loading"}
        className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-5"
      >
        {isSubmitting || submitStatus === "loading" ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Envoi en cours...
          </>
        ) : (
          "Envoyer ma demande"
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Vos données sont traitées de manière confidentielle. Réponse garantie sous 24h ouvrées.
      </p>
    </form>
  );
}
