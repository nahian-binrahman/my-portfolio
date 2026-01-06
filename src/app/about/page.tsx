import { Container, Section } from "@/components/ui/structure";
import { Badge } from "@/components/ui/badge";
import { AboutHeader3D } from "@/components/about/about-header-3d";
import Image from "next/image";
import { Code2, Cpu, Globe2, Sparkles, Terminal } from "lucide-react";
import { BrandIcon } from "@/components/ui/brand-icons";

export default function AboutPage() {
    const skills = [
        { category: "Web Ecosystem", items: ["React", "Next.js 15", "TypeScript", "Tailwind 4", "Node.js"] },
        { category: "AI & Data", items: ["OpenAI API", "LangChain", "Vector DBs", "Python", "RAG Pipeline"] },
        { category: "Infrastructure", items: ["Supabase", "PostgreSQL", "AWS", "Docker", "CI/CD"] }
    ];

    const tools = ["VS Code", "Figma", "Git", "Postman", "Supabase", "Vercel", "Docker", "Chrome DevTools", "Notion", "Slack"];

    return (
        <main className="relative">
            <AboutHeader3D />

            <Section className="pt-24 pb-16 md:pt-32 md:pb-20">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                        {/* Bio Section */}
                        <div className="lg:col-span-7 space-y-10">
                            <div className="space-y-6">
                                <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight leading-[1.1]">
                                    Crafting the future of <span className="text-gradient">intelligent web systems.</span>
                                </h1>
                                <p className="text-lg md:text-xl text-muted-foreground/90 leading-relaxed max-w-2xl">
                                    I'm Nahian Bin Rahman, a Full-Stack Engineer specializing in building scalable web applications and AI-powered products. My work sits at the intersection of high-performance engineering and state-of-the-art AI.
                                </p>
                            </div>

                            <div className="prose prose-slate dark:prose-invert max-w-none text-base md:text-lg leading-relaxed text-muted-foreground/80 space-y-6">
                                <p>
                                    With a background in both frontend artistry and robust backend architecture, I focus on creating digital experiences that are not only beautiful but also deeply functional. I believe that AI is not just a feature, but a foundational shift in how we build software.
                                </p>
                                <p>
                                    Today, I spend my time consulting for startups, building open-source AI tools, and sharing my findings through technical writing and speaking.
                                </p>
                            </div>

                            {/* Skills Stack */}
                            <div className="pt-8 space-y-10">
                                <h2 className="text-xl md:text-2xl font-black uppercase tracking-widest flex items-center gap-4">
                                    <div className="h-px flex-1 bg-indigo-100 dark:bg-indigo-900/30" />
                                    <div className="flex items-center gap-3">
                                        <Cpu size={20} className="text-indigo-600 dark:text-[#5EEAD4]" />
                                        <span>Arsenal</span>
                                    </div>
                                    <div className="h-px flex-1 bg-indigo-100 dark:bg-indigo-900/30" />
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
                                    {skills.map((group) => (
                                        <div key={group.category} className="space-y-5">
                                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 border-l-2 border-indigo-500/30 pl-3">{group.category}</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {group.items.map(skill => (
                                                    <Badge key={skill} variant="outline" className="font-bold border-indigo-100 dark:border-indigo-900/30 bg-indigo-50/10 dark:bg-indigo-950/20 text-indigo-700/80 dark:text-[#5EEAD4]/80 text-[10px] tracking-wider px-2.5 py-1">
                                                        {skill}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Side Info & Image */}
                        <div className="lg:col-span-5 space-y-12">
                            <div className="relative aspect-[4/5] max-w-[90%] sm:max-w-[80%] lg:max-w-full mx-auto rounded-[2.5rem] overflow-hidden border-8 border-white dark:border-slate-800 shadow-2xl lg:rotate-2 hover:rotate-0 transition-transform duration-500 glass-card">
                                <div className="absolute inset-0 bg-indigo-500/5 mix-blend-overlay z-10" />
                                <Image
                                    src="/profile-pic.png"
                                    alt="Nahian Bin Rahman"
                                    fill
                                    className="object-cover object-top"
                                />
                            </div>

                            <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 space-y-6">
                                <h3 className="text-xl font-bold flex items-center gap-3">
                                    <Terminal size={20} className="text-indigo-600 dark:text-[#5EEAD4]" />
                                    Workspace Tools
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {tools.map(tool => (
                                        <span key={tool} className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-white dark:bg-slate-800 rounded-lg text-sm font-medium shadow-sm border border-slate-100 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-900/50 transition-colors group/tool">
                                            <BrandIcon name={tool} className="size-4 text-slate-500 group-hover/tool:text-indigo-600 dark:group-hover/tool:text-[#5EEAD4] transition-colors" />
                                            {tool}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>
        </main>
    );
}
