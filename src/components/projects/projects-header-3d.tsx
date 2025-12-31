"use client";

import { ThreeCanvas } from "@/components/visuals/three-canvas";

export function ProjectsHeader3D() {
    return (
        <div className="absolute top-0 left-0 w-full h-[600px] -z-10 opacity-30 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent dark:from-cyan-500/10" />
            {/* Reusing the ThreeCanvas which handles lazy loading and device checks */}
            <ThreeCanvas className="h-full w-full" />
        </div>
    );
}
