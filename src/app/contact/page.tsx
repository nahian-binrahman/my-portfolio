"use client";

import { useState } from "react";
import { Container, Section } from "@/components/ui/structure";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Mail, Check, MessageCircle, ExternalLink, Github, Twitter, Linkedin } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
    const [copied, setCopied] = useState(false);
    const email = "hello@nahian.dev";

    const copyEmail = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        toast.success("Email copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
    };

    const socials = [
        { name: "GitHub", handle: "nahian-rahman", url: "https://github.com", icon: <Github size={20} /> },
        { name: "Twitter", handle: "@nahian_dev", url: "https://twitter.com", icon: <Twitter size={20} /> },
        { name: "LinkedIn", handle: "nahianrahman", url: "https://linkedin.com", icon: <Linkedin size={20} /> }
    ];

    return (
        <main className="pt-32 pb-24">
            <Section>
                <Container>
                    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
                        {/* Left Content */}
                        <div className="space-y-12">
                            <div className="space-y-6">
                                <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 px-3 py-1 font-bold text-[10px] uppercase tracking-widest">Available for hire</Badge>
                                <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight">
                                    Let's create something <span className="text-indigo-600 dark:text-[#5EEAD4]">iconic.</span>
                                </h1>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    I'm currently accepting new projects for early 2026. Whether you're a startup looking to launch or an enterprise aiming to scale, I'm here to help.
                                </p>
                            </div>

                            <div className="space-y-6 text-sm">
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 font-medium">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                    Currently open to: Full-time / Contract / Consulting
                                </div>
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 font-medium">
                                    <div className="h-2 w-2 rounded-full bg-indigo-500" />
                                    Working from: Remote / Dhaka (UTC+6)
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-muted-foreground/60">Find me on</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {socials.map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex flex-col gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 hover:border-indigo-500/40 transition-all hover:shadow-xl hover:-translate-y-1"
                                        >
                                            <div className="text-muted-foreground group-hover:text-indigo-600 dark:group-hover:text-[#5EEAD4] transition-colors">
                                                {social.icon}
                                            </div>
                                            <div>
                                                <div className="font-bold text-sm">{social.name}</div>
                                                <div className="text-xs text-muted-foreground">{social.handle}</div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Contact Card */}
                        <div className="flex flex-col justify-center">
                            <Card className="border-none bg-slate-50 dark:bg-slate-900 p-8 md:p-12 space-y-12 shadow-2xl relative overflow-hidden group">
                                {/* Decorative background circle */}
                                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full group-hover:bg-indigo-500/20 transition-all duration-700" />

                                <div className="space-y-4 relative z-10">
                                    <div className="h-16 w-16 rounded-2xl bg-indigo-600 dark:bg-[#5EEAD4] flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                        <Mail className="text-white dark:text-slate-900 h-8 w-8" />
                                    </div>
                                    <h2 className="text-4xl font-bold">Quick Contact</h2>
                                    <p className="text-muted-foreground">The fastest way to reach me is via email.</p>
                                </div>

                                <div className="space-y-6 relative z-10">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground/60 px-1">
                                            Personal Email
                                        </div>
                                        <div className="group relative flex items-center">
                                            <div className="flex-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-6 py-5 font-mono text-lg font-bold">
                                                {email}
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={copyEmail}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 hover:bg-slate-100 dark:hover:bg-slate-800"
                                            >
                                                {copied ? <Check className="text-emerald-500" size={18} /> : <Copy size={18} />}
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 pt-4">
                                        <Button asChild size="lg" className="h-16 bg-indigo-600 hover:bg-indigo-700 dark:bg-[#5EEAD4] dark:hover:bg-[#2DD4BF] dark:text-slate-900 text-lg font-bold shadow-xl shadow-indigo-500/20 group">
                                            <a href={`mailto:${email}`} className="gap-3">
                                                Compose Email <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
                                            </a>
                                        </Button>
                                        <Button variant="outline" size="lg" className="h-16 border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-950 font-bold group">
                                            <a href="https://t.me/nahian" target="_blank" rel="noopener noreferrer" className="gap-3">
                                                <MessageCircle size={18} className="text-[#0088cc]" /> Chat on Telegram
                                            </a>
                                        </Button>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-slate-200 dark:border-slate-800 text-center relative z-10">
                                    <p className="text-xs text-muted-foreground">Average response time: 2-4 hours</p>
                                </div>
                            </Card>
                        </div>
                    </div>
                </Container>
            </Section>
        </main>
    );
}
