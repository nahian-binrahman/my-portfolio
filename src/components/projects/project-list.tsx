"use client";

import { useMemo, useState } from "react";
import { CardProject } from "@/components/ui/cards";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Globe, Brain, Video } from "lucide-react";

interface ProjectListProps {
    initialProjects: any[];
}

export function ProjectList({ initialProjects }: ProjectListProps) {
    const [filter, setFilter] = useState<"ALL" | "WEB" | "LLM" | "AIVIDEO">("ALL");

    const filteredProjects = useMemo(() => {
        if (filter === "ALL") return initialProjects;
        return initialProjects.filter(p => p.type === filter);
    }, [filter, initialProjects]);

    const tabs = [
        { id: "ALL", label: "All Work", icon: <LayoutGrid size={16} /> },
        { id: "WEB", label: "Web Apps", icon: <Globe size={16} /> },
        { id: "LLM", label: "AI / LLM", icon: <Brain size={16} /> },
        { id: "AIVIDEO", label: "AI Video", icon: <Video size={16} /> },
    ] as const;

    return (
        <div className="space-y-12">
            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 p-1 border rounded-full bg-slate-50/50 dark:bg-slate-900/40 w-fit mx-auto">
                {tabs.map((tab) => (
                    <Button
                        key={tab.id}
                        variant={filter === tab.id ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setFilter(tab.id)}
                        className={`rounded-full px-6 gap-2 transition-all ${filter === tab.id
                                ? "bg-white dark:bg-slate-800 shadow-sm text-indigo-600 dark:text-[#5EEAD4]"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        {tab.icon}
                        {tab.label}
                    </Button>
                ))}
            </div>

            {/* Grid */}
            {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project) => (
                        <CardProject key={project.id} project={project} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 opacity-40 italic">
                    No projects found in this category yet.
                </div>
            )}
        </div>
    );
}
