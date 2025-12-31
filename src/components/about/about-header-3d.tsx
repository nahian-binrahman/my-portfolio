"use client";

import { ThreeCanvas } from "@/components/visuals/three-canvas";

export function AboutHeader3D() {
    return (
        <div className="absolute top-0 right-0 w-full h-[700px] -z-10 opacity-20 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-l from-indigo-500/10 via-transparent to-transparent dark:from-[#5EEAD4]/10" />
            <ThreeCanvas className="h-full w-full" />
        </div>
    );
}
