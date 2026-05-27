import type { Metadata } from 'next'
import { ResetPasswordForm } from './ResetPasswordForm'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Nouveau mot de passe — AMANA RENTAL',
  robots: { index: false, follow: false },
}

export default async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params

  return (
    <div className="min-h-screen bg-[#f9fafb] pt-16 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <p className="text-[#C6A75E] text-xs font-medium tracking-widest uppercase mb-2">
            AMANA RENTAL
          </p>
          <h1 className="text-2xl font-semibold text-[#123C35]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            Nouveau mot de passe
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Choisissez un nouveau mot de passe sécurisé.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-border/50 shadow-sm px-8 py-8">
          <ResetPasswordForm token={token} />
        </div>

        <p className="text-center text-sm mt-6">
          <Link href="/login" className="text-[#C6A75E] hover:underline font-medium">
            Retour à la connexion
          </Link>
        </p>

        <div className="h-0.5 bg-gradient-to-r from-transparent via-[#C6A75E]/30 to-transparent mt-6" />
      </div>
    </div>
  )
}
