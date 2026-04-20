import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.flatten() },
        { status: 400 }
      );
    }

    // TODO: Connecter un service email (ex: Nodemailer via SMTP_*)
    // const { nom, email, telephone, typeBien, ville, message } = result.data;
    // await sendEmail({ to: process.env.CONTACT_EMAIL, from: email, ... });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur. Veuillez réessayer." },
      { status: 500 }
    );
  }
}
