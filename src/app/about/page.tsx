import { Container, Section } from "@/components/ui/structure";
import { Badge } from "@/components/ui/badge";
import { AboutHeader3D } from "@/components/about/about-header-3d";
import Image from "next/image";
import { Code2, Cpu, Globe2, Sparkles, Terminal } from "lucide-react";

export default function AboutPage() {
    const skills = [
        { category: "Web Ecosystem", items: ["React", "Next.js 15", "TypeScript", "Tailwind 4", "Node.js"] },
        { category: "AI & Data", items: ["OpenAI API", "LangChain", "Vector DBs", "Python", "RAG Pipeline"] },
        { category: "Infrastructure", items: ["Supabase", "PostgreSQL", "AWS", "Docker", "CI/CD"] }
    ];

    const tools = ["VS Code", "Warp / iTerm", "Figma", "Postman", "Raycast", "CleanShot X"];

    return (
        <main className="relative">
            <AboutHeader3D />

            <Section className="pt-32 pb-20">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                        {/* Bio Section */}
                        <div className="lg:col-span-7 space-y-8">
                            <div className="space-y-4">
                                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                                    Crafting the future of <span className="text-indigo-600 dark:text-[#5EEAD4]">intelligent web systems.</span>
                                </h1>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    I'm Nahian Bin Rahman, a Full-Stack Engineer specializing in building scalable web applications and AI-powered products. My work sits at the intersection of high-performance engineering and state-of-the-art AI.
                                </p>
                            </div>

                            <div className="prose prose-slate dark:prose-invert max-w-none text-lg leading-relaxed text-muted-foreground">
                                <p>
                                    With a background in both frontend artistry and robust backend architecture, I focus on creating digital experiences that are not only beautiful but also deeply functional. I believe that AI is not just a feature, but a foundational shift in how we build software.
                                </p>
                                <p>
                                    Today, I spend my time consulting for startups, building open-source AI tools, and sharing my findings through technical writing and speaking.
                                </p>
                            </div>

                            {/* Skills Stack */}
                            <div className="pt-8 space-y-8">
                                <h2 className="text-2xl font-bold flex items-center gap-3">
                                    <Cpu className="text-indigo-600 dark:text-[#5EEAD4]" />
                                    Technical Arsenal
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {skills.map((group) => (
                                        <div key={group.category} className="space-y-4">
                                            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/60">{group.category}</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {group.items.map(skill => (
                                                    <Badge key={skill} variant="outline" className="border-indigo-100 dark:border-indigo-900/30 bg-indigo-50/30 dark:bg-indigo-950/20 text-indigo-700 dark:text-[#5EEAD4]">
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
                            <div className="relative aspect-square rounded-3xl overflow-hidden border-8 border-white dark:border-slate-800 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                                <div className="absolute inset-0 bg-indigo-500/10 mix-blend-overlay z-10" />
                                <Image
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
                                    alt="Nahian Bin Rahman"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 space-y-6">
                                <h3 className="text-xl font-bold flex items-center gap-3">
                                    <Terminal size={20} className="text-indigo-600 dark:text-[#5EEAD4]" />
                                    Workspace Tools
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {tools.map(tool => (
                                        <span key={tool} className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-800 rounded-lg text-sm font-medium shadow-sm border border-slate-100 dark:border-slate-700">
                                            <Sparkles size={12} className="text-amber-500" />
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
