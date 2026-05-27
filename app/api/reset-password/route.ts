import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { getUsers, saveUsers, getTokens, saveTokens } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json() as { token?: string; password?: string }

    if (!token || !password) {
      return NextResponse.json({ error: 'Données manquantes.' }, { status: 400 })
    }
    if (password.length < 8) {
      return NextResponse.json({ error: 'Le mot de passe doit contenir au moins 8 caractères.' }, { status: 400 })
    }

    const tokens = await getTokens()
    const record = tokens.find(t => t.token === token)

    if (!record) {
      return NextResponse.json({ error: 'Lien invalide ou expiré.' }, { status: 400 })
    }
    if (new Date(record.expiresAt) < new Date()) {
      await saveTokens(tokens.filter(t => t.token !== token))
      return NextResponse.json({ error: 'Ce lien a expiré. Veuillez refaire une demande.' }, { status: 400 })
    }

    const users = await getUsers()
    const idx = users.findIndex(u => u.email.toLowerCase() === record.email)
    if (idx === -1) return NextResponse.json({ error: 'Utilisateur introuvable.' }, { status: 400 })

    users[idx].password = await bcrypt.hash(password, 10)
    await saveUsers(users)
    await saveTokens(tokens.filter(t => t.token !== token))

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('reset-password error:', err)
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
  }
}
