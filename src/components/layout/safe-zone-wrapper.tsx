"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function SafeZoneWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");

    return (
        <div className={cn(
            "flex flex-col min-h-screen",
            !isAdmin && "lg:pr-[var(--floating-safe-width)]"
        )}>
            {children}
        </div>
    );
}
