import { requireAdmin } from "@/lib/auth";
import { ProjectForm } from "@/components/admin/project-form";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function NewProjectPage() {
    await requireAdmin();

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Button asChild variant="ghost" size="icon">
                    <Link href="/admin/projects">
                        <ChevronLeft size={24} />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Create New Project</h1>
                    <p className="text-muted-foreground mt-1 text-lg">Add a new showcase to your portfolio.</p>
                </div>
            </div>

            <div className="pt-4">
                <ProjectForm />
            </div>
        </div>
    );
}
