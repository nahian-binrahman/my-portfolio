"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema, type PostFormData } from "@/lib/validations/post";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImageUploader } from "@/components/admin/image-uploader";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Eye, Edit3, Clock } from "lucide-react";
import { createPost, updatePost } from "@/app/admin/posts/actions";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface PostFormProps {
    initialData?: any;
    isEditing?: boolean;
}

export function PostForm({ initialData, isEditing }: PostFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<PostFormData>({
        // @ts-ignore
        resolver: zodResolver(postSchema),
        defaultValues: (initialData ? {
            title: initialData.title || "",
            slug: initialData.slug || "",
            excerpt: initialData.excerpt || "",
            content_mdx: initialData.content_mdx || "",
            tags: (initialData.tags || []) as string[],
            reading_minutes: initialData.reading_minutes || 0,
            cover_image_url: initialData.cover_image_url || "",
            published_at: initialData.published_at || null,
        } : {
            title: "",
            slug: "",
            excerpt: "",
            content_mdx: "",
            tags: [],
            reading_minutes: 5,
        }) as any,
    });

    const content = watch("content_mdx") || "";
    const coverImageUrl = watch("cover_image_url");
    const title = watch("title");

    // Auto-generate slug from title
    useEffect(() => {
        if (!isEditing && title) {
            const slug = title
                .toLowerCase()
                .replace(/[^\w\s-]/g, "")
                .replace(/\s+/g, "-");
            setValue("slug", slug, { shouldValidate: true });
        }
    }, [title, setValue, isEditing]);

    // Auto-calculate reading time based on word count
    useMemo(() => {
        const words = content.trim().split(/\s+/).length;
        const minutes = Math.ceil(words / 200);
        setValue("reading_minutes", minutes || 0);
    }, [content, setValue]);

    const onSubmit = async (data: PostFormData) => {
        setIsSubmitting(true);
        try {
            if (isEditing && initialData?.id) {
                await updatePost(initialData.id, data);
                toast.success("Post updated successfully");
            } else {
                await createPost(data);
                toast.success("Post created successfully");
            }
            router.push("/admin/posts");
            router.refresh();
        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            // @ts-ignore
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8"
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">Post Title</Label>
                        <Input
                            id="title"
                            {...register("title")}
                            placeholder="e.g. Master Next.js for Portfolio"
                            error={errors.title?.message}
                            className="text-lg font-bold"
                        />
                        {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-b pb-2">
                            <Label>Content (MDX Support)</Label>
                            <div className="flex bg-muted rounded-md p-1 gap-1">
                                <Button
                                    type="button"
                                    variant={activeTab === "edit" ? "secondary" : "ghost"}
                                    size="sm"
                                    onClick={() => setActiveTab("edit")}
                                    className="h-8 gap-2"
                                >
                                    <Edit3 size={14} /> Edit
                                </Button>
                                <Button
                                    type="button"
                                    variant={activeTab === "preview" ? "secondary" : "ghost"}
                                    size="sm"
                                    onClick={() => setActiveTab("preview")}
                                    className="h-8 gap-2"
                                >
                                    <Eye size={14} /> Preview
                                </Button>
                            </div>
                        </div>

                        {activeTab === "edit" ? (
                            <Textarea
                                {...register("content_mdx")}
                                placeholder="Start writing your thoughts..."
                                className="min-h-[500px] font-mono leading-relaxed resize-y"
                            />
                        ) : (
                            <div className="min-h-[500px] prose dark:prose-invert max-w-none border rounded-md p-6 bg-white dark:bg-slate-900 overflow-auto">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {content || "*No content to preview yet...*"}
                                </ReactMarkdown>
                            </div>
                        )}
                        {errors.content_mdx && <p className="text-xs text-destructive">{errors.content_mdx.message}</p>}
                    </div>
                </div>

                <div className="space-y-6">
                    <ImageUploader
                        label="Post Thumbnail"
                        initialValue={coverImageUrl}
                        onUploadComplete={(url) => setValue("cover_image_url", url)}
                    />

                    <Card className="border-slate-200/60 dark:border-slate-800/60">
                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="slug">URL Slug</Label>
                                <Input
                                    id="slug"
                                    {...register("slug")}
                                    placeholder="nextjs-portfolio-guide"
                                />
                                {errors.slug && <p className="text-xs text-destructive">{errors.slug.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="excerpt">Excerpt</Label>
                                <Textarea
                                    id="excerpt"
                                    {...register("excerpt")}
                                    placeholder="Small summary for the blog card..."
                                    className="h-24 text-sm"
                                />
                                {errors.excerpt && <p className="text-xs text-destructive">{errors.excerpt.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="tags">Tags (comma separated)</Label>
                                <Input
                                    id="tags"
                                    placeholder="Nextjs, React, WebDev"
                                    defaultValue={initialData?.tags?.join(", ") || ""}
                                    onChange={(e) => {
                                        const tags = e.target.value.split(",").map(t => t.trim()).filter(Boolean);
                                        setValue("tags", tags);
                                    }}
                                />
                            </div>

                            <div className="flex items-center gap-2 text-muted-foreground pt-2">
                                <Clock size={16} />
                                <span className="text-sm font-medium">{watch("reading_minutes")} min read</span>
                                <input type="hidden" {...register("reading_minutes", { valueAsNumber: true })} />
                            </div>
                        </CardContent>
                    </Card>

                    <Button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-[#5EEAD4] dark:hover:bg-[#2DD4BF] dark:text-slate-900 py-6 text-lg font-bold shadow-lg transition-all active:scale-[0.98]"
                        disabled={isSubmitting}
                    >
                        {isSubmitting && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                        {isEditing ? "Save Changes" : "Publish Post"}
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => router.back()}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </form>
    );
}
