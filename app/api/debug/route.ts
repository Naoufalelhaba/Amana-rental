import { NextResponse } from 'next/server'
import { getUsers } from '@/lib/db'

// GET /api/debug?secret=VOTRE_SEED_SECRET
// Diagnostic : vérifie la config Redis et affiche les utilisateurs (sans mots de passe)
export async function GET(request: Request) {
  const secret = new URL(request.url).searchParams.get('secret')
  if (!process.env.SEED_SECRET || secret !== process.env.SEED_SECRET) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
  }

  const env = {
    UPSTASH_REDIS_REST_URL: Boolean(process.env.UPSTASH_REDIS_REST_URL),
    UPSTASH_REDIS_REST_TOKEN: Boolean(process.env.UPSTASH_REDIS_REST_TOKEN),
    KV_REST_API_URL: Boolean(process.env.KV_REST_API_URL),
    KV_REST_API_TOKEN: Boolean(process.env.KV_REST_API_TOKEN),
    SESSION_SECRET: Boolean(process.env.SESSION_SECRET),
    EMAIL_PASS: Boolean(process.env.EMAIL_PASS),
  }

  const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN
  const useRedis = Boolean(redisUrl && redisToken)

  try {
    const users = await getUsers()
    return NextResponse.json({
      env,
      useRedis,
      userCount: users.length,
      users: users.map(({ password: _pw, ...u }) => u),
    })
  } catch (err) {
    return NextResponse.json({
      env,
      useRedis,
      error: err instanceof Error ? err.message : String(err),
    }, { status: 500 })
  }
}
