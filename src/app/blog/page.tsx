import { createClient } from "@/lib/supabase/server";
import { Container, Section } from "@/components/ui/structure";
import { BlogList } from "@/components/blog/blog-list";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog",
    description: "Essays, tutorials, and technical insights on web development and AI.",
};

export default async function BlogPage() {
    const supabase = await createClient();

    if (!supabase) {
        return (
            <Section className="pt-32">
                <Container>
                    <div className="text-center">
                        <h1 className="text-4xl font-bold">Blog</h1>
                        <p className="mt-4 text-muted-foreground">Supabase not configured.</p>
                    </div>
                </Container>
            </Section>
        );
    }

    const { data: posts } = await supabase
        .from("posts")
        .select("*")
        .not("published_at", "is", null)
        .order("created_at", { ascending: false });

    return (
        <main>
            <Section className="pt-32 pb-24">
                <Container>
                    <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                            Latest <span className="text-indigo-600 dark:text-[#5EEAD4]">Writing</span>
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                            Sharing my findings on modern engineering, AI architecture, and product design. Use the tags below to filter by topic.
                        </p>
                    </div>

                    <BlogList initialPosts={posts || []} />
                </Container>
            </Section>
        </main>
    );
}
