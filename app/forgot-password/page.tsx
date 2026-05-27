import type { Metadata } from 'next'
import { ForgotPasswordForm } from './ForgotPasswordForm'

export const metadata: Metadata = {
  title: 'Mot de passe oublié — AMANA RENTAL',
  robots: { index: false, follow: false },
}

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-[#f9fafb] pt-16 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo / Marque */}
        <div className="text-center mb-8">
          <p className="text-[#C6A75E] text-xs font-medium tracking-widest uppercase mb-2">
            AMANA RENTAL
          </p>
          <h1 className="text-2xl font-semibold text-[#123C35]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            Mot de passe oublié
          </h1>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            Saisissez votre adresse e-mail et nous vous enverrons<br />
            un lien pour réinitialiser votre mot de passe.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-border/50 shadow-sm px-8 py-8">
          <ForgotPasswordForm />
        </div>

        <div className="h-0.5 bg-gradient-to-r from-transparent via-[#C6A75E]/30 to-transparent mt-8" />
      </div>
    </div>
  )
}
