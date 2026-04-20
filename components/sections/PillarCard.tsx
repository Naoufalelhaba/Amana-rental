import { type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PillarCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  variant?: "default" | "dark";
  className?: string;
}

export function PillarCard({
  icon: Icon,
  title,
  description,
  variant = "default",
  className,
}: PillarCardProps) {
  const isDark = variant === "dark";

  return (
    <Card
      className={cn(
        "border-0 shadow-none transition-all duration-300 hover:shadow-md group",
        isDark
          ? "bg-primary/5 hover:bg-primary/10"
          : "bg-white hover:shadow-lg",
        className
      )}
    >
      <CardContent className="p-6 sm:p-8">
        <div
          className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center mb-5 transition-colors duration-300",
            isDark
              ? "bg-primary/10 group-hover:bg-primary/20"
              : "bg-primary/8 group-hover:bg-accent/15"
          )}
        >
          <Icon
            className={cn(
              "w-5 h-5",
              isDark ? "text-primary" : "text-primary"
            )}
            strokeWidth={1.5}
          />
        </div>
        <h3
          className={cn(
            "text-lg font-semibold mb-3",
            isDark ? "text-foreground" : "text-foreground"
          )}
        >
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
