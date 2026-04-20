import Link from "next/link";
import Image from "next/image";
import { Check, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  badge?: string;
  title: string;
  description: string;
  features: string[];
  href?: string;
  highlight?: boolean;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

export function ServiceCard({
  badge,
  title,
  description,
  features,
  href,
  highlight = false,
  imageSrc,
  imageAlt,
  className,
}: ServiceCardProps) {
  return (
    <Card
      className={cn(
        "border transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group overflow-hidden",
        imageSrc && "pt-0",
        highlight
          ? "border-primary/30 bg-primary text-white"
          : "border-border bg-white hover:border-primary/20",
        className
      )}
    >
      {imageSrc && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt ?? title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div
            className={cn(
              "absolute inset-0",
              highlight ? "bg-primary/35" : "bg-primary/15"
            )}
          />
        </div>
      )}
      <CardContent className="p-8">
        {badge && (
          <Badge
            className={cn(
              "mb-5 text-xs font-semibold tracking-widest uppercase",
              highlight
                ? "bg-accent/20 text-accent border-accent/30"
                : "bg-primary/8 text-primary border-primary/15"
            )}
            variant="outline"
          >
            {badge}
          </Badge>
        )}
        <h3
          className={cn(
            "text-2xl font-semibold mb-3",
            highlight ? "text-white" : "text-foreground"
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "text-sm leading-relaxed mb-6",
            highlight ? "text-white/70" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
        <ul className="space-y-3 mb-8">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <Check
                className={cn(
                  "w-4 h-4 mt-0.5 flex-shrink-0",
                  highlight ? "text-accent" : "text-accent"
                )}
                strokeWidth={2.5}
              />
              <span
                className={cn(
                  "text-sm",
                  highlight ? "text-white/80" : "text-muted-foreground"
                )}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>
        {href && (
          <Link
            href={href}
            className={cn(
              "inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 group-hover:gap-3",
              highlight
                ? "text-accent hover:text-accent/80"
                : "text-primary hover:text-primary/80"
            )}
          >
            En savoir plus
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
