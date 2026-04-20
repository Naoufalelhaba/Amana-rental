import { z } from "zod";

export const contactSchema = z.object({
  nom: z.string().min(2, "Veuillez saisir votre nom complet."),
  email: z.string().email("Adresse e-mail invalide."),
  telephone: z
    .string()
    .regex(/^[0-9+\s\-().]{8,20}$/, "Numéro de téléphone invalide.")
    .optional()
    .or(z.literal("")),
  typeBien: z.enum(["appartement", "villa", "bureau", "local-commercial", "autre"], {
    error: "Veuillez sélectionner un type de bien.",
  }),
  ville: z.string().min(2, "Veuillez indiquer la ville."),
  message: z
    .string()
    .min(20, "Votre message doit comporter au moins 20 caractères."),
});

export type ContactFormData = z.infer<typeof contactSchema>;
