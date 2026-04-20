import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

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
  title: {
    template: "%s | AMANA RENTAL",
    default: "AMANA RENTAL — Gestion Locative Premium au Maroc",
  },
  description:
    "AMANA RENTAL est votre partenaire structuré de gestion immobilière au Maroc. Gestion locative longue durée et conciergerie saisonnière pour propriétaires exigeants, investisseurs et MRE.",
  keywords: [
    "gestion locative Maroc",
    "conciergerie immobilière",
    "location longue durée Maroc",
    "MRE investissement immobilier",
    "gestion bien immobilier Maroc",
  ],
  openGraph: {
    type: "website",
    locale: "fr_MA",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.amana-rental.ma",
    siteName: "AMANA RENTAL",
    title: "AMANA RENTAL — Gestion Locative Premium au Maroc",
    description:
      "Partenaire structuré de gestion immobilière. Gestion locative et conciergerie pour propriétaires exigeants.",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "AMANA RENTAL",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AMANA RENTAL — Gestion Locative Premium au Maroc",
    description:
      "Partenaire structuré de gestion immobilière. Gestion locative et conciergerie pour propriétaires exigeants.",
    images: ["/images/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
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
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
