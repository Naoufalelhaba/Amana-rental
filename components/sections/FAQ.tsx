"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  className?: string;
}

export function FAQ({ items, className }: FAQProps) {
  return (
    <Accordion className={cn("w-full divide-y divide-border", className)}>
      {items.map((item, index) => (
        <AccordionItem key={index} value={index}>
          <AccordionTrigger className="text-left text-base font-medium text-foreground hover:text-primary transition-colors py-5 hover:no-underline">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
