import type { Metadata } from 'next'
import Image from 'next/image'
import { Shield } from 'lucide-react'
import { LoginForm } from './LoginForm'

export const metadata: Metadata = {
  title: 'Mon Espace Client — Connexion',
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
      style={{ background: 'linear-gradient(160deg, #123C35 0%, #1a5048 35%, #f9fafb 65%, #f3f4f6 100%)' }}
    >
      <div className="w-full max-w-md">
        {/* Logo & titre */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <Image
              src="/images/logo.jpeg"
              alt="AMANA RENTAL"
              width={72}
              height={72}
              className="rounded-xl object-contain"
              priority
            />
          </div>
          <h1
            className="text-2xl font-semibold text-white"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            Mon Espace Client
          </h1>
          <p className="text-white/70 text-sm mt-1.5 tracking-wide uppercase text-xs font-medium">
            AMANA RENTAL — Espace propriétaire
          </p>
        </div>

        {/* Carte de connexion */}
        <div className="bg-white rounded-2xl shadow-2xl border border-border/30 p-8">
          {/* En-tête de la carte */}
          <div className="flex items-center gap-3 mb-6 pb-5 border-b border-border/50">
            <div className="w-9 h-9 rounded-full bg-[#123C35]/8 flex items-center justify-center flex-shrink-0">
              <Shield className="w-4.5 h-4.5 text-[#123C35]" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">Connexion sécurisée</h2>
              <p className="text-xs text-muted-foreground">Accédez à vos données de gestion locative</p>
            </div>
          </div>

          <LoginForm />
        </div>

        {/* Séparateur doré */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <div className="h-px w-10 bg-[#C6A75E]/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#C6A75E]/70" />
          <div className="h-px w-10 bg-[#C6A75E]/50" />
        </div>
      </div>
    </div>
  )
}
