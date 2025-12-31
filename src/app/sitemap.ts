import { createClient } from "@/lib/supabase/server";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nahian.dev";
    const supabase = await createClient();

    // Static routes
    const routes = [
        "",
        "/about",
        "/projects",
        "/blog",
        "/speaking",
        "/services",
        "/resume",
        "/contact",
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: route === "" ? 1 : 0.8,
    }));

    if (!supabase) return routes;

    // Fetch Projects
    const { data: projects } = await supabase
        .from("projects")
        .select("slug, updated_at");

    const projectRoutes = (projects || []).map((project: any) => ({
        url: `${baseUrl}/projects/${project.slug}`,
        lastModified: new Date(project.updated_at || new Date()),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    // Fetch Published Posts
    const { data: posts } = await supabase
        .from("posts")
        .select("slug, updated_at")
        .not("published_at", "is", null);

    const postRoutes = (posts || []).map((post: any) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updated_at || new Date()),
        changeFrequency: "weekly" as const,
        priority: 0.6,
    }));

    return [...routes, ...projectRoutes, ...postRoutes];
}
