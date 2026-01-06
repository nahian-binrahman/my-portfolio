import { Container, Section, SectionHeader } from "./structure";
import { Badge } from "./badge";
import { Card, CardHeader, CardTitle, CardContent } from "./card";
import { cn } from "@/lib/utils";

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

// --- Section 2: Engineering Skill Stack ---

const skillGroups = [
    {
        title: "Full-Stack Engineering",
        skills: ["Next.js", "React", "Django", "REST API", "PostgreSQL"],
    },
    {
        title: "AI & LLM Engineering",
        skills: ["LLM APIs", "RAG Systems", "Prompt Engineering", "AI Automation"],
    },
    {
        title: "SaaS & Product Engineering",
        skills: ["Multi-Tenant SaaS", "Auth & Roles", "Subscriptions", "Admin Dashboards"],
    },
    {
        title: "Backend & Systems",
        skills: ["API Design", "Business Logic", "Background Jobs", "Webhooks"],
    },
    {
        title: "Database & Data Modeling",
        skills: ["PostgreSQL", "Schema Design", "RLS", "Performance Optimization"],
    },
    {
        title: "Automation & Integrations",
        skills: ["Workflow Automation", "Third-Party APIs", "Data Pipelines"],
    },
    {
        title: "Supply Chain Systems",
        skills: ["Inventory", "RFQ", "Order Management", "Operations Dashboards"],
    },
    {
        title: "Frontend & UI Engineering",
        skills: ["Tailwind CSS", "Shadcn UI", "HTMX", "Responsive UI"],
    },
    {
        title: "Cloud & Deployment",
        skills: ["Vercel", "Supabase", "CI/CD", "Production Deployment"],
    },
];

export function SkillsSection() {
    return (
        <Section id="skills" className="bg-slate-50/50 dark:bg-slate-900/20 border-y border-slate-200/60 dark:border-slate-800/60 relative">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.1] dark:opacity-[0.03] pointer-events-none" />
            <Container className="relative z-10">
                <SectionHeader
                    title="Engineering Skill Stack"
                    subtitle="A comprehensive toolkit focused on performance, scalability, and modern AI integration."
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-16">
                    {skillGroups.map((group, index) => (
                        <div key={index} className="space-y-5">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-[#5EEAD4] border-l-2 border-indigo-500 dark:border-[#5EEAD4] pl-4">
                                {group.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-slate-700 dark:text-slate-300">
                                {group.skills.map((skill, i) => (
                                    <span key={skill} className="flex items-center text-[15px] font-bold tracking-tight">
                                        {skill}
                                        {i < group.skills.length - 1 && (
                                            <span className="ml-3 text-slate-300 dark:text-slate-700 opacity-50">•</span>
                                        )}
                                    </span>
                                ))}
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
    { name: "Bangladesh Navy - BNS Issa Khan", logo: "BN" },
    { name: "Epic Health Care Ltd.", logo: "EH" },
    { name: "SL Health Care & Medical Technology Institute", logo: "SL" },
    { name: "Xinxiang Vic Science & Education Co., Ltd", logo: "XV" },
    { name: "Amar Desh", logo: "AD" },
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
                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-[2rem] glass-card flex items-center justify-center text-2xl font-black text-slate-400 dark:text-slate-600 group-hover:border-indigo-500 dark:group-hover:border-[#5EEAD4] group-hover:text-indigo-600 dark:group-hover:text-[#5EEAD4] transition-all shadow-xl group-hover:shadow-indigo-500/10 dark:group-hover:shadow-[#5EEAD4]/10">
                                {client.logo}
                            </div>
                            <span className="text-sm font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors text-center max-w-[160px] leading-relaxed">
                                {client.name}
                            </span>
                        </div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}
