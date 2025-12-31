import { createClient } from "@/lib/supabase/server";
import { Container, Section, SectionHeader } from "@/components/ui/structure";
import { ProjectList } from "@/components/projects/project-list";
import { ProjectsHeader3D } from "@/components/projects/projects-header-3d";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projects",
    description: "A showcase of my recent work in Web Development, LLMs, and AI Video.",
};

export default async function ProjectsPage() {
    const supabase = await createClient();

    // Return empty list if supabase isn't configured yet
    if (!supabase) {
        return (
            <Section className="pt-32">
                <Container>
                    <SectionHeader
                        title="Projects"
                        subtitle="Supabase not configured. Set your environment variables to see projects."
                        align="center"
                    />
                </Container>
            </Section>
        );
    }

    const { data: projects } = await supabase
        .from("projects")
        .select("*")
        .order("featured", { ascending: false })
        .order("created_at", { ascending: false });

    return (
        <main className="relative overflow-hidden">
            <ProjectsHeader3D />

            <Section className="pt-32 pb-24">
                <Container>
                    <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                            Selected <span className="text-indigo-600 dark:text-[#5EEAD4]">Works</span>
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            A curated collection of web applications, AI integrations, and video experiments.
                        </p>
                    </div>

                    <ProjectList initialProjects={projects || []} />
                </Container>
            </Section>
        </main>
    );
}
