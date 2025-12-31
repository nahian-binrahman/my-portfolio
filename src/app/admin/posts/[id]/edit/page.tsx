import { requireAdmin } from "@/lib/auth";
import { PostForm } from "@/components/admin/post-form";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

interface EditPostPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
    await requireAdmin();
    const { id } = await params;

    const supabase = await createClient();
    const { data: post, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

    if (error || !post) {
        notFound();
    }

    return (
        <div className="p-8 max-w-6xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Button asChild variant="ghost" size="icon">
                    <Link href="/admin/posts">
                        <ChevronLeft size={24} />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Edit Blog Post</h1>
                    <p className="text-muted-foreground mt-1 italic opacity-80">"{post.title}"</p>
                </div>
            </div>

            <div className="pt-4">
                <PostForm initialData={post} isEditing />
            </div>
        </div>
    );
}
