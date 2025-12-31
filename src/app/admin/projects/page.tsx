import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Plus, ExternalLink, Edit2, Trash2, LayoutGrid, List as ListIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { DeleteProjectButton } from "@/components/admin/delete-project-button";

import { SearchInput } from "@/components/admin/search-input";

export default async function ProjectsListPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
    const { supabase } = await requireAdmin();
    const query = (await searchParams).q;

    let dbQuery = supabase
        .from("projects")
        .select("*");

    if (query) {
        dbQuery = dbQuery.ilike("title", `%${query}%`);
    }

    const { data: projects, error } = await dbQuery.order("created_at", { ascending: false });

    if (error) {
        return <div className="p-8 text-destructive">Error loading projects: {error.message}</div>;
    }

    return (
        <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight">Project Management</h1>
                    <p className="text-muted-foreground mt-1 text-lg font-medium">Create and organize your portfolio work.</p>
                </div>
                <div className="flex items-center gap-3">
                    <SearchInput placeholder="Search projects..." />
                    <Button asChild className="bg-indigo-600 hover:bg-indigo-700 dark:bg-[#5EEAD4] dark:hover:bg-[#2DD4BF] dark:text-slate-900 shadow-lg shadow-indigo-600/10 transition-all hover:-translate-y-0.5">
                        <Link href="/admin/projects/new" className="gap-2">
                            <Plus size={18} /> New Project
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {projects?.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed rounded-xl bg-slate-50 dark:bg-slate-950">
                        <LayoutGrid className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
                        <h3 className="text-lg font-medium">No projects found</h3>
                        <p className="text-muted-foreground mb-6">Start by adding your first masterpiece.</p>
                        <Button asChild variant="outline">
                            <Link href="/admin/projects/new">Add First Project</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {projects?.map((project: any) => (
                            <Card key={project.id} className="group overflow-hidden border-slate-200/60 dark:border-slate-800/60 transition-all hover:bg-slate-50/50 dark:hover:bg-slate-900/40">
                                <CardContent className="p-4 sm:p-6">
                                    <div className="flex flex-col sm:flex-row items-start gap-6">
                                        <div className="relative h-24 w-40 flex-shrink-0 overflow-hidden rounded-md border bg-muted">
                                            {project.cover_image_url ? (
                                                <Image
                                                    src={project.cover_image_url}
                                                    alt={project.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">No Preview</div>
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0 space-y-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-xl font-bold truncate">{project.title}</h3>
                                                {project.featured && <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-[10px] uppercase font-bold px-1.5 py-0">Featured</Badge>}
                                            </div>
                                            <p className="text-sm text-muted-foreground line-clamp-1">{project.summary}</p>
                                            <div className="flex flex-wrap gap-2 pt-2">
                                                <Badge variant="outline" className="text-[10px]">{project.type}</Badge>
                                                {project.tech_stack?.slice(0, 3).map((tech: string) => (
                                                    <span key={tech} className="text-[10px] text-muted-foreground"># {tech}</span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 self-start sm:self-center">
                                            <Button asChild variant="ghost" size="icon" className="hover:text-amber-500">
                                                <Link href={`/admin/projects/${project.id}/edit`}>
                                                    <Edit2 size={18} />
                                                </Link>
                                            </Button>
                                            <DeleteProjectButton id={project.id} title={project.title} />
                                            <Button asChild variant="ghost" size="icon" title="View Public Page">
                                                <Link href={`/projects/${project.slug}`} target="_blank">
                                                    <ExternalLink size={18} />
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
