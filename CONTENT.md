# CONTENT.md — Guide des textes AMANA RENTAL

Ce fichier liste tous les textes modifiables par page. Idéal pour que le client puisse valider ou ajuster le contenu sans toucher au code.

---

## Global

| Élément | Texte actuel | Fichier |
|---------|-------------|---------|
| Tagline | « Faire confiance, tout en gardant le contrôle. » | `components/layout/Footer.tsx` |
| Meta description globale | « AMANA RENTAL est votre partenaire structuré de gestion immobilière... » | `app/layout.tsx` |

---

## Navbar

| Élément | Texte actuel |
|---------|-------------|
| Logo texte | AMANA RENTAL |
| Liens | Accueil / La Marque / Services / Notre Approche / Investisseurs |
| CTA | Nous contacter |

Fichier : `components/layout/Navbar.tsx`

---

## Footer

| Élément | Texte actuel |
|---------|-------------|
| Sous-titre | « Partenaire structuré de gestion immobilière. Faire confiance, tout en gardant le contrôle. » |
| Téléphone | +212 6 XX XX XX XX |
| Email | contact@amana-rental.ma |
| Adresse | Casablanca, Maroc |
| Indicateur | Réponse sous 24h |

Fichier : `components/layout/Footer.tsx`

---

## Page d'accueil (`/`)

### Hero
| Élément | Texte actuel |
|---------|-------------|
| Eyebrow | Partenaire de gestion immobilière |
| Titre | Confiez votre bien. |
| Titre accent (italique doré) | Gardez le contrôle. |
| Sous-titre | AMANA RENTAL gère votre bien locatif avec rigueur, transparence et une méthode éprouvée... |
| CTA primaire | Découvrir notre approche |
| CTA secondaire | Nous contacter |

### Piliers de confiance
| # | Titre | Description |
|---|-------|-------------|
| 1 | Garde-fous structurés | Des processus écrits, des contrôles réguliers... |
| 2 | Transparence totale | Vous êtes informé proactivement... |
| 3 | Traçabilité complète | Chaque action est documentée... |
| 4 | Pilotage par la donnée | Taux d'occupation, délais d'intervention... |

### Statistiques (bande dorée)
| Valeur | Label |
|--------|-------|
| +18% | revenus nets moyens |
| 97% | taux d'occupation |
| < 48h | délai de réponse |
| 100% | reporting transparent |

> **À personnaliser avec de vraies données dès que disponibles.**

### Témoignages
Fichier : `app/page.tsx` → constante `TESTIMONIALS`

Les 3 témoignages actuels sont des placeholders réalistes. À remplacer avec de vrais témoignages clients.

### FAQ (5 questions)
Fichier : `app/page.tsx` → constante `FAQ_ITEMS`

---

## Page La Marque (`/la-marque`)

| Section | Contenu |
|---------|---------|
| Histoire (3 paragraphes) | Origine d'AMANA, le constat, la signification du nom |
| Citation vision | « La gestion immobilière ne devrait jamais être une source d'inquiétude... » |
| Valeurs (3) | Rigueur / Transparence / Engagement |
| Tableau Partenaire vs Prestataire | 5 éléments par colonne |

Fichier : `app/la-marque/page.tsx`

---

## Page Services (`/services`)

### Gestion Locative Longue Durée
7 features listées dans `LONGUE_DUREE_FEATURES`

### Conciergerie Saisonnière
7 features listées dans `CONCIERGERIE_FEATURES`

### Pack Meublé
5 éléments dans `PACK_FEATURES`
Statistique : « réduction de 40% du délai de mise en location »

Fichier : `app/services/page.tsx`

---

## Page Notre Approche (`/notre-approche`)

### Garde-fous (4 piliers)
| Titre | Description |
|-------|-------------|
| Processus documentés | ... |
| Contrôles internes | ... |
| Pilotage par la donnée | ... |
| Communication structurée | ... |

### Process (5 étapes)
Fichier : `app/notre-approche/page.tsx` → constante `PROCESS_STEPS`

### Statistiques reporting
| Valeur | Label |
|--------|-------|
| < 48h | Délai de réponse |
| Mensuel | Reporting |
| 2×/an | Visites du bien |
| 100% | Devis soumis |

### FAQ (5 questions)
Fichier : `app/notre-approche/page.tsx` → constante `FAQ_ITEMS`

---

## Page Investisseurs & Propriétaires (`/investisseurs-proprietaires`)

### Statistiques (bande dorée)
| Valeur | Label |
|--------|-------|
| +18% | revenus nets en moyenne |
| 97% | taux d'occupation |
| 12 j | délai moyen de relocation |
| 0 | impayé non traité |

> **À personnaliser avec de vraies données dès que disponibles.**

### Section MRE (6 avantages)
Fichier : `app/investisseurs-proprietaires/page.tsx` → constante `MRE_ADVANTAGES`

### Témoignage MRE
Nom : Karim M. | Propriétaire MRE, Paris
> À remplacer avec un vrai témoignage.

---

## Page Contact (`/contact`)

| Élément | Valeur actuelle |
|---------|-----------------|
| Téléphone | +212 6 XX XX XX XX |
| Email | contact@amana-rental.ma |
| Adresse | Casablanca, Maroc |
| Disponibilités | Lundi – Vendredi, 9h – 18h |
| Message engagement | « Chaque demande reçoit une réponse personnalisée dans les 24 heures ouvrées... » |

Fichier : `app/contact/page.tsx`

### Formulaire — Messages de validation
Fichier : `lib/validators.ts`

| Champ | Message d'erreur |
|-------|-----------------|
| Nom | Veuillez saisir votre nom complet. |
| Email | Adresse e-mail invalide. |
| Téléphone | Numéro de téléphone invalide. |
| Type de bien | Veuillez sélectionner un type de bien. |
| Ville | Veuillez indiquer la ville. |
| Message | Votre message doit comporter au moins 20 caractères. |

---

## Images à fournir

| Fichier | Usage | Format recommandé |
|---------|-------|-------------------|
| `public/images/hero-home.jpg` | Hero homepage | 1920×1080, < 300 ko |
| `public/images/hero-brand.jpg` | Hero La Marque | 1920×1080, < 300 ko |
| `public/images/hero-services.jpg` | Hero Services | 1920×1080, < 300 ko |
| `public/images/hero-approche.jpg` | Hero Notre Approche | 1920×1080, < 300 ko |
| `public/images/hero-investisseurs.jpg` | Hero Investisseurs | 1920×1080, < 300 ko |
| `public/images/about-story.jpg` | Page La Marque, section histoire | 800×600, < 200 ko |
| `public/images/apartment-1.jpg` | Services, Investisseurs | 800×600, < 200 ko |
| `public/images/og-default.jpg` | Open Graph (partage réseaux) | 1200×630 |

**Conseils images :**
- Style : intérieurs immobiliers premium, lumière naturelle, tons neutres
- Éviter les photos trop "commerciales" ou avec texte intégré
- Format JPG ou WebP (next/image optimise automatiquement)
