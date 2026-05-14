import { NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";

const qualifySchema = z.object({
  projet: z.string().min(1, "Veuillez sélectionner votre projet."),
  typeBien: z.string().min(1, "Veuillez sélectionner le type de bien."),
  ville: z.string().min(2, "Veuillez indiquer la ville."),
  nom: z.string().min(2, "Veuillez saisir votre nom."),
  telephone: z.string().min(8, "Numéro de téléphone invalide."),
  email: z.string().email("Adresse e-mail invalide."),
});

const PROJET_LABELS: Record<string, string> = {
  "location-longue-duree": "Mise en location longue durée",
  "conciergerie-saisonniere": "Conciergerie saisonnière",
  "renseignement": "Je me renseigne",
};

const BIEN_LABELS: Record<string, string> = {
  "appartement": "Appartement",
  "villa": "Villa",
  "immeuble": "Immeuble",
  "autre": "Autre",
};

export async function POST(request: Request) {
  try {
    // ── 1. Parse du body ──────────────────────────────────────────────────────
    let body: unknown;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error("🚨 ERREUR API QUALIFY — parse JSON :", parseError);
      return NextResponse.json(
        { success: false, error: "Corps de la requête invalide (JSON attendu)." },
        { status: 400 }
      );
    }

    // ── 2. Validation Zod ─────────────────────────────────────────────────────
    const result = qualifySchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.flatten() },
        { status: 400 }
      );
    }

    const { projet, typeBien, ville, nom, telephone, email } = result.data;

    // ── 3. Vérification variable d'environnement ──────────────────────────────
    if (!process.env.EMAIL_PASS) {
      console.error("🚨 ERREUR API QUALIFY — EMAIL_PASS introuvable dans .env.local");
      return NextResponse.json(
        { success: false, error: "Configuration serveur manquante (EMAIL_PASS)." },
        { status: 500 }
      );
    }

    // ── 4. Construction du corps HTML ─────────────────────────────────────────
    const emailHtml = `
      <h2 style="color:#123C35;font-family:sans-serif">Nouveau prospect QCM — Amana Rental</h2>
      <table cellpadding="10" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
        <tr style="background:#f9fafb">
          <td><strong>Projet</strong></td>
          <td>${PROJET_LABELS[projet] ?? projet}</td>
        </tr>
        <tr>
          <td><strong>Type de bien</strong></td>
          <td>${BIEN_LABELS[typeBien] ?? typeBien}</td>
        </tr>
        <tr style="background:#f9fafb">
          <td><strong>Ville</strong></td>
          <td>${ville}</td>
        </tr>
        <tr>
          <td><strong>Nom</strong></td>
          <td>${nom}</td>
        </tr>
        <tr style="background:#f9fafb">
          <td><strong>Téléphone</strong></td>
          <td>${telephone}</td>
        </tr>
        <tr>
          <td><strong>E-mail</strong></td>
          <td><a href="mailto:${email}">${email}</a></td>
        </tr>
      </table>
    `;

    // ── 5. Envoi Nodemailer ───────────────────────────────────────────────────
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "system.amanarental@gmail.com",
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: "system.amanarental@gmail.com",
      to: "n.elhaba@gmail.com",
      subject: "Nouveau prospect QCM - Amana Rental",
      html: emailHtml,
    });

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error("🚨 ERREUR API QUALIFY :", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}
