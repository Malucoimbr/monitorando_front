
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DashboardContentProps {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export function DashboardContent({ children, className, fullWidth = false }: DashboardContentProps) {
  return (
    <main className={cn("flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 animate-fade-in", className)}>
      <div className={cn("mx-auto", fullWidth ? "w-full" : "container max-w-7xl")}>
        {children}
      </div>
    </main>
  );
}
