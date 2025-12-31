import { createClient } from "@/lib/supabase/server";
import { Container, Section } from "@/components/ui/structure";
import { MDX } from "@/components/ui/mdx";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ArticleSchema } from "@/components/seo/json-ld";

interface PostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const supabase = await createClient();

    if (!supabase) return { title: "Blog Post" };

    const { data: post } = await supabase
        .from("posts")
        .select("title, excerpt")
        .eq("slug", slug)
        .single();

    if (!post) return { title: "Post Not Found" };

    return {
        title: post.title,
        description: post.excerpt,
    };
}

export default async function BlogPostDetailPage({ params }: PostPageProps) {
    const { slug } = await params;
    const supabase = await createClient();

    if (!supabase) return notFound();

    const { data: post } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .not("published_at", "is", null)
        .single();

    if (!post) {
        notFound();
    }

    const formattedDate = new Date(post.created_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    });

    return (
        <main className="pb-24">
            <ArticleSchema post={post} />
            <Section className="pt-32 pb-16">
                <Container>
                    <div className="max-w-3xl mx-auto space-y-8">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-indigo-600 dark:hover:text-[#5EEAD4] transition-colors group mb-4"
                        >
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Blog
                        </Link>

                        <div className="space-y-4">
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-medium uppercase tracking-wider">
                                <div className="flex items-center gap-1.5">
                                    <Calendar size={14} className="text-indigo-500 dark:text-[#5EEAD4]" />
                                    {formattedDate}
                                </div>
                                <div className="flex items-center gap-1.5 border-l pl-4 dark:border-slate-800">
                                    <Clock size={14} className="text-indigo-500 dark:text-[#5EEAD4]" />
                                    {post.reading_minutes} min read
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap gap-2 pt-4">
                                {post.tags?.map((tag: string) => (
                                    <Badge key={tag} variant="secondary" className="bg-slate-100 dark:bg-slate-800/80">
                                        #{tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {post.cover_image_url && (
                            <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden border dark:border-slate-800 shadow-xl mt-12">
                                <Image
                                    src={post.cover_image_url}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        )}

                        <div className="pt-12">
                            <MDX source={post.content_mdx} />
                        </div>
                    </div>
                </Container>
            </Section>
        </main>
    );
}
