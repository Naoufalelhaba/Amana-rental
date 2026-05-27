import { NextResponse } from 'next/server'
import { getUsers, saveUsers } from '@/lib/db'

// Utilisateurs initiaux (mots de passe déjà hashés depuis users.json local)
const INITIAL_USERS = [
  {
    id: '5565babd-6267-44ef-ade3-57139324768a',
    name: 'Naoufal Test',
    email: 'n.elhaba@gmail.com',
    password: '$2b$10$yWnkywUnkPulIJTsqrIave6VXLoQWXjvoygLWeOa2BsV33jIxfsV.',
    role: 'admin',
  },
]

// GET /api/seed?secret=VOTRE_SEED_SECRET
// À appeler UNE SEULE FOIS après le premier déploiement sur Vercel
export async function GET(request: Request) {
  const secret = new URL(request.url).searchParams.get('secret')

  if (!process.env.SEED_SECRET || secret !== process.env.SEED_SECRET) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
  }

  const existing = await getUsers()
  if (existing.length > 0) {
    return NextResponse.json({ message: 'Déjà initialisé', count: existing.length })
  }

  await saveUsers(INITIAL_USERS)
  return NextResponse.json({ success: true, seeded: INITIAL_USERS.length })
}
