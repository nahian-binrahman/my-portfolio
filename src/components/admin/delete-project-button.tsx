"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deleteProject } from "@/app/admin/projects/actions";
import { useRouter } from "next/navigation";

interface DeleteProjectButtonProps {
    id: string;
    title: string;
}

export function DeleteProjectButton({ id, title }: DeleteProjectButtonProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        // Simple native confirmation for speed/safety
        if (!window.confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
            return;
        }

        setIsDeleting(true);
        try {
            await deleteProject(id);
            toast.success("Project deleted successfully");
            router.refresh();
        } catch (error: any) {
            toast.error(error.message || "Failed to delete project");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-destructive transition-colors"
            onClick={handleDelete}
            disabled={isDeleting}
        >
            {isDeleting ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
        </Button>
    );
}
