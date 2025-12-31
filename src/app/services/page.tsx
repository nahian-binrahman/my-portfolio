import { Container, Section, SectionHeader } from "@/components/ui/structure";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Code, Mail, MessageSquare, Rocket, Zap } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
    const services = [
        {
            title: "Full-Stack Development",
            description: "Building production-ready web applications using Next.js, React, and Supabase. From fluid frontends to resilient database architectures.",
            icon: <Code className="h-8 w-8 text-indigo-500 dark:text-[#5EEAD4]" />,
            features: ["Next.js 15 App Router", "TypeScript Core", "Tailwind 4 & Shadcn", "Supabase Backend"]
        },
        {
            title: "AI Integration & LLMs",
            description: "Supercharging products with intelligent features. Prompt engineering, RAG pipelines, and seamless OpenAI/LangChain integrations.",
            icon: <Zap className="h-8 w-8 text-amber-500" />,
            features: ["Custom GPT Fine-tuning", "Vector Database Setup", "AI-driven UX", "Semantic Search"]
        },
        {
            title: "UI/UX & R3F Visuals",
            description: "Creating premium digital experiences with immersive 3D elements and high-performance animations using React Three Fiber.",
            icon: <Rocket className="h-8 w-8 text-emerald-500" />,
            features: ["WebGL/R3F Visuals", "Fluid Transitions", "Mobile-first Design", "Accessibility Audits"]
        }
    ];

    const process = [
        { step: "01", title: "Discovery", desc: "We sit down (virtually) to discuss your goals, target audience, and current technical blockers." },
        { step: "02", title: "Strategy", desc: "Design a roadmap including tech stack selection, core features, and a scalable architecture." },
        { step: "03", title: "Execution", desc: "Build in fast sprint cycles with weekly progress checks and transparent communication." },
        { step: "04", title: "Delivery", desc: "Rigorous testing, SEO optimization, and deployment to high-performance cloud infrastructure." }
    ];

    return (
        <main className="pt-8 pb-20">
            <Section>
                <Container>
                    <SectionHeader
                        title="How I Can Help"
                        subtitle="I offer a range of specialized services to help startups and businesses build high-impact digital products."
                        align="left"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                        {services.map((service) => (
                            <Card key={service.title} className="group border-slate-200/60 dark:border-slate-800/60 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white dark:bg-slate-900/50">
                                <CardContent className="p-8 space-y-6">
                                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                                        {service.icon}
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-2xl font-bold">{service.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {service.description}
                                        </p>
                                    </div>
                                    <ul className="space-y-3 pt-4">
                                        {service.features.map(feat => (
                                            <li key={feat} className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                                                <CheckCircle2 size={16} className="text-indigo-500 dark:text-[#5EEAD4]" />
                                                {feat}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* Process Section */}
            <Section className="bg-slate-50/80 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/60 py-24">
                <Container>
                    <div className="max-w-2xl mb-20 text-center mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">The <span className="text-indigo-600 dark:text-[#5EEAD4]">Process</span></h2>
                        <p className="text-xl text-muted-foreground">My workflow is designed for transparency, speed, and high-quality outcomes.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-[28px] left-[50px] right-[50px] h-[2px] bg-slate-200 dark:bg-slate-800 -z-10" />

                        {process.map((item) => (
                            <div key={item.step} className="space-y-6 group">
                                <div className="h-14 w-14 rounded-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 flex items-center justify-center text-xl font-bold group-hover:border-indigo-500 dark:group-hover:border-[#5EEAD4] transition-colors shadow-sm">
                                    {item.step}
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-xl font-bold">{item.title}</h4>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            <Section className="py-24">
                <Container>
                    <div className="p-12 md:p-20 rounded-3xl bg-indigo-600 dark:bg-indigo-950/40 text-white text-center shadow-2xl overflow-hidden relative group">
                        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 blur-[100px] rounded-full group-hover:bg-white/20 transition-all duration-700" />

                        <div className="max-w-3xl mx-auto space-y-8 relative z-10">
                            <h2 className="text-4xl md:text-6xl font-bold leading-tight">Ready to build something <span className="text-indigo-200 dark:text-[#5EEAD4]">remarkable?</span></h2>
                            <p className="text-xl text-indigo-100 dark:text-slate-300">I'm currently taking on new projects for early 2026. Let's discuss your vision.</p>
                            <div className="flex flex-wrap justify-center gap-4 pt-4">
                                <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-slate-50 px-10 h-14 text-lg font-bold shadow-xl">
                                    <Link href="/contact" className="gap-2">
                                        <Mail size={20} /> Let's Connect
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" size="lg" className="border-white/20 hover:bg-white/10 text-white px-10 h-14 text-lg font-bold">
                                    <Link href="/about" className="gap-2">
                                        <MessageSquare size={20} /> See My Work
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>
        </main>
    );
}
