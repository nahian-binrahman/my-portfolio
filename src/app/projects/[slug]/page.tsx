import { createClient } from "@/lib/supabase/server";
import { Container, Section } from "@/components/ui/structure";
import { MDX } from "@/components/ui/mdx";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowLeft, PlayCircle, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ProjectSchema } from "@/components/seo/json-ld";

interface ProjectPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { slug } = await params;
    const supabase = await createClient();

    if (!supabase) return { title: "Project" };

    const { data: project } = await supabase
        .from("projects")
        .select("title, summary")
        .eq("slug", slug)
        .single();

    if (!project) return { title: "Project Not Found" };

    return {
        title: project.title,
        description: project.summary,
    };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const supabase = await createClient();

    if (!supabase) return notFound();

    const { data: project } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .single();

    if (!project) {
        notFound();
    }

    return (
        <main className="pb-24">
            <ProjectSchema project={project} />
            {/* Hero Section */}
            <Section className="pt-32 pb-12 bg-slate-50/50 dark:bg-slate-900/20 border-b">
                <Container>
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-indigo-600 dark:hover:text-[#5EEAD4] transition-colors mb-12 group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to All Projects
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <Badge variant="outline" className="bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-900/50 text-indigo-700 dark:text-[#5EEAD4] uppercase tracking-wider px-3">
                                    {project.type}
                                </Badge>
                                {project.featured && (
                                    <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">Featured</Badge>
                                )}
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                                {project.title}
                            </h1>

                            <p className="text-xl text-muted-foreground leading-relaxed">
                                {project.summary}
                            </p>

                            <div className="flex flex-wrap gap-2 pt-2">
                                {project.tech_stack?.map((tech: string) => (
                                    <Badge key={tech} variant="secondary" className="bg-slate-200/50 dark:bg-slate-800/50">
                                        {tech}
                                    </Badge>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-4 pt-4">
                                {project.live_url && (
                                    <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 dark:bg-[#5EEAD4] dark:hover:bg-[#2DD4BF] dark:text-slate-900 shadow-lg shadow-indigo-500/20 dark:shadow-cyan-500/10">
                                        <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="gap-2">
                                            <Globe size={18} /> Live Site
                                        </a>
                                    </Button>
                                )}
                                {project.repo_url && (
                                    <Button asChild variant="outline" size="lg" className="border-indigo-200 dark:border-slate-800">
                                        <a href={project.repo_url} target="_blank" rel="noopener noreferrer" className="gap-2">
                                            <Github size={18} /> GitHub
                                        </a>
                                    </Button>
                                )}
                                {project.video_url && (
                                    <Button asChild variant="ghost" size="lg" className="text-muted-foreground hover:text-indigo-600 dark:hover:text-[#5EEAD4]">
                                        <a href={project.video_url} target="_blank" rel="noopener noreferrer" className="gap-2">
                                            <PlayCircle size={18} /> Watch Demo
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </div>

                        <div className="relative aspect-video rounded-3xl overflow-hidden border-8 border-white dark:border-slate-800 shadow-2xl">
                            {project.cover_image_url ? (
                                <Image
                                    src={project.cover_image_url}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center italic text-muted-foreground">
                                    No Preview Image Available
                                </div>
                            )}
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Content Section */}
            <Section className="py-20">
                <Container>
                    <div className="max-w-4xl mx-auto">
                        {project.content_mdx ? (
                            <MDX source={project.content_mdx} />
                        ) : (
                            <div className="py-20 text-center border-2 border-dashed rounded-2xl bg-slate-50/50 dark:bg-slate-900/50">
                                <p className="text-muted-foreground italic">Full case study coming soon.</p>
                            </div>
                        )}
                    </div>
                </Container>
            </Section>
        </main>
    );
}
