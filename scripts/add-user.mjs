/**
 * Script pour ajouter un propriétaire invité à l'espace client.
 *
 * Usage :
 *   node scripts/add-user.mjs "Prénom Nom" "email@exemple.com" "MotDePasse123"
 */

import { hash } from 'bcryptjs'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

const [, , name, email, password] = process.argv

if (!name || !email || !password) {
  console.error('\n❌  Arguments manquants.')
  console.error('Usage : node scripts/add-user.mjs "Prénom Nom" "email@exemple.com" "MotDePasse123"\n')
  process.exit(1)
}

const dataDir = path.join(ROOT, 'data')
const filePath = path.join(dataDir, 'users.json')

if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true })

let users = []
try {
  users = JSON.parse(readFileSync(filePath, 'utf-8'))
} catch {
  users = []
}

if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
  console.error(`\n❌  Un utilisateur avec l'e-mail "${email}" existe déjà.\n`)
  process.exit(1)
}

const hashedPassword = await hash(password, 10)
users.push({ id: randomUUID(), name, email: email.toLowerCase(), password: hashedPassword })

writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8')
console.log(`\n✅  Propriétaire "${name}" (${email}) ajouté avec succès.\n`)
