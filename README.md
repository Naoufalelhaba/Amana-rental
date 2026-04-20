# AMANA RENTAL — Site Web

Site vitrine haut de gamme pour **AMANA RENTAL**, partenaire structuré de gestion locative et conciergerie immobilière au Maroc.

## Stack technique

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS v4** + shadcn/ui
- **Framer Motion** (animations subtiles)
- **Lucide React** (icônes)
- **Inter** + **Playfair Display** (Google Fonts)
- **React Hook Form** + **Zod** (validation formulaire)

## Installation

```bash
# 1. Cloner le repo
git clone <repo-url>
cd amana-rental

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec vos valeurs

# 4. Démarrer le serveur de développement
npm run dev
```

Le site est disponible sur [http://localhost:3000](http://localhost:3000).

## Commandes

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Serveur de production (après build) |
| `npm run lint` | Vérification ESLint |

## Structure du projet

```
amana-rental/
├── app/                          # Pages (App Router)
│   ├── layout.tsx                # Layout racine (Navbar + Footer)
│   ├── page.tsx                  # Homepage
│   ├── la-marque/page.tsx        # À propos
│   ├── services/page.tsx         # Services
│   ├── notre-approche/page.tsx   # Méthodologie
│   ├── investisseurs-proprietaires/page.tsx
│   ├── contact/page.tsx          # Formulaire de contact
│   ├── api/contact/route.ts      # Route API (formulaire)
│   ├── globals.css               # Palette AMANA + styles globaux
│   ├── sitemap.ts                # Sitemap XML automatique
│   └── robots.ts                 # robots.txt
├── components/
│   ├── ui/                       # Composants shadcn/ui
│   ├── layout/
│   │   ├── Navbar.tsx            # Navigation (transparent → solide au scroll)
│   │   └── Footer.tsx            # Pied de page 3 colonnes
│   ├── sections/
│   │   ├── Hero.tsx              # Hero fullscreen avec Framer Motion
│   │   ├── SectionTitle.tsx      # Titre de section réutilisable
│   │   ├── PillarCard.tsx        # Carte pilier / valeur
│   │   ├── ServiceCard.tsx       # Carte service avec liste de features
│   │   ├── FAQ.tsx               # Accordéon FAQ (shadcn)
│   │   └── CTASection.tsx        # Bloc CTA réutilisable
│   └── forms/
│       └── ContactForm.tsx       # Formulaire avec validation Zod
├── lib/
│   ├── utils.ts                  # Helper cn() (shadcn)
│   └── validators.ts             # Schémas Zod
├── public/images/                # Images (voir CONTENT.md)
├── .env.example                  # Variables d'environnement à copier
└── CONTENT.md                    # Guide de personnalisation des textes
```

## Personnalisation

### Couleurs
Modifier les variables CSS dans [app/globals.css](app/globals.css) — section `:root` :

```css
:root {
  --primary: #123C35;   /* Vert profond */
  --accent:  #C6A75E;   /* Or doux */
  --background: #F9FAFB;
}
```

### Textes
Voir [CONTENT.md](CONTENT.md) pour la liste complète des textes modifiables par page.

### Images
Placer les images dans `public/images/`. Noms attendus :
- `hero-home.jpg` (1920×1080)
- `hero-brand.jpg`, `hero-services.jpg`, `hero-approche.jpg`, `hero-investisseurs.jpg`
- `about-story.jpg`, `apartment-1.jpg`
- `og-default.jpg` (1200×630) — Open Graph

### Informations de contact
Modifier directement dans :
- [components/layout/Footer.tsx](components/layout/Footer.tsx) — téléphone, email, adresse
- [app/contact/page.tsx](app/contact/page.tsx) — section coordonnées

## Formulaire de contact

Le formulaire utilise la route `/api/contact`. Pour activer l'envoi d'e-mails :

1. Installer Nodemailer : `npm install nodemailer @types/nodemailer`
2. Remplir les variables SMTP dans `.env.local`
3. Décommenter et adapter le code dans [app/api/contact/route.ts](app/api/contact/route.ts)

## Déploiement (Vercel — recommandé)

1. Pousser le projet sur GitHub
2. Importer sur [vercel.com](https://vercel.com)
3. Ajouter les variables d'environnement depuis `.env.example`
4. Déployer — le build est automatique

Variables à configurer sur Vercel :
- `NEXT_PUBLIC_SITE_URL` — URL de production (ex: `https://www.amana-rental.ma`)
- `CONTACT_EMAIL` — e-mail de réception
- Variables SMTP si l'envoi d'e-mails est activé
