import React from "react";

export function JsonLd({ data }: { data: any }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

export function PersonSchema() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nahian.dev";

    return (
        <JsonLd
            data={{
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Nahian Bin Rahman",
                url: baseUrl,
                jobTitle: "Full-Stack & AI Engineer",
                sameAs: [
                    "https://github.com/nahian-rahman",
                    "https://twitter.com/nahian_dev",
                    "https://linkedin.com/in/nahianrahman"
                ],
                image: `${baseUrl}/avatar.jpg`,
                description: "Specializing in building deterministic AI systems and high-performance web applications."
            }}
        />
    );
}

export function ArticleSchema({ post }: { post: any }) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nahian.dev";

    return (
        <JsonLd
            data={{
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                headline: post.title,
                description: post.excerpt,
                image: post.cover_image_url || `${baseUrl}/og-image.jpg`,
                datePublished: post.published_at || post.created_at,
                dateModified: post.updated_at || post.created_at,
                author: {
                    "@type": "Person",
                    name: "Nahian Bin Rahman",
                    url: baseUrl,
                },
                publisher: {
                    "@type": "Organization",
                    name: "Nahian Bin Rahman",
                    logo: {
                        "@type": "ImageObject",
                        url: `${baseUrl}/logo.png`,
                    },
                },
                mainEntityOfPage: {
                    "@type": "WebPage",
                    "@id": `${baseUrl}/blog/${post.slug}`,
                },
            }}
        />
    );
}

export function ProjectSchema({ project }: { project: any }) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nahian.dev";

    return (
        <JsonLd
            data={{
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                name: project.title,
                description: project.summary,
                applicationCategory: "WebApplication",
                operatingSystem: "Web",
                url: `${baseUrl}/projects/${project.slug}`,
                image: project.cover_image_url || `${baseUrl}/og-image.jpg`,
                author: {
                    "@type": "Person",
                    name: "Nahian Bin Rahman",
                },
            }}
        />
    );
}
