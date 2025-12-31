"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deletePost } from "@/app/admin/posts/actions";
import { useRouter } from "next/navigation";

interface DeletePostButtonProps {
    id: string;
    title: string;
}

export function DeletePostButton({ id, title }: DeletePostButtonProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
            return;
        }

        setIsDeleting(true);
        try {
            await deletePost(id);
            toast.success("Post deleted successfully");
            router.refresh();
        } catch (error: any) {
            toast.error(error.message || "Failed to delete post");
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
