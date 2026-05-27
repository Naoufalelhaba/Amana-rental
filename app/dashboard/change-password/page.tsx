import type { Metadata } from 'next'
import { verifySession } from '@/lib/dal'
import { logout } from '@/app/actions/auth'
import { ChangePasswordForm } from './ChangePasswordForm'
import { LogOut, KeyRound, LayoutDashboard, ShieldAlert } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Modifier mon mot de passe — AMANA RENTAL',
  robots: { index: false, follow: false },
}

export default async function ChangePasswordPage() {
  const session = await verifySession()
  const forced = session.mustChangePassword === true

  return (
    <div className="min-h-screen bg-[#f9fafb] pt-16">

      <header className="bg-[#123C35] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-[#C6A75E] text-xs font-medium tracking-widest uppercase mb-0.5">
              Mon Espace Client
            </p>
            <h1 className="text-xl font-semibold" style={{ fontFamily: 'var(--font-playfair), serif' }}>
              {forced ? 'Définir votre mot de passe' : 'Modifier mon mot de passe'}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {!forced && (
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/10 text-sm font-medium text-white/90 transition-all"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">Tableau de bord</span>
              </Link>
            )}
            <form action={logout}>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/10 text-sm font-medium text-white/90 transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Se déconnecter</span>
              </button>
            </form>
          </div>
        </div>
        <div className="h-0.5 bg-gradient-to-r from-transparent via-[#C6A75E] to-transparent" />
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {forced && (
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-5 py-4 mb-6">
            <ShieldAlert className="w-5 h-5 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-sm">Action requise : définissez votre mot de passe personnel</p>
              <p className="text-sm mt-0.5 text-amber-700">
                Pour des raisons de sécurité, vous devez choisir un nouveau mot de passe avant d&apos;accéder à votre espace client. Votre mot de passe temporaire ne sera plus valide après cette étape.
              </p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-border/50 flex items-center gap-3">
            <KeyRound className="w-5 h-5 text-[#C6A75E]" />
            <div>
              <h2 className="text-base font-semibold text-foreground">Sécurité du compte</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Connecté en tant que {session.email}</p>
            </div>
          </div>
          <div className="px-6 py-6">
            <ChangePasswordForm forced={forced} />
          </div>
        </div>
      </main>

      <footer className="text-center py-8 text-xs text-muted-foreground">
        © {new Date().getFullYear()} AMANA RENTAL — Espace client sécurisé
      </footer>
    </div>
  )
}
