'use client'

import { useState } from 'react'
import { Lock, Eye, EyeOff, CheckCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'

export function ResetPasswordForm({ token }: { token: string }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')
  const [show, setShow] = useState({ password: false, confirm: false })

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    const formData = new FormData(e.currentTarget)
    const password = formData.get('password') as string
    const confirm = formData.get('confirm') as string

    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas.')
      return
    }
    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.')
      return
    }

    setStatus('loading')
    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })
      const data = await res.json() as { success?: boolean; error?: string }
      if (!res.ok || data.error) {
        setError(data.error ?? 'Une erreur est survenue.')
        setStatus('error')
        return
      }
      setStatus('success')
    } catch {
      setError('Impossible de contacter le serveur.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center text-center gap-4 py-4">
        <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
          <CheckCircle className="w-7 h-7 text-green-600" />
        </div>
        <div>
          <p className="font-semibold text-foreground text-lg">Mot de passe modifié !</p>
          <p className="text-sm text-muted-foreground mt-2">
            Votre mot de passe a été réinitialisé avec succès.
          </p>
        </div>
        <Link
          href="/login"
          className="mt-2 px-6 py-2.5 bg-[#123C35] hover:bg-[#0e2e28] text-white text-sm font-semibold rounded-lg transition-all"
        >
          Se connecter
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {(status === 'error' || error) && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          <span className="mt-0.5">⚠</span>
          <span>{error}</span>
        </div>
      )}

      {([
        { id: 'password', label: 'Nouveau mot de passe', field: 'password' as const, autoComplete: 'new-password' },
        { id: 'confirm', label: 'Confirmer le mot de passe', field: 'confirm' as const, autoComplete: 'new-password' },
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
              onClick={() => setShow(v => ({ ...v, [field]: !v[field] }))}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {show[field] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
      ))}

      <p className="text-xs text-muted-foreground">Le mot de passe doit contenir au moins 8 caractères.</p>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full inline-flex items-center justify-center gap-2 bg-[#C6A75E] hover:bg-[#b8963f] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all text-sm"
      >
        {status === 'loading' && <Loader2 className="w-4 h-4 animate-spin" />}
        {status === 'loading' ? 'Modification…' : 'Définir le nouveau mot de passe'}
      </button>
    </form>
  )
}
