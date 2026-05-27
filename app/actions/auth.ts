'use server'

import { redirect } from 'next/navigation'
import bcrypt from 'bcryptjs'
import { createSession, deleteSession, getSession } from '@/lib/session'
import { getUsers, saveUsers } from '@/lib/db'
import { randomUUID } from 'crypto'
import nodemailer from 'nodemailer'

export type ActionState = { error?: string; success?: boolean } | undefined
export type LoginState = { error: string } | undefined

export async function login(state: LoginState, formData: FormData): Promise<LoginState> {
  const email = (formData.get('email') as string | null)?.trim().toLowerCase() ?? ''
  const password = (formData.get('password') as string | null) ?? ''

  if (!email || !password) {
    return { error: 'Veuillez remplir tous les champs.' }
  }

  const users = await getUsers()
  const user = users.find(u => u.email.toLowerCase() === email)

  if (!user) {
    return { error: 'Identifiants incorrects.' }
  }

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) {
    return { error: 'Identifiants incorrects.' }
  }

  await createSession(user.id, user.email, user.name, user.role ?? 'client', user.mustChangePassword ?? false)
  redirect(user.mustChangePassword ? '/dashboard/change-password' : '/dashboard')
}

export async function logout() {
  await deleteSession()
  redirect('/login')
}

export async function changePassword(state: ActionState, formData: FormData): Promise<ActionState> {
  const session = await getSession()
  if (!session?.userId) redirect('/login')

  const current = (formData.get('currentPassword') as string | null) ?? ''
  const next = (formData.get('newPassword') as string | null) ?? ''
  const confirm = (formData.get('confirmPassword') as string | null) ?? ''

  if (!current || !next || !confirm) return { error: 'Veuillez remplir tous les champs.' }
  if (next.length < 8) return { error: 'Le nouveau mot de passe doit contenir au moins 8 caractères.' }
  if (next !== confirm) return { error: 'Les mots de passe ne correspondent pas.' }

  const users = await getUsers()
  const idx = users.findIndex(u => u.id === session.userId)
  if (idx === -1) return { error: 'Utilisateur introuvable.' }

  const isValid = await bcrypt.compare(current, users[idx].password)
  if (!isValid) return { error: 'Mot de passe actuel incorrect.' }

  const wasForced = users[idx].mustChangePassword === true
  users[idx].password = await bcrypt.hash(next, 10)
  users[idx].mustChangePassword = false
  await saveUsers(users)

  const u = users[idx]
  await createSession(u.id, u.email, u.name, u.role ?? 'client', false)

  if (wasForced) redirect('/dashboard')

  return { success: true }
}

export async function adminCreateUser(state: ActionState, formData: FormData): Promise<ActionState> {
  const session = await getSession()
  if (session?.role !== 'admin') return { error: 'Accès non autorisé.' }

  const name = (formData.get('name') as string | null)?.trim() ?? ''
  const email = (formData.get('email') as string | null)?.trim().toLowerCase() ?? ''
  const password = (formData.get('password') as string | null) ?? ''

  if (!name || !email || !password) return { error: 'Tous les champs sont requis.' }
  if (password.length < 8) return { error: 'Le mot de passe doit contenir au moins 8 caractères.' }

  const users = await getUsers()
  if (users.some(u => u.email.toLowerCase() === email)) {
    return { error: 'Un compte avec cet email existe déjà.' }
  }

  users.push({
    id: randomUUID(),
    name,
    email,
    password: await bcrypt.hash(password, 10),
    role: 'client',
    mustChangePassword: true,
  })
  await saveUsers(users)

  if (process.env.EMAIL_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: 'system.amanarental@gmail.com', pass: process.env.EMAIL_PASS },
      })
      const loginUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://amana-rental.com'}/login`
      await transporter.sendMail({
        from: '"AMANA RENTAL" <system.amanarental@gmail.com>',
        to: email,
        subject: 'Bienvenue sur votre espace client — AMANA RENTAL',
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px">
            <h2 style="color:#123C35;margin-bottom:8px">Bienvenue sur votre espace client</h2>
            <div style="height:2px;background:linear-gradient(to right,transparent,#C6A75E,transparent);margin-bottom:24px"></div>
            <p style="color:#374151">Bonjour <strong>${name}</strong>,</p>
            <p style="color:#374151">Votre compte AMANA RENTAL a été créé. Voici vos identifiants de connexion :</p>
            <div style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:8px;padding:20px;margin:24px 0">
              <p style="margin:0 0 8px;color:#374151"><strong>Email :</strong> ${email}</p>
              <p style="margin:0;color:#374151"><strong>Mot de passe temporaire :</strong> ${password}</p>
            </div>
            <p style="color:#DC2626;font-weight:600">Pour la sécurité de votre compte, veuillez modifier votre mot de passe dès votre première connexion.</p>
            <div style="text-align:center;margin:32px 0">
              <a href="${loginUrl}"
                 style="background:#C6A75E;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;display:inline-block">
                Accéder à mon espace client
              </a>
            </div>
            <hr style="border:none;border-top:1px solid #E5E7EB;margin:24px 0">
            <p style="color:#9CA3AF;font-size:12px;text-align:center">© ${new Date().getFullYear()} AMANA RENTAL — Espace client sécurisé</p>
          </div>
        `,
      })
    } catch (err) {
      console.error('welcome email error:', err)
    }
  }

  return { success: true }
}
