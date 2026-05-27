import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { getSession } from '@/lib/session'
import { getUsers, saveUsers } from '@/lib/db'
import { randomUUID } from 'crypto'

async function requireAdmin() {
  const session = await getSession()
  if (session?.role !== 'admin') return null
  return session
}

export async function GET() {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })

  const users = (await getUsers()).map(({ password: _pw, ...u }) => u)
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

  const users = await getUsers()
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
  await saveUsers(users)

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

  const users = await getUsers()
  const filtered = users.filter(u => u.id !== id)
  if (filtered.length === users.length) {
    return NextResponse.json({ error: 'Utilisateur introuvable.' }, { status: 404 })
  }

  await saveUsers(filtered)
  return NextResponse.json({ success: true })
}
