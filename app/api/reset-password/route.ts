import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { readFileSync, writeFileSync } from 'fs'
import path from 'path'

type User = { id: string; name: string; email: string; password: string; role?: string }
type ResetToken = { token: string; email: string; expiresAt: string }

const USERS_PATH = path.join(process.cwd(), 'data', 'users.json')
const TOKENS_PATH = path.join(process.cwd(), 'data', 'reset-tokens.json')

function getUsers(): User[] {
  try { return JSON.parse(readFileSync(USERS_PATH, 'utf-8')) } catch { return [] }
}

function saveUsers(users: User[]) {
  writeFileSync(USERS_PATH, JSON.stringify(users, null, 2), 'utf-8')
}

function getTokens(): ResetToken[] {
  try { return JSON.parse(readFileSync(TOKENS_PATH, 'utf-8')) } catch { return [] }
}

function saveTokens(tokens: ResetToken[]) {
  writeFileSync(TOKENS_PATH, JSON.stringify(tokens, null, 2), 'utf-8')
}

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json() as { token?: string; password?: string }

    if (!token || !password) {
      return NextResponse.json({ error: 'Données manquantes.' }, { status: 400 })
    }
    if (password.length < 8) {
      return NextResponse.json({ error: 'Le mot de passe doit contenir au moins 8 caractères.' }, { status: 400 })
    }

    const tokens = getTokens()
    const record = tokens.find(t => t.token === token)

    if (!record) {
      return NextResponse.json({ error: 'Lien invalide ou expiré.' }, { status: 400 })
    }
    if (new Date(record.expiresAt) < new Date()) {
      saveTokens(tokens.filter(t => t.token !== token))
      return NextResponse.json({ error: 'Ce lien a expiré. Veuillez refaire une demande.' }, { status: 400 })
    }

    const users = getUsers()
    const idx = users.findIndex(u => u.email.toLowerCase() === record.email)
    if (idx === -1) return NextResponse.json({ error: 'Utilisateur introuvable.' }, { status: 400 })

    users[idx].password = await bcrypt.hash(password, 10)
    saveUsers(users)
    saveTokens(tokens.filter(t => t.token !== token))

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('reset-password error:', err)
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
  }
}
