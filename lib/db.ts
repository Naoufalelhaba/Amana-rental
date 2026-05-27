import 'server-only'

export type User = {
  id: string
  name: string
  email: string
  password: string
  role?: string
  mustChangePassword?: boolean
}

export type ResetToken = {
  token: string
  email: string
  expiresAt: string
}

const useRedis = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
)

async function getRedis() {
  const { Redis } = await import('@upstash/redis')
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  })
}

// ─── File-based (local dev) ──────────────────────────────────────────────────

async function getFromFile<T>(filePath: string): Promise<T[]> {
  const { readFileSync } = await import('fs')
  try {
    return JSON.parse(readFileSync(filePath, 'utf-8')) as T[]
  } catch {
    return []
  }
}

async function saveToFile<T>(filePath: string, data: T[]): Promise<void> {
  const { writeFileSync, mkdirSync } = await import('fs')
  const { dirname } = await import('path')
  mkdirSync(dirname(filePath), { recursive: true })
  writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
}

// ─── Paths ───────────────────────────────────────────────────────────────────

async function usersFilePath() {
  const { join } = await import('path')
  return join(process.cwd(), 'data', 'users.json')
}

async function tokensFilePath() {
  const { join } = await import('path')
  return join(process.cwd(), 'data', 'reset-tokens.json')
}

// ─── Public API ──────────────────────────────────────────────────────────────

export async function getUsers(): Promise<User[]> {
  if (useRedis) {
    const redis = await getRedis()
    const users = await redis.get<User[]>('amana:users')
    return users ?? []
  }
  return getFromFile<User>(await usersFilePath())
}

export async function saveUsers(users: User[]): Promise<void> {
  if (useRedis) {
    const redis = await getRedis()
    await redis.set('amana:users', users)
    return
  }
  await saveToFile(await usersFilePath(), users)
}

export async function getTokens(): Promise<ResetToken[]> {
  if (useRedis) {
    const redis = await getRedis()
    const tokens = await redis.get<ResetToken[]>('amana:reset-tokens')
    return tokens ?? []
  }
  return getFromFile<ResetToken>(await tokensFilePath())
}

export async function saveTokens(tokens: ResetToken[]): Promise<void> {
  if (useRedis) {
    const redis = await getRedis()
    await redis.set('amana:reset-tokens', tokens)
    return
  }
  await saveToFile(await tokensFilePath(), tokens)
}
