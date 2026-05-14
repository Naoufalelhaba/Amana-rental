import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.amana-rental.ma";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: "%s | AMANA RENTAL",
    default: "AMANA RENTAL — Gestion Locative Premium au Maroc",
  },
  description:
    "AMANA RENTAL est votre partenaire structuré de gestion immobilière au Maroc. Gestion locative longue durée et conciergerie saisonnière pour propriétaires exigeants, investisseurs et MRE.",
  keywords: [
    "gestion locative Maroc",
    "gestion immobilière Casablanca",
    "conciergerie immobilière Maroc",
    "location longue durée Maroc",
    "location saisonnière Maroc",
    "gestionnaire locatif Casablanca",
    "agence gestion locative Maroc",
    "MRE investissement immobilier",
    "gestion bien immobilier Maroc",
    "investissement locatif Maroc",
    "propriétaire expatrié Maroc",
    "AMANA RENTAL",
  ],
  authors: [{ name: "AMANA RENTAL", url: BASE_URL }],
  creator: "AMANA RENTAL",
  publisher: "AMANA RENTAL",
  category: "Real Estate",
  openGraph: {
    type: "website",
    locale: "fr_MA",
    url: BASE_URL,
    siteName: "AMANA RENTAL",
    title: "AMANA RENTAL — Gestion Locative Premium au Maroc",
    description:
      "Partenaire structuré de gestion immobilière au Maroc. Gestion locative et conciergerie pour propriétaires exigeants.",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "AMANA RENTAL — Gestion Locative Premium au Maroc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AMANA RENTAL — Gestion Locative Premium au Maroc",
    description:
      "Partenaire structuré de gestion immobilière au Maroc. Gestion locative et conciergerie pour propriétaires exigeants.",
    images: ["/images/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "AMANA RENTAL",
  url: BASE_URL,
  logo: `${BASE_URL}/images/logo.jpeg`,
  description:
    "Partenaire structuré de gestion immobilière au Maroc. Gestion locative longue durée et conciergerie saisonnière pour propriétaires exigeants, investisseurs et MRE.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Casablanca",
    addressCountry: "MA",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+212600000000",
    contactType: "customer service",
    availableLanguage: "French",
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  },
  areaServed: { "@type": "Country", name: "Maroc" },
  serviceType: [
    "Gestion locative longue durée",
    "Conciergerie immobilière",
    "Location saisonnière",
  ],
  image: `${BASE_URL}/images/og-default.jpg`,
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AMANA RENTAL",
  url: BASE_URL,
  description:
    "Partenaire structuré de gestion immobilière au Maroc.",
  inLanguage: "fr",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${playfair.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
