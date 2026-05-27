import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { randomUUID } from 'crypto'
import { getUsers, saveUsers } from '@/lib/db'

// GET /api/create-admin?secret=VOTRE_SEED_SECRET
// Route d'urgence — à supprimer après utilisation
export async function GET(request: Request) {
  const secret = new URL(request.url).searchParams.get('secret')

  if (!process.env.SEED_SECRET || secret !== process.env.SEED_SECRET) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
  }

  const adminEmail = 'n.elhaba@gmail.com'
  const adminPassword = 'Younes123!'

  const users = await getUsers()

  // Supprimer l'entrée existante avec cet email si elle existe (même avec mauvais rôle)
  const filtered = users.filter(u => u.email.toLowerCase() !== adminEmail.toLowerCase())

  filtered.push({
    id: randomUUID(),
    name: 'Naoufal',
    email: adminEmail,
    password: await bcrypt.hash(adminPassword, 10),
    role: 'admin',
    mustChangePassword: false,
  })

  await saveUsers(filtered)

  return NextResponse.json({ success: true, message: 'Compte admin créé. Supprimez cette route après connexion.' })
}
