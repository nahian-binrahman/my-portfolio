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
        <Card className="group glass-card overflow-hidden transition-all duration-500 hover:shadow-indigo-500/10 dark:hover:shadow-[#5EEAD4]/5 hover:-translate-y-2 flex flex-col h-full">
            <Link href={`/projects/${project.slug}`} className="cursor-pointer">
                <div className="relative aspect-video overflow-hidden">
                    {project.cover_image_url ? (
                        <Image
                            src={project.cover_image_url}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted/30">
                            <span className="text-muted-foreground text-xs italic">No Project Image</span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                </div>
            </Link>

            <CardHeader className="p-6 flex-1 space-y-4">
                <div className="flex items-center justify-between">
                    <Badge variant="outline" className="font-bold text-[10px] uppercase tracking-[0.2em] border-indigo-200/50 dark:border-indigo-900/50 text-indigo-600 dark:text-[#5EEAD4] bg-indigo-50/50 dark:bg-indigo-950/20 px-2.5">
                        {project.type}
                    </Badge>
                    <div className="flex gap-2">
                        {project.tech_stack?.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-60"># {tag}</span>
                        ))}
                    </div>
                </div>
                <Link href={`/projects/${project.slug}`}>
                    <h3 className="text-2xl font-black tracking-tight group-hover:text-indigo-600 dark:group-hover:text-[#5EEAD4] transition-colors leading-tight text-gradient">
                        {project.title}
                    </h3>
                </Link>
                <p className="text-sm text-muted-foreground/80 line-clamp-2 leading-relaxed">
                    {project.summary}
                </p>
            </CardHeader>

            <CardFooter className="p-6 pt-0 flex justify-between items-center mt-auto">
                <div className="flex gap-3">
                    {project.repo_url && (
                        <Button variant="ghost" size="icon" asChild className="h-9 w-9 border border-indigo-100 dark:border-indigo-900/30 text-muted-foreground hover:text-indigo-600 dark:hover:text-[#5EEAD4] hover:bg-white dark:hover:bg-slate-900">
                            <a href={project.repo_url} target="_blank" rel="noopener noreferrer">
                                <Github className="h-4.5 w-4.5" />
                            </a>
                        </Button>
                    )}
                    {project.live_url && (
                        <Button variant="ghost" size="icon" asChild className="h-9 w-9 border border-indigo-100 dark:border-indigo-900/30 text-muted-foreground hover:text-indigo-600 dark:hover:text-[#5EEAD4] hover:bg-white dark:hover:bg-slate-900">
                            <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4.5 w-4.5" />
                            </a>
                        </Button>
                    )}
                </div>

                <Button variant="ghost" size="sm" asChild className="text-xs font-black uppercase tracking-widest gap-2 group/btn p-0 hover:bg-transparent text-indigo-600 dark:text-[#5EEAD4]">
                    <Link href={`/projects/${project.slug}`}>
                        Case Study <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
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
        <Card className="group glass-card transition-all duration-500 hover:shadow-indigo-500/10 dark:hover:shadow-[#5EEAD4]/5 hover:-translate-y-2 h-full flex flex-col">
            <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                <CardHeader className="p-8">
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-6 border-b border-indigo-100/50 dark:border-indigo-900/30 pb-4">
                        <span>{formattedDate}</span>
                        <div className="flex gap-2">
                            {post.tags?.slice(0, 1).map(tag => (
                                <Badge key={tag} variant="outline" className="font-bold border-indigo-100 dark:border-indigo-900/30 text-indigo-500 dark:text-[#5EEAD4] uppercase text-[9px] tracking-widest px-2">{tag}</Badge>
                            ))}
                        </div>
                    </div>
                    <h3 className="text-2xl font-black tracking-tight group-hover:text-[#4338CA] dark:group-hover:text-[#5EEAD4] transition-colors line-clamp-2 leading-tight text-gradient">
                        {post.title}
                    </h3>
                </CardHeader>
                <CardContent className="px-8 pb-8 pt-0 flex-1">
                    <p className="text-sm text-muted-foreground/80 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                    </p>
                </CardContent>
                <CardFooter className="px-8 pb-8 pt-0 flex items-center text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-[#5EEAD4] gap-2 group-hover:gap-3 transition-all">
                    Read Article <ArrowRight size={14} />
                </CardFooter>
            </Link>
        </Card>
    );
}
