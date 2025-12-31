import { Container, Section, SectionHeader } from "@/components/ui/structure";
import { Badge } from "@/components/ui/badge";
import { Mic, Presentation, Users, Video } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function SpeakingPage() {
    const talks = [
        {
            title: "Building Deterministic AI Agents with Next.js",
            tags: ["AI", "Next.js", "Vercel AI SDK"],
            description: "How to move past simple chat loops to build reliable, high-performance AI agents that can actually use tools and manage state in production.",
            topics: ["State Management", "Tool Calling", "Agentic Workflows"]
        },
        {
            title: "Beyond the Grid: Advanced 3D Visuals in React",
            tags: ["WebGL", "Three.js", "R3F"],
            description: "A deep dive into optimizing React Three Fiber (R3F) for modern web browsers without sacrificing 60fps performance on mobile devices.",
            topics: ["Instanced Mesh", "Shaders", "Visibility Cull"]
        },
        {
            title: "The Zero-Config Full-Stack Developer",
            tags: ["Supabase", "Serverless", "Security"],
            description: "Why the backend-as-a-service model is the ultimate choice for solo founders and high-growth startups in 2026.",
            topics: ["Edge Functions", "RLS Best Practices", "Storage Hub"]
        }
    ];

    return (
        <main className="pt-10 pb-24">
            <Section>
                <Container>
                    <div className="max-w-3xl mb-20 space-y-6">
                        <Badge className="bg-indigo-600 dark:bg-[#5EEAD4] text-white dark:text-slate-900 px-4 py-1 uppercase tracking-widest font-extrabold text-[10px]">Speaking & Workshops</Badge>
                        <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-tight">
                            Sharing knowledge to <span className="text-indigo-600 dark:text-[#5EEAD4]">elevate the industry.</span>
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            I love speaking at conferences, hosting technical workshops, and joining podcasts to discuss the future of the web and AI.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card className="md:col-span-2 lg:col-span-1 border-none bg-indigo-50/50 dark:bg-indigo-950/20 p-8 flex flex-col justify-center gap-6">
                            <div className="h-16 w-16 rounded-2xl bg-indigo-600 dark:bg-[#5EEAD4] flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                <Mic className="text-white dark:text-slate-900 h-8 w-8" />
                            </div>
                            <h3 className="text-3xl font-bold leading-tight">Book me for your next event</h3>
                            <p className="text-muted-foreground">
                                Currently open to speaking engagements for Q2-Q4 2026. Focus areas: Next.js Engineering, AI Platforms, and Creative 3D Tech.
                            </p>
                            <div className="flex flex-col gap-4 pt-4">
                                <div className="flex items-center gap-3 text-sm font-semibold">
                                    <Presentation size={18} className="text-indigo-600 dark:text-[#5EEAD4]" />
                                    Technical Workshops
                                </div>
                                <div className="flex items-center gap-3 text-sm font-semibold">
                                    <Users size={18} className="text-indigo-600 dark:text-[#5EEAD4]" />
                                    Keynote Sessions
                                </div>
                                <div className="flex items-center gap-3 text-sm font-semibold">
                                    <Video size={18} className="text-indigo-600 dark:text-[#5EEAD4]" />
                                    Podcasts & Webinars
                                </div>
                            </div>
                        </Card>

                        {talks.map((talk) => (
                            <Card key={talk.title} className="group overflow-hidden border-slate-200/60 dark:border-slate-800/60 hover:bg-slate-50/50 dark:hover:bg-slate-950/50 transition-all duration-300">
                                <CardContent className="p-8 space-y-6">
                                    <div className="flex flex-wrap gap-2">
                                        {talk.tags.map(tag => (
                                            <Badge key={tag} variant="secondary" className="bg-white dark:bg-slate-800 text-[10px] uppercase font-bold tracking-wider">{tag}</Badge>
                                        ))}
                                    </div>
                                    <h3 className="text-2xl font-bold group-hover:text-indigo-600 dark:group-hover:text-[#5EEAD4] transition-colors line-clamp-2">{talk.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed text-sm">
                                        {talk.description}
                                    </p>
                                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                                        <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground/60 mb-3">Key Topics</h4>
                                        <ul className="flex flex-wrap gap-x-6 gap-y-2">
                                            {talk.topics.map(topic => (
                                                <li key={topic} className="text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-2">
                                                    <span className="h-1 w-1 bg-indigo-500 rounded-full" />
                                                    {topic}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </Container>
            </Section>
        </main>
    );
}
