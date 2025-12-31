import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, FileText, Calendar, Clock, Globe, EyeOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { DeletePostButton } from "@/components/admin/delete-post-button";
import { PublishToggle } from "@/components/admin/publish-toggle";

import { SearchInput } from "@/components/admin/search-input";

export default async function PostsListPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
    const { supabase } = await requireAdmin();
    const query = (await searchParams).q;

    let dbQuery = supabase
        .from("posts")
        .select("*");

    if (query) {
        dbQuery = dbQuery.ilike("title", `%${query}%`);
    }

    const { data: posts, error } = await dbQuery.order("created_at", { ascending: false });

    if (error) {
        return <div className="p-8 text-destructive">Error loading posts: {error.message}</div>;
    }

    return (
        <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight">Blog Writing</h1>
                    <p className="text-muted-foreground mt-1 text-lg font-medium">Manage your thoughts and technical articles.</p>
                </div>
                <div className="flex items-center gap-3">
                    <SearchInput placeholder="Search posts..." />
                    <Button asChild className="bg-indigo-600 hover:bg-indigo-700 dark:bg-[#5EEAD4] dark:hover:bg-[#2DD4BF] dark:text-slate-900 shadow-lg shadow-indigo-600/10 transition-all hover:-translate-y-0.5">
                        <Link href="/admin/posts/new" className="gap-2">
                            <Plus size={18} /> Compose
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {posts?.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed rounded-xl bg-slate-50 dark:bg-slate-950">
                        <FileText className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
                        <h3 className="text-lg font-medium">Your blog is currently empty</h3>
                        <p className="text-muted-foreground mb-6 text-center max-w-sm">Share your knowledge with the world by creating your first post.</p>
                        <Button asChild variant="outline">
                            <Link href="/admin/posts/new">Create First Post</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {posts?.map((post: any) => (
                            <Card key={post.id} className="group border-slate-200/60 dark:border-slate-800/60 transition-all hover:shadow-md">
                                <CardContent className="p-6">
                                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-xl font-bold group-hover:text-indigo-600 dark:group-hover:text-[#5EEAD4] transition-colors">{post.title}</h3>
                                                {post.published_at ? (
                                                    <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 gap-1 px-2 py-0">
                                                        <Globe size={10} /> Live
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="secondary" className="gap-1 px-2 py-0 border-slate-200">
                                                        <EyeOff size={10} /> Draft
                                                    </Badge>
                                                )}
                                            </div>

                                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar size={14} />
                                                    {new Date(post.created_at).toLocaleDateString()}
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Clock size={14} />
                                                    {post.reading_minutes} min read
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {post.tags?.slice(0, 2).map((tag: string) => (
                                                        <span key={tag} className="text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-500">#{tag}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 border-l pl-6 border-slate-100 dark:border-slate-800">
                                            <PublishToggle id={post.id} initialStatus={!!post.published_at} />
                                            <Button asChild variant="ghost" size="icon" className="hover:text-amber-500">
                                                <Link href={`/admin/posts/${post.id}/edit`}>
                                                    <Edit2 size={18} />
                                                </Link>
                                            </Button>
                                            <DeletePostButton id={post.id} title={post.title} />
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
