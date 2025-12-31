import { z } from "zod";

export const projectSchema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens"),
    summary: z.string().min(1, "Summary is required"),
    type: z.enum(["WEB", "LLM", "AIVIDEO"]),
    tech_stack: z.array(z.string()).default([]),
    repo_url: z.string().url().optional().or(z.literal("")),
    live_url: z.string().url().optional().or(z.literal("")),
    video_url: z.string().url().optional().or(z.literal("")),
    cover_image_url: z.string().url().optional().or(z.literal("")),
    content_mdx: z.string().optional(),
    featured: z.boolean().default(false),
});

export type ProjectFormData = z.infer<typeof projectSchema>;
