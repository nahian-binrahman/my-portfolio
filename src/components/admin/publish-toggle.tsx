"use client";

import { useState } from "react";
import { Globe, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { togglePublishPost } from "@/app/admin/posts/actions";
import { useRouter } from "next/navigation";

interface PublishToggleProps {
    id: string;
    initialStatus: boolean;
}

export function PublishToggle({ id, initialStatus }: PublishToggleProps) {
    const [isPublished, setIsPublished] = useState(initialStatus);
    const [isUpdating, setIsUpdating] = useState(false);
    const router = useRouter();

    const handleToggle = async () => {
        setIsUpdating(true);
        try {
            const nextStatus = !isPublished;
            await togglePublishPost(id, nextStatus);
            setIsPublished(nextStatus);
            toast.success(nextStatus ? "Post is now live!" : "Post moved to drafts");
            router.refresh();
        } catch (error: any) {
            toast.error(error.message || "Failed to update status");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={handleToggle}
            disabled={isUpdating}
            className={`gap-2 ${isPublished ? 'text-emerald-600 border-emerald-100 hover:bg-emerald-50' : 'text-slate-500'}`}
        >
            {isUpdating ? (
                <Loader2 size={14} className="animate-spin" />
            ) : isPublished ? (
                <Globe size={14} />
            ) : (
                <EyeOff size={14} />
            )}
            <span>{isPublished ? 'Unpublish' : 'Publish'}</span>
        </Button>
    );
}
