import Link from "next/link";
import { Container, Section, SectionHeader } from "@/components/ui/structure";
import { Button } from "@/components/ui/button";
import { CardProject, CardPost } from "@/components/ui/cards";
import { CTAStrip } from "@/components/ui/cta-strip";
import { ThreeCanvas } from "@/components/visuals/three-canvas";
import { ArrowRight, Mail } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { RoleRotator } from "@/components/ui/role-rotator";

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
      <Section className="relative pt-20 pb-20 md:pt-32 md:pb-32 overflow-hidden">
        <div className="absolute right-0 md:-right-20 top-1/2 -translate-y-1/2 w-full h-[500px] md:w-1/2 opacity-40 md:opacity-60 pointer-events-none">
          <ThreeCanvas className="h-full w-full" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-6xl">
              <span className="block text-foreground">
                I’m a
              </span>

              <RoleRotator />

              <span className="block mt-2 text-foreground">
                building <span className="text-[#4338CA] dark:text-[#5EEAD4]">
                  scalable web & AI-powered
                </span>{" "}
                products
              </span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
              Merging high-performance engineering with state-of-the-art AI. I craft digital experiences that are fast, secure, and intelligent.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-[#4338CA] hover:bg-[#3730A3] dark:bg-[#5EEAD4] dark:hover:bg-[#2DD4BF] dark:text-slate-900 text-white font-semibold px-8 shadow-lg shadow-indigo-500/20 dark:shadow-cyan-500/10">
                <Link href="/projects">View Projects</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 group">
                <Link href="/contact" className="gap-2">
                  <Mail size={18} className="text-muted-foreground group-hover:text-[#4338CA] dark:group-hover:text-[#5EEAD4]" />
                  Email Me
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Projects Section */}
      <Section id="projects" className="bg-slate-50/80 dark:bg-slate-900/50 border-y border-slate-200/60 dark:border-slate-800/60">
        <Container>
          <div className="flex items-end justify-between mb-12">
            <SectionHeader
              title="Featured Projects"
              subtitle="A selection of my best work in web development and AI."
              className="mb-0"
            />
            <Button asChild variant="ghost" className="hidden sm:flex group hover:text-[#4338CA] dark:hover:text-[#5EEAD4]">
              <Link href="/projects" className="gap-2">
                All Projects <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project: any) => (
                <CardProject key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center text-muted-foreground italic border-2 border-dashed rounded-3xl">
              No featured projects found. Add them in the admin panel.
            </div>
          )}
        </Container>
      </Section>

      {/* Writing Section */}
      <Section id="writing" className="bg-white dark:bg-background">
        <Container>
          <div className="flex items-end justify-between mb-12">
            <SectionHeader
              title="Latest Writing"
              subtitle="Essays, tutorials, and technical insights."
              className="mb-0"
            />
            <Button asChild variant="ghost" className="hidden sm:flex group hover:text-[#4338CA] dark:hover:text-[#5EEAD4]">
              <Link href="/blog" className="gap-2">
                Read Blog <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {latestPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post: any) => (
                <CardPost key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center text-muted-foreground italic border-2 border-dashed rounded-3xl">
              No blog posts published yet.
            </div>
          )}
        </Container>
      </Section>

      <CTAStrip />
    </>
  );
}
