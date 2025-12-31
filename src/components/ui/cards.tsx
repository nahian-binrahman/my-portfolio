import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProjectProps {
    project: {
        id: string;
        title: string;
        summary: string;
        slug: string;
        cover_image_url?: string;
        tech_stack: string[];
        repo_url?: string;
        live_url?: string;
        type: string;
    }
}

export function CardProject({ project }: ProjectProps) {
    return (
        <Card className="group overflow-hidden border-slate-200/60 dark:border-slate-800/60 transition-all hover:shadow-xl hover:-translate-y-1 bg-white dark:bg-slate-900/50 flex flex-col h-full">
            <Link href={`/projects/${project.slug}`} className="cursor-pointer">
                <div className="relative aspect-video overflow-hidden">
                    {project.cover_image_url ? (
                        <Image
                            src={project.cover_image_url}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted">
                            <span className="text-muted-foreground text-xs italic">No Project Image</span>
                        </div>
                    )}
                    {/* Subtle overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            </Link>

            <CardHeader className="p-5 flex-1">
                <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="font-medium text-[10px] uppercase tracking-wider border-indigo-200 dark:border-indigo-900/50 text-indigo-600 dark:text-[#5EEAD4]">
                        {project.type}
                    </Badge>
                    <div className="flex gap-1.5">
                        {project.tech_stack?.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-[10px] text-muted-foreground"># {tag}</span>
                        ))}
                    </div>
                </div>
                <Link href={`/projects/${project.slug}`}>
                    <h3 className="text-xl font-bold group-hover:text-indigo-600 dark:group-hover:text-[#5EEAD4] transition-colors">{project.title}</h3>
                </Link>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {project.summary}
                </p>
            </CardHeader>

            <CardFooter className="p-5 pt-0 flex justify-between items-center mt-auto border-t border-slate-100 dark:border-slate-800/50 pt-4">
                <div className="flex gap-2">
                    {project.repo_url && (
                        <Button variant="ghost" size="icon" asChild className="h-8 w-8 text-muted-foreground hover:text-indigo-600 dark:hover:text-[#5EEAD4]">
                            <a href={project.repo_url} target="_blank" rel="noopener noreferrer">
                                <Github className="h-4 w-4" />
                            </a>
                        </Button>
                    )}
                    {project.live_url && (
                        <Button variant="ghost" size="icon" asChild className="h-8 w-8 text-muted-foreground hover:text-indigo-600 dark:hover:text-[#5EEAD4]">
                            <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4" />
                            </a>
                        </Button>
                    )}
                </div>

                <Button variant="ghost" size="sm" asChild className="text-xs font-bold gap-1 group/btn p-0 hover:bg-transparent hover:text-indigo-600 dark:hover:text-[#5EEAD4]">
                    <Link href={`/projects/${project.slug}`}>
                        View Case Study <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}

interface PostProps {
    post: {
        title: string;
        excerpt: string;
        created_at: string;
        tags: string[];
        slug: string;
    }
}

export function CardPost({ post }: PostProps) {
    const formattedDate = new Date(post.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });

    return (
        <Card className="group transition-all hover:shadow-xl hover:-translate-y-1 border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900/50 h-full flex flex-col">
            <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                <CardHeader className="p-6">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
                        <span>{formattedDate}</span>
                        <div className="flex gap-1.5">
                            {post.tags?.slice(0, 1).map(tag => (
                                <Badge key={tag} variant="outline" className="font-bold border-indigo-100 dark:border-indigo-900/30 text-indigo-500 dark:text-[#5EEAD4]">{tag}</Badge>
                            ))}
                        </div>
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-[#4338CA] dark:group-hover:text-[#5EEAD4] transition-colors line-clamp-2 leading-tight">
                        {post.title}
                    </h3>
                </CardHeader>
                <CardContent className="px-6 pb-6 pt-0 flex-1">
                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                        {post.excerpt}
                    </p>
                </CardContent>
                <CardFooter className="px-6 pb-6 pt-0 flex items-center text-xs font-bold text-indigo-600 dark:text-[#5EEAD4] gap-1 group-hover:gap-2 transition-all">
                    Read Article <ArrowRight size={14} />
                </CardFooter>
            </Link>
        </Card>
    );
}
