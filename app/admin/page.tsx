import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { verifySession } from '@/lib/dal'
import { logout } from '@/app/actions/auth'
import { AdminPanel } from './AdminPanel'
import { LogOut, ShieldCheck, LayoutDashboard } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Administration — AMANA RENTAL',
  robots: { index: false, follow: false },
}

export default async function AdminPage() {
  const session = await verifySession()

  if (session.role !== 'admin') {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#f9fafb] pt-16">

      <header className="bg-[#123C35] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#C6A75E]" />
            <div>
              <p className="text-[#C6A75E] text-xs font-medium tracking-widest uppercase mb-0.5">
                Administration
              </p>
              <h1 className="text-xl font-semibold" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                Gestion des accès
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/10 text-sm font-medium text-white/90 transition-all"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">Mon tableau de bord</span>
            </Link>
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
        <AdminPanel currentUserId={session.userId} />
      </main>

      <footer className="text-center py-8 text-xs text-muted-foreground">
        © {new Date().getFullYear()} AMANA RENTAL — Administration
      </footer>
    </div>
  )
}
