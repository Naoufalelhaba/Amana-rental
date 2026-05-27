import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { getSession } from '@/lib/session'
import { readFileSync, writeFileSync } from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'

type User = { id: string; name: string; email: string; password: string; role?: string }

const USERS_PATH = path.join(process.cwd(), 'data', 'users.json')

function getUsers(): User[] {
  try { return JSON.parse(readFileSync(USERS_PATH, 'utf-8')) } catch { return [] }
}

function saveUsers(users: User[]) {
  writeFileSync(USERS_PATH, JSON.stringify(users, null, 2), 'utf-8')
}

async function requireAdmin() {
  const session = await getSession()
  if (session?.role !== 'admin') return null
  return session
}

export async function GET() {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })

  const users = getUsers().map(({ password: _pw, ...u }) => u)
  return NextResponse.json({ users })
}

export async function POST(request: Request) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })

  const body = await request.json() as { name?: string; email?: string; password?: string }
  const { name, email, password } = body

  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Tous les champs sont requis.' }, { status: 400 })
  }
  if (password.length < 8) {
    return NextResponse.json({ error: 'Le mot de passe doit contenir au moins 8 caractères.' }, { status: 400 })
  }

  const users = getUsers()
  const normalizedEmail = email.trim().toLowerCase()

  if (users.some(u => u.email.toLowerCase() === normalizedEmail)) {
    return NextResponse.json({ error: 'Un compte avec cet email existe déjà.' }, { status: 409 })
  }

  users.push({
    id: randomUUID(),
    name: name.trim(),
    email: normalizedEmail,
    password: await bcrypt.hash(password, 10),
    role: 'client',
  })
  saveUsers(users)

  return NextResponse.json({ success: true }, { status: 201 })
}

export async function DELETE(request: Request) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID manquant' }, { status: 400 })

  if (session.userId === id) {
    return NextResponse.json({ error: 'Vous ne pouvez pas supprimer votre propre compte.' }, { status: 400 })
  }

  const users = getUsers()
  const filtered = users.filter(u => u.id !== id)
  if (filtered.length === users.length) {
    return NextResponse.json({ error: 'Utilisateur introuvable.' }, { status: 404 })
  }

  saveUsers(filtered)
  return NextResponse.json({ success: true })
}
