import { Container, Section, SectionHeader } from "./structure";
import { Badge } from "./badge";
import { Card, CardHeader, CardTitle, CardContent } from "./card";
import { cn } from "@/lib/utils";
import Image from "next/image";

// --- Section 1: Services & Solutions ---

const services = [
    {
        title: "Full-Stack Web App Development",
        tags: ["MVP", "Scalable Systems", "Production-Ready"],
    },
    {
        title: "AI-Powered Applications",
        tags: ["LLM", "RAG", "Automation"],
    },
    {
        title: "SaaS Product Engineering",
        tags: ["Multi-Tenant", "Subscriptions", "Admin Panels"],
    },
    {
        title: "Business Process Automation",
        tags: ["Workflow", "Internal Tools", "Efficiency"],
    },
    {
        title: "Supply Chain & Operations Systems",
        tags: ["Inventory", "RFQ", "Order Management"],
    },
    {
        title: "ERP & CRM Systems",
        tags: ["Business Systems", "Integrations", "Reporting"],
    },
    {
        title: "API & Enterprise Integrations",
        tags: ["REST", "Webhooks", "Third-Party APIs"],
    },
    {
        title: "Data Dashboards & Reporting",
        tags: ["Analytics", "KPIs", "Decision Support"],
    },
    {
        title: "Technology Consulting",
        tags: ["Architecture", "Scaling", "Strategy"],
    },
];

export function ServicesSection() {
    return (
        <Section id="services" className="bg-white dark:bg-background relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.2] dark:opacity-[0.05] pointer-events-none" />
            <Container className="relative z-10">
                <SectionHeader
                    title="Services & Solutions"
                    subtitle="Specialized engineering for complex business challenges and modern digital products."
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <Card
                            key={index}
                            className="group glass-card border-slate-200/60 dark:border-slate-800/60 hover:shadow-indigo-500/10 dark:hover:shadow-[#5EEAD4]/5 hover:-translate-y-2 transition-all duration-500"
                        >
                            <CardHeader className="p-8">
                                <CardTitle className="text-2xl font-black mb-6 group-hover:text-indigo-600 dark:group-hover:text-[#5EEAD4] transition-colors leading-tight tracking-tight">
                                    {service.title}
                                </CardTitle>
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {service.tags.map((tag) => (
                                        <Badge
                                            key={tag}
                                            variant="secondary"
                                            className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-none group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/30 group-hover:text-indigo-600 dark:group-hover:text-[#5EEAD4] transition-colors"
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </Container>
        </Section>
    );
}

import {
    Code2,
    BrainCircuit,
    Rocket,
    Database,
    Layers,
    Workflow,
    Truck,
    MonitorSmartphone,
    Cloud
} from "lucide-react";

// --- Section 2: Engineering Skill Stack ---

const skillGroups = [
    {
        title: "Full-Stack Engineering",
        icon: Code2,
        skills: ["Next.js", "React", "Django", "REST API", "PostgreSQL"],
    },
    {
        title: "AI & LLM Engineering",
        icon: BrainCircuit,
        skills: ["LLM APIs", "RAG Systems", "Prompt Engineering", "AI Automation"],
    },
    {
        title: "SaaS & Product",
        icon: Rocket,
        skills: ["Multi-Tenant", "Auth & Roles", "Subscriptions", "Dashboards"],
    },
    {
        title: "Backend & Systems",
        icon: Layers,
        skills: ["API Design", "Auth", "Background Jobs", "Webhooks"],
    },
    {
        title: "Data & Persistence",
        icon: Database,
        skills: ["PostgreSQL", "Supabase", "Redis", "Schema Design"],
    },
    {
        title: "Automation",
        icon: Workflow,
        skills: ["Workflows", "Pipelines", "Third-Party APIs", "Integrations"],
    },
    {
        title: "Supply Chain Stack",
        icon: Truck,
        skills: ["Inventory", "RFQ", "Procurement", "Operations"],
    },
    {
        title: "Frontend & UI",
        icon: MonitorSmartphone,
        skills: ["Tailwind", "Shadcn", "Framer Motion", "Responsive"],
    },
    {
        title: "Cloud & DevOps",
        icon: Cloud,
        skills: ["Vercel", "Supabase", "CI/CD", "Production Ops"],
    },
];

export function SkillsSection() {
    return (
        <Section id="skills" className="bg-slate-50/50 dark:bg-slate-910/20 border-y border-slate-200/60 dark:border-slate-800/60 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.1] dark:opacity-[0.03] pointer-events-none" />

            <Container className="relative z-10">
                <SectionHeader
                    title="Engineering Skill Stack"
                    subtitle="A comprehensive toolkit focused on performance, scalability, and modern AI integration."
                    className="max-w-3xl"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
                    {skillGroups.map((group, index) => (
                        <div
                            key={index}
                            className={cn(
                                "group relative p-8 rounded-[2rem] transition-all duration-300",
                                "bg-white dark:bg-zinc-900/50 border border-slate-200/60 dark:border-zinc-800/50",
                                "hover:shadow-2xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/5 hover:-translate-y-1"
                            )}
                        >
                            {/* Icon & Title Header */}
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-[#5EEAD4] group-hover:scale-110 transition-transform duration-300">
                                    <group.icon size={22} strokeWidth={2.5} />
                                </div>
                                <h3 className="text-sm font-black uppercase tracking-[0.15em] text-slate-900 dark:text-slate-100">
                                    {group.title}
                                </h3>
                            </div>

                            {/* Skills Tag Cloud */}
                            <div className="flex flex-wrap gap-2">
                                {group.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className={cn(
                                            "px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200",
                                            "bg-slate-50 dark:bg-zinc-800/50 text-slate-500 dark:text-zinc-400",
                                            "group-hover:bg-indigo-50 group-hover:text-indigo-600 dark:group-hover:bg-indigo-900/20 dark:group-hover:text-[#5EEAD4]"
                                        )}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            {/* Decorative Accent */}
                            <div className="absolute top-8 right-8 w-8 h-8 opacity-[0.03] dark:opacity-[0.05] group-hover:opacity-[0.1] transition-opacity">
                                <group.icon size={32} />
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}

// --- Section 3: Clients & Partners ---

const clients = [
    {
        name: "Bangladesh Navy - BNS Issa Khan",
        logo: "BN",
        image: "/clients/navy-logo.png"
    },
    {
        name: "Epic Health Care Ltd.",
        logo: "EH",
        image: "/clients/epic-logo.jpg"
    },
    {
        name: "National Skills Development Authority",
        logo: "NSDA",
        image: "/clients/nsda-logo.png",
        padding: "p-4 m-3"
    },
    {
        name: "Xinxiang Vic Science & Education Co., Ltd",
        logo: "XV",
        image: "/clients/vic-science-logo.jpg"
    },
    {
        name: "Amar Desh",
        logo: "AD",
        image: "/clients/amar-desh-logo.jpg"
    },
];

export function ClientsSection() {
    return (
        <Section id="clients" className="bg-white dark:bg-background relative">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.1] dark:opacity-[0.03] pointer-events-none" />
            <Container className="relative z-10">
                <SectionHeader
                    title="Clients & Partners"
                    subtitle="Collaborating with innovative companies to build better products."
                    align="center"
                    className="mx-auto"
                />
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-12 items-start justify-items-center mt-20">
                    {clients.map((client, index) => (
                        <div
                            key={index}
                            className="group flex flex-col items-center gap-6 transition-all duration-500 hover:-translate-y-2"
                        >
                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-800 transition-all shadow-xl group-hover:shadow-indigo-500/10 dark:group-hover:shadow-[#5EEAD4]/10 group-hover:border-indigo-500 dark:group-hover:border-[#5EEAD4]">
                                {client.image ? (
                                    <div className={cn("relative w-full h-full", client.padding || "p-1")}>
                                        <Image
                                            src={client.image}
                                            alt={client.name}
                                            fill
                                            className="object-contain transition-all duration-500"
                                        />
                                    </div>
                                ) : (
                                    <span className="text-2xl font-black text-slate-400 dark:text-slate-600 group-hover:text-indigo-600 dark:group-hover:text-[#5EEAD4]">
                                        {client.logo}
                                    </span>
                                )}
                            </div>
                            <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors text-center max-w-[160px] leading-relaxed">
                                {client.name}
                            </span>
                        </div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}
