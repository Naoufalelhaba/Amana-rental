import { cn } from "@/lib/utils";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  centered = false,
  light = false,
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        centered && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <div className="flex items-center gap-3 mb-4">
          {centered && <div className="flex-1 h-px bg-accent/40 max-w-12" />}
          <span
            className={cn(
              "text-xs font-semibold tracking-[0.2em] uppercase",
              light ? "text-accent" : "text-accent"
            )}
          >
            {eyebrow}
          </span>
          {centered && <div className="flex-1 h-px bg-accent/40 max-w-12" />}
          {!centered && <div className="h-px bg-accent/40 w-12" />}
        </div>
      )}
      <h2
        className={cn(
          "text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight tracking-tight",
          light ? "text-white" : "text-foreground"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-3 text-sm sm:text-base md:text-lg leading-relaxed",
            light ? "text-white/70" : "text-muted-foreground"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
