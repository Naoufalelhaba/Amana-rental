import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { readFileSync, writeFileSync } from 'fs'
import path from 'path'
import { randomBytes } from 'crypto'

type User = { id: string; name: string; email: string; password: string; role?: string }
type ResetToken = { token: string; email: string; expiresAt: string }

const USERS_PATH = path.join(process.cwd(), 'data', 'users.json')
const TOKENS_PATH = path.join(process.cwd(), 'data', 'reset-tokens.json')

function getUsers(): User[] {
  try { return JSON.parse(readFileSync(USERS_PATH, 'utf-8')) } catch { return [] }
}

function getTokens(): ResetToken[] {
  try { return JSON.parse(readFileSync(TOKENS_PATH, 'utf-8')) } catch { return [] }
}

function saveTokens(tokens: ResetToken[]) {
  writeFileSync(TOKENS_PATH, JSON.stringify(tokens, null, 2), 'utf-8')
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json() as { email?: string }
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email requis.' }, { status: 400 })
    }

    const normalizedEmail = email.trim().toLowerCase()
    const user = getUsers().find(u => u.email.toLowerCase() === normalizedEmail)

    // Toujours retourner succès pour éviter l'énumération d'emails
    if (!user) return NextResponse.json({ success: true })

    const now = new Date()
    const activeTokens = getTokens().filter(t => new Date(t.expiresAt) > now)

    const token = randomBytes(32).toString('hex')
    const expiresAt = new Date(now.getTime() + 60 * 60 * 1000).toISOString()

    const withoutOld = activeTokens.filter(t => t.email !== normalizedEmail)
    withoutOld.push({ token, email: normalizedEmail, expiresAt })
    saveTokens(withoutOld)

    if (!process.env.EMAIL_PASS) {
      return NextResponse.json({ error: 'Configuration serveur manquante.' }, { status: 500 })
    }

    const origin = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin
    const resetUrl = `${origin}/reset-password/${token}`

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: 'system.amanarental@gmail.com', pass: process.env.EMAIL_PASS },
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

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('forgot-password error:', err)
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
  }
}
