import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { randomBytes } from 'crypto'
import { getUsers, getTokens, saveTokens } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const { email } = await request.json() as { email?: string }
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email requis.' }, { status: 400 })
    }

    const normalizedEmail = email.trim().toLowerCase()
    const user = (await getUsers()).find(u => u.email.toLowerCase() === normalizedEmail)

    // Toujours retourner succès pour éviter l'énumération d'emails
    if (!user) return NextResponse.json({ success: true })

    const now = new Date()
    const activeTokens = (await getTokens()).filter(t => new Date(t.expiresAt) > now)

    const token = randomBytes(32).toString('hex')
    const expiresAt = new Date(now.getTime() + 60 * 60 * 1000).toISOString()

    const withoutOld = activeTokens.filter(t => t.email !== normalizedEmail)
    withoutOld.push({ token, email: normalizedEmail, expiresAt })
    await saveTokens(withoutOld)

    if (!process.env.EMAIL_PASS) {
      return NextResponse.json({ error: 'Configuration serveur manquante.' }, { status: 500 })
    }

    const origin = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin
    const resetUrl = `${origin}/reset-password/${token}`

    // Send with 5s timeout — Vercel may block SMTP
    await Promise.race([
      (async () => {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { user: 'system.amanarental@gmail.com', pass: process.env.EMAIL_PASS },
          connectionTimeout: 4000,
          socketTimeout: 4000,
          greetingTimeout: 4000,
        })
        await transporter.sendMail({
          from: '"AMANA RENTAL" <system.amanarental@gmail.com>',
          to: user.email,
          subject: 'Réinitialisation de votre mot de passe — AMANA RENTAL',
          html: `
            <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px">
              <h2 style="color:#123C35;margin-bottom:8px">Réinitialisation de mot de passe</h2>
              <div style="height:2px;background:linear-gradient(to right,transparent,#C6A75E,transparent);margin-bottom:24px"></div>
              <p style="color:#374151">Bonjour <strong>${user.name}</strong>,</p>
              <p style="color:#374151">Vous avez demandé la réinitialisation de votre mot de passe pour votre espace client AMANA RENTAL.</p>
              <div style="text-align:center;margin:32px 0">
                <a href="${resetUrl}"
                   style="background:#C6A75E;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;display:inline-block">
                  Réinitialiser mon mot de passe
                </a>
              </div>
              <p style="color:#6B7280;font-size:13px">Ce lien expire dans <strong>1 heure</strong>.</p>
              <p style="color:#6B7280;font-size:13px">Si vous n'avez pas fait cette demande, ignorez cet email.</p>
              <hr style="border:none;border-top:1px solid #E5E7EB;margin:24px 0">
              <p style="color:#9CA3AF;font-size:12px;text-align:center">© ${new Date().getFullYear()} AMANA RENTAL — Espace client sécurisé</p>
            </div>
          `,
        })
      })(),
      new Promise<void>(resolve => setTimeout(resolve, 5000)),
    ])

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('forgot-password error:', err)
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
  }
}
