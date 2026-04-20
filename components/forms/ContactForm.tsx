"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { contactSchema, type ContactFormData } from "@/lib/validators";
import { cn } from "@/lib/utils";

type SubmitStatus = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
            placeholder="Mohammed Alami"
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
            placeholder="m.alami@exemple.ma"
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
          <Input
            id="telephone"
            type="tel"
            placeholder="+212 6 XX XX XX XX"
            {...register("telephone")}
            className={cn(errors.telephone && "border-destructive focus-visible:ring-destructive")}
          />
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
          placeholder="Casablanca"
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
