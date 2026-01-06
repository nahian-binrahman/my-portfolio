import Link from "next/link";
import { Container, Section, SectionHeader } from "@/components/ui/structure";
import { Button } from "@/components/ui/button";
import { CardProject, CardPost } from "@/components/ui/cards";
import { CTAStrip } from "@/components/ui/cta-strip";
import { ThreeCanvas } from "@/components/visuals/three-canvas";
import { ArrowRight, Mail } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { RoleRotator } from "@/components/ui/role-rotator";
import { ServicesSection, SkillsSection, ClientsSection } from "@/components/ui/portfolio-sections";

export default async function HomePage() {
  const supabase = await createClient();

  // Real data fetching if supabase is ready
  let featuredProjects = [];
  let latestPosts = [];

  if (supabase) {
    const { data: projects } = await supabase
      .from("projects")
      .select("*")
      .eq("featured", true)
      .limit(3);

    const { data: posts } = await supabase
      .from("posts")
      .select("*")
      .not("published_at", "is", null)
      .order("created_at", { ascending: false })
      .limit(3);

    featuredProjects = projects || [];
    latestPosts = posts || [];
  }

  return (
    <>
      {/* Hero Section */}
      <Section className="relative h-screen md:h-[calc(100vh-4rem)] flex items-center overflow-hidden bg-grid-pattern py-0 md:py-0">
        <div className="absolute inset-0 bg-background/60 dark:bg-background/80 pointer-events-none" />

        {/* 3D Background - Always visible, centered on mobile/right-aligned on desktop */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute right-1/2 translate-x-1/2 md:right-0 md:translate-x-0 md:-right-20 top-1/2 -translate-y-1/2 w-full md:w-1/2 h-[600px] opacity-40 md:opacity-50">
            <ThreeCanvas className="h-full w-full" />
          </div>
        </div>

        <Container className="relative z-10 pt-20 pb-12">
          <div className="max-w-4xl">
            <h1 className="text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl leading-[1.1]">
              <span className="block text-foreground opacity-90">
                I’m a
              </span>

              <RoleRotator />

              <span className="block mt-2 text-foreground leading-tight">
                building <span className="text-gradient">
                  scalable web & AI-powered
                </span>{" "}
                products
              </span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-muted-foreground/80 leading-relaxed max-w-2xl">
              Merging high-performance engineering with state-of-the-art AI. I craft digital experiences that are fast, secure, and intelligent.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-[#4338CA] hover:bg-[#3730A3] dark:bg-[#5EEAD4] dark:hover:bg-[#2DD4BF] dark:text-slate-900 text-white font-black uppercase tracking-widest px-8 h-12 shadow-2xl shadow-indigo-500/20 dark:shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95 text-xs">
                <Link href="/projects">View Projects</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-indigo-100 dark:border-indigo-900/50 hover:bg-white dark:hover:bg-slate-900 font-black uppercase tracking-widest px-8 h-12 transition-all hover:scale-105 active:scale-95 group backdrop-blur-sm text-xs">
                <Link href="/contact" className="gap-2">
                  <Mail size={16} className="text-muted-foreground group-hover:text-[#4338CA] dark:group-hover:text-[#5EEAD4]" />
                  Email Me
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Projects Section */}
      <Section id="projects" className="bg-slate-50/50 dark:bg-slate-900/20 border-y border-slate-200/60 dark:border-slate-800/60 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.2] dark:opacity-[0.05] pointer-events-none" />
        <Container className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <SectionHeader
              title="Featured Projects"
              subtitle="A selection of my best work in web development and AI."
              className="mb-0 text-left"
            />
            <Button asChild variant="ghost" className="group text-indigo-600 dark:text-[#5EEAD4] font-black uppercase tracking-widest">
              <Link href="/projects" className="gap-2">
                All Projects <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project: any) => (
                <CardProject key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center text-muted-foreground italic border border-dashed rounded-[2rem] bg-white/50 dark:bg-slate-900/50">
              No featured projects found. Add them in the admin panel.
            </div>
          )}
        </Container>
      </Section>

      {/* Services Section */}
      <ServicesSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Writing Section */}
      <Section id="writing" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.2] dark:opacity-[0.05] pointer-events-none" />
        <Container className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <SectionHeader
              title="Latest Writing"
              subtitle="Essays, tutorials, and technical insights."
              className="mb-0 text-left"
            />
            <Button asChild variant="ghost" className="group text-indigo-600 dark:text-[#5EEAD4] font-black uppercase tracking-widest">
              <Link href="/blog" className="gap-2">
                Read Blog <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {latestPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post: any) => (
                <CardPost key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center text-muted-foreground italic border border-dashed rounded-[2rem] bg-white/50 dark:bg-slate-900/50">
              No blog posts published yet.
            </div>
          )}
        </Container>
      </Section>

      {/* Clients Section */}
      <ClientsSection />

      <CTAStrip />
    </>
  );
}
