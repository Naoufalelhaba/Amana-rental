'use server'

import { redirect } from 'next/navigation'
import bcrypt from 'bcryptjs'
import { createSession, deleteSession } from '@/lib/session'
import { readFileSync } from 'fs'
import path from 'path'

type User = {
  id: string
  name: string
  email: string
  password: string
}

function getUsers(): User[] {
  try {
    const filePath = path.join(process.cwd(), 'data', 'users.json')
    const raw = readFileSync(filePath, 'utf-8')
    return JSON.parse(raw) as User[]
  } catch {
    return []
  }
}

export type LoginState = { error: string } | undefined

export async function login(state: LoginState, formData: FormData): Promise<LoginState> {
  const email = (formData.get('email') as string | null)?.trim().toLowerCase() ?? ''
  const password = (formData.get('password') as string | null) ?? ''

  if (!email || !password) {
    return { error: 'Veuillez remplir tous les champs.' }
  }

  const users = getUsers()
  const user = users.find(u => u.email.toLowerCase() === email)

  if (!user) {
    return { error: 'Identifiants incorrects.' }
  }

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) {
    return { error: 'Identifiants incorrects.' }
  }

  await createSession(user.id, user.email, user.name)
  redirect('/dashboard')
}

export async function logout() {
  await deleteSession()
  redirect('/login')
}
