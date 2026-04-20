"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/la-marque", label: "La Marque" },
  { href: "/services", label: "Services" },
  { href: "/notre-approche", label: "Notre Approche" },
  { href: "/investisseurs-proprietaires", label: "Investisseurs" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isTransparent = !isScrolled && !mobileOpen;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isTransparent
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-sm shadow-sm border-b border-border"
      )}
    >
      {/* Gold accent line */}
      <div
        className={cn(
          "h-0.5 bg-accent/70 transition-opacity duration-300",
          isTransparent ? "opacity-60" : "opacity-100"
        )}
      />

      <div className="container-tight px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image
              src={isTransparent ? "/images/logo1.png" : "/images/logo.jpeg"}
              alt="AMANA RENTAL"
              width={72}
              height={72}
              className="rounded object-contain"
              priority
            />
            <span
              className={cn(
                "font-semibold text-base tracking-wide transition-colors",
                isTransparent ? "text-white" : "text-foreground"
              )}
            >
              AMANA RENTAL
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
                    isTransparent
                      ? isActive
                        ? "text-white font-semibold drop-shadow-sm"
                        : "text-white/75 hover:text-accent"
                      : isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className={cn(
                "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all",
                isTransparent
                  ? "bg-accent hover:bg-accent/90 text-white"
                  : "bg-primary hover:bg-primary/90 text-white"
              )}
            >
              Nous contacter
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn(
              "md:hidden p-2.5 rounded-md transition-colors",
              isTransparent
                ? "text-white hover:bg-white/10"
                : "text-foreground hover:bg-secondary"
            )}
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 bg-white border-t border-border",
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="px-4 py-4 flex flex-col gap-1">
          {LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-3 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "bg-primary/5 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-border mt-2">
            <Link
              href="/contact"
              className="block w-full text-center rounded-lg bg-primary hover:bg-primary/90 text-white text-sm font-medium px-4 py-3 transition-all"
            >
              Nous contacter
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
