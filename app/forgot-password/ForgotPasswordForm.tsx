'use client'

import { useState } from 'react'
import { Mail, CheckCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'

export function ForgotPasswordForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setError('')
    const email = new FormData(e.currentTarget).get('email') as string

    try {
      const res = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json() as { success?: boolean; error?: string }
      if (!res.ok || data.error) {
        setError(data.error ?? 'Une erreur est survenue.')
        setStatus('error')
        return
      }
      setStatus('success')
    } catch {
      setError('Impossible de contacter le serveur. Veuillez réessayer.')
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
          <p className="font-semibold text-foreground text-lg">Email envoyé !</p>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            Si un compte existe avec cet email, vous recevrez un lien de réinitialisation dans quelques minutes.<br />
            Vérifiez également vos spams.
          </p>
        </div>
        <Link
          href="/login"
          className="mt-2 text-sm font-medium text-[#C6A75E] hover:underline"
        >
          Retour à la connexion
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {(status === 'error') && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          <span className="mt-0.5">⚠</span>
          <span>{error}</span>
        </div>
      )}

      <div className="space-y-1.5">
        <label htmlFor="email" className="block text-sm font-medium text-foreground">
          Adresse e-mail
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="votre@email.com"
            className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#C6A75E]/40 focus:border-[#C6A75E] transition-colors"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full inline-flex items-center justify-center gap-2 bg-[#C6A75E] hover:bg-[#b8963f] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 text-sm tracking-wide"
      >
        {status === 'loading' && <Loader2 className="w-4 h-4 animate-spin" />}
        {status === 'loading' ? 'Envoi en cours…' : 'Envoyer le lien de réinitialisation'}
      </button>

      <p className="text-center text-sm">
        <Link href="/login" className="text-[#C6A75E] hover:underline font-medium">
          Retour à la connexion
        </Link>
      </p>
    </form>
  )
}
