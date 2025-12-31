import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

/**
 * Custom components mapping for MDX.
 * ONLY components defined here will be rendered.
 * Canvas and R3F are NOT included for security reasons as requested.
 */
const components = {
    h1: ({ className, ...props }: any) => (
        <h1
            className={cn(
                "mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
                className
            )}
            {...props}
        />
    ),
    h2: ({ className, ...props }: any) => (
        <h2
            className={cn(
                "mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0",
                className
            )}
            {...props}
        />
    ),
    h3: ({ className, ...props }: any) => (
        <h3
            className={cn(
                "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
                className
            )}
            {...props}
        />
    ),
    p: ({ className, ...props }: any) => (
        <p
            className={cn("leading-7 [&:not(:first-child)]:mt-6 text-lg", className)}
            {...props}
        />
    ),
    ul: ({ className, ...props }: any) => (
        <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)} {...props} />
    ),
    ol: ({ className, ...props }: any) => (
        <ol className={cn("my-6 ml-6 list-decimal [&>li]:mt-2", className)} {...props} />
    ),
    li: ({ className, ...props }: any) => (
        <li className={cn("mt-2", className)} {...props} />
    ),
    blockquote: ({ className, ...props }: any) => (
        <blockquote
            className={cn(
                "mt-6 border-l-2 border-indigo-500 pl-6 italic text-muted-foreground",
                className
            )}
            {...props}
        />
    ),
    img: ({ className, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            className={cn("rounded-md border my-8 mx-auto", className)}
            alt={alt}
            {...props}
        />
    ),
    hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
    a: ({ className, ...props }: any) => (
        <Link
            className={cn("font-medium text-indigo-600 dark:text-[#5EEAD4] underline underline-offset-4", className)}
            {...props}
        />
    ),
    code: ({ className, ...props }: any) => (
        <code
            className={cn(
                "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
                className
            )}
            {...props}
        />
    ),
    // Additional safety: explicitly prevent Canvas if somehow injected
    Canvas: () => <div className="p-4 bg-destructive/10 text-destructive text-sm rounded-md">Error: 3D Components are restricted in MDX.</div>,
};

interface MDXProps {
    source: string;
}

export function MDX({ source }: MDXProps) {
    return (
        <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-m-20 prose-a:no-underline">
            <MDXRemote
                source={source}
                components={components}
                options={{
                    mdxOptions: {
                        remarkPlugins: [remarkGfm],
                        rehypePlugins: [
                            [
                                rehypePrettyCode,
                                {
                                    theme: "github-dark",
                                    onVisitLine(node: any) {
                                        // Prevent lines from collapsing in `display: grid` mode, and allow empty lines to be copy/pasted
                                        if (node.children.length === 0) {
                                            node.children = [{ type: "text", value: " " }];
                                        }
                                    },
                                    onVisitHighlightedLine(node: any) {
                                        node.properties.className.push("line--highlighted");
                                    },
                                    onVisitHighlightedWord(node: any) {
                                        node.properties.className = ["word--highlighted"];
                                    },
                                },
                            ],
                        ],
                    },
                }}
            />
        </article>
    );
}
