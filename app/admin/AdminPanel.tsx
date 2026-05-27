'use client'

import { useState, useEffect, useActionState } from 'react'
import { adminCreateUser } from '@/app/actions/auth'
import { Trash2, UserPlus, Eye, EyeOff, Loader2, Users, ShieldCheck } from 'lucide-react'

type UserRow = { id: string; name: string; email: string; role?: string }

export function AdminPanel({ currentUserId }: { currentUserId: string }) {
  const [users, setUsers] = useState<UserRow[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleteError, setDeleteError] = useState('')
  const [createState, createAction, pending] = useActionState(adminCreateUser, undefined)

  async function fetchUsers() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/users')
      const data = await res.json() as { users?: UserRow[] }
      setUsers(data.users ?? [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchUsers() }, [])

  useEffect(() => {
    if (createState?.success) {
      setShowForm(false)
      fetchUsers()
    }
  }, [createState])

  async function handleDelete(id: string) {
    setDeleteError('')
    setDeleteId(id)
    try {
      const res = await fetch(`/api/admin/users?id=${id}`, { method: 'DELETE' })
      const data = await res.json() as { error?: string }
      if (data.error) { setDeleteError(data.error); return }
      setUsers(prev => prev.filter(u => u.id !== id))
    } finally {
      setDeleteId(null)
    }
  }

  return (
    <div className="space-y-6">

      {/* Header section */}
      <div className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-border/50 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-[#C6A75E]" />
            <h2 className="text-base font-semibold">Accès clients</h2>
            <span className="text-xs text-muted-foreground bg-[#f3f4f6] px-2 py-0.5 rounded-full">
              {users.length} compte{users.length !== 1 ? 's' : ''}
            </span>
          </div>
          <button
            onClick={() => setShowForm(v => !v)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#C6A75E] hover:bg-[#b8963f] text-white text-sm font-semibold rounded-lg transition-all"
          >
            <UserPlus className="w-4 h-4" />
            Créer un accès client
          </button>
        </div>

        {/* Create form */}
        {showForm && (
          <div className="px-6 py-5 bg-[#f9fafb] border-b border-border/50">
            <h3 className="text-sm font-semibold text-foreground mb-4">Nouveau compte client</h3>
            <form action={createAction} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Nom complet</label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Ex: Mohamed El Amrani"
                  className="w-full px-3 py-2.5 border border-border rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#C6A75E]/40 focus:border-[#C6A75E] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Adresse e-mail</label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="client@email.com"
                  className="w-full px-3 py-2.5 border border-border rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#C6A75E]/40 focus:border-[#C6A75E] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Mot de passe initial</label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={8}
                    placeholder="Min. 8 caractères"
                    className="w-full px-3 py-2.5 pr-10 border border-border rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#C6A75E]/40 focus:border-[#C6A75E] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {createState?.error && (
                <div className="sm:col-span-3 text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-2.5 rounded-lg">
                  {createState.error}
                </div>
              )}

              <div className="sm:col-span-3 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={pending}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#123C35] hover:bg-[#0e2e28] disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-all"
                >
                  {pending && <Loader2 className="w-4 h-4 animate-spin" />}
                  {pending ? 'Création…' : 'Créer le compte'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-5 py-2.5 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg transition-colors"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        )}

        {deleteError && (
          <div className="px-6 py-3 bg-red-50 border-b border-red-200 text-sm text-red-600">
            {deleteError}
          </div>
        )}

        {/* Users table */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center px-6">
            <Users className="w-10 h-10 text-muted-foreground/30 mb-3" />
            <p className="text-sm font-medium text-foreground">Aucun compte client</p>
            <p className="text-xs text-muted-foreground mt-1">Créez un accès pour vos clients.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f3f4f6] text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                  <th className="px-6 py-3 text-left">Nom</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Rôle</th>
                  <th className="px-6 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-[#f9fafb] transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{u.name}</td>
                    <td className="px-6 py-4 text-muted-foreground">{u.email}</td>
                    <td className="px-6 py-4">
                      {u.role === 'admin' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#123C35]/8 text-[#123C35]">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          Admin
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                          Client
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {u.id === currentUserId ? (
                        <span className="text-xs text-muted-foreground italic">Votre compte</span>
                      ) : (
                        <button
                          onClick={() => handleDelete(u.id)}
                          disabled={deleteId === u.id}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-red-600 hover:bg-red-50 text-xs font-medium transition-colors disabled:opacity-40"
                        >
                          {deleteId === u.id
                            ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            : <Trash2 className="w-3.5 h-3.5" />}
                          Supprimer
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
