import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { verifySession } from '@/lib/dal'
import { logout } from '@/app/actions/auth'
import { DashboardRefresher } from '@/components/dashboard/DashboardRefresher'
import { LogOut, Building2, TrendingUp, CalendarClock, FileText, Download, AlertCircle, KeyRound, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Mon Tableau de Bord — AMANA RENTAL',
  robots: { index: false, follow: false },
}

// ─── Types Airtable ─────────────────────────────────────────────────────────

type AirtableAttachment = {
  id: string
  url: string
  filename: string
  size: number
  type: string
}

type LocationRecord = {
  id: string
  fields: {
    'Identifiant / Client'?: string
    'Email Client'?: string
    'Bien Immobilier'?: string
    'Début Location'?: string
    'Fin Location'?: string
    'Statut'?: string
    'Revenus Générés'?: number
    'Documents'?: AirtableAttachment[]
  }
}

// ─── Airtable fetch (pas de cache — données toujours fraîches) ───────────────

async function getLocations(email: string): Promise<LocationRecord[]> {
  const baseId = process.env.AIRTABLE_BASE_ID
  const token = process.env.AIRTABLE_TOKEN

  if (!baseId || !token) {
    throw new Error('Variables Airtable manquantes dans .env.local')
  }

  const formula = encodeURIComponent(`LOWER({Email Client})="${email.toLowerCase()}"`)
  const url = `https://api.airtable.com/v0/${baseId}/Locations?filterByFormula=${formula}`

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error(`Airtable API ${res.status}: ${res.statusText}`)
  }

  const data = await res.json()
  return (data.records as LocationRecord[]) ?? []
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(dateStr?: string): string {
  if (!dateStr) return '—'
  return new Intl.DateTimeFormat('fr-MA', { day: '2-digit', month: 'short', year: 'numeric' }).format(
    new Date(dateStr)
  )
}

function formatCurrency(amount?: number): string {
  if (amount == null) return '—'
  return new Intl.NumberFormat('fr-MA', { style: 'currency', currency: 'MAD', maximumFractionDigits: 0 }).format(
    amount
  )
}

const STATUS_STYLES: Record<string, { bg: string; text: string; dot: string }> = {
  'À venir':  { bg: 'bg-blue-50',   text: 'text-blue-700',  dot: 'bg-blue-500' },
  'En cours': { bg: 'bg-green-50',  text: 'text-green-700', dot: 'bg-green-500' },
  'Terminé':  { bg: 'bg-gray-100',  text: 'text-gray-600',  dot: 'bg-gray-400' },
}

function StatusBadge({ status }: { status?: string }) {
  const s = status ?? 'Inconnu'
  const style = STATUS_STYLES[s] ?? { bg: 'bg-gray-100', text: 'text-gray-500', dot: 'bg-gray-400' }
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
      {s}
    </span>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function DashboardPage() {
  const session = await verifySession()
  if (session.mustChangePassword) redirect('/dashboard/change-password')

  let locations: LocationRecord[] = []
  let fetchError: string | null = null

  try {
    locations = await getLocations(session.email)
  } catch (err) {
    fetchError = err instanceof Error ? err.message : 'Erreur inconnue'
  }

  const totalRevenue = locations.reduce((sum, r) => sum + (r.fields['Revenus Générés'] ?? 0), 0)
  const activeCount = locations.filter(r => r.fields['Statut'] === 'En cours').length
  const propertyCount = new Set(locations.map(r => r.fields['Bien Immobilier'])).size

  return (
    <div className="min-h-screen bg-[#f9fafb] pt-16">

      {/* ── Header dashboard ─────────────────────────────────────────────── */}
      <header className="bg-[#123C35] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-[#C6A75E] text-xs font-medium tracking-widest uppercase mb-0.5">
              Mon Espace Client
            </p>
            <h1 className="text-xl font-semibold" style={{ fontFamily: 'var(--font-playfair), serif' }}>
              Bonjour, {session.name}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <DashboardRefresher />
            <Link
              href="/dashboard/change-password"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/10 text-sm font-medium text-white/90 transition-all"
              title="Modifier mon mot de passe"
            >
              <KeyRound className="w-4 h-4" />
              <span className="hidden sm:inline">Mot de passe</span>
            </Link>
            {session.role === 'admin' && (
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-[#C6A75E]/40 hover:border-[#C6A75E]/60 hover:bg-[#C6A75E]/10 text-sm font-medium text-[#C6A75E] transition-all"
                title="Administration"
              >
                <ShieldCheck className="w-4 h-4" />
                <span className="hidden sm:inline">Admin</span>
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
        {/* Ligne or */}
        <div className="h-0.5 bg-gradient-to-r from-transparent via-[#C6A75E] to-transparent" />
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* ── Cartes de synthèse ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SummaryCard
            icon={<TrendingUp className="w-5 h-5 text-[#C6A75E]" />}
            label="Revenus générés"
            value={formatCurrency(totalRevenue)}
          />
          <SummaryCard
            icon={<Building2 className="w-5 h-5 text-[#C6A75E]" />}
            label="Biens gérés"
            value={String(propertyCount)}
          />
          <SummaryCard
            icon={<CalendarClock className="w-5 h-5 text-[#C6A75E]" />}
            label="Locations en cours"
            value={String(activeCount)}
          />
        </div>

        {/* ── Tableau des locations ──────────────────────────────────────── */}
        <section className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-border/50 flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground">Mes locations</h2>
            <span className="text-xs text-muted-foreground">{locations.length} enregistrement{locations.length !== 1 ? 's' : ''}</span>
          </div>

          {fetchError ? (
            <div className="flex items-center gap-3 px-6 py-10 text-sm text-red-600">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>Impossible de charger les données : {fetchError}</span>
            </div>
          ) : locations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center px-6">
              <Building2 className="w-10 h-10 text-muted-foreground/30 mb-3" />
              <p className="text-sm font-medium text-foreground">Aucune location trouvée</p>
              <p className="text-xs text-muted-foreground mt-1">Vos données apparaîtront ici dès qu'elles seront renseignées.</p>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#f3f4f6] text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                      <th className="px-6 py-3 text-left">Bien immobilier</th>
                      <th className="px-6 py-3 text-left">Période</th>
                      <th className="px-6 py-3 text-left">Statut</th>
                      <th className="px-6 py-3 text-right">Revenus</th>
                      <th className="px-6 py-3 text-center">Documents</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40">
                    {locations.map(record => {
                      const f = record.fields
                      const docs = f['Documents'] ?? []
                      return (
                        <tr key={record.id} className="hover:bg-[#f9fafb] transition-colors">
                          <td className="px-6 py-4">
                            <p className="font-medium text-foreground">{f['Bien Immobilier'] ?? '—'}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{f['Identifiant / Client'] ?? ''}</p>
                          </td>
                          <td className="px-6 py-4 text-muted-foreground">
                            <span>{formatDate(f['Début Location'])}</span>
                            <span className="mx-1.5 text-border">→</span>
                            <span>{formatDate(f['Fin Location'])}</span>
                          </td>
                          <td className="px-6 py-4">
                            <StatusBadge status={f['Statut']} />
                          </td>
                          <td className="px-6 py-4 text-right font-semibold text-[#123C35]">
                            {formatCurrency(f['Revenus Générés'])}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col items-start gap-1.5">
                              {docs.length === 0 ? (
                                <span className="text-xs text-muted-foreground">—</span>
                              ) : (
                                docs.map(doc => (
                                  <a
                                    key={doc.id}
                                    href={doc.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download={doc.filename}
                                    title={doc.filename}
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#123C35]/5 hover:bg-[#123C35]/10 text-[#123C35] text-xs font-medium transition-colors"
                                  >
                                    <FileText className="w-3.5 h-3.5" />
                                    <span className="max-w-[120px] truncate">{doc.filename}</span>
                                    <Download className="w-3 h-3 flex-shrink-0" />
                                  </a>
                                ))
                              )}
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden divide-y divide-border/40">
                {locations.map(record => {
                  const f = record.fields
                  const docs = f['Documents'] ?? []
                  return (
                    <div key={record.id} className="px-5 py-5 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-medium text-foreground text-sm">{f['Bien Immobilier'] ?? '—'}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{f['Identifiant / Client'] ?? ''}</p>
                        </div>
                        <StatusBadge status={f['Statut']} />
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <p className="text-muted-foreground mb-0.5">Période</p>
                          <p className="text-foreground">{formatDate(f['Début Location'])} → {formatDate(f['Fin Location'])}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-0.5">Revenus</p>
                          <p className="font-semibold text-[#123C35]">{formatCurrency(f['Revenus Générés'])}</p>
                        </div>
                      </div>
                      {docs.length > 0 && (
                        <div className="flex flex-col gap-1.5 pt-1">
                          {docs.map(doc => (
                            <a
                              key={doc.id}
                              href={doc.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              download={doc.filename}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#123C35]/5 text-[#123C35] text-xs font-medium"
                            >
                              <Download className="w-3 h-3" />
                              {doc.filename}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </section>

      </main>

      {/* Footer minimal */}
      <footer className="text-center py-8 text-xs text-muted-foreground">
        © {new Date().getFullYear()} AMANA RENTAL — Espace client sécurisé
      </footer>
    </div>
  )
}

// ─── Composant carte synthèse ─────────────────────────────────────────────────

function SummaryCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-white rounded-xl border border-border/50 shadow-sm px-6 py-5 flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-[#123C35]/6 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs text-muted-foreground font-medium">{label}</p>
        <p className="text-xl font-bold text-[#123C35] mt-0.5">{value}</p>
      </div>
    </div>
  )
}
