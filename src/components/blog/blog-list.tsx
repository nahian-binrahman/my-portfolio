"use client";

import { useMemo, useState } from "react";
import { CardPost } from "@/components/ui/cards";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Hash } from "lucide-react";

interface BlogListProps {
    initialPosts: any[];
}

export function BlogList({ initialPosts }: BlogListProps) {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    // Extract all unique tags
    const allTags = useMemo(() => {
        const tags = new Set<string>();
        initialPosts.forEach(post => {
            post.tags?.forEach((tag: string) => tags.add(tag));
        });
        return Array.from(tags).sort();
    }, [initialPosts]);

    const filteredPosts = useMemo(() => {
        if (!selectedTag) return initialPosts;
        return initialPosts.filter(p => p.tags?.includes(selectedTag));
    }, [selectedTag, initialPosts]);

    return (
        <div className="space-y-12">
            {/* Tag Filter */}
            <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
                <Button
                    variant={selectedTag === null ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedTag(null)}
                    className={`rounded-full px-4 text-xs font-bold uppercase tracking-wider transition-all ${selectedTag === null
                            ? "bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-[#5EEAD4] dark:text-slate-900 dark:hover:bg-[#2DD4BF]"
                            : "text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                >
                    All Posts
                </Button>
                {allTags.map((tag) => (
                    <Button
                        key={tag}
                        variant={selectedTag === tag ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                        className={`rounded-full px-4 text-xs font-bold uppercase tracking-wider gap-1.5 transition-all ${selectedTag === tag
                                ? "bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-[#5EEAD4] dark:text-slate-900 dark:hover:bg-[#2DD4BF]"
                                : "text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800"
                            }`}
                    >
                        <Hash size={12} className="opacity-50" />
                        {tag}
                    </Button>
                ))}
            </div>

            {/* Grid */}
            {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post) => (
                        <CardPost key={post.id} post={post} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 border-2 border-dashed rounded-3xl bg-slate-50/50 dark:bg-slate-900/10">
                    <p className="text-muted-foreground italic">No posts found with the tag "#{selectedTag}".</p>
                    <Button
                        variant="link"
                        onClick={() => setSelectedTag(null)}
                        className="text-indigo-600 dark:text-[#5EEAD4] mt-2"
                    >
                        Clear filter
                    </Button>
                </div>
            )}
        </div>
    );
}
