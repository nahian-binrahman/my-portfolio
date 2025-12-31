"use client";

import { Container, Section } from "@/components/ui/structure";
import { Button } from "@/components/ui/button";
import { Download, Globe, Mail, MapPin, Phone } from "lucide-react";

export default function ResumePage() {
    return (
        <main className="pt-32 pb-24 bg-slate-50 dark:bg-slate-950/20">
            <Container>
                {/* Actions bar (hidden during print) */}
                <div className="flex justify-between items-center mb-12 print:hidden">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Curriculum Vitae</h1>
                        <p className="text-muted-foreground">Last updated: December 2025</p>
                    </div>
                    <Button className="bg-indigo-600 hover:bg-indigo-700 dark:bg-[#5EEAD4] dark:hover:bg-[#2DD4BF] dark:text-slate-900 gap-2 shadow-lg shadow-indigo-500/20" onClick={() => window.print()}>
                        <Download size={18} /> Print PDF
                    </Button>
                </div>

                {/* Paper Container */}
                <div className="bg-white dark:bg-slate-900 shadow-2xl rounded-2xl p-12 md:p-20 max-w-5xl mx-auto print:shadow-none print:p-0 print:m-0 print:rounded-none">
                    {/* Header */}
                    <header className="flex flex-col md:flex-row justify-between items-start gap-8 border-b border-slate-100 dark:border-slate-800 pb-12">
                        <div className="space-y-2">
                            <h1 className="text-5xl font-extrabold tracking-tighter">Nahian Bin Rahman</h1>
                            <h2 className="text-2xl font-bold text-indigo-600 dark:text-[#5EEAD4]">Full-Stack & AI Engineer</h2>
                            <p className="text-muted-foreground pt-4 max-w-xl">
                                Specializing in building deterministic AI systems and high-performance web applications. Expert in Next.js, TypeScript, and AI Agentic architecture.
                            </p>
                        </div>

                        <div className="space-y-3 shrink-0 text-sm font-medium">
                            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                <Globe size={16} className="text-indigo-400" />
                                www.nahian.dev
                            </div>
                            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                <Mail size={16} className="text-indigo-400" />
                                hello@nahian.dev
                            </div>
                            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                <MapPin size={16} className="text-indigo-400" />
                                Global / Remote
                            </div>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-16 pt-12">
                        {/* Main Content */}
                        <div className="md:col-span-8 space-y-12">
                            <section className="space-y-6">
                                <h3 className="text-xs uppercase tracking-[0.2em] font-extrabold text-indigo-500 flex items-center gap-4">
                                    Experience
                                    <span className="flex-1 h-[1px] bg-slate-100 dark:bg-slate-800" />
                                </h3>

                                <div className="space-y-10">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-baseline group">
                                            <h4 className="text-xl font-bold group-hover:text-indigo-600 dark:group-hover:text-[#5EEAD4] transition-colors">Senior Full-Stack Developer & Founder</h4>
                                            <span className="text-sm font-bold text-slate-400">2022 — Present</span>
                                        </div>
                                        <p className="text-indigo-600 dark:text-[#5EEAD4] font-bold text-sm">Self-Employed / Independent Contractor</p>
                                        <ul className="list-disc list-outside ml-4 space-y-2 text-muted-foreground">
                                            <li>Led development of 15+ high-performance web applications using Next.js and Supabase for global startups.</li>
                                            <li>Architected RAG-based AI tools, reducing manual data processing time by 70% for enterprise clients.</li>
                                            <li>Built custom internal CRMs and dashboard systems focused on real-time data visualization.</li>
                                        </ul>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-baseline group">
                                            <h4 className="text-xl font-bold group-hover:text-indigo-600 dark:group-hover:text-[#5EEAD4] transition-colors">AI Research Engineer (Contract)</h4>
                                            <span className="text-sm font-bold text-slate-400">2023 — 2024</span>
                                        </div>
                                        <p className="text-indigo-600 dark:text-[#5EEAD4] font-bold text-sm">Nexus Platforms</p>
                                        <ul className="list-disc list-outside ml-4 space-y-2 text-muted-foreground">
                                            <li>Designed and deployed agentic workflows using LangChain to automate complex customer support tasks.</li>
                                            <li>Optimized vector database queries (Pinecone/pgvector) for millisecond latency on million-scale datasets.</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section className="space-y-6">
                                <h3 className="text-xs uppercase tracking-[0.2em] font-extrabold text-indigo-500 flex items-center gap-4">
                                    Key Projects
                                    <span className="flex-1 h-[1px] bg-slate-100 dark:bg-slate-800" />
                                </h3>
                                <div className="space-y-8">
                                    <div className="space-y-2">
                                        <h4 className="font-bold">NeuralCore Engine</h4>
                                        <p className="text-sm text-muted-foreground italic">An open-source kit for building 3D-enriched AI landing pages. 500+ Stars on GitHub.</p>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="font-bold">SentimentFlow</h4>
                                        <p className="text-sm text-muted-foreground italic">Real-time sentiment analyzer for SaaS products processing 1M+ requests daily.</p>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Sidebar Stats */}
                        <div className="md:col-span-4 space-y-12">
                            <section className="space-y-6">
                                <h3 className="text-xs uppercase tracking-[0.2em] font-extrabold text-indigo-500">Expertise</h3>
                                <div className="flex flex-wrap gap-2">
                                    {["React/Next.js", "TypeScript", "Python", "OpenAI", "Supabase", "PostgreSQL", "TailwindCSS", "Node.js", "Docker"].map(s => (
                                        <span key={s} className="px-3 py-1 bg-slate-100 dark:bg-slate-800/80 rounded font-bold text-[11px] uppercase tracking-wider">{s}</span>
                                    ))}
                                </div>
                            </section>

                            <section className="space-y-6">
                                <h3 className="text-xs uppercase tracking-[0.2em] font-extrabold text-indigo-500">Education</h3>
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <h4 className="font-bold">BSc Computer Science</h4>
                                        <p className="text-xs text-muted-foreground">University of Technology, 2018-2022</p>
                                    </div>
                                </div>
                            </section>

                            <section className="space-y-6">
                                <h3 className="text-xs uppercase tracking-[0.2em] font-extrabold text-indigo-500">Languages</h3>
                                <div className="space-y-2 text-sm font-medium">
                                    <div className="flex justify-between">
                                        <span>English</span>
                                        <span className="text-slate-300">Native / Fluent</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Bengali</span>
                                        <span className="text-slate-300">Native</span>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </Container>
        </main>
    );
}
