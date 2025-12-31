import { z } from "zod";

export const postSchema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens"),
    excerpt: z.string().min(1, "Excerpt is required"),
    content_mdx: z.string().min(1, "Content is required"),
    tags: z.array(z.string()).default([]),
    cover_image_url: z.string().url().optional().or(z.literal("")),
    reading_minutes: z.number().int().min(0).default(0),
    published_at: z.string().nullable().optional(), // ISO string or null
});

export type PostFormData = z.infer<typeof postSchema>;
