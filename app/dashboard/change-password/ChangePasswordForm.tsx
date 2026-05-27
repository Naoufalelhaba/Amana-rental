'use client'

import { useActionState, useState } from 'react'
import { changePassword } from '@/app/actions/auth'
import { Eye, EyeOff, Lock, CheckCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'

export function ChangePasswordForm({ forced = false }: { forced?: boolean }) {
  const [state, action, pending] = useActionState(changePassword, undefined)
  const [show, setShow] = useState({ current: false, next: false, confirm: false })

  if (state?.success) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
        <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
          <CheckCircle className="w-7 h-7 text-green-600" />
        </div>
        <div>
          <p className="font-semibold text-foreground text-lg">Mot de passe modifié !</p>
          <p className="text-sm text-muted-foreground mt-1">Votre mot de passe a été mis à jour avec succès.</p>
        </div>
        <Link
          href="/dashboard"
          className="mt-2 px-6 py-2.5 bg-[#123C35] hover:bg-[#0e2e28] text-white text-sm font-semibold rounded-lg transition-all"
        >
          Retour au tableau de bord
        </Link>
      </div>
    )
  }

  function toggle(field: keyof typeof show) {
    setShow(v => ({ ...v, [field]: !v[field] }))
  }

  return (
    <form action={action} className="space-y-5 max-w-md">
      {state?.error && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          <span className="mt-0.5">⚠</span>
          <span>{state.error}</span>
        </div>
      )}

      {([
        { id: 'currentPassword', label: forced ? 'Mot de passe temporaire' : 'Mot de passe actuel', field: 'current' as const, autoComplete: 'current-password' },
        { id: 'newPassword', label: 'Nouveau mot de passe', field: 'next' as const, autoComplete: 'new-password' },
        { id: 'confirmPassword', label: 'Confirmer le nouveau mot de passe', field: 'confirm' as const, autoComplete: 'new-password' },
      ] as const).map(({ id, label, field, autoComplete }) => (
        <div key={id} className="space-y-1.5">
          <label htmlFor={id} className="block text-sm font-medium text-foreground">
            {label}
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              id={id}
              name={id}
              type={show[field] ? 'text' : 'password'}
              required
              autoComplete={autoComplete}
              placeholder="••••••••"
              className="w-full pl-10 pr-12 py-3 border border-border rounded-lg bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#C6A75E]/40 focus:border-[#C6A75E] transition-colors"
            />
            <button
              type="button"
              onClick={() => toggle(field)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {show[field] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
      ))}

      <p className="text-xs text-muted-foreground">Le mot de passe doit contenir au moins 8 caractères.</p>

      <div className="flex items-center gap-3 pt-1">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#C6A75E] hover:bg-[#b8963f] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all text-sm"
        >
          {pending && <Loader2 className="w-4 h-4 animate-spin" />}
          {pending ? 'Enregistrement…' : forced ? 'Définir mon mot de passe' : 'Modifier le mot de passe'}
        </button>
        {!forced && (
          <Link
            href="/dashboard"
            className="px-4 py-3 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg transition-colors"
          >
            Annuler
          </Link>
        )}
      </div>
    </form>
  )
}
