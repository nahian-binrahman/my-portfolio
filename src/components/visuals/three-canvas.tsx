"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

// Dynamically import the Scene component (R3F) with SSR disabled
const Scene = dynamic(() => import("./hero-blob").then(mod => mod.Scene), {
    ssr: false,
    loading: () => <FallbackVisual />,
});

/**
 * Premium Fallback visual for when 3D is disabled or loading
 */
function FallbackVisual() {
    return (
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
            {/* Subtle glowing background or SVG shape as a premium alternative to 3D */}
            <div className="absolute h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl dark:bg-cyan-500/10" />
            <svg
                width="200"
                height="200"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="animate-pulse opacity-20"
            >
                <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" className="text-indigo-600 dark:text-cyan-400" />
                <circle cx="100" cy="100" r="40" fill="currentColor" className="text-indigo-600 dark:text-cyan-400" />
            </svg>
        </div>
    );
}

export function ThreeCanvas({ className }: { className?: string }) {
    const [isEnabled, setIsEnabled] = useState<boolean | null>(null);

    useEffect(() => {
        // Check for performance/device-based disabling
        const checkPerformance = () => {
            const isSmallScreen = window.innerWidth < 768;
            const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

            // Disable 3D on small screens, touch devices, or if the user prefers reduced motion
            setIsEnabled(!isSmallScreen && !isReducedMotion && !isTouchDevice);
        };

        checkPerformance();
        window.addEventListener("resize", checkPerformance);
        return () => window.removeEventListener("resize", checkPerformance);
    }, []);

    // Use null initial state to avoid hydration mismatch
    if (isEnabled === null) return <div className={className} />;

    return (
        <div className={className} style={{ height: "500px", minHeight: "500px" }}>
            {isEnabled ? <Scene /> : <FallbackVisual />}
        </div>
    );
}
