import { requireAdmin } from "@/lib/auth";
import { PostForm } from "@/components/admin/post-form";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function NewPostPage() {
    await requireAdmin();

    return (
        <div className="p-8 max-w-6xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Button asChild variant="ghost" size="icon">
                    <Link href="/admin/posts">
                        <ChevronLeft size={24} />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Write New Post</h1>
                    <p className="text-muted-foreground mt-1">Compose a new article for your readers.</p>
                </div>
            </div>

            <div className="pt-4">
                <PostForm />
            </div>
        </div>
    );
}
