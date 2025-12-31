import { requireAdmin } from "@/lib/auth";
import { ProjectForm } from "@/components/admin/project-form";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

interface EditProjectPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
    await requireAdmin();
    const { id } = await params;

    const supabase = await createClient();
    const { data: project, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

    if (error || !project) {
        notFound();
    }

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Button asChild variant="ghost" size="icon">
                    <Link href="/admin/projects">
                        <ChevronLeft size={24} />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
                    <p className="text-muted-foreground mt-1 text-lg italic opacity-80">"{project.title}"</p>
                </div>
            </div>

            <div className="pt-4">
                <ProjectForm initialData={project} isEditing />
            </div>
        </div>
    );
}
